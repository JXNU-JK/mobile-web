<template>
  <div>
    <i-header title="积分" @leftClick="leftClick" :isShowRight="false"></i-header>
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
