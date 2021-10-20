/* 
    代理接口引入
*/
// 首先把请求服务引用
// import {POST} from '../services/request'
import { POST } from "../services/request"

// 定义一个请求代理列表
var ProxyList = {
  login(data = {}) {
    return POST({
      url: 'http://120.79.80.66:9011/admin/login/login', //http://www.xxx.com/admin/login/login
      params: data
    })
  },
  register(data = {}) {
    return POST({
      url: 'http://120.79.80.66:9011/admin/login/register', //http://www.xxx.com/admin/login/login
      params: data
    })
  },
  AdminAdd(data={}){
    return POST({
      url:'http://120.79.80.66:9011/admin/admin/add',
      params:data
    })
  },
  AdminList(data={}){
    return POST({
      url:'http://120.79.80.66:9011/admin/admin/list',
      params:data
    })
  },
  AdminProfile(data={}){
    return POST({
      url:'http://120.79.80.66:9011/admin/admin/profile',
      params:data
    })
  },
  AdminEdit(data={}){
    return POST({
      url:'http://120.79.80.66:9011/admin/admin/adminedit',
      params:data
    })
  },
  AdminDel(data={}){
    return POST({
      url:'http://120.79.80.66:9011/admin/admin/del',
      params:data
    })
  },
  AdminDelAll(data=[]){
    return POST({
      url:'http://120.79.80.66:9011/admin/admin/delAll',
      params:data
    })
  }
}


// 定义一个空的挂载对象
let Proxy = {}

//给空对象添加一个挂载的方法
Proxy.install = Vue => {
  Vue.prototype.$proxy = ProxyList
}

// 接口暴露
export default Proxy