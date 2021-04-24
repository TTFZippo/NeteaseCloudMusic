<!-- 歌手详情 -->
<template>
  <div class="artist-detail">
    <div class="artist-wrapper">
      <main class="main-content">
        <h1 class="nickname">{{ artistBasicData.name }}</h1>
        <div class="avatar-operations">
          <div>
            <img :src="artistCover" alt="" class="artist-avatar" />
            <div class="mask"></div>
            <!-- 个人主页 -->
            <span class="per-page"> </span>
            <!-- 收藏 -->
            <span class="collect"> </span>
          </div>
          <div class="operations">
            <span
              v-for="item in operations"
              :key="item"
              :class="{ active: activeOper === item }"
              @click="changePageContent(item)"
              >{{ item }}</span
            >
          </div>
        </div>

        <div class="artist-subpage">
          <!-- 热门作品 -->
          <songs-hot v-if="activeOper === '热门作品'" :currentListData="hotSongs"></songs-hot>
          <!-- 所有专辑 -->
          <albums-all v-if="activeOper === '所有专辑'"></albums-all>
          <!-- 相关MV -->
          <mvs-related v-if="activeOper === '相关MV'"></mvs-related>
          <!-- 艺人介绍 -->
          <intro v-if="activeOper === '艺人介绍'"></intro>
        </div>
      </main>
      <aside class="aside">
        <div class="hot-singers" v-if="simiArtists.length != 0">
          <div class="label">相似歌手</div>
          <div class="hot-singers-wrapper">
            <div
              class="hot-singer"
              v-for="(item, index) in simiArtists"
              :key="index"
            >
              <img :src="item.picUrl" alt="" />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </div>
        <download></download>
        <div>
          <a href="javascript:;" class="modify">补充或修改艺人资料 ></a>
        </div>
      </aside>
    </div>
    <footer>
      <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import footer from "../../components/footer/footer.vue";
import download from "../../components/download/download.vue";
import songs_hot from './artistDetail_subpage/songs_hot.vue'
import albums_all from './artistDetail_subpage/albums_all.vue'
import mvs_related from './artistDetail_subpage/mvs_related'
import Intro from './artistDetail_subpage/intro.vue';
export default {
  components: {
    "my-footer": footer,
    download: download,
    'songs-hot': songs_hot,
    'albums-all':albums_all,
    'mvs-related':mvs_related,
    'intro': Intro
  },
 
  created() {
    let id = this.$route.query.id;
    this.getArtistBasicData(id);
    this.getArtistSongs(id);
    this.getArtistMvs(id);
    this.getArtistAlbums(id);
    this.getArtistDesc(id);
    this.getsimi(id);
  },
  computed: {
    artistCover() {
      return `${this.artistBasicData.cover}?param=640y300`;
    },
  },
  data() {
    return {
      // 相似歌手
      simiArtists: [],
      // 歌手基本信息
      artistBasicData: {},
      operations: ["热门作品", "所有专辑", "相关MV", "艺人介绍", ""],
      activeOper: "热门作品",
      hotSongs: []
    };
  },
  methods: {
    // 获取歌手基本信息
    async getArtistBasicData(id) {
      let result = await this.request.get(`/artist/detail?id=${id}`);
      // console.log(result.data.artist);
      // console.log(result);
      this.artistBasicData = result.data.artist;
      // console.log(this.artistBasicData);
    },
    // 获取歌手单曲
    async getArtistSongs(id) {
      let result = await this.request.get(`/artists?id=${id}`);
      // console.log(result);
      this.hotSongs = result.hotSongs;
    },
    // 获取歌手mv
    async getArtistMvs(id) {
      let result = await this.request.get(`/artist/mv?id=${id}`);
      // console.log(result);
    },
    // 获取歌手专辑
    async getArtistAlbums(id) {
      let result = await this.request.get(`/artist/album?id=${id}&limit=30`);
      // console.log(result);
    },
    // 获取歌手描述
    async getArtistDesc(id) {
      let result = await this.request.get(`/artist/detail?id=${id}`);
      // console.log(result);
      // this.briefDesc = result.data.artist.briefDesc;
    },
    // 相似歌手
    async getsimi(id) {
      let result = await this.request.get(`/simi/artist?id=${id}`);
      this.simiArtists = result.artists;
      this.simiArtists = this.simiArtists.splice(0, 6);
    },
    // 切换页面（热门作品等）
    changePageContent(item) {
      this.activeOper = item;
    },
  },
};
</script>

