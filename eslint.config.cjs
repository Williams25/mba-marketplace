const globals = require("globals");
const tsparser = require("@typescript-eslint/parser");
const tseslint = require("@typescript-eslint/eslint-plugin"); // Plugin TypeScript
const pluginReact = require("eslint-plugin-react"); // Plugin React
const pluginReactHooks = require("eslint-plugin-react-hooks-rc"); // Plugin React Hooks

module.exports = [
  {
    files: [
      "src/**/*.{js,mjs,cjs,ts,jsx,tsx}",
      "src/**/**/*.{js,mjs,cjs,ts,jsx,tsx}"
    ],
    languageOptions: {
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "react-hooks/rules-of-hooks": "error",
      "@typescript-eslint/no-explicit-any": "error"
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
      "react-hooks": pluginReactHooks
    }
  }
];
