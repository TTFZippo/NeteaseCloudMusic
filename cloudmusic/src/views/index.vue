<!-- 主页面 -->
<template>
  <div class="index">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '../components/navbar/navbar.vue'
export default {
  components: {
    'nav-bar': navbar
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>
.index {
  background-color: rgb(245, 245, 245);
}
</style>
