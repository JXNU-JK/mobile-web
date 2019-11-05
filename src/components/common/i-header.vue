<template>
  <div class="header-item">
    <mt-header fixed :title="title" class="header-item">
      <mt-button icon="back" slot="left" @click="_leftClick" v-if="isShowLeft"></mt-button>
      <mt-button icon="more" slot="right" @click="_rightClick" v-if="isShowRight"></mt-button>
    </mt-header>
  </div>
</template>

<style scoped>
.header-item {
  height: 88px;
}
</style>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isShowLeft: {
      type: Boolean,
      default: true
    },
    isShowRight: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    _leftClick: function ($event) {
      this.$emit('leftClick', $event)
    },
    _rightClick: function ($event) {
      this.$emit('rightClick', $event)
    }
  }
}
</script>
<style scoped>
.header-item {
  z-index: 101;
}
</style>
