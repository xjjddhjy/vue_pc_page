module.exports = {
  devServer:{
    open:false,      // 是否打开浏览器;
    hotOnly:true,    // 是否热更新;
    proxy:{
      // https://www.csdn.net/api/articles http://www.xjjuniapp1tp5.com/api
      // http://api.douban.com/v2/movie/top250  http://www.studentadmin.com
      '/api':{   // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
          target:'http://120.79.80.66:9011',    // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
          secure:false,
          changeOrigin:true,  // 开启代理，在本地创建一个虚拟服务端
          // ws:false,       // 是否启用  websockets;
          pathRewrite:{   // 去掉 路径中的  /api  的这一截
              '^/api':''
          }
      },
    },
  }
}

