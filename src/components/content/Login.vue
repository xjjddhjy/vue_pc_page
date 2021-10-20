<template>
  <div
    class="row lyear-wrapper"
    
  >
    <div class="lyear-login">
      <div class="login-center">
        <div class="login-header text-center">
          <a href="index.html">
            <img alt="light year admin" src="/static/images/logo-sidebar.png" />
          </a>
        </div>
        <form action="#!" method="post">
          <div class="form-group has-feedback feedback-left">
            <input
              type="text"
              placeholder="请输入您的用户名"
              class="form-control"
              name="username"
              v-model="admin.username"
              id="username"
            />
            <span
              class="mdi mdi-account form-control-feedback"
              aria-hidden="true"
            ></span>
          </div>
          <div class="form-group has-feedback feedback-left">
            <input
              type="password"
              placeholder="请输入密码"
              class="form-control"
              id="password"
              v-model="admin.password"
              name="password"
            />
            <span
              class="mdi mdi-lock form-control-feedback"
              aria-hidden="true"
            ></span>
          </div>
          <!-- <div class="form-group has-feedback feedback-left row">
            <div class="col-xs-7">
              <input
                type="text"
                name="captcha"
                class="form-control"
                placeholder="验证码"
              />
              <span
                class="mdi mdi-check-all form-control-feedback"
                aria-hidden="true"
              ></span>
            </div>
            <div class="col-xs-5">
              <img
                src="images/captcha.png"
                class="pull-right"
                id="captcha"
                style="cursor: pointer"
                onclick="this.src=this.src+'?d='+Math.random();"
                title="点击刷新"
                alt="captcha"
              />
            </div>
          </div> -->
          <div class="form-group">
            <label class="lyear-checkbox checkbox-primary m-t-10 text-white">
              <input type="checkbox" /><span>5天内自动登录</span>
            </label>
          </div>
          <div class="form-group">
            <button
              class="btn btn-block btn-primary"
              type="button"
              @click="login()"
            >
              立即登录
            </button>
          </div>
            <div style="text-align:center">
            <a  href="./register">去注册</a>
         </div>
        
        </form>
        <footer class="col-sm-12 text-center text-white">
          <p class="m-b-0">
            Copyright © 2020 <a href="http://lyear.itshubao.com">IT书包</a>. All
            right reserved
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      admin:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    async login(){
      // console.log(this.admin);
      // var that = this;
      if(this.admin.username ==''){
        this.error('用户名不能为空')
        return false
      }
      if(this.admin.password ==''){
        this.error('密码不能为空')
        return false
      }
      var result = await this.$proxy.login(this.admin)
      if(result.code == 1){
        // 提示信息
        this.success(result.msg)
        // js的对象转化JSON的字符串
        var content = JSON.stringify(result.data);
        
        // 存储到cookie
        this.$cookies.set('admin',content)
        // 定时1秒后跳首页
        setTimeout(() => {
          this.$router.push('/')
        }, 1000);
      }else{
        this.error(result.msg)
      }
    },
    async success(msg) {
      this.$notify({
        title: '成功',
        message: msg,
        type: 'success'
      });
    },
    async error(msg) {
      this.$notify.error({
        title: '错误',
        message: msg
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lyear-wrapper {
  position: relative;
}
.lyear-login {
  display: flex !important;
  min-height: 100vh;
  align-items: center !important;
  justify-content: center !important;
  background: #222222;
}
.lyear-login:after {
  content: "";
  min-height: inherit;
  font-size: 0;
}
.login-center {
  background-color: rgba(255, 255, 255, 0.075);
  min-width: 29.25rem;
  padding: 2.14286em 3.57143em;
  border-radius: 3px;
  margin: 2.85714em;
}
.login-header {
  margin-bottom: 1.5rem !important;
}
.login-center .has-feedback.feedback-left .form-control {
  padding-left: 38px;
  padding-right: 12px;
  background-color: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.075);
}
.login-center .has-feedback.feedback-left .form-control-feedback {
  left: 0;
  right: auto;
  width: 38px;
  height: 38px;
  line-height: 38px;
  z-index: 4;
  color: #dcdcdc;
}
.login-center .has-feedback.feedback-left.row .form-control-feedback {
  left: 15px;
}
.login-center .form-control::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.login-center .form-control:-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.login-center .form-control::-moz-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.login-center .form-control:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.login-center .custom-control-label::before {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 0, 0, 0.1);
}
.login-center .lyear-checkbox span::before {
  border-color: rgba(255, 255, 255, 0.075);
}
</style>
