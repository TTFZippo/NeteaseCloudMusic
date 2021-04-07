<!-- 发现音乐页面 -->
<template>
  <div>
    <disc-nav></disc-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import nav from '../../components/discover/nav.vue'
export default {
  components:{
    'disc-nav': nav
  },
  data () {
    return {
    }
  }
}  

</script>

<style scoped>

</style>
