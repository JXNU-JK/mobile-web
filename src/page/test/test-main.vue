<template>
  <div style="height: 100%;background: #f4f5f9;">
    <i-header title="测试列表" @leftClick="leftClick" @rightClick="rightClick" :isShowRight="false"></i-header>
    <mt-search
      v-model="searchName"
      style="height: auto"
      cancel-text="取消"
      placeholder="请输入测试题目">
    </mt-search>
    <div class="top-content">
      <span>精选测试</span>
      <span>查看全部</span>
    </div>
    <div class="home-page">
      <div class="list-item" @click="goTo('privity')" style="background: #5e6fe3">
        <div class="item-left-content">
          <div class="lf-content-title">默契大作战</div>
          <div class="lf-content-count">666888人已测</div>
          <div class="lf-content-btn">开始测试</div>
        </div>
        <div class="item-right-content">免费</div>
      </div>
      <div class="list-item" @click="goTo('charm')" style="background: #ec6562">
        <div class="item-left-content">
          <div class="lf-content-title">魅力值测试</div>
          <div class="lf-content-count">666888人已测</div>
          <div class="lf-content-btn">开始测试 > </div>
        </div>
        <div class="item-right-content">免费</div>
      </div>
      <div class="list-item" @click="goTo('safe')"  style="background: #f2c043">
        <div class="item-left-content">
          <div class="lf-content-title">安全感测试</div>
          <div class="lf-content-count">666888人已测</div>
          <div class="lf-content-btn">开始测试 > </div>
        </div>
        <div class="item-right-content">免费</div>
      </div>
      <div class="list-item" @click="goTo('anxiety')" style="background: #44A8f3">
        <div class="item-left-content">
          <div class="lf-content-title">焦虑测试</div>
          <div class="lf-content-count">666888人已测</div>
          <div class="lf-content-btn">开始测试 > </div>
        </div>
        <div class="item-right-content">免费</div>
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
    goTo (type) {
      local.setTestType(type)
      this.$router.push({
        name: 'question'
      })
    },
    loginOut () {

    },
    selectLanguage () {
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/_function.scss";
.home-page {
  margin-top: 20px;
  padding-top: 20px;
  background: #f4f5f9;
  padding-right: 30px;
  padding-left: 30px;
}
.list-item {
  height: 270px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.16);
}
.item-right-content {
  float: right;
  margin-top: 30px;
  margin-right: 30px;
  color: #d3ddf4;
  font-size:30px;
}
.item-left-content {
  float: left;
  margin-top: 30px;
  margin-left: 45px;
}
.lf-content-title {
  color: #fff;
  font-size: 40px;
  text-align: left;
}
.lf-content-count {
  margin-top: 25px;
  color: #d3ddf4;
  font-size: 28px;
  text-align: left;
}
.lf-content-btn {
  margin-top: 60px;
  color: #d3ddf4;
  text-align: left;
  font-size: 31px;
}
.top-content {
  margin-top: 10px;
  span:nth-child(1) {
    font-size: 30px;
    float: left;
    text-align: left;
    margin-left: 50px;
    color: #409EFF;
  }
  span:nth-child(2) {
    font-size: 25px;
    float: right;
    text-align: right;
    margin-right: 50px;
    color: #888888;
  }
}
</style>
