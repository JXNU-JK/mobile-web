<template>
  <div class="history-wrapper">
    <i-header title="测试记录" @leftClick="leftClick" :isShowRight="false"></i-header>
    <div class="page-loadmore-wrapper">
      <div v-for="item in testList" :key="item.testId" class="history-item" @click="goToDetail(item.testId)">
        <div class="history-item-title"><span>{{item.testType | toTestType}}</span></div>
        <div class="history-flex-row">
          <span class="flex-1">{{item.testTime}}</span>
          <span class="flex-1 score-text">{{item.score}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iHeader from '@/components/common/i-header.vue'
import * as local from '@/services/localData/localStorage.js'
import * as api from '@/services/api/api.js'
import qs from 'qs'
export default {
  components: {
    iHeader
  },
  data () {
    return {
      allLoaded: false,
      testList: [],
      start: 0,
      length: 10,
      userId: ''
    }
  },
  filters: {
    toTestType (val) {
      if (val === 'privity') {
        return '默契大作战'
      } else if (val === 'charm') {
        return '魅力值测试'
      } else if (val === 'safe') {
        return '安全感测试'
      } else if (val === 'anxiety') {
        return '焦虑测试'
      } else {
        return val
      }
    }
  },
  created() {
    local.getUserInfo((res) => {
      if (res) {
        this.userId = JSON.parse(res).userId
      }
    })
    this.init()
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    },
    init () {
      this.getTestList()
    },
    getTestList() {
      let params = {
        start: this.start,
        length: this.length,
        userId: this.userId,
        action: 'getTestHistory'
      }
      this.axios.post(api.baseUrl, qs.stringify(params))
      .then((res) => {
        let data = res.data
        if (data.resultCode === 200) {
          this.testList = this.testList.concat(data.details)
          if (data.details.length < 10) {
            this.allLoaded = true
          }
        }
      })
    },
    loadTop () {
    },
    loadBottom () {
    },
    handleTopChange(status) {
    },
    handleBottomChange(status) {
    },
    goToDetail (testId) {
      this.$router.push({
        name: 'result',
        query: {
          testId: testId
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.history-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #f0f0f0;
}
.page-loadmore-wrapper {
  overflow: auto;
  height: 100%;
}
.history-item {
  margin-right: 30px;
  margin-left: 30px;
  background: #ffffff;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16);
  border-radius: 24px;
  margin-top: 30px;
  padding-bottom: 30px;
}
.history-item-title {
  color: #26a2ff;
  font-size: 40px;
  text-align: left;
  padding-top: 15px;
  padding-left: 30px;
}
.history-flex-row {
  margin-top: 15px;
  display: flex;
  margin-left: 30px;
}
.flex-1 {
  flex: 1;
  text-align: left;
  font-size: 30px;
  color: #323232;
}
.score-text {
  font-size: 60px;
  text-align: center;
  color: #26a2ff;
}
</style>
