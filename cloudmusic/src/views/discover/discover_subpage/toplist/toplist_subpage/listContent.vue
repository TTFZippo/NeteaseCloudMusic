<!-- 排行榜的主内容 -->
<template>
  <div class="playlistmain-wrapper">
    <playlist-header :currentListData="currentListData"></playlist-header>
    <div class="label">
      <div>
        <h2>歌曲列表</h2>
        <span class="songscount">{{currentListData.trackCount}}首歌</span>
      </div>

      <div class="playcount">
        <span>播放：</span>
        <span class="count">{{currentListData.playCount}}</span>
        <span>次</span>
      </div>
    </div>
    <song-list :currentListData="currentListData.tracks"></song-list>
  </div>
</template>

<script>
import songlist from '../../../../../components/songlist/songlist.vue'
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
    'playlist-header': playlistHeader,
    'song-list': songlist
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
* {
  margin: 0;
  padding: 0;
}
.playlistmain-wrapper {
  width: 680px;
  
  background-color: rgb(255, 255, 255);
}
.playlistmain-wrapper .label {
  height: 30px;
  display: flex;
  border-bottom: 2px solid #c20c0c;
}
.playlistmain-wrapper .label .playcount {
  margin-left: auto;
  font-size: 12px;
  line-height: 30px;
}
.playcount .count {
  color: #c20c0c;
}
.label h2 {
  display: inline;
  margin-right: 20px;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
}
.label .songscount {
  font-size: 12px;
  color: #666;
  line-height: 30px;
}
</style>
