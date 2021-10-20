import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import proxy from './proxy/index'

Vue.config.productionTip = false

// 挂载代理
Vue.use(proxy)

//挂载cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 单独引用elementUI的Notification 通知组件给main.js用
import {Notification} from 'element-ui'
Vue.use(ElementUI);

// 单独引用请求服务给main.js使用
import {POST} from './services/request'

//插件的包
import PerfectScrollbar from 'perfect-scrollbar';
//对应的css
import "perfect-scrollbar/css/perfect-scrollbar.css";

const el_scrollBar = (el) => {
  //在元素上加点私货，名字随便取，确保不会和已有属性重复即可，我取名叫做_ps_
  if (el._ps_ instanceof PerfectScrollbar) {
      el._ps_.update();
  } else {
      //el上挂一份属性
      el._ps_ = new PerfectScrollbar(el, {
          // 要配什么属性自己看官网，此处不会解释任何其配置项的含义
          suppressScrollX: true,
          swipeEasing: false,
      });
  }
};

Vue.directive("scrollBar", {
  //使用inserted钩子函数（初次创建dom）获取使用自定义指令处的dom
  inserted(el, binding, vnode) {
      //判断其样式是否存在position 并且position为"fixed", "absolute"或"relative"
      //如果不符合条件，抛个错误。当然你也可以抛个警告然顺便给其position自动加上"relative"
      //为什么要这么做呢，因为PerfectScrollbar实现原理就是对dom注入两个div，一个是x轴一个是y轴，他们两的position都是absolute。
      //对css稍有常识的人都知道，absolute是相对于所有父节点里设置了position属性的最近的一个节点来定位的，为了能够正确定位，我们要给其设置position属性
      const rules = ["fixed", "absolute", "relative", "sticky"];
      if (!rules.includes(window.getComputedStyle(el, null).position)) {
          console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
      }
      //el上挂一份属性
      el_scrollBar(el);
  },
  //更新dom的时候
  componentUpdated(el, binding, vnode, oldVnode) {
      //vnode.context其实就是vue实例，这里其实无需实例也直接用Vue的静态方法
      //故而也可以写成Vue.nextTick
      vnode.context.$nextTick(
          () => {
              el_scrollBar(el);
          }
      )
  }
})
 


//给路由增加全局前置的钩子 访问前去判断用户是否有没有登录
router.beforeEach(async (to,from,next) => {
  /* 
      to 将要去的页面
      from 从哪个页面来的
      next 通行令 
  */
  // 获取auth的属性值
  var auth = to.meta.auth ? to.meta.auth : ''
  // 判断auth是否为true 如果为true就要验证，为false就直接放行
  if(auth){
    // 获取cookie值
    var login = VueCookies.get('admin') ? VueCookies.get('admin') : ''

    // 判断cookie为空的行为
    if(!login){
      // elementUI的组件
      Notification.info({
        title: '提示信息',
        message: '你未登录，请先登录'
      })
      // 让它返回到login页面
      next('/login')
      return false
    }

    // 判断login是否为js的对象
    var id = login.id ? login.id : 0
    var username = login.username ? login.username : ''
    if(!id || !username){
      // 删除Cookie值
      VueCookies.remove('admin')
      // 提示
      Notification.error({
        title: '错误信息',
        message: '非法登录凭证,请重新登录'
      })
      // 让它返回login页面
      next('/login')

      return false

    }
    // login为js的对象类型并且里面有值
    // 封装请求数据
    var data = {
      url: '/login/auth',// 请求地址
      params:{// 传参
        id:id,
        username:username
      }
    }

    // 发起请求
    // this.$proxy.auth
    var result = await POST(data)

    // 这块代码逻辑就是登陆那块的代码逻辑
    if(result.code == 1){

      var content = JSON.stringify(result.data)

      VueCookies.set('admin',content)

      next()
      return false
    }else{
     // 删除Cookie值
     VueCookies.remove('admin')
     // 提示
     Notification.error({
       title: '错误信息',
       message: '非法登录凭证,请重新登录'
     })
     // 让它返回login页面
     next('/login')

     return false
    }

    
  }else{
    // 直接放行
    next()
  }
  
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')