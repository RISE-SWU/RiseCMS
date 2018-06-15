<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
 
export default {
    name: 'App',
    data() {
        return {
          
        }
    },
}
</script>

<style lang="scss">
  * {
    margin: 0;
  }
  body {
    background-color: #F1F1F1;
  }
  h3 {
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .el-checkbox__inner {
     z-index: 0;
  }
</style>
