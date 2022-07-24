const path = require("path");
const Webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist/'
    },
    devtool: "hidden-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new Webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new Dotenv({
            //path: './some.other.env', // load this now instead of the ones in '.env'
            //safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            //allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
            //systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            //silent: true, // hide any errors
            //defaults: false, // load '.env.defaults' as the default values if empty.
            prefix: 'process.env.' // reference your env variables as 'import.meta.env.ENV_VAR'.
        }),
        new CleanPlugin.CleanWebpackPlugin(),
    ]
};