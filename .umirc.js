
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
    "/api/v1": {
      "target": "http://127.0.0.1:3000",
      "changeOrigin": true,
      // "pathRewrite": { "^/api" : "" }
    }
  },
}
