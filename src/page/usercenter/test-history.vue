<template>
  <div>
    <i-header title="测试记录" @leftClick="leftClick" :isShowRight="false"></i-header>
    <div>
    </div>
  </div>
</template>
<script>
import iHeader from '@/components/common/i-header.vue'
export default {
  components: {
    iHeader
  },
  data () {
    return {
    }
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    }
  }
}
</script>
