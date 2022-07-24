const path = require("path");
const Webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const api_key = process.env.GOOGLE_GEO_LOCATION_API_KEY;

module.exports = {
    name: "drag-drop-app",
    mode: 'development',
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/dist/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './public'),
        },
        compress: true,
        port: 3000
    },
    devtool: 'inline-source-map',
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
        alias: {
            process: "process/browser"
        },
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
        // new HtmlWebpackPlugin({
        //     inject: "body",
        //     template: './index.html',
        //     title: 'Custom template',
        //     // Pass the full url with the key!
        //     apiKey: api_key,
        // })
    ]
};