module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-react"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
          alias: {
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@styles": "./src/styles",
            "@hooks": "./src/hooks",
            "@assets": "./src/assets",
            "@config": "./src/config",
            "@services": "./src/services",
            "@screens": "./src/screens",
            "@routes": "./src/routes",
          },
        },
      ],
      ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
    ],
  };
};
