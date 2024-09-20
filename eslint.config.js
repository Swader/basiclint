import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: { ...globals.mocha, ...globals.node } } },
  pluginJs.configs.recommended,
  { ignores: ["node_modules/", "test/fixtures/", "coverage/"] },
];