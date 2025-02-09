module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current" 
        }
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ]
};
