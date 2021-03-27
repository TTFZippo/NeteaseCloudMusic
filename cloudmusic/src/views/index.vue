<!-- 网易云音乐主页 -->
<template>
  <div>
    <my-dialog></my-dialog>
  </div>
</template>

<script>
import dialog from './dialog/dialog.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    'my-dialog': dialog
  }
}

</script>

<style scoped>

</style>
