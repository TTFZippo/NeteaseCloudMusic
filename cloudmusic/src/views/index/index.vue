<!-- 网易云音乐主页 -->
<template>
  <div>
    <!-- TODO:开发主页，暂时关闭对话框 -->
    <!-- <my-dialog></my-dialog> -->
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import dialog from '../dialog/dialog.vue'
import navbar from '../../components/navbar/navbar.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    'my-dialog': dialog,
    'nav-bar': navbar
  }
}  

</script>

<style scoped>

</style>
