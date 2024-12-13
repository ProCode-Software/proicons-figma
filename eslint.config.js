/** @type {import('eslint').ESLint.ConfigData} */
export default {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@figma/figma-plugins/recommended",
        "plugin:svelte/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    root: true,
    rules: {
        "@typescript-eslint/no-unused-vars": "off"
    },
    ignorePatterns: ["node_modules"],
}