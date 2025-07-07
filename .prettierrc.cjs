module.exports = {
  semi: true,
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  useTabs: false,
  overrides: [
    {
      files: "*.{js,jsx,ts,tsx}",
      options: {
        parser: "typescript",
      },
    },
  ],
};
