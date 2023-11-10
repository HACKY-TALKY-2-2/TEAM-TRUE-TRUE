const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/pull", {
            target: "https://shark-careful-walleye.ngrok-free.app",
            changeOrigin: true,
        }),
        createProxyMiddleware("/point", {
            target: "https://shark-careful-walleye.ngrok-free.app",
            changeOrigin: true,
        })
    );
};
