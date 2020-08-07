<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{'current' : item.isActive}"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMneu(item)"
        >{{item.txt}}</li>
      </ul>
    </div>
    <!-- 表单开始 -->
    <div class="form-input">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item  prop="username">
        <label>邮箱</label>
        <el-input type="email" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="password" class="top">
        <label>密码</label>
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
      </el-form-item>

      <el-form-item  prop="ispassword" class="top" v-show="model === 'register'">
        <label>重复密码</label>
        <el-input type="password" v-model="ruleForm.ispassword" autocomplete="off" maxlength="20" minlength="6"></el-input>
      </el-form-item>

      <el-form-item  prop="code" class="top">
        <label>验证码</label>
        <el-row :gutter="20">
          <el-col :span="17"><div class="grid-content bg-purple"><el-input v-model.number="ruleForm.code" type="text"></el-input></div></el-col>
          <el-col :span="7"><div class="grid-content bg-purple" ></div><el-button type="success" class="block-button">获取验证码</el-button></el-col>
        </el-row>
        
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
import {stripscript,strEmail,strCode,strPassword} from 'util/validate'
export default {
  name: "login",
  data() {
    //验证码验证
    var checkcode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error("请输入验证码"));
      }else if(!strCode(value)){
        return callback(new Error("验证码格式错误"));
      }else{
        callback();
      }
    };
    //验证用户名
    var validateUsername = (rule, value, callback) => {
      //邮箱正则表达式
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(!strEmail(value)){
        callback(new Error("用户名格式有误"));
      } else{
        callback();//true
      }
      };
      //验证密码
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value)
      //value = this.releForm.password
      //密码正则
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!strPassword(value)) {
        callback(new Error("密码为6至20位的数字+字母"));
      } else {
        callback();
      }
    }
    //确认密码验证
    var validateIsPassword = (rule,value,callback) => {
      //如果当前是login页面不做验证，v-show
      if(this.model === 'login'){
        callback();
      }else if(value != this.ruleForm.password){
         callback("重复密码不正确")
      }else{
        callback();
      }
    }
    return {
      menuTab: [
        { txt: "登录", isActive: true ,trigger: 'login'},
        { txt: "注册", isActive: false, trigger: 'register'}
      ],
      //模块值
      model: 'login',
      ruleForm: {
        username: "",
        password: "",
        code: "",
        ispassword:""
      },
      rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [
            { validator: checkcode, trigger: 'blur' }
          ],
          ispassword:[
            {validator: validateIsPassword, trigger: 'blur' }
          ]
      }
    };
  },
  //初始化生命周期
  created() {},
  //挂载完成后自动执行
  mouted() {},
  methods: {
    //登录，注册切换
    toggleMneu(e) {
      console.log(e)
      this.menuTab.forEach(element => {
        element.isActive = false;
      });
      //高光
      e.isActive = true;
      //表单切换
      this.model = e.trigger
      
    },
    //表单验证
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  margin: auto;
  margin-bottom: 30px;
}
.menu-tab {
  text-align: center;
  margin: auto;
  margin-left: 100px;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.form-input{
  width: 30%;
  margin: auto;
}
.demo-ruleForm{
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    text-align: left;
  }
}
.block{
  width: 100%;
  margin-top: 30px;
}
.block-button{
  display: block;
  width: 100%;
}
.top{
  margin-top: 15px;
}
</style>