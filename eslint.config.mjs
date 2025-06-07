import { FlatCompat } from "@eslint/eslintrc";
import checkFile from "eslint-plugin-check-file";
import eslintPluginN from "eslint-plugin-n";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      "prefer-arrow-callback": ["error"],
      semi: ["error"],
      quotes: ["error", "double"],
      "n/no-process-env": ["error"],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!^[": "KEBAB_CASE",
          "./**/!^[": "KEBAB_CASE",
        },
      ],
    },
    plugins: {
      "check-file": checkFile,
      n: eslintPluginN,
    },
  },
];

export default eslintConfig;
