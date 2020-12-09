module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: 'public',
  },
  serverRuntimeConfig: {
    rootDir: __dirname
  },  
  webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
  
      return config
    },
  }