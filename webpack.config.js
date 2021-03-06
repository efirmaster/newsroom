const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const NODE_MODULES = process.env.NODE_MODULES || 'node_modules';

module.exports = {
    entry: {
        newsroom_js: './assets/index.js',
        companies_js: './assets/companies/index.js',
        users_js: './assets/users/index.js',
        products_js: './assets/products/index.js',
        navigations_js: './assets/navigations/index.js',
        user_profile_js: './assets/user-profile/index.js',
        newsroom_css: './assets/style.js',
        wire_js: './assets/wire/index.js',
        notifications_js: './assets/notifications/index.js',
        vendor: [
            'alertifyjs',
            'bootstrap',
            'classnames',
            'lodash',
            'moment',
            'prop-types',
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'redux-thunk',
            'redux-logger',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'newsroom', 'static'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread'],
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'assets'), NODE_MODULES],
    },
    resolveLoader: {
        modules: [NODE_MODULES],
    },
    plugins: [
        new ManifestPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
    ]
};
