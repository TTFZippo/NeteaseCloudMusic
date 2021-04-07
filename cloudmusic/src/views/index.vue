<!-- 主页面 -->
<template>
  <div>
    <!-- TODO: 暂时关闭登录dialog框 -->
    <!-- <my-dialog></my-dialog> -->
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '../components/navbar/navbar.vue'
import dialog from './dialog/dialog.vue'
export default {
  components: {
    'nav-bar': navbar,
    'my-dialog': dialog
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>

</style>
