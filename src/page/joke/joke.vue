<template>
  <div class="joke-page">
    <i-header title="幽默笑话" @leftClick="leftClick" @rightClick="rightClick" :isShowRight="false"></i-header>
    <div class="joke-list">
      <div class="joke-item" v-for="(item, index) in jokeList" :key="index">
        <div class="joke-item-text">{{item.content | toWrapSpace}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import iHeader from '@/components/common/i-header.vue'
import * as api from '@/services/api/api.js'
import qs from 'qs'
export default {
  components: {
    iHeader
  },
  data () {
    return {
      jokeList: []
    }
  },
  filters: {
    toWrapSpace (val) {
      return val.replace("\\n", " \n ")
    }
  },
  created () {
    this.init()
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    },
    rightClick () {

    },
    init () {
      this.getJokeList()
    },
    getJokeList () {
      let params = {
        action: 'getJokeList'
      }
      this.axios.post(api.baseUrl, qs.stringify(params))
      .then((res) => {
        let data = res.data
        if (data.resultCode === 200) {
          this.jokeList = data.detail
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.joke-page {
  background: #f0f0f0;
  height: 100%;
  overflow-y: auto;
}
.joke-list {
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}
.joke-item {
  background: #ffffff;
  padding: 20px;
  margin-top: 30px;
  border-radius: 24px;
  text-align: left;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16);
}
.joke-item-text {
  text-align: left;
  color: #323232;
  font-size: 26px;
  line-height: 40px;
}
</style>
