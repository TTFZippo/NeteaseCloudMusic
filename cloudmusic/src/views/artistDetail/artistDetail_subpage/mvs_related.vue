<!-- 相关mv -->
<template>
  <div>
    <div class="mvs-wrapper">
      <div v-for="item in mvsData" :key="item.id" class="mv">
        <div class="cover">
          <img :src="item.imgurl" alt="">
          <a href="javascript:;" class="mask"></a>
          <a href="javascript:;" class="play-icon"></a>
        </div>
        <p class="desc">{{item.name}}</p>
      </div>
    </div>
    <pagenation :totalCount="totalCount" :pageSize="12" class="pagenation" @activedIndexChange="changePage"></pagenation>
  </div>
</template>

<script>
import pagenation from "../../../components/pagenation/pagenation.vue";
export default {
  created () {
    let id = this.$route.query.id;
    this.getArtistMvs(id)
    this.getArtistSongs(id);
  },
  components: { 
    pagenation 
  },
  data() {
    return {
      // 总的mv数
      totalCount: '',
      mvsData: []
    };
  },
  methods: {
    // 获取歌手mv
    async getArtistMvs(id, offset=0) {
      let result = await this.request.get(`/artist/mv?id=${id}&offset=${offset}&limit=12`);
      this.mvsData = result.mvs;
    },
    // 获取歌手单曲
    async getArtistSongs(id) {
      let result = await this.request.get(`/artists?id=${id}`);
      this.totalCount = result.artist.mvSize;
    },
    changePage(page) {
      let offset = (page-1)*12;
      let id = this.$route.query.id;
      this.getArtistMvs(id, offset);
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.mvs-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mv {
  margin: 15px 0;
  width: 137px;
}
.cover {
  position: relative;
  width: 137px;
  height: 103px;
}
.cover .mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url('../../../assets/icon/coverall.png');
  background-position: 0 -1170px;
}
.cover .play-icon {
  display: inline-block;
  position: absolute;
  width: 44px;
  height: 44px;
  top: 50%;
  left: 50%;
  margin: -22px 0 0 -22px;
  background-position: -30px -135px;
  background-image: url('../../../assets/icon/iconall.png');
}
.cover:hover .play-icon {
  background-position: -30px -85px;
}
.cover img {
  width: 137px;
  height: 103px;
}
.desc {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}
.pagenation {
  margin-top: 40px;
}
</style>
