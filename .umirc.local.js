export default {
"proxy": {
    "/api/v1/video": {
      "target": "http://127.0.0.1:3001",
      "changeOrigin": true,
      // "pathRewrite": { "^/api/v1/video" : "/api/v1/video" }
    },
    "/api/v1": {
      "target": "http://127.0.0.1:3000",
      "changeOrigin": true,
      // "pathRewrite": { "^/api" : "" }
    },
    "/static": {
      "target": "http://127.0.0.1:3000",
      "changeOrigin": true
    },
  },
}