<template>
  <div class="usercenter">
    <i-header title="个人中心" @leftClick="leftClick" @rightClick="rightClick" :isShowRight="false"></i-header>
    <div class="usercenter-top">
      <div class="usercenter-top-info">
        <img v-lazy="userInfo.avatar"/>
        <div class="usercenter-top-info-text" @click="goTo('userInfo')">
          <div>{{userInfo.nickname}}</div>
          <div>{{userInfo.intro}}</div>
        </div>
        <div class="usercenter-top-info-right">
        </div>
      </div>
    </div>
    <div class="usercenter-content">
      <div class="usercenter-content-menu">
        <div @click="goTo('testHistory')">
          <img src="@/assets/images/mI1.png" />
          <div>测试记录</div>
        </div>
        <div @click="goTo('collectHistory')">
          <img src="@/assets/images/mI2.png" />
          <div>收藏记录</div>
        </div>
        <div @click="goTo('integration')">
          <img src="@/assets/images/mI3.png" />
          <div>积分</div>
        </div>
      </div>
      <div class="usercenter-content-loginout">
        <mt-button type="primary" size="large" @click="loginOut">安全登出</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import * as api from '@/services/api/api.js'
import iHeader from '@/components/common/i-header.vue'
import * as local from '@/services/localData/localStorage.js'
import { Indicator } from 'mint-ui'
export default {
  components: {
    iHeader
  },
  data () {
    return {
      username: '',
      userId: '',
      userInfo: {
        avatar: '',
        nickname: '',
        intro: ''
      },
      imgurl: require('../../assets/images/logo.jpg')
    }
  },
  created () {
    local.getUserInfo((res) => {
      if (res) {
        this.username = JSON.parse(res).username
        this.userId = JSON.parse(res).userId
      }
    })
    this.init()
  },
  methods: {
    init () {
      this.getUserInfo()
    },
    getUserInfo () {
      let params = {
        userId : this.userId
      }
      this.axios.post(api.baseUrl + 'member/getUserInfo', qs.stringify(params))
      .then((res) => {
        let data = res.data
        if (data.resultCode === 200) {
          this.userInfo.avatar = api.imgurl + data.data.avatar || ''
          this.userInfo.nickname = data.data.nickname || ''
          this.userInfo.intro = data.data.intro || ''
        }
      })
      .catch((res) => {
        console.log(res)
      })
    },
    leftClick () {
      this.$router.go(-1)
    },
    rightClick () {
    },
    goTo (route) {
      this.$router.push({name: route})
    },
    getImgPath () {
      return this.userInfo.avatar === '' ? this.imgurl : this.userInfo.avatar
    },
    loginOut () {
      Indicator.open()
      setTimeout(() => {
        Indicator.close()
        local.removeUserInfo()
        local.setLoginState(false)
        window.location.href = '/mobile'
      }, 500)
    }
  }
}
</script>
<style scoped lang="scss">
.usercenter {
  background: #f2f2f2;
  height: 100%;
}
.usercenter-top {
  background: #26a2ff;
  height: 380px;
  width: 100%;
}
.usercenter-top-info {
  height: 200px;
  padding-top: 60px;
  padding-left: 30px;
  text-align: left;
  img {
    width: 150px;
    height: 150px;
    border-radius:50%;
  }
}
.usercenter-top-info-text {
  display: inline-block;
  vertical-align: top;
  margin-top: 30px;
  margin-left: 60px;
  margin-right: 60px;
  div:nth-child(1) {
    color: #fff;
    font-size: 35px
  }
  div:nth-child(2) {
    margin-top: 15px;
    color: #fff;
    font-size: 25px;
  }
}
.usercenter-top-info-right {
  width: 60px;
  height: 100%;
  float: right;
  margin-right: 20px;
}
.usercenter-content {
  padding-left: 30px;
  padding-right: 30px;
  width: 690px;
  position: absolute;
  top: 350px;
}
.usercenter-content-menu {
  height: 250px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16);
  width: 100%;
  border-radius: 12px;
  background: #fff;
  display: flex;
  div {
    flex: 1;
    text-align: center;
    margin-top: 55px;
    img {
      width: 80px;
      height: 80px;
    }
    div {
      margin-top: 20px;
      color: #26a2ff;
      font-size: 28px;
    }
  }
}
.usercenter-content-loginout {
  margin-top: 80px;
}
</style>
