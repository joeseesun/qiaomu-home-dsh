const MAX_RESPONSE = 16 * 1024 * 1024;
/** Original requestUrl semantics with Host-only keychain resolution and bounded I/O. */
export class HomeNetwork {
  constructor(credentials, { fetcher = fetch } = {}) {
    this.credentials = credentials;
    this.fetcher = fetcher;
    this.abort = new AbortController();
  }
  async request(input) {
    if (!input || typeof input.url !== "string")
      throw Error("Invalid Home request");
    const url = new URL(input.url);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      throw Error("Use an HTTP or HTTPS service URL");
    const method = input.method || "GET";
    if (!["GET", "POST", "HEAD"].includes(method))
      throw Error("Unsupported Home request method");
    if (
      input.body !== undefined &&
      (typeof input.body !== "string" ||
        Buffer.byteLength(input.body) > 1024 * 1024)
    )
      throw Error("Invalid Home request body");
    const headers = new Headers(input.headers || {});
    if (input.contentType) headers.set("Content-Type", input.contentType);
    const authorization = headers.get("Authorization");
    if (authorization) {
      const match =
        /^(Bearer|Client-ID) home-keychain:([a-zA-Z0-9_.-]{1,100})$/.exec(
          authorization,
        );
      if (!match)
        throw Error("Home credentials must use a saved key reference");
      const expected =
        match[1] === "Bearer"
          ? "https://api.github.com"
          : "https://api.unsplash.com";
      if (url.origin !== expected)
        throw Error("Credential reference does not match this service");
      const secret = await this.credentials.get(
        "qiaomu-home-dsh-secret-" + match[2],
      );
      if (!secret) throw Error("The selected credential is missing");
      headers.set("Authorization", match[1] + " " + secret);
    }
    if (headers.has("Cookie") || headers.has("Proxy-Authorization"))
      throw Error("Unsupported Home request header");
    let response;
    try {
      response = await this.fetcher(url, {
        method,
        headers,
        body: input.body,
        redirect: authorization ? "error" : "follow",
        signal: AbortSignal.any([
          this.abort.signal,
          AbortSignal.timeout(30000),
        ]),
      });
    } catch {
      throw Error("Home could not reach the service");
    }
    if (Number(response.headers.get("content-length") || 0) > MAX_RESPONSE) {
      await response.body?.cancel();
      throw Error("Home service response exceeds 16 MB");
    }
    const chunks = [];
    let size = 0;
    const reader = response.body?.getReader();
    if (reader)
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          size += value.length;
          if (size > MAX_RESPONSE) {
            await reader.cancel();
            throw Error("Home service response exceeds 16 MB");
          }
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }
    const bytes = Buffer.concat(chunks, size),
      text = bytes.toString("utf8");
    let json;
    try {
      json = JSON.parse(text);
    } catch {}
    if (input.throw !== false && response.status >= 400)
      throw Error("Home service HTTP " + response.status);
    return {
      status: response.status,
      headers: Object.fromEntries(response.headers),
      text,
      json,
      base64: bytes.toString("base64"),
    };
  }
  dispose() {
    this.abort.abort();
  }
}
