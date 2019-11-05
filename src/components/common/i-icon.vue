<template>
  <span @click="_click($event)" class="iconfont"
        :style="{
          'color': color,
          'fontSize': size,
          'font-family': 'iconfont',
          'margin-left': left||margin,
          'margin-right': right||margin,
          'margin-top': top||margin,
          'margin-bottom': bottom||margin,
          'padding-top': pt||padding,
          'padding-bottom': pb||padding,
          'padding-left': pl||padding,
          'padding-right': pr||padding,
          'width': width,
          'height': height
        }">{{getFontName}}</span>
</template>

<script>
  var iconItems = require('../../assets/font/icons.json')

  module.exports = {
    beforeCreate() {
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#323232'
      },
      size: {
        type: String,
        default: '40px'
      },
      padding: {
        default: '10px'
      },
      margin: {
        default: '-10px'
      },
      width: {
        default: ''
      },
      height: {
        default: ''
      },
      top: {},
      bottom: {},
      left: {},
      right: {},
      pt: {},
      pb: {},
      pl: {},
      pr: {}
    },
    computed: {
      // 匹配对应的字体图标的unicode
      getFontName: function () {
        var icon = iconItems[this.name]
        return he.decode(icon || '')
      }
    },
    methods: {
      '_click': function ($event) {
        this.$emit('onclick', $event)
      }
    }
  }
</script>
