module.exports = {
    webpack: (config) => {
      config.watchOptions = {
        poll: 300,
        ...config.watchOptions,
      };
      return config;
    },
  };
  