const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
module.exports = {
    mode: `production`, //development
    experiments: {
        topLevelAwait: true,
    },
    entry: {
        main: path.join(__dirname, `./src/src.js`),
    },
    output: {
        path: path.join(__dirname, `dist`),
        filename: `[name].js`,
        clean: true,
    },

    //plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: `group-project`,
            filename: `phonebook.html`,
            template: path.join(__dirname, `./src/phonebook.html`),
        }),
    ],
};
