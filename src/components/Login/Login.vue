<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">NJUPT-SCS-Student-Information-Inquiry-System</h3>
    <el-form-item prop="account">
      <span>Number: </span><el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="Number"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <span>Password: </span><el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click="signin()">Sign in</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="logining">Log in</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .el-input{
      width: 70%;
    }
    .el-form-item{
        span{
            width: 30%;
            display: inline-block;
        }
    }
  }
</style>

<script>
  import mock from '@/mock/index.js';
  import Cookies from "js-cookie";
  import router from '@/router'
  export default {
    name: 'Login',
    data() {
      return {
        logining: false,
        loginForm: {
          account: '',
          password: ''
        },
        fieldRules: {
          account: [
            { required: true, message: 'please input number', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'please input password', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      login() {
          let userInfo={'account':this.loginForm.account, 'password':this.loginForm.password}
//           this.$api.login(JSON.stringify(userInfo)).then((res)=> {
// 　　　　　　　alert(res.data.token)
//             Cookies.set('token', res.data.token) // 放置token到Cookie 
//             sessionStorage.setItem('user', userInfo.account)
//             this.$router.push('/home')  // 登录成功，跳转到主页
//           }).catch(function(res) {
//             alert(res);
//           });
          this.$store.dispatch('Login', userInfo)
          .then(() => {this.$router.push({ path: '/home' });
          })
          .catch((error) => {
            console.log(error.response); 
           });
          
      },
      reset(){
          this.$refs.loginForm.resetFields();
      },
      signin(){
        this.$router.push('/sign')
      }
    }
  }

</script>