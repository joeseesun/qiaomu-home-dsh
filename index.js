/**
 * 乔木 Home · 宿主半（Host half）
 *
 * 起点页的全部界面与状态都在客户端半（client.js）里：
 * 待办、快捷入口与设置保存在浏览器 localStorage，会话数据来自客户端服务。
 * 宿主半只需要让这一行在 Loader 里可寻址，因此 apply 为空。
 */

export const name = 'qiaomu-home';

/** 不依赖任何宿主服务。 */
export const inject = [];

/** 宿主插件体：本插件没有宿主侧行为。 */
export function apply() {}
