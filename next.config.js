/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /canvas\.node$/,
        use: 'node-loader',
      });
  
      return config;
    },
  };
  
