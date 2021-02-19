import { resolve } from 'path'

module.exports = {
    mode: 'production',
    entry: './src/script.js',
    output: {
      filename: 'main.js',
      path: resolve(__dirname, 'build'),
    },
}