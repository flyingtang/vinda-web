export default {
    "proxy": {
        "/api/v1/video": {
        "target": "vinda-video:3001",
        "changeOrigin": true,
        // "pathRewrite": { "^/api/v1/video" : "/api/v1/video" }
        },
        "/api/v1": {
        "target": "vinda-article:3000",
        "changeOrigin": true,
        // "pathRewrite": { "^/api" : "" }
        },
        "/static": {
        "target": "vinda-article:3000",
        "changeOrigin": true
        },
    },
}