<template>
  <div class="mb-upload__warpper">
    <!-- input 上传 -->
    <div class="mb-upload">
      <form ref="form" class="mb-upload-form">
        <input ref="input" @change="inputChange" class="mb-upload-btn" type="file" name="Filedata" accept="image/jpeg,image/gif,image/png,image/jpg" />
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'upload',
  props: {
    // input 上传接口
    url: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      isUploading: false // 是否正在上传
    }
  },
  methods: {
    reUpload() {
      let e = document.createEvent('HTMLEvents')
      e.initEvent('click', true, true)
      this.$refs.input.dispatchEvent(e)
      this.$refs.input.click()
    },
    // input 上传事件 start====================
    // input change事件
    inputChange() {
      // 判断是否正在上传
      if (this.isUploading) {
        return
      }
      // 判断是否是清空触发的change
      if (this.$refs.input.files.length === 0) {
        return
      }
      this.doInputUpload(this.$refs.form, this.$refs.input)
    },
    // 开始上传
    doInputUpload(form, input) {
      this.isUploading = true
      this.$emit('before', form)
      const formData = new FormData(form)
      this.axios({
        url: this.url,
        method: 'post',
        data: formData,
        withCredentials: true
      })
      .then(res => {
        this.isUploading = false
        const e = res.data
        if (e.resultCode === 200) {
          this.$emit('success', e)
        } else {
          this.$emit('error', e)
        }
        // 清空表单
        this.resetForm()
      })
      .catch(res => {
        this.isUploading = false
        this.$emit('error', res)
        this.resetForm()
      })
    },
    // 重置表单
    resetForm() {
      this.$refs.form.reset()
    },
    // input 上传事件 end=====================
  },
  mounted() {
  }
}
</script>
<style scoped>
.mb-upload__warpper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.mb-upload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.mb-upload-btn  {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
