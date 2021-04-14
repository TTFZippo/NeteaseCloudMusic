<!-- 推荐 -->
<template>
  <div>
    <!-- 顶部轮播图 -->
    <header>
      <banner></banner>
    </header>

    <!-- 中间主内容 -->
    <main class="main">
      <div class="content">
        <!-- 推荐主内容 -->
        <div class="rec-content">
          <!-- 热门推荐 -->
          <div>
            <div class="label">
              <a href="javascript:;" class="title">热门推荐</a>
              <ul class="tabs">
                <ul v-for="(item, index) in tab" :key="index" class="single-tab">
                  <li>{{ item }}</li>
                  <li class="line" :index="index">|</li>
                </ul>
              </ul>
              <span class="more">
                <a href="javascript:;">更多</a>
                <i></i>
              </span>
            </div>
            <div class="playlist-wrapper">
              <playlist
                :coverImgUrl="item.coverImgUrl"
                :name="item.name"
                :palyCount="item.playCount"
                v-for="item in playlists"
                :key="item.id"
              ></playlist>
            </div>
          </div>
          <!-- 新碟上架 -->
          <newAlbum class="new-album" :albums="albums"></newAlbum>
          <!-- 榜单 -->
          <toplist></toplist>
        </div>
        <!-- 右边部分 -->
        <aside class="aside">
          <recd-aside></recd-aside>
        </aside>
      </div>
    </main>

    <!-- 底部公司信息，服务条款 -->
    <footer>
      <my-foooter></my-foooter>
    </footer>
  </div>
</template>

<script>
import banner from "../../../../components/discover/banner.vue"
import playlist from "../../../../components/playlist.vue";
import footer from '../../../../components/footer/footer.vue'
import newAlbum from "./recommand_subpage/newAlbum.vue"
import toplist from './recommand_subpage/toplist.vue'
import aside from './recommand_subpage/aside.vue'
export default {
  created() {
    this.getAllPlaylists();
    this.getAllAlbums();
    this.request.get('/toplist/artist').then(result => {
      console.log(result);
    })
  },
  components: {
    banner,
    playlist,
    newAlbum,
    toplist,
    'recd-aside': aside,
    'my-foooter': footer
  },
  data() {
    return {
      playlists: [],
      albums: [],
      tab: ["华语", "流行", "摇滚", "民谣", "电子"],
    };
  },
  methods: {
    // 获得热门推荐数据
    async getAllPlaylists() {
      let result = await this.request.get("/top/playlist?limit=8&order=hot");
      result = result.playlists;
      for (const [, item] of result.entries()) {
        let { coverImgUrl, name, playCount, id } = item;
        this.playlists.push({ coverImgUrl, name, playCount, id });
      }
    },
    // 获得新碟上架数据
    async getAllAlbums() {
      let result = await this.request.get("/album/newest");
      result = result.albums;
      for(const [, item] of result.entries()) {
        let {picUrl, name, id, artists} = item;
        this.albums.push({picUrl, name, id, artists});
      }
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  background-color: rgb(245, 245, 245);
}
.main .content {
  display: flex;
  justify-content: space-between;
  width: 982px;
  margin: 0 auto;
}

.content .rec-content {
  padding: 30px 15px;
  padding-bottom: 40px;
  box-sizing: border-box;
  width: 730px;
  border: 1px solid rgba(0, 0, 0, .1);
}
.content .rec-content .playlist-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* 热门推荐顶部信息 */
.rec-content .label {
  display: flex;
  padding: 0 10px 0 34px;
  margin-bottom: 10px;
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  background-image: url("../../../../assets/icon/index.png");
  background-repeat: no-repeat;
  background-position: -225px -156px;
  line-height: 30px;
  color: #333;
  font-size: 12px;
}
.rec-content .label .title {
  font-size: 20px;
  text-decoration: none;
  color: #333;
  font-weight: normal;
}
.rec-content .label .tabs {
  margin-left: 24px;
  display: flex;
  list-style: none;
  color: #666;
}
.rec-content .label .tabs ul {
  list-style: none;
}
.rec-content .label .tabs .single-tab {
  display: flex;
}
.rec-content .label .tabs .single-tab .line {
  padding: 0 14px;
}
/* 最后一个横线 */
.rec-content .label .tabs .single-tab .line[index='4'] {
  display: none;
}
.rec-content .label .more {
  margin-left: auto;
  text-decoration: none;
}
.rec-content .label .more a {
  text-decoration: none;
  color: #333;
}
.rec-content .label .more i{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url('../../../../assets/icon/index.png') no-repeat 0 9999px;
  background-position: 0 -240px;
}
.rec-content .label .more a:hover,
.rec-content .label .tabs .single-tab li:hover {
  text-decoration: underline;
  cursor: pointer;
}

.content .aside {
  border: 1px solid rgba(0, 0, 0, .1);
  flex: auto;
}
.rec-content .new-album {
  margin-top: 70px;
}

</style>