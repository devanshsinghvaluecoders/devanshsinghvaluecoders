module.exports = {
  env: {
    mongodburl:
      "mongodb+srv://devanshsingh18:devanshsingh18@cluster0.qiutz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    SECRET: "asdasdfdjfalkjewjifjvklslkdflsdkjfalkjdlfkqwjoi",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
