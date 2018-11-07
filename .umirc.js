
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'blog-web',
      dll: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  "proxy": {
    "/api/v1/video": {
      "target": "http://localhost:3001",
      "changeOrigin": true,
    // "pathRewrite": { "^/api/v1/video" : "/api/v1/video" }
    },
    "/api/v1": {
      "target": "http://localhost:3000",
      "changeOrigin": true,
    // "pathRewrite": { "^/api" : "" }
    },
    "/static": {
      "target": "http://localhost:3000",
      "changeOrigin": true
    },
  },
  "publicPath": "./",
}
