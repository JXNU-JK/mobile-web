<template>
  <div style="height: 100%;background: #f4f5f9;">
    <i-header :title="getTestTitle" @leftClick="leftClick" @rightClick="rightClick" :isShowRight="false"></i-header>
    <div class="content">
      <div class="top"></div>
      <div class="question-content">
        <div class="question">{{questionData.question}}</div>
        <div class="question-tip">选出最符合你的答案</div>
      </div>
    </div>
    <div class="select-content">
      <div class="select-item" @click="select('A')">
        <div class="select-item-content">{{questionData.selectionA}}</div>
        <div class="select-item-tag" :class="selectItem === 'A' ? 'select-item-tag-select2' : 'select-item-tag-select1'">A</div>
      </div>
      <div class="select-item" @click="select('B')">
        <div class="select-item-content">{{questionData.selectionB}}</div>
        <div class="select-item-tag" :class="selectItem === 'B' ? 'select-item-tag-select2' : 'select-item-tag-select1'">B</div>
      </div>
      <div class="select-item" @click="select('C')">
        <div class="select-item-content">{{questionData.selectionC}}</div>
        <div class="select-item-tag" :class="selectItem === 'C' ? 'select-item-tag-select2' : 'select-item-tag-select1'">C</div>
      </div>
      <div class="select-item" @click="select('D')">
        <div class="select-item-content">{{questionData.selectionD}}</div>
        <div class="select-item-tag" :class="selectItem === 'D' ? 'select-item-tag-select2' : 'select-item-tag-select1'">D</div>
      </div>
      <div class="select-item" @click="select('E')">
        <div class="select-item-content">{{questionData.selectionE}}</div>
        <div class="select-item-tag" :class="selectItem === 'E' ? 'select-item-tag-select2' : 'select-item-tag-select1'">E</div>
      </div>
    </div>
    <div class="btn-content">
      <mt-button type="primary" size="large" @click="getNext()" :disabled="selectItem === ''">{{ submitText }}</mt-button>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import * as api from '@/services/api/api.js'
import iHeader from '@/components/common/i-header.vue'
import * as local from '@/services/localData/localStorage.js'
import { Indicator, Toast } from 'mint-ui'
const Base64 = require('js-base64').Base64
export default {
  components: {
    iHeader
  },
  data () {
    return {
      testType: '',
      nowCount: 1,
      selectItem: '',
      userId: '',
      questionData: {
        question: '',
        selectionA: '',
        selectionB: '',
        selectionC: '',
        selectionD: '',
        selectionE: ''
      },
      questionList: [],
      resultList: [],
      resultScore: 0
    }
  },
  created () {
    this.init()
  },
  computed: {
    submitText () {
      if (this.nowCount === 10) {
        return '测试结果'
      } else {
        return '下一题'
      }
    },
    getTestTitle () {
      switch (this.testType) {
        case 'privity':
          return '默契大作战'
        case 'charm':
          return '魅力值测试'
        case 'safe':
          return '安全感测试'
        case 'anxiety':
          return '焦虑测试'
        default:
          return ''
      }
    }
  },
  watch: {
  },
  methods: {
    init () {
      local.getTestType((res) => {
        if (res) {
          if (res) {
            this.testType = JSON.parse(res)
          }
        }
      })
      local.getUserInfo((res) => {
      if (res) {
        this.userId = JSON.parse(res).userId
      }
    })
      this.getQuestionData()
    },
    rightClick () {

    },
    leftClick () {
      this.$router.go(-1)
    },
    getQuestionData () {
      let params = {
        action: 'getQuestion',
        type: this.testType
      }
      Indicator.open({
        spinnerType: 'fading-circle'
      })
      this.axios.post(api.baseUrl, qs.stringify(params))
      .then((res) => {
        Indicator.close()
        let data = res.data
        if (data.resultCode === 200) {
          this.questionList.push(data.data.subjectId)
          this.questionData.question = data.data.question
          this.questionData.selectionA = data.data.selectionA
          this.questionData.selectionB = data.data.selectionB
          this.questionData.selectionC = data.data.selectionC
          this.questionData.selectionD = data.data.selectionD
          this.questionData.selectionE = data.data.selectionE
        }
      })
      .catch((res) => {
        Indicator.close()
        Toast('获取失败')
      })
    },
    select (type) {
      this.selectItem = type
    },
    getNext () {
      this.resultList.push(this.selectItem)
      this.selectItem = ''
      if (this.nowCount === 10) {
        let params = {
          resultStr: this.resultList.join(','),
          questionStr: this.questionList.join(','),
          action: 'submitResult',
          userId: this.userId,
          type: this.testType
        }
        this.axios.post(api.baseUrl, qs.stringify(params))
        .then((res) => {
          let data = res.data
          if (data.resultCode === 200) {
            this.$router.push({
              name: 'result',
              query: {
                testId: data.testId
              }
            })
          }
        })
        .catch((res) => {
          console.log(res)
        })
      } else {
        this.nowCount ++
        this.getQuestionData()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    local.removeTestType()
    next()
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/_function.scss";
$imgBaseurl:"../../assets/images/";
.content {
  position: relative;
}
.top {
  width: 100%;
  height: 80px;
  background: #409EFF;
}
.question {
  margin-left: 60px;
  margin-right: 80px;
  color: #333333;
  font-size: 35px;
  text-align: left;
  margin-top: 50px;
  line-height: 60px;
}
.question-content {
  position:absolute;
  top: 0px;
  background: #fff;
  height: 300px;
  width: 690px;
  margin-right: 30px;
  margin-left: 30px;
  border-radius: 8px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16)
}
.question-tip {
  color: #888888;
  font-size: 30px;
  text-align: left;
  margin-left: 60px;
  margin-right: 80px;
  margin-top: 30px;
}
.select-content {
  margin-top: 300px;
  margin-right: 30px;
  margin-left: 30px;
  margin-bottom: 30px;
}
.select-item {
  height:125px;
  line-height: 125px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16);
  margin-top: 20px;
  padding-left: 50px;
}
.select-item-content {
  text-align: left;
  color: #666666;
  font-size: 30px;
  width: 450px;
  float: left;
  border-right: 6px solid #d2dce6;
}
.select-item-tag {
  display: inline-block;
  width: 150px;
  font-size: 90px;
}
.select-item-tag-select2 {
  color: #409EFF;
}
.select-item-tag-select1 {
  color: #e7e4f2;
}
.btn-content {
  margin-left: 30px;
  margin-right: 30px;
}
</style>
