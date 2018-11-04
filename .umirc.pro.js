export default {
    "proxy": {
        "/api/v1/video": {
        "target": "http://vinda-video:3001",
        "changeOrigin": true,
        // "pathRewrite": { "^/api/v1/video" : "/api/v1/video" }
        },
        "/api/v1": {
        "target": "http://vinda-article:3000",
        "changeOrigin": true,
        // "pathRewrite": { "^/api" : "" }
        },
        "/static": {
        "target": "http://vinda-article:3000",
        "changeOrigin": true
        },
    },
}