<style scoped>
.artist-wrapper {
  width: 982px;
  display: flex;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #d3d3d3;
}
.main-content {
  padding: 20px 30px 40px 30px;
}
.artist-wrapper .aside {
  width: 225px;
  padding: 20px 40px 40px 30px;
  border-left: 1px solid #d3d3d3;
}
.artist-wrapper .aside .label {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.8em;
  margin-bottom: 1.5em;
  color: #333;
  font-size: 0.8em;
  font-weight: 600;
}
.artist-wrapper .aside .modify {
  display: inline-block;
  margin-top: 40px;
  font-size: 12px;
  color: #333;
  text-decoration: none;
}
.artist-wrapper .aside .modify:hover {
  text-decoration: underline;
}
/* 热门歌手 */
.hot-singers-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}
.artist-wrapper .aside .hot-singer {
  margin-bottom: 10px;
  margin: 4px;
  display: flex;
  flex-direction: column;
}
.artist-wrapper .aside .hot-singer img {
  width: 50px;
  height: 50px;
}
.artist-wrapper .aside .hot-singer span {
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #666;
  text-align: center;
}
.artist-wrapper .main-content {
  width: calc(100% - 270px);
}
/* 顶部歌手部分 */
.avatar-operations {
  width: 640px;
  position: relative;
}
.avatar-operations .artist-avatar {
  display: block;
  width: 640px;
  height: 300px;
}
.avatar-operations .mask {
  width: 640px;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("../../assets/icon/ban_mask.png");
}
/* 歌手名字 */
.nickname {
  font-weight: normal;
  font-size: 24px;
}
/* 个人主页和收藏 */
.per-page,
.collect {
  display: block;
  position: absolute;
  bottom: 50px;
  background-image: url("../../assets/icon/iconall.png");
  cursor: pointer;
}
.per-page {
  width: 96px;
  height: 32px;
  background-position: 0 -1156px;
  left: 68%;
}
.per-page:hover {
  background-position: 0 -1196px;
}
.collect {
  left: 86%;
  width: 76px;
  height: 32px;
  background-position: 0 -500px;
}
.collect:hover {
  background-position: 0 -540px;
}
/* 分类（热门作品、所有专辑）按钮 */
.operations {
  height: 39px;
  border-bottom: none;
  color: #333;
}
.operations span {
  float: left;
  width: 22%;
  display: block;
  box-sizing: border-box;
  padding: 0 20px;
  text-align: center;
  border-top: 2px solid transparent;
  border-bottom: 2px solid #ccc;
  line-height: 39px;
  height: 39px;
  cursor: pointer;
}
.operations span:last-child {
  width: 12%;
  border-right: 1px solid #ccc;
  cursor: default;
}
.operations span:first-child {
  border-left: 1px solid #ccc;
}
.operations span:last-child:hover {
  border-top: none;
}
.operations span:hover {
  border-top: 2px solid rgb(209, 48, 48);
}
/* 当前选中的选项 */
.operations span.active {
  border: 2px solid red;
  border-top-color: rgb(209, 48, 48);
  border-bottom-color: rgb(255, 255, 255);
  border-right-color: #ccc;
  border-left-color: #ccc;
}
.artist-subpage {
  width: 640px;
  margin-top: 20px;
}

</style>
