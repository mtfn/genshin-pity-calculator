const resolve = require('path').resolve

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: resolve(__dirname, 'build'),
    },
    resolve: {
      alias: {
        'cash-dom': 'cash-dom/dist/cash.min.js',
        'chart.js': 'chart.js/dist/Chart.min.js'
      }
    },
    externals: {
      moment: 'moment'
    }
}