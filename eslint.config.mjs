import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { files: ["lib/**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { ignores: ["dist/**", "node_modules/**", "test/**"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "linebreak-style": [0, "windows"]
    }
  }
];
