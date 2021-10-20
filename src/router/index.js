// 引用vue
import Vue from 'vue'

// 引用路由
import Router from 'vue-router'

// 引用组件
import Home from "@/components/content/Home"
import Login from "@/components/content/Login"
import Register from "@/components/content/Register"
import Adminlist from "@/components/content/AdminList"
import Adminadd from "@/components/content/AdminAdd"
import Adminedit from "@/components/content/AdminEdit"


// 挂载
Vue.use(Router)





// 创建一个路由对象

export default new Router({
    mode: 'history', //使用js bom对象中history模式  并且不会有 /#
    
    routes:[
      //跟路由
      {
        path:'/', //传参选项 query
        redirect:'/home',
        component: Home,
      },
      // 登录路由
      {
        path:'/login',
        name:'login',
        component:Login,
        meta:{
          // 不加载公共组件
          index:0
        }
      },
      {
        path:'/home',
        name:'home',
        component:Home,
        meta:{
          // 加载公共组件
          index:1
        }
      },
      {
        path:'/adminlist',
        name:'adminlist',
        component:Adminlist,
        meta:{
          // 加载公共组件
          index:1
        }
      },
      {
        path:'/adminadd',
        name:'adminadd',
        component:Adminadd,
        meta:{
          // 加载公共组件
          index:1
        }
      },
      {
        path:'/adminedit',
        name:'adminedit',
        component:Adminedit,
        meta:{
          // 加载公共组件
          index:1
        }
      },
      {
        path:'/register',
        name:'register',
        component:Register,
        meta:{
          // 加载公共组件
          index:0
        }
      }
    ]
  })
   
  // const originalPush = Router.prototype.push

  // Router.prototype.push = function push(location, onResolve, onReject) {
  
  // if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  
  // return originalPush.call(this, location).catch(err => err)
  
  // }