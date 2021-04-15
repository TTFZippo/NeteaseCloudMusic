<!-- 排行榜的主内容 -->
<template>
  <div class="wrapper">
    <playlist-header :currentListData="currentListData"></playlist-header>
  </div>
</template>

<script>
import playlistHeader from '../../../../../components/playlistHeader.vue'
export default {
  props: {
    currentListData: {
      type: Object
    }
  },
  created () {
  },
  components: {
    'playlist-header': playlistHeader
  },
  data () {
    return {
    }
  },
  computed: {
    
  },
  watch: {
  }
}

</script>

<style scoped>
.wrapper {
  /* padding: 20px; */
}
</style>
