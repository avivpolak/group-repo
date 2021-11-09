const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
module.exports = {
    mode: `production`, //development
    experiments: {
        topLevelAwait: true,
    },
    entry: {
        main: path.resolve(__dirname, `./src.js`),
    },
    output: {
        path: path.resolve(__dirname, `dist`),
        filename: `[name].js`,
        clean: true,
    },

    //plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: `group-project`,
            filename: `phonebook.html`,
            template: path.resolve(__dirname, `./phonebook.html`),
        }),
    ],
};
