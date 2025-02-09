module.exports = {
  apps: [
    {
      name: "bkd",                   // Application name
      script: "babel-node src/server.js", // Use babel-node for ES module support
      exec_mode: "cluster",          // Enable multi-core usage
      instances: "max",              // Use all available CPU cores
      watch: false,                  // Disable file watching (for performance)
      env: {
        NODE_ENV: "development",
        PORT: 5008
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8000
      }
    }
  ]
};
