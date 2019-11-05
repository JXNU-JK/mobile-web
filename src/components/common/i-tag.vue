<template>
  <span class="content-tag" @click="clickTag">{{title}}</span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    clickTag () {
      this.$emit('clickTag')
    }
  }
}
</script>

<style scoped lang="scss">
.content-tag {
  height: 40px;
  line-height: 40px;
  border-radius: 8px;
  border: 3px solid #ffc1a6;
  background: #f9e4e1;
  color: #ffc1a6;
  text-align: center;
  width:auto;
  display: inline-block;
  font-size: 25px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  margin-right: 10px;
}
</style>
