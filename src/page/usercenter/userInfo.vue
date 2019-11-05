<template>
  <div class="userinfo">
    <i-header title="个人资料" @leftClick="leftClick" @rightClick="rightClick" :isShowRight="false"></i-header>
    <div class="userinfo-content">
      <div class="userinfo-content-avatar">
        <span>头像</span>
        <div class="userinfo-content-avatar-right">
          <div class="register-form-right">
            <div class="register-upload-box">
              <div class="img-box bg-bank">
                <img v-lazy="userInfo.avatar" alt="">
                  <upload
                    :url="uploadUrl"
                    @before="avatarBefore"
                    @success="avatarSuccess"
                    @error="avatarError"
                  >
                  </upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="userinfo-content-nickname">
        <span>昵称</span>
        <div class="userinfo-content-nickname-right" @click="changeUserInfo('nickname')">
          <span v-if="userInfo.nickname !== ''">{{userInfo.nickname}}</span>
          <span v-if="userInfo.nickname === ''">未填写</span>
        </div>
      </div>
      <div class="userinfo-content-sex">
        <span>性别</span>
        <div class="userinfo-content-sex-right">
          <span v-if="userInfo.sex !== ''">{{userInfo.sex}}</span>
          <span v-if="userInfo.sex === ''">未知</span>
        </div>
      </div>
      <div class="userinfo-content-brithday">
        <span>出生日期</span>
        <div class="userinfo-content-brithday-right" @click="changeBirthday">
          <span v-if="userInfo.birthday !== ''">{{userInfo.birthday}}</span>
          <span v-if="userInfo.birthday === ''">未填写</span>
        </div>
      </div>
      <div class="userinfo-content-worker">
        <span>职业</span>
        <div class="userinfo-content-worker-right">
          <span v-if="userInfo.profession !== ''">{{userInfo.profession}}</span>
          <span v-if="userInfo.profession === ''">未填写</span>
        </div>
      </div>
      <div class="userinfo-content-qq">
        <span>QQ</span>
        <div class="userinfo-content-qq-right" @click="operationQQ(userInfo.qq === '')">
          <div v-if="userInfo.qq !== ''">{{userInfo.qq}}</div>
          <span v-if="userInfo.qq === ''">绑定</span>
        </div>
      </div>
      <div class="userinfo-content-wechat">
        <span>微信</span>
        <div class="userinfo-content-wechat-right" @click="operationWX(userInfo.wx === '')">
          <div v-if="userInfo.wx !== ''">{{userInfo.wx}}</div>
          <span v-if="userInfo.wx === ''">绑定</span>
        </div>
      </div>
    </div>
    <mt-actionsheet
      :actions="actionList"
      v-model="sheetVisible">
    </mt-actionsheet>
    <div class="pickerPop" @touchmove.prevent>
      <!-- 年月日选择 -->
      <mt-datetime-picker
        lockScroll="true"
        ref="picker"
        v-model="dateVal"
        type="date"
        :startDate="new Date('1940-01-01')"
        :endDate="new Date()"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        @confirm="dateConfirm()">
      </mt-datetime-picker>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import * as api from '@/services/api/api.js'
