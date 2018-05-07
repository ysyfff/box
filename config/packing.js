/**
 * 这个文件可以修改packing配置文件的默认设置
 * 默认配置请看 `node_modules/packing/config/packing.js`
 *
 * @param object packing 默认配置对象
 */

export default (packing) => {
  const p = packing;
  // 模版引擎类型，目前支持的类型有[html,pug,ejs,handlebars,smarty,velocity,artTemplate]
  p.template.options.engine = 'html';
  // 模版文件扩展名
  p.template.options.extension = '.html';
  // 通用模版位置
  p.template.options.source = 'src/templates/pages/default.html';
  p.eslint.enable = false;
  // 网站自定义配置
  p.rewriteRules = {
    // 网站URL与模版的对应路由关系
    '^/$': '/index',
    // API转发
    '^/api/(.*)': 'require!/mock/api/$1.js'
  };
  p.port.dev = 8888;
  return p;
};

/** 所有配置项及默认值 */
// {
//   /**
//    * 本地访问的域名
//    * 如果需要使用 `qunar.com` 的 cookie，需要改成类似 `my.qunar.com` 这种
//    * @type {string}
//    */
//   localhost: 'localhost',
//
//   /**
//    * webserver 端口
//    */
//   port: {
//     /**
//      * 开发环境 webserver 端口
//      * @type {number}
//      */
//     dev: 8081,
//
//     /**
//      * 预览编译结果时 webserver 端口
//      * @type {number}
//      */
//     dist: 8080
//   },
//
//   /**
//    * 文件路径配置
//    * 所有目录都使用相对于项目根目录的相对目录格式
//    */
//   path: {
//     /** 源文件相关路径 */
//     src: {
//       /**
//        * 源文件根目录
//        * @type {string}
//        */
//       root: 'src',
//
//       /**
//        * 模版文件路径
//        * 相对于 `src.root` 的相对地址
//        * 若不区分布局文件和网页文件，请直接传入字符串
//        * @type {(string|object)}
//        */
//       templates: {
//         layout: 'templates/layout',
//         pages: 'templates/pages'
//       }
//     },
//
//     /** 编译输出文件相关路径 */
//     dist: {
//       /**
//        * webpack 编译产物输出目录
//        * 即 `webpack.config.output.path` 参数
//        * @type {string}
//        */
//       root: 'prd',
//
//       /**
//        * 模版文件路径
//        * 相对于 `dist.root` 的相对地址
//        * 若不区分布局文件和网页文件，请直接传入字符串
//        * @type {(string|object)}
//        */
//       templates: {
//         layout: 'templates/layout',
//         pages: 'templates/pages'
//       },
//
//       /**
//        * JavaScript 输出目录
//        * @type {string}
//        */
//       js: 'js',
//
//       /**
//        * CSS 输出目录
//        * @type {string}
//        */
//       css: 'css'
//     },
//
//     /**
//      * 页面初始化 mock 数据文件存放目录
//      * @type {string}
//      */
//     mockPages: 'mock/pages',
//
//     /**
//      * dllPlugin 编译输出物临时存放目录
//      * @type {string}
//      */
//     tmpDll: '.tmp/dll',
//
//     /**
//      * 打包入口文件
//      * @type {(string|object|function)}
//      * @example
//      * // string
//      * entries: './src/entries/index.js'
//      * @example
//      * // object
//      * entries: {
//      *   index: './src/entries/index.js',
//      *   abc: './src/entries/abc.less'
//      * }
//      * @example
//      * // function
//      * entries: () => {}
//      */
//     entries: () => {
//       const entryFileName = 'entry.js';
//       const entryPath = 'src/pages';
//       const entryPattern = `**/${entryFileName}`;
//       const cwd = path.resolve(context, entryPath);
//       const config = {};
//       packingGlob(entryPattern, { cwd }).forEach((page) => {
//         const key = page.replace(`/${entryFileName}`, '');
//         config[key] = path.join(cwd, page);
//       });
//       return config;
//     }
//   },
//
//   /** 模版配置 */
//   template: {
//     /**
//      * 是否启用 packing template
//      * @type {bool}
//      */
//     enable: true,
//
//     /**
//      * packing template 选项
//      * @type {object}
//      */
//     options: {
//       /**
//        * 模版引擎类型
//        * 目前支持
//        * - html
//        * - pug
//        * - ejs
//        * - handlebars
//        * - smarty
//        * - velocity
//        * - artTemplate
//        * @type {string}
//        */
//       engine: 'pug',
//
//       /**
//        * 模版文件扩展名
//        * @type {string}
//        */
//       extension: '.pug',
//
//       /**
//        * 是否根据 `entry pointer` 自动生成网页文件
//        * @type {bool}
//        */
//       autoGeneration: true,
//
//       /**
//        * 是否往模版中注入 assets
//        * @type {bool}
//        */
//       inject: true,
//
//       /**
//        * JavaScript Chunk 注入的位置
//        * - 'head': 在</head>前注入
//        * - 'body': 在</body>前注入
//        * @type {'head'|'body'}
//        */
//       scriptInjectPosition: 'body',
//
//       /**
//        * 是否往模版中注入 PWA manifest.json
//        * @type {bool}
//        */
//       injectManifest: false,
//
//       /**
//        * `manifest.json` 文件位置
//        * @type {string}
//        */
//       manifest: 'manifest.json',
//
//       /**
//        * 生成网页用的源文件位置
//        * @type {string}
//        */
//       source: 'src/templates/pages/default.pug',
//
//       /**
//        * 生成网页使用的字符编码
//        * @type {string}
//        */
//       charset: 'UTF-8',
//
//       /**
//        * 生成网页使用的网页标题
//        * @type {string}
//        */
//       title: '',
//
//       /**
//        * 生成网页使用的 favicon 图标
//        * - false: 不使用 favicon 图标
//        * - 非空字符串: favicon 图标的位置
//        * @type {(bool|string)}
//        */
//       favicon: false,
//
//       /**
//        * 生成网页使用的关键字
//        * @type {(bool|string)}
//        */
//       keywords: false,
//
//       /**
//        * 生成网页使用的网页标题
//        * @type {(bool|string)}
//        */
//       description: false,
//
//       /**
//        * 生成网页中必须包含的 chunks 列表
//        * @type {null|array}
//        */
//       chunks: null,
//
//       /**
//        * 生成网页中不包含的 chunks 列表
//        * @type {null|array}
//        */
//       excludeChunks: null,
//
//       /**
//        * 生成网页中 chunks 排序方式
//        * - 'none': 按 webpack 生成顺序插入
//        * - 'id': 按 chunks id 正向排序
//        * - 'manual': 手动排序（暂不可用）
//        * - 'commonChunksFirst': 按 common chunks 优先方式排序
//        * - 'reverse': 按当前排序反向排序
//        * @type {string}
//        */
//       chunksSortMode: 'commonChunksFirst',
//
//       /**
//        * 网页文件中需要在编译时替换为 _hash 的标签属性列表
//        * 格式为 tag:attribute
//        * 如果想对所有标签的某个属性替换，请使用 * 代替 tag
//        * 如所有标签的 src 属性都需要替换，则使用 *:src
//        * @example ['*:src', 'link:href']
//        * @type {array}
//        */
//       attrs: ['img:src', 'link:href'],
//
//       /**
//        * 模版中命中的静态文件编译输出的文件名
//        * @type {string}
//        */
//       path: '[path][name]_[hash:8].[ext]'
//     }
//
//   },
//
//   /** HRM 配置 */
//   hot: {
//     /**
//      * 是否启用热模块替换
//      * @type {bool}
//      */
//     enable: true,
//
//     /**
//      * HRM 选项
//      * @type {object}
//      * @see {@link https://github.com/webpack-contrib/webpack-hot-middleware|webpack-hot-middleware}
//      */
//     options: {}
//   },
//
//   /** 长效缓存配置 */
//   longTermCaching: {
//     /**
//      * 是否启用编译时文件 hash 重命名
//      * @type {bool}
//      */
//     enable: true,
//
//     /**
//      * 缓存选项
//      * @type {object}
//      */
//     options: {
//       /**
//        * 文件名与 hash 连接使用的字符串
//        * @type {string}
//        */
//       delimiter: '_',
//
//       /**
//        * hash 长度
//        * @type {number}
//        */
//       fileHashLength: 8
//     }
//   },
//
//   /** 压缩代码配置 */
//   minimize: {
//     /**
//      * 是否压缩代码
//      * @type {bool}
//      */
//     enable: true,
//
//     /**
//      * uglifyjs plugin 配置
//      * @type {object}
//      */
//     options: {
//       // sourceMap: true,
//       uglifyOptions: {
//         output: {
//           // beautify: true,
//           comments: false
//         }
//       }
//     }
//   },
//
//   /**
//    * `css-loader` 配置项
//    * @type {object}
//    * @see {@link https://github.com/webpack-contrib/css-loader|css-loader}
//    */
//   cssLoader: {
//     /**
//      * 在 css loader 之前应用的 loader 数量
//      * @type {number}
//      */
//     importLoaders: 2,
//     /**
//      * 是否启用 `CSS Modules`
//      * @type {bool}
//      */
//     modules: false,
//
//     /**
//      * 自定义css-modules类标识命名规则
//      * @type {string}
//      */
//     localIdentName: '[path][name]__[local]--[hash:base64:5]'
//   },
//
//   /** stylelint 配置 */
//   stylelint: {
//     /**
//      * 是否启用 `stylelint`
//      * @type {bool}
//      */
//     enable: true,
//
//     /**
//      * `stylelint` 配置项
//      * @type {object}
//      * @see {@link https://stylelint.io/user-guide/node-api/#options|stylelint options}
//      */
//     options: {
//       files: ['**/*.css', '**/*.less', '**/*.s?(a|c)ss']
//     }
//   },
//
//   /** eslint 配置 */
//   eslint: {
//     /**
//      * 是否启用 `eslint`
//      * @type {bool}
//      */
//     enable: true,
//
//     /**
//      * `eslint` 配置项
//      * @type {object}
//      * @see {@link https://github.com/webpack-contrib/eslint-loader|eslint options}
//      */
//     options: {
//     }
//   },
//
//   /**
//    * runtimeChunk 配置
//    * @see https://webpack.js.org/plugins/split-chunks-plugin/
//    */
//   runtimeChunk: {
//     /**
//      * 是否启用 runtimeChunk
//      * @type {bool}
//      */
//     enable: false,
//
//     /**
//      * runtimeChunk 输出的文件名
//      * @type {string}
//      */
//     name: 'runtime'
//   },
//
//   /**
//    * commonChunks 配置
//    * 可以配置多个 common 包，配置的包名称会转换为正则表达式
//    * 该配置分别在以下过程中被调用：
//    * - 在 `packing serve` 任务中被 `DllPlugin` 调用
//    * - 在 `packing build` 任务中被 `SplitChunkPlugin` 调用
//    * 注意，如果配置了commonChunks，所有网页模版需要引用公共包文件
//    * 否则会报错
//    * <script src="/vendor.js"></script>
//    * @type {object}
//    * @see https://webpack.js.org/plugins/split-chunks-plugin/
//    */
//   commonChunks: {
//     // vendor: [
//     //   'react',
//     //   'react-dom'
//     //   'packing-ajax'
//     // ]
//   },
//
//   /**
//    * webpack-visualizer-plugin 配置
//    * @see https://github.com/chrisbateman/webpack-visualizer
//    */
//   visualizer: {
//     /**
//      * 是否启用 webpack-visualizer-plugin
//      * @type {bool}
//      */
//     enable: true,
//
//     /**
//      * `visualizer` 配置项
//      * @type {object}
//      */
//     options: {
//       /**
//        * 是否在浏览器中打开 visualizer 报表网页
//        * 和 `packing build -o` 效果一样
//        * @type {object}
//        */
//       open: process.env.npm_lifecycle_event === 'build'
//     }
//   },
//
//   /** graphql 配置 */
//   graphql: {
//     /**
//      * 是否使用 `GraphQL-mock-server`
//      * @type {bool}
//      */
//     enable: false,
//
//     options: {
//       /**
//        * GraphQL 地址
//        * @type {string}
//        */
//       graphqlEndpoint: '/graphql',
//
//       /**
//        * GraphiQL 地址
//        * @type {string}
//        */
//       graphiqlEndpoint: '/graphiql'
//     }
//   },
//
//   /**
//    * 静态资源类型
//    * @type {array}
//    */
//   assetExtensions: [
//     'jpg',
//     'jpeg',
//     'png',
//     'gif',
//     'mp3',
//     'ttf',
//     'woff',
//     'woff2',
//     'eot',
//     'svg'
//   ],
//
//   /**
//    * URL转发路由规则配置
//    * `require!` 表示使用本地 mock 文件
//    * @type {object}
//    */
//   rewriteRules: {
//     /** 网站URL与模版的对应路由关系 */
//     // '^/$': '/index',
//
//     /** API转发 */
//     '^/api/(.*)': 'require!/mock/api/$1.js'
//     // '^/api/(.*)': '/index.jade.html',
//     // '^/api/(.*)': 'http://touch.qunar.com/api/hotel/findhotelcity?cityName=%E5%8C%97%E4%BA%AC',
//     // '^/hello': 'http://localhost:3001/123/4.html',
//   }
//
// }
