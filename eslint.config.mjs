// 1. Import the new plugins
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  
  // 2. Add a new configuration object for your custom rules
  {
    plugins: {
      "@stylistic": stylistic,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // --- Import Sorting ---
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // --- Indentation ---
      // Enforce 2 spaces indentation (switch to 4 if you prefer)
      "@stylistic/indent": ["error", 2],

      // --- Parentheses & Styling ---
      // Enforce parentheses on arrow functions: (a) => {} instead of a => {}
      "@stylistic/arrow-parens": ["error", "always"],
      
      // Enforce consistent spacing inside parentheses
      "@stylistic/space-in-parens": ["error", "never"],
      
      // (Optional) Standardize semicolons and quotes often goes with indentation
      "@stylistic/semi": ["error", "always"],
      "@stylistic/quotes": ["error", "double"],
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;