module.exports = {
  presets: ["babel-preset-gatsby"],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "automatic",
        importSource: "@emotion/react",
      },
    ],
  ],
};
