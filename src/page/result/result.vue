<template>
  <div style="height: 100%;background: #f4f5f9;">
    <i-header title="测试结果" @leftClick="leftClick" @rightClick="rightClick" :isShowRight="false"></i-header>
    <div class="top"></div>
    <div class="content">
      <div class="content-header">
        <img src="../../assets/images/logo.jpg"/>
        <div class="content-header-right">
          <div class="content-header-right-top">
            <div></div>
            <div>{{username}}</div>
            <div style="cleat: both"></div>
          </div>
          <div class="tag-content">
            <i-tag :title="item.tagName" v-for="item in resultData.tagList" :key="item.tagName"></i-tag>
          </div>
        </div>
      </div>
      <div class="content-layout-data">
        <div class="content-layout-data-item">
          <div class="content-layout-data-item-tp">外向</div>
          <div></div>
          <div class="content-layout-data-item-dn">内向</div>
        </div>
        <div class="content-layout-empty-item">
          <div class="content-layout-empty-tp">  </div>
          <div></div>
          <div class="content-layout-empty-dn">  </div>
        </div>
        <div class="content-layout-data-item">
          <div class="content-layout-data-item-tp">追求</div>
          <div></div>
          <div class="content-layout-data-item-dn">知足</div>
        </div>
        <div class="content-layout-empty-item">
          <div class="content-layout-empty-tp">  </div>
          <div></div>
          <div class="content-layout-empty-dn">  </div>
        </div>
        <div class="content-layout-data-item">
          <div class="content-layout-data-item-tp">自主</div>
          <div></div>
          <div class="content-layout-data-item-dn">通融</div>
        </div>
        <div class="content-layout-empty-item">
          <div class="content-layout-empty-tp">  </div>
          <div></div>
          <div class="content-layout-empty-dn">  </div>
        </div>
        <div class="content-layout-data-item">
          <div class="content-layout-data-item-tp">亲密</div>
          <div></div>
          <div class="content-layout-data-item-dn">独立</div>
        </div>
        <div class="content-layout-empty-item">
          <div class="content-layout-empty-tp">  </div>
          <div></div>
          <div class="content-layout-empty-dn">  </div>
        </div>
        <div class="content-layout-data-item">
          <div class="content-layout-data-item-tp">随性</div>
          <div></div>
          <div class="content-layout-data-item-dn">计划</div>
        </div>
        <div class="content-layout-empty-item">
          <div class="content-layout-empty-tp">  </div>
          <div></div>
          <div class="content-layout-empty-dn">  </div>
        </div>
        <div class="content-layout-data-item">
          <div class="content-layout-data-item-tp">融入</div>
          <div></div>
          <div class="content-layout-data-item-dn">独处</div>
        </div>
      </div>
      <div class="content-layout-word">
        <div class="content-layout-word-item">
          <div></div>
          <div><span v-if="isShowOther && resultData.resultList[1]">1.</span>{{resultData.resultList[0].resultText}}</div>
          <div style="clear: both;"></div>
        </div>
        <div class="content-layout-word-other-item" :key="index" v-for="(item, index) in resultData.resultList" v-if="index !== 0 && isShowOther">
          <div></div>
          <div><span>{{index + 1}}.</span>{{item.resultText}}</div>
          <div style="clear: both;"></div>
        </div>
        <div class="content-layout-word-more" @click="isShowOther = !isShowOther">{{looMoreText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import iHeader from '@/components/common/i-header.vue'
import iTag from '@/components/common/i-tag.vue'
import * as local from '@/services/localData/localStorage.js'
import * as utils from '@/utils/dataUtils.js'
const Base64 = require('js-base64').Base64
export default {
  components: {
    iHeader,
    iTag
  },
  data () {
    return {
      username: '',
      resultScore: '',
      testType: '',
      resultData: {
        resultList: [],
        tagList: []
      },
      isShowOther: false,
      userId: ''
    }
  },
  created () {
    local.getUserInfo((res) => {
      if (res) {
        this.username = JSON.parse(res).username
        this.userId = JSON.parse(res).userId
      }
    })
    let detail = JSON.parse(Base64.decode(this.$route.query.detail))
    this.resultScore = detail.resultScore
    this.testType = detail.type
    this.resultData = Object.assign({}, utils.getResultData(this.testType, this.resultScore))
  },
  computed: {
    looMoreText () {
      if (this.isShowOther) {
        return '收起其他测试结果'
      } else {
        return '查看更多测试结果'
      }
    }
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    },
    rightClick () {

    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/_function.scss";
$imgBaseurl:"../../assets/images/";
.top {
  width: 100%;
  height: 160px;
  background: #26a2ff;
}
.content {
  width: 690px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.16);
  margin-left: 30px;
  margin-right: 30px;
  position: absolute;
  top: 110px;
}
.content-header {
  margin-top: 30px;
  text-align: left;
  margin-left: 30px;
  margin-right: 30px;
  height: 260px;
  border-bottom: 1px solid #dddddd;
  img {
    width: 160px;
    height: 160px;
    border-radius: 12px;
    border: 1px solid #dddddd;
  }
}
.content-header-right {
  display: inline-block;
  vertical-align: top;
  margin-left: 30px;
  margin-top: 30px;
}
.content-header-right-top {
  height: 50px;
  line-height: 50px;
  div {
    float: left;
  }
  div:nth-child(1) {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 30px;
    width: 5px;
    background: #26a2ff;
  }
  div:nth-child(2) {
    font-size: 30px;
    margin-left: 35px;
    font-weight: 600;
  }
}
.tag-content {
  margin-top: 20px;
}
.content-layout-data {
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 40px;
  padding-bottom: 40px;
  display: table;
  border-bottom: 1px solid #dddddd;
}
.content-layout-empty-item {
  float: left;
  width: 57px;
  div:nth-child(2) {
    height: 250px;
  }
}
.content-layout-data-item {
  float: left;
  flex: 1;
  width: 57px;
  div:nth-child(2) {
    height: 250px;
    background: #f4f4fe;
  }
  div:nth-child(1), div:nth-child(3) {
    color: #888888;
    font-size: 25px;
  }
  div:nth-child(1) {
    margin-bottom: 10px;
  }
  div:nth-child(3) {
    margin-top: 10px;
  }
}
.content-layout-word {
  text-align: left;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.content-layout-word-more {
  color: #26a2ff;
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.content-layout-word-item {
  div:nth-child(1) {
    margin-top: 8px;
    margin-bottom: 10px;
    height: 30px;
    width: 5px;
    background: #26a2ff;
    float: left;
  }
  div:nth-child(2) {
    margin-left: 20px;
    line-height: 45px;
    color: #888888;
  }
}
.content-layout-word-other-item {
  margin-top: 20px;
  div:nth-child(1) {
    margin-top: 8px;
    margin-bottom: 10px;
    height: 30px;
    width: 5px;
    float: left;
  }
  div:nth-child(2) {
    margin-left: 20px;
    line-height: 45px;
    color: #888888;
  }
}
</style>