import iHeader from '@/components/common/i-header.vue'
import * as local from '@/services/localData/localStorage.js'
import { MessageBox, Toast } from 'mint-ui';
import { formatDate } from '@/utils/dateUtils.js'
import upload from '@/components/upload/upload.vue'
export default {
  components: {
    iHeader,
    upload
  },
  data () {
    return {
      userId: '',
      userInfo: {
        avatar: '',
        intro: '',
        sex: '',
        nickname: '',
        birthday: '',
        profession: '',
        qq: '',
        wx: ''
      },
      dateVal: '',
      operationType: '',
      sheetVisible: false,
      actionList: [{
        name: '更改绑定',
        method : this.changeBind
      }, {
        name: '取消绑定', 
        method : this.cancelBind
      }],
      uploadUrl: ''
    }
  },
  created () {
    local.getUserInfo((res) => {
      if (res) {
        this.userId = JSON.parse(res).userId
        this.uploadUrl = '/api/joke/services/joke?action=upLoad&userId=' + this.userId
      }
    })
    this.init()
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    },
    rightClick () {

    },
    init () {
      this.getUserInfo()
    },
    getUserInfo() {
      let params = {
        action: 'getUserInfo',
        userId : this.userId
      }
      this.axios.post(api.baseUrl, qs.stringify(params))
      .then((res) => {
        let data = res.data
        if (data.resultCode === 200) {
          this.userInfo.avatar = api.imgurl + data.data.avatar || ''
          this.userInfo.nickname = data.data.nickname || ''
          this.userInfo.intro = data.data.intro || ''
          this.userInfo.sex = data.data.sex || ''
          this.userInfo.birthday = data.data.birthday || ''
          this.userInfo.profession = data.data.profession || ''
          this.userInfo.qq = data.data.qq || ''
          this.userInfo.wx = data.data.wx || ''
        }
      })
      .catch((res) => {
        console.log(res)
      })
    },
    changeUserInfo (type) {
      let tip = ''
      if (type === 'nickname') {
        tip = '输入昵称'
      } else if (type === 'qq') {
        tip = '输入需要绑定的QQ号'
      } else if (type === 'wx') {
        tip = '输入要绑定的微信'
      }
      MessageBox.prompt(tip).then(({ value, action }) => {
        if (value === '') {
          return
        }
        let params = {
          userId: this.userId,
          type: type,
          value: value,
          action: 'changeUserInfo'
        }
        this.axios.post(api.baseUrl, qs.stringify(params))
        .then((res) => {
          let data = res.data
          if (data.resultCode === 200) {
            Toast('更新成功');
            this.getUserInfo()
          } else {
            Toast('更新失败');
          }
        })
        .catch((res) => {
          console.log(res)
          Toast('更新失败');
        })
      });
    },
    operationQQ (flag) {
      if (flag) {
        this.changeUserInfo('qq')
      } else {
        this.operationType = 'qq'
        this.sheetVisible = true
      }
    },
    operationWX (flag) {
      if (flag) {
        this.changeUserInfo('wx')
      } else {
        this.operationType = 'wx'
        this.sheetVisible = true
      }
    },
    changeBind () {
      this.changeUserInfo(this.operationType)
    },
    cancelBind () {
      let params = {
        userId: this.userId,
        type: this.operationType,
        value: '',
        action: 'changeUserInfo'
      }
      this.axios.post(api.baseUrl, qs.stringify(params))
      .then((res) => {
        let data = res.data
        if (data.resultCode === 200) {
          Toast('取消绑定成功');
          this.getUserInfo()
        } else {
          Toast('取消绑定失败');
        }
      })
      .catch((res) => {
        console.log(res)
        Toast('取消绑定失败');
      })
    },
    changeBirthday () {
      if (this.userInfo.birthday !== '') {
        this.dateVal = new Date(this.userInfo.birthday)
      } else {
        this.dateVal = new Date('2000-08-08')
      }
      this.$refs.picker.open();
    },
    dateConfirm () {
      let params = {
        userId: this.userId,
        type: 'birthday',
        value: formatDate(this.dateVal),
        action: 'changeUserInfo'
      }
      this.axios.post(api.baseUrl, qs.stringify(params))
      .then((res) => {
        let data = res.data
        if (data.resultCode === 200) {
          Toast('更新成功');
          this.getUserInfo()
        } else {
          Toast('更新失败');
        }
      })
      .catch((res) => {
        console.log(res)
        Toast('更新失败');
      })
    },
    avatarBefore () {

    },
    avatarSuccess () {
      Toast('上传成功')
      this.getUserInfo()
    },
    avatarError () {
      Toast('上传失败')
    }
  }
}
</script>
<style lang="scss" scoped>
.userinfo {
  height: 100%;
  background: #f0f0f0;
  &-content {
    margin-top: 20px;
    &-avatar {
      height: 150px;
      background: #fff;
      text-align: left;
      padding-right: 40px;
      padding-left: 40px;
      line-height: 150px;
      span {
        font-size: 30px;
        color: #888888;
      }
      &-right {
        float: right;
        height: 150px;
        line-height: 150px;
        img {
          width: 90px;
          height: 90px;
          margin-top: 30px;
          margin-bottom: 30px;
          border-radius: 50%;
        }
      }
    }
    &-nickname {
      margin-top: 5px;
      height: 100px;
      padding-left: 40px;
      padding-right: 40px;
      background: #fff;
      text-align: left;
      line-height: 100px;
      span {
        font-size: 30px;
        color: #888888;
      }
      &-right {
        float: right;
      }
    }
    &-sex {
      margin-top: 5px;
      height: 100px;
      padding-left: 40px;
      padding-right: 40px;
      background: #fff;
      text-align: left;
      line-height: 100px;
      span {
        font-size: 30px;
        color: #888888;
      }
      &-right {
        float: right;
      }
    }
    &-brithday {
      margin-top: 5px;
      height: 100px;
      background: #fff;
      padding-left: 40px;
      padding-right: 40px;
      text-align: left;
      line-height: 100px;
      span {
        font-size: 30px;
        color: #888888;
      }
      &-right {
        float: right;
      }
    }
    &-worker {
      margin-top: 40px;
      height: 100px;
      background: #fff;
      padding-left: 40px;
      padding-right: 40px;
      text-align: left;
      line-height: 100px;
      span {
        font-size: 30px;
        color: #888888;
      }
      &-right {
        float: right;
      }
    }
    &-qq {
      margin-top: 40px;
      height: 130px;
      background: #fff;
      padding-left: 40px;
      padding-right: 40px;
      text-align: left;
      line-height: 130px;
      span {
        font-size: 30px;
        color: #888888;
      }
      &-right {
        float: right;
        span {
          display: inline-block;
          height: 60px;
          width: 110px;
          margin-top: 35px;
          border-radius: 35px;
          line-height: 60px;
          color: #fff;
          text-align: center;
          margin-bottom: 35px;
          background: #409EFF;
        }
        div {
          display: inline-block;
          height: 60px;
          border-radius: 35px;
          color: #409EFF;
          text-align: center;
          line-height: 60px;
          margin-top: 35px;
          margin-bottom: 35px;
        }
      }
    }
    &-wechat {
      margin-top: 5px;
      height: 130px;
      background: #fff;
      text-align: left;
      padding-right: 40px;
      padding-left: 40px;
      line-height: 130px;
      span {
        font-size: 30px;
        color: #888888;
      }
      &-right {
        float: right;
        span {
          display: inline-block;
          height: 60px;
          border-radius: 35px;
          color: #fff;
          text-align: center;
          line-height: 60px;
          margin-top: 35px;
          width: 110px;
          margin-bottom: 35px;
          background: #409EFF;
        }
        div {
          display: inline-block;
          height: 60px;
          border-radius: 35px;
          color: #409EFF;
          text-align: center;
          line-height: 60px;
          margin-top: 35px;
          margin-bottom: 35px;
        }
      }
    }
  }
}
</style>
