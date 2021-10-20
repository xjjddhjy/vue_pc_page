<template>
  <div class="lyear-layout-web">
    <div class="lyear-layout-container">
      <!--页面主要内容-->
      <main class="lyear-layout-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="80px"
                    label-position="top"
                  >
                    <el-form-item label="用户名" prop="username">
                      <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                      <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="repass">
                      <el-input type="password" placeholder="请输入确认密码" v-model="ruleForm.repass"></el-input>
                    </el-form-item>

                    <!-- 
                      action 图片上传的地址
                      name  字段名 给后台用来接收图片的
                      默认自动
                    -->
                    <el-form-item label="用户头像">
                      <el-upload
                        class="avatar-uploader"
                        action="http://120.79.80.66:9011/admin/admin/upload"
                        v-model="ruleForm.avatar"
                        name="avatar"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onAdd()"
                        >添加</el-button
                      >
                      <el-button @click="back">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <!--End 页面主要内容-->
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminAdd",
  data() {
    var checkPass = (rule, value, callback) =>{
      if(value != this.ruleForm.password){
        callback(new Error('密码与确认密码不一致'))
      }else{
        callback()
      }
    }
    return {
      ruleForm: {
        username:'',
        password:'',
        repass:'',
        avatar:''
      },
      rules: {
        username:[
          {required: true, message: '请输入用户名', trigger: 'blur' },
          {min:3,max:5,message:'用户名的长度必须是3到5个字符',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:18,message:'密码的长度必须是6到18个字符',trigger:'blur'}
        ],
        repass:[
          {required:true,message:'请输入确认密码',trigger:'blur'},
          {validator:checkPass,trigger:'change'}
        ]
      },
      imageUrl:''
    };
  },
  methods: {
    async onAdd() {
      var that = this
      
      if(this.ruleForm.avatar == ''){
        this.info('图片未上传')
        return false
      }
      
      this.$refs.ruleForm.validate(async (valid) => {
          if (!valid) {
              this.error('表单验证未通过，请填写')
              return false;
          }
          var result = await that.$proxy.AdminAdd(this.ruleForm)
          if(result.code == 1){
            that.success(result.msg)

            setTimeout(() => {
              that.$router.push('/adminlist')
            }, 1000);

          }else{
            that.error(result.msg)
          }
      });
    },
    // 点击取消后返回到列表页
    back(){
      this.$router.back(-1)
    },
    async success(msg) {
      this.$notify({
        title: "成功",
        message: msg,
        type: "success",
      });
    },
    async info(msg) {
      this.$notify.info({
        title: "提示",
        message: msg,
      });
    },
    async error(msg) {
      this.$notify.error({
        title: "错误",
        message: msg,
      });
    },
    async handleAvatarSuccess(res, file) {
        // console.log(res); // 获取返回的所有数据
        if(res.code == 1){// 判断res.code == 1 的 行为
          this.success(res.msg)
          // 把返回的图片名称赋值表单的avatar
          // this.ruleForm.avatar = res
          this.ruleForm.avatar = res.data
        }else{
          this.error(res.error)
          return false
        }
        // 当图片上传成功回调显示上传的图片
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // 图片格式变成一个数组
      const typeArr = ['image/png', 'image/jpeg', 'image/jpg'];
      // 判断图片类型
      const isJPG = typeArr.indexOf(file.type) !== -1;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload__input {
    display: none !important;
}
/* 上传框的加号垂直居中 */
.el-icon-plus:before{
  line-height: 178px;
}
/* input输入框的宽度 */
.el-input,.el-input__inner{
  width: 60% !important;
}
</style>
