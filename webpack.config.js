const path = require('path');
const nodeExternals = require('webpack-node-externals'); // Required because various bundles warn against bundling

module.exports = {
    entry: './src/mboy.ts',
    devtool: 'inline-source-map',
    mode: 'none', // Build scripts are used to set environment variables; see package.json
    optimization: {
        nodeEnv: false // Prevents webpack from overruling the NODE_ENV variable
    },
    target: 'web',
    externals: [nodeExternals()], // In order to ignore all modules in node_modules folder
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json' ]
    },
    output: {
        filename: 'mboy.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

};