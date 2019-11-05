<template>
  <div>
    <div class="login-top">
      <div class="lg-frtit">账户登录</div>
    </div>
    <div class="lg-form">
      <div class="lg-formc">
        <div class="lg-formc-item icon-username">
          <input type="text" name="username" v-model="loginForm.username"  placeholder="请输入您的用户名">
        </div>
        <div class="lg-formc-item icon-password">
          <input name="password" v-model="loginForm.password" type="password"  placeholder="请输入您的密码" @keydown.enter="login">
        </div>
      </div>
    </div>
    <div>
      <div class="login-btn">
        <mt-button type="primary" size="large" @click="login">{{submitText}}</mt-button>
      </div>
      <div class="forgetpaw">
        <div>去注册</div>
        <div>忘记密码</div>
      </div>
      <div class="lg-third">
        <div class="lg-third-title">———————&nbsp;&nbsp;第三方登录&nbsp;&nbsp;———————</div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import * as api from '@/services/api/api.js'
import { MessageBox } from 'mint-ui'
import * as local from '@/services/localData/localStorage.js'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      isSubmiting: false
    }
  },
  computed: {
    submitText () {
      if (this.isSubmiting) {
        Indicator.open()
        return '登录中...'
      } else {
        Indicator.close()
        return '登录'
      }
    }
  },
  methods: {
    login () {
      if (this.loginForm.username === '') {
        MessageBox('提示', '请输入用户名')
        return
      }
      if (this.loginForm.password === '') {
        MessageBox('提示', '请输入密码')
        return
      }
      var params = {
        action: 'login',
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      this.isSubmiting = true
      this.axios.post(api.baseUrl, qs.stringify(params))
        .then((res) => {
          Indicator.close()
          this.isSubmiting = false
          let data = res.data
          if (Number(data.resultCode) === 200) {
            local.setLoginState(true)
            let userInfo = {
              username: this.loginForm.username,
              userId: data.msg
            }
            local.setUserInfo(userInfo)
            this.$router.push({
              name: 'home'
            })
          } else {
            MessageBox('提示', data.msg || '登录失败')
          }
        })
        .catch((res) => {
          this.isSubmiting = false
          MessageBox('提示', '登录失败')
        })
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/_function.scss";
$imgBaseurl:"../../assets/images/";
.login-btn {
  margin-top: 30px;
  margin-left:130px;
  margin-right: 130px;
}
.icon-username{
  background: imgurl("username.png") no-repeat 10px center;
}
.icon-password{
  background: imgurl("password.png") no-repeat 10px center;
}
.lg-form {
  position: relative;
  height: 200px;
}
.lg-formc {
  position: absolute;
  top: -160px;
  background: #fff;
  border-radius: 15px;
  width: 690px;
  margin-left: 30px;
  margin-right: 30px;
  height: 400px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16);
  padding-top: 20px;
}
.lg-frtit {
  width:100%;
  font-size: 50px;
  color:#fff;
  padding-top: 220px;
}
.lg-formc-item {
  margin-right: 65px;
  margin-left: 65px;
  border: 1px solid #f0f0f0;
  height:90px;
  line-height: 90px;
  margin-top: 50px;
  input {
    width: 470px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 80px;
    height: 70px;
    line-height: 70px;
    border: none;
    font-size: 30px;
  }
}
.forgetpaw{
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 50px;
  div {
    display: inline-block;
    font-size: 30px;
    color: #409EFF;
    text-align: center;
    line-height: 40px;
  }
  div:nth-child(1) {
    margin-right: 150px;
  }
  div:nth-child(2) {
    margin-left: 150px;
  }
}
.login-btn{
  width:490px;
  height: 85px;
  margin-top:30px;
}
.login-top {
  width: 100%;
  height: 500px;
  background: #409EFF;
}
.lg-third {
  margin-top: 50px;
}
.lg-third-title {
  font-size: 30px;
  color: #888888;
}
</style>
