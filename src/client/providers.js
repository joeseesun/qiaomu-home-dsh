import {loadSections, loadActions, searchProvider} from './original-home/sources.ts';
const PART = /^[a-zA-Z0-9_.-]{1,80}$/;
export const isProviderCard = id => typeof id === 'string' && /^plugin:[a-zA-Z0-9_.-]{1,80}:[a-zA-Z0-9_.-]{1,80}$/.test(id);
export const EMPTY_PROVIDERS = Object.freeze({sections: [], actions: [], errors: []});
export const emptyProviderStore = {subscribe: () => () => {}, getSnapshot: () => EMPTY_PROVIDERS};
/** Native Cordis service preserving the original Qiaomu Home v1 data contract. */
export function createProviderRegistry() {
  const providers = new Map(), listeners = new Set();
  let snapshot = EMPTY_PROVIDERS, closed = false;
  const publish = () => {
    if (closed) return;
    const entries = [...providers.values()];
    snapshot = {sections: entries.flatMap(p => p.sections), actions: entries.flatMap(p => p.actions), errors: entries.filter(p => p.error).map(p => p.id)};
    for (const fn of listeners) fn();
  };
  const refresh = async id => {
    const entry = providers.get(id);
    if (!entry || closed) return;
    const generation = ++entry.generation;
    const result = await loadSections(entry.provider);
    if (closed || providers.get(id) !== entry || entry.generation !== generation) return;
    entry.error = result.status === 'error';
    if (result.status === 'ready') entry.sections = result.sections.filter(s => PART.test(s.id)).map(section => ({...section, sourceId: id, cardId: `plugin:${id}:${section.id}`, description: entry.label}));
    entry.actions = loadActions(entry.provider).slice(0, 12).map(action => ({...action, sourceId: id}));
    publish();
  };
  return {
    protocol: 'qiaomu-home', version: 1,
    getSnapshot: () => snapshot,
    originalSources: () => [...providers.values()].map(entry=>({id:entry.id,label:entry.label,provider:entry.provider})),
    subscribe(fn) { if (closed) return () => {}; listeners.add(fn); return () => listeners.delete(fn); },
    register(id, provider, {label = id} = {}) {
      if (closed) throw Error('Home provider registry is disposed');
      if (!PART.test(id) || provider?.protocol !== 'qiaomu-home' || provider.version !== 1 || typeof provider.sections !== 'function') throw Error('Invalid Home provider');
      if (providers.has(id)) throw Error('Home provider already registered');
      const entry = {id, label, provider, sections: [], actions: [], generation: 0, error: false, cleanup: null};
      providers.set(id, entry);
      let active = true;
      const unregister = () => {
        if (!active) return;
        active = false;
        try { entry.cleanup?.(); } finally {
          if (providers.get(id) === entry) { providers.delete(id); publish(); }
        }
      };
      entry.unregister = unregister;
      try { entry.cleanup = typeof provider.subscribe === 'function' ? provider.subscribe(() => void refresh(id)) : null; }
      catch (error) { providers.delete(id); throw error; }
      void refresh(id);
      return unregister;
    },
    changed: refresh,
    async refresh() { await Promise.all([...providers.keys()].map(refresh)); },
    async search(query, limit = 8, signal) {
      if (closed || signal?.aborted) return [];
      limit = Math.max(0, Math.min(8, Number.isFinite(limit) ? Math.floor(limit) : 8));
      const all = await Promise.all([...providers].map(async ([sourceId, entry]) => {
        const items = await searchProvider(entry.provider, query, limit);
        if (closed || providers.get(sourceId) !== entry) return [];
        return items.map(item => ({...item, sourceId, sessionId: `plugin:${sourceId}:${item.id}`, snippet: item.subtitle || '', providerItem: true}));
      }));
      return signal?.aborted ? [] : all.flat().slice(0, limit);
    },
    dispose() {
      if (closed) return;
      closed = true;
      for (const entry of [...providers.values()]) { try { entry.unregister(); } catch {} }
      providers.clear(); listeners.clear(); snapshot = EMPTY_PROVIDERS;
    },
  };
}
