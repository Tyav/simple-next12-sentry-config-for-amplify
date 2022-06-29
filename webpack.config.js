module.exports = {
  module: {
    rules: [
      {
        test: /\/(LISENCE)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};