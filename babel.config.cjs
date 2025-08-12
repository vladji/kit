module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        "moduleName": "@env",
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
        },
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    ],
    ["formatjs", {
      idInterpolationPattern: "[sha512:contenthash:base64:6]",
      ast: true,
    }],
    "react-native-worklets/plugin"
  ],
};
