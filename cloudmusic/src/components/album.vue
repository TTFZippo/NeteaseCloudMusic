<!-- 专辑（碟） -->
<template>
  <div class="album-wrapper">
    <div class="cover">
      <img :src="albumData.picUrl" alt="">
      <a href="javascript:;" class="mask"></a>
      <a href="javascript:;" class="icon-play"></a>
    </div>
    <a href="javascript:;" :title="albumData.name">{{albumData.name}}</a>
    <a href="javascript:;" :title="artists" class="artists">{{artists}}</a>
  </div>
</template>

<script>
export default {
  created () {
    // console.log(this.albumData);
  },
  props: {
    albumData: {
      type: Object
    }
  },
  computed: {
    // 创作者
    artists() {
      let allArtists = "";
      this.albumData.artists.forEach((item, index) => {
        // console.log(index);
        allArtists += index==0 ? `${item.name}` : ` \\ ${item.name}`
      })
      return allArtists
    }
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
.album-wrapper {
  margin: 10px 8px 0 8px;
  width: 118px;
  height: 150px;
}
.album-wrapper .cover {
  position: relative;
}
.album-wrapper .cover img {
  width: 100px;
  height: 100px;
}
.album-wrapper .cover .mask {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 118px;
  height: 100px;
  background-image: url('../assets/icon/coverall.png');
  background-position: 0 -570px;
}
.album-wrapper .cover .icon-play:hover,
.album-wrapper .cover .mask:hover+.icon-play {
  display: block;
}
.album-wrapper .cover .icon-play {
  display: none;
  position: absolute;
  left: 72px;
  bottom: 8px;
  width: 22px;
  height: 22px;
  background-image: url('../assets/icon/iconall.png');
  background-position: 0 -85px;
}
.album-wrapper a{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  font-size: 12px;
  text-decoration: none;
  color: black;
}
.album-wrapper .artists {
  color: #666;
}
</style>
