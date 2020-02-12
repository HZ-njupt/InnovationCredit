<template>

<div class="main">
  <div class="password">
    <h2>Change Password</h2>
    <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm"  :label-position='labelposition' >
    <el-form-item label="old password" prop="oldpass">
    <el-input type="password" v-model="passwordForm.oldpass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="new password" prop="pass">
    <el-input type="password" v-model="passwordForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="new password again" prop="checkPass">
    <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm('passwordForm')">提交</el-button>
    <el-button @click="resetForm('passwordForm')">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
  <div class="placeholde"></div>
  <div class="email">
    <h2>Change Email</h2>
    <el-form :model="emailForm" status-icon :rules="Erules" ref="emailForm" :label-position='labelposition'  class="demo-ruleForm">
    <el-form-item label="current password" prop="password">
    <el-input type="password" v-model="emailForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="old email" prop="oldemail">
    <el-input type="text" v-model="emailForm.oldemail" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="new email" prop="newemail">
    <el-input type="text" v-model="emailForm.newemail" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm('emailForm')">提交</el-button>
    <el-button @click="resetForm('emailForm')">重置</el-button>
    </el-form-item>
    </el-form>
    
  </div>
   
</div>

</template>

<style lang="scss" scoped>
  .password{
    width:45%; 
    text-align: left;
    min-width: 350px;
  }
  .main{
    margin:6vh auto;
    width: 75%;
    display: flex;
    flex-direction: row;
     flex-wrap: wrap;
  }
  .email{
    width:45%;
    text-align: left;
    min-width: 350px;
  }
  .el-input__inner {
    width:80%;
  }
  .placeholde{
    width:10%;
  }
  h2{
    color: #0076d1;
  }
</style>

<style lang="scss">
.password{
    .el-input__inner {
    width:90%;
    }
}
.email{
    .el-input__inner {
    width:90%;
    }
}
</style>

<script>
export default {
    name:'personalset',
    data(){
      var validatePass0 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('old password'));
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass');
          }
          callback();
        }
      };
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('new password'));
        } else {
          if (this.passwordForm.checkPass !== '') {
            this.$refs.passwordForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('new password again'));
        } else if (value !== this.passwordForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateNewemail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('new email'));
        } else {
          callback();
        }
      };
      return {
        labelposition : 'top',
         passwordForm: {
          oldpass:'',
          pass: '',
          checkPass: '',
        },
        emailForm:{
          password:'',
          oldemail:'',
          newemail:'',
        },
        rules: {
          oldpass: [
            { validator: validatePass0, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        Erules:{
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
           newemail: [
            { validator: validateNewemail, trigger: 'blur' }
          ],
        }
    }
  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
}

</script>