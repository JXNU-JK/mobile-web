<template>
  <div style="height: 100%;background: #f4f5f9;">
    <i-header title="首页" @leftClick="leftClick" @rightClick="rightClick" :isShowLeft="false" :isShowRight="false"></i-header>
    <div class="content-top">欢迎进入</div>
    <div class="content-midden">
      <div class="content-item" @click="goTo('testMain')">
        <img src="../../assets/images/menuIcon4.png"/>
        <div class="content-item-title">
          <div>进入测试</div>
          <div>更快更方便，省时省力</div>
        </div>
      </div>
      <div class="content-item mgtp" @click="goTo('joke')">
        <img src="../../assets/images/menuIcon7.png"/>
        <div class="content-item-title">
          <div>每日幽默</div>
          <div>更快更方便，省时省力</div>
        </div>
      </div>
      <div class="content-item mgtp" @click="goTo('userCenter')">
        <img src="../../assets/images/menuIcon5.png"/>
        <div class="content-item-title">
          <div>个人中心</div>
          <div>更快更方便，省时省力</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iHeader from '@/components/common/i-header.vue'
import * as local from '@/services/localData/localStorage.js'
export default {
  components: {
    iHeader
  },
  data () {
    return {
      leftItem: {
        icon: 'icon-angle-left',
        iconSize: '34px'
      },
      searchName: ''
    }
  },
  methods: {
    leftClick () {
      this.returnBack()
    },
    rightClick () {
    },
    returnBack () {
      this.$router.go(-1)
    },
    goTo (route) {
      this.$router.push({
        name: route
      })
    },
    selectLanguage () {
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/_function.scss";
.content-top {
  width: 100%;
  height: 300px;
  line-height: 300px;
  text-align: center;
  color: #fff;
  font-size: 40px;
  background: #26a2ff;
}
.content-midden {
  top: 300px;
  width: 690px;
  padding-left: 30px;
  padding-right: 30px;
  position: absolute;
}
.content-item {
  height: 180px;
  text-align: left;
  background: #fff;
  border-radius: 12px;
  padding-left: 60px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16);
  img {
    width: 100px;
    height: 100px;
    margin-top: 40px;
  }
}
.content-item-title {
  display: inline-block;
  height: 100%;
  margin-left: 60px;
  vertical-align: middle;
  div:nth-child(1) {
    color: #333333;
    font-size: 30px;
    line-height: 50px;
  }
  div:nth-child(2) {
    color: #888888;
    font-size: 20px;
    line-height: 50px;
  }
}
.mgtp {
  margin-top: 20px;
}
</style>
