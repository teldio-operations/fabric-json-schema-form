import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.recommended,
  {
    settings: {
      react: {
        version: "19",
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  globalIgnores(["manager-api.d.ts"]),
]);
