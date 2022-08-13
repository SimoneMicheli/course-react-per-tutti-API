const path = require("path")

module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:node/recommended",
    "plugin:node/recommended-module",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "node"],
  rules: {
    "node/no-missing-import": [
      "error",
      {
        tryExtensions: [".js", ".ts", ".json", ".node"],
      },
    ],
  },
  settings: {},
}
