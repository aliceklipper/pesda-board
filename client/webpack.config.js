/* Import builtin modules */
const { join } = require('path');

/* Import webpack */
const webpack = require('webpack');

/* Import webpack plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Define shortcuts for some webpack plugins */
// noinspection JSUnresolvedVariable
const DefinePlugin = webpack.DefinePlugin;
// noinspection JSUnresolvedVariable
// const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const { dev, prod } = require('alice-helpers');

/*
 * Config options
 */

/* Target configuration */
const target = () => 'web';

/* Context configuration */
const context = () => process.cwd();

/* Entry point configuration */
const entry = () => ({
    index: './src/index.jsx',
});

/* Output configuration */
const output = () => ({
    chunkFilename: '[id].[name].js',
    filename: '[name].js',
    path: join(process.cwd(), 'build'),
    pathinfo: dev(),
    publicPath: `/`,
});

/* Source maps configuration */
const devtool = () => (dev() ? 'source-map' : undefined);

/* Development server configuration */
const devServer = () => ({
    compress: true,
    port: 1337,
    historyApiFallback: true,
    publicPath: `/`,
    contentBase: join(process.cwd(), 'build'),
    watchContentBase: true,
});

/* Watch configuration */
const watch = () => false;

/* Node-like environment configuration */
const node = () => ({
    __filename: true,
    __dirname: true,
    global: true,
    process: true,
    Buffer: true,
    setImmediate: true,
});

/* Resolving configurations */
const resolve = () => ({
    extensions: ['.jsx', '.js', '.json'],
});

/*
 * Plugins
 */

const envPlugin = () => {
    return new DefinePlugin({
        __DEV__: JSON.stringify(dev()),
        __PROD__: JSON.stringify(prod()),
        __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    });
};

const htmlPlugin = () => {
    return new HtmlWebpackPlugin({
        inject: false,
        template: '!pug-loader!./page.pug',
        title: 'Pesda Board',
        appMountId: 'mount',
        mobile: true,
        links: [
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese',
        ],
    });
};

const extractPlugin = () => {
    return new ExtractTextPlugin({
        filename: 'index.css',
        allChunks: true,
    });
};

/*
 * Rules
 */

const jsonRule = () => ({
    test: /\.json$/,
    exclude: /node_modules/,
    use: [{ loader: 'json-loader' }],
});

const fileRule = () => ({
    test: /\.(?:png|jpe?g|gif|svg|ttf|woff|woff2|eot)$/,
    exclude: /node_modules/,
    use: [{ loader: 'file-loader' }],
});

const jsRule = () => ({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
        },
    ].filter(_ => _),
});

const cssRule = () => ({
    test: /\.css$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                },
            },
        ].filter(_ => _),
        fallback: 'style-loader/useable',
    }),
});

/*
 * Generate and export config
 */

module.exports = [
    {
        target: target(),
        context: context(),
        entry: entry(),
        output: output(),
        devtool: devtool(),
        devServer: devServer(),
        watch: watch(),
        node: node(),
        resolve: resolve(),
        plugins: [envPlugin(), htmlPlugin(), extractPlugin()],
        module: { rules: [jsonRule(), fileRule(), jsRule(), cssRule()] },
    },
].filter(_ => _);

process.on('SIGINT', () => {
    process.exit();
});
