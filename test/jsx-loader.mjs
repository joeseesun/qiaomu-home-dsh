/** 测试用的 .jsx 加载钩子：让 node --test 能直接 import JSX 源文件。 */
import { transformSync } from 'esbuild';

export async function load(url, context, nextLoad) {
  if (url.endsWith('.jsx')) {
    const source = (await nextLoad(url, { ...context, format: 'module' })).source;
    const { code } = transformSync(source.toString(), {
      loader: 'jsx',
      jsx: 'automatic',
      format: 'esm',
      target: 'node20',
    });
    return { format: 'module', source: code, shortCircuit: true };
  }
  return nextLoad(url, context);
}
