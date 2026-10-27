// Source components consumed by the Harness mounting adapter and its DOM contract tests.
export { HomeView, collectActions } from "../original/view";
export { HomeSettingTab } from "../original/settings-tab";
export {
  ModuleLibrary,
  ModuleOptionsModal,
  MoveModuleModal,
} from "../original/module-library";
export { NewPageModal, DeletePageModal } from "../original/page-dialogs";
export {
  normalizeSettings,
  DEFAULT_SETTINGS,
  presetPage,
  moduleOptions,
} from "../original/settings";
export { setLanguage, t } from "../original/i18n";
export { HomeTaskIndex } from "../original/task-index";
export { AmbientPlayer } from "../original/ambient";
export { WallpaperService } from "../original/wallpaper/service";
export * from "./original-ui";
export { HomeVault } from "./home-vault";
export { captureNote, ensureTodayNote } from "../original/today";
export { completeTodo, reopenTodo, readTodos } from "../original/todo-data";
export { writeFocus, readFocus } from "../original/daily-focus";
export { builtinModules } from "../original/module-catalog";
export { legacyMigrationPlan } from "./legacy-migration";
