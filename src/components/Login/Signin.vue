<template>
  <el-form :model="SignForm" :rules="fieldRules" ref="SignForm" label-position="right" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">NJUPT-SCS-Student-Information-Inquiry-System SignIn</h3>
    <el-form-item prop="name">
      <span>Real Name: </span><el-input type="text" v-model="SignForm.name" auto-complete="off" placeholder="Name" clearable></el-input>
    </el-form-item>
    <el-form-item prop="number">
      <span>Number: </span><el-input type="text" v-model="SignForm.number" auto-complete="off" placeholder="Number" clearable></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <span>Email: </span><el-input type="text" v-model="SignForm.email" auto-complete="off" placeholder="Email" clearable></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <span>Password: </span><el-input type="password" v-model="SignForm.password" auto-complete="off" placeholder="Password" clearable></el-input>
    </el-form-item>
    <el-form-item prop="verpass">
      <span>VerifyPassword: </span><el-input type="password" v-model="SignForm.verpass" auto-complete="off" placeholder="Verify Password" clearable></el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
    <el-form-item style="width:100%;">
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
    margin: 100px auto;
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
        width:70%;
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
    name: 'Signin',
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (this.SignForm.password !== value) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        logining: false,
        SignForm: {
          number: '',
          password: '',
          name:'',
          email:'',
          verpass:'',
        },
        fieldRules: {
          number: [
            { required: true, message: 'please input number', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'please input password', trigger: 'blur' },
          ],
          verpass: [
            { required: true,validator:validatePass2, message: 'please verify password again', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'please input email', trigger: 'blur' },
          ],
          name: [
            { required: true, message: 'please input real name', trigger: 'blur' },
          ],
        },
        checked: true
      };
    },
    methods: {
      login() {
          let userInfo=this.SignForm;
//           this.$api.login(JSON.stringify(userInfo)).then((res)=> {
// // 　　　　　　　alert(res.data.token)
//             // Cookies.set('token', res.data.token) // 放置token到Cookie 
//             // sessionStorage.setItem('user', userInfo.account)
//             this.$router.push('/home')  // 注册成功，跳转到主页
//           }).catch(function(res) {
//             alert(res);
//           });
       this.$store.dispatch('Signin', userInfo)
         .then(() => {this.$router.push({ path: '/home' });
          })
          .catch((error) => {
            console.log(error.response); 
           });
           
      },
     
    }
  }

</script>