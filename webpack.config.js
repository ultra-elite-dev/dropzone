const path = require("path");

module.exports = {
    mode: "development",
    entry: "./app/Js/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    // Easy way to also bundle the dropzone css.
    module: { rules: [{ test:/\.(s(a|c)ss)$/, use: ["style-loader","css-loader","sass-loader"] }] },
};