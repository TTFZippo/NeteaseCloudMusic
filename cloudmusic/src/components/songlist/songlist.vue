<!-- 歌曲表 -->
<template>
<div class="songlist-wrapper">
  <table class="table">
    <thead v-if="!isArtistDetail">
      <span class="column-name index"></span>
      <span class="column-name title">标题</span>
      <span class="column-name duration">时长</span>
      <span class="column-name artist">歌手</span>
    </thead>
    <tbody class="tbody">
        <song-item v-for="(item, index) in currentListData" :key="index" :songData="currentListData[index]" :index="index"></song-item>
    </tbody>
  </table>
</div>
</template>

<script>
import songItem from './songItem.vue'
export default {
  created () {
  },
  props: {
    currentListData: {
      type: Array
    },
    // 是否来自歌手详情页
    isArtistDetail: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'song-item': songItem
  },
  data () {
    return {
      
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.songlist-wrapper .table {
  display: block;
  border: 1px solid rgba(0, 0, 0, .1);
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
}
.table thead,
.table .tbody {
  width: 100%;
}
.table thead{
  height: 28px;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(white, rgb(240, 240, 240));
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
.table thead span {
  border-right: 1px solid rgba(0, 0, 0, .1);
  font-size: 12px;
  color: #666;
  line-height: 28px;
}
.table .index {
  padding-left: 20px;
  width: 9%;
}
.table .title {
  width: 45%;
}
.table .duration {
  width: 15%;
}
.table .artist {
  width: 25%;
}
</style>
