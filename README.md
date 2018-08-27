## 我的个人小站
> 支持PC/移动端

### 写在前面
一直想给自己设计一个酷炫的个人网站，恰好有时间可以尝试一下React。
So,自己写动画，自己写服务端，整就对了~
### 技术栈
前端只用了React + Router,UI组件全手码。

服务端用koa2 + mongodb写了几个接口用来登录和留言。
后台代码: [https://github.com/ChuckOu/koa2-myblog]

### 演示地址

  __[Arthur.O的个人博客](https://www.vanoc.top/)__
* PC端弹窗可拖拽
* 移动端about页重力表情包
* 实现路由按需加载后使用延迟跳转实现了动画的平滑过渡

### 文件目录
![image text](https://raw.githubusercontent.com/ChuckOu/react-my-website/master/myfile.png)

### 首页展示
![image text](https://raw.githubusercontent.com/ChuckOu/react-my-website/master/mywebsit.png)

### 注：需在node_modules找到webpack配置文件进行如下修改

* 全局路径注册
```js
  'react-native': 'react-native-web',
  '@c': paths.appSrc +'/components', 
  '@': paths.appSrc
```
* sass配置
```js
   {
    test: /\.(css|scss)$/,
    use: ExtractTextPlugin.extract(
      Object.assign({
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules:true,
              minimize: true,
              localIdentName: '[name]__[local]___[hash:base64:5]' //模块化开启后的class名称
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          require.resolve(paths.appNodeModules + '/sass-loader'),
        ],
    },extractTextPluginOptions)),
    exclude:[paths.appSrc +'/components/globalcss',paths.appNodeModules]
  },
   {
    test: /\.(css|scss)$/,
    use: ExtractTextPlugin.extract(
      Object.assign({
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules:false,
              minimize: true
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          require.resolve(paths.appNodeModules + '/sass-loader'),
        ],
    },extractTextPluginOptions)),
    include:[paths.appSrc +'/components/globalcss',paths.appNodeModules]
  }
```
