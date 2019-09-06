// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
// const path = require('path');

const path = require('path');
const include = path.resolve(__dirname, '../');

module.exports = {
    resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    },
    module: {
    rules: [
        {
        test: /\.tsx/,
        loader: 'babel-loader!ts-loader',
        exclude: /node_modules/,
        include,
        },
        {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        },
        {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        },
    ],
    },
};