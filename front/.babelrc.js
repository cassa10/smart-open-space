module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
  presets: ['@babel/preset-env'],
};
