<!-- 主页面 -->
<template>
  <div class="index">
    <nav-bar></nav-bar>
    <my-dialog></my-dialog>
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
