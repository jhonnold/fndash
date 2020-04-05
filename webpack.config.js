const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': 'http://localhost:8080',
        },
    },
    entry: {
        app: ['babel-polyfill', 'react-hot-loader/patch', './client/index.js'],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js',
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        modules: [__dirname, 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['transform-class-properties'],
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [require('autoprefixer')()],
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'static/img/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './assets/index.html' }),

        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
        }),

        new CleanWebpackPlugin(),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        unused: true,
                        dead_code: true,
                    },
                },
                sourceMap: true,
            }),
        ],
    },
    performance: { hints: false },
};
