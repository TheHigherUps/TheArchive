const path = require('path')

// module.exports = {
//     mode: 'production',
//     entry: './src/sign-in.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'signin.js',
//     },
// }

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
}

// module.exports = {
//   mode: 'development',
//   entry: './src/username.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'username.js',
//   },
//   experiments: {
//     topLevelAwait: true
//   },
// };
