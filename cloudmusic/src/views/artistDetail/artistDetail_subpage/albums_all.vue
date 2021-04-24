<!-- 所有专辑 -->
<template>
  <div>
    <div class="albums-all">
      <album v-for="item in hotAlbums" :key="item.id" :albumData="item" class="album"></album>
    </div>
    <pagenation :totalCount="totalCount" :pageSize="12" @activedIndexChange="changePgae"></pagenation>
  </div>
</template>

<script>
import album from '../../../components/album.vue'
import pagenation from '../../../components/pagenation/pagenation.vue'
export default {
  created () {
    let id = this.$route.query.id;
    this.getArtistAlbums(id);
  },
  components: {
    'album': album,
    'pagenation': pagenation
  },
  data () {
    return {
      hotAlbums: [],
      totalCount: ''
    }
  },
  methods: {
    // 获取歌手专辑
    async getArtistAlbums(id, offset=0) {
      
      let result = await this.request.get(`/artist/album?id=${id}&limit=12&offset=${offset}`);
      this.hotAlbums = result.hotAlbums;
      // 专辑总数
      this.totalCount = result.artist.albumSize;
    },

    // 切换页码
    changePgae(page) {
      let id = this.$route.query.id;  
      let offset = (page-1)*12;
      this.getArtistAlbums(id, offset);
    }
  }
}

</script>

<style scoped>
.albums-all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.albums-all .album:last-child {
  /* display: none; */
  /* margin-right: auto; */
}
</style>
