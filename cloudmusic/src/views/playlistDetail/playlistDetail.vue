<!-- 歌单详情页面 -->
<template>
  <div>
    <main class="detail-content">
      <div class="main-content">
        <list-content
          :currentListData="currentListData"
          :isDetail="true"
        ></list-content>
        <div class="download-more">
          <div>查看更多内容，请下载客户端</div>
          <a href="javascript:;" class="download-btn">立即下载</a>
        </div>
        <comment :allComment="allComment" :id="$route.query.id"></comment>
      </div>
      <aside class="aside">
        <!-- 喜欢这个歌单的人 -->
        <div class="asdie-item subscribers">
          <div class="label">喜欢这个歌单的人</div>
          <div class="subscribers-wrapper">
            <a
              href="javascript:;"
              v-for="item in subscribers"
              :key="item.userId"
              :title="item.nickname"
            >
              <img :src="item.avatarUrl" />
            </a>
          </div>
        </div>
        <!-- 相关推荐 -->
        <div class="asdie-item relatedPlaylist-wrapper">
          <div class="label">相关推荐</div>
          <div
            v-for="item in relatedPlaylists"
            :key="item.id"
            class="relatedPlaylist"
          >
            <img :src="item.coverImgUrl" alt="" />
            <div class="desc">
              <h2>{{ item.name }}</h2>
              <span>by {{ item.creator.nickname }}</span>
            </div>
          </div>
        </div>
        <!-- 网易云音乐多端下载 -->
        <div class="asdie-item download-apps">
          <div class="label">网易云多端下载</div>
          <ul>
            <li class="ios"><a href="javascript:;"></a></li>
            <li class="pc"><a href="javascript:;"></a></li>
            <li class="android"><a href="javascript:;"></a></li>
          </ul>
          <span class="slogan">同步歌单，随时畅听320k好音乐</span>
        </div>
        <download></download>
      </aside>
    </main>
    <footer>
      <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import footer from "../../components/footer/footer.vue";
import playlistheader from "../../components/playlistHeader.vue";
import listContent from "../discover/discover_subpage/toplist/toplist_subpage/listContent.vue";
import comment from "../discover/discover_subpage/toplist/toplist_subpage/comment.vue";
import download from '../../components/download/download.vue'
export default {
  created() {
    this.getPlaylistDetail();
    this.getRelatedPlaylists();
    this.getToplistComments(this.$route.query.id);
  },
  components: {
    "my-footer": footer,
    "playlist-header": playlistheader,
    "list-content": listContent,
    "comment": comment,
    "download": download
  },
  data() {
    return {
      // 喜欢这个歌单的人
      subscribers: [],
      // 相关推荐歌单
      relatedPlaylists: [],
      currentListData: {},
      // 该歌单的所有评论
      allComment: {
        comment_by_hot: {},
        comment_by_time: {},
        // 总量
        totalCount: "",
      },
    };
  },
  methods: {
    // 歌单详情
    async getPlaylistDetail() {
      let id = this.$route.query.id;
      let result = await this.request.get(`/playlist/detail?id=${id}`);
      this.subscribers = result.playlist.subscribers;
      let {
        coverImgUrl,
        updateTime,
        name,
        subscribedCount,
        shareCount,
        commentCount,
        playCount,
        tracks,
        trackCount,
        tags,
        createTime,
        description,
        creator: { avatarUrl, nickname },
      } = result.playlist;
      this.currentListData = {
        coverImgUrl,
        updateTime,
        name,
        subscribedCount,
        shareCount,
        commentCount,
        tracks,
        playCount,
        trackCount,
        tags,
        createTime,
        description,
        avatarUrl,
        nickname,
      };
      console.log(result);
    },

    // 相关歌单推荐
    async getRelatedPlaylists() {
      let id = this.$route.query.id;
      let result = await this.request.get(`/related/playlist?id=${id}`);
      this.relatedPlaylists = result.playlists;
    },

    // 获取歌单评论
    async getToplistComments(id = 19723756, pageNo = 1, cursor) {
      let timestamp = new Date().getTime();
      // 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
      if (cursor) {
        let result_by_time = await this.request.get(
          `/comment/new?type=2&pageNo=${pageNo}&id=${id}&sortType=3&pageSize=20&${timestamp}&cursor=${cursor}`
        );
        this.allComment.comment_by_time = result_by_time.data;
      } else {
        // 按时间排序
        let result_by_time = await this.request.get(
          `/comment/new?type=2&pageNo=${pageNo}&id=${id}&sortType=3&pageSize=20&timestap=${timestamp}`
        );
        this.allComment.comment_by_time = result_by_time.data;
      }
      // 按热度排序
      let result_by_hot = await this.request.get(
        `/comment/new?type=2&pageNo=${pageNo}&id=${id}&sortType=2&pageSize=20&timestap=${timestamp}`
      );
      this.allComment.comment_by_hot = result_by_hot.data;
      this.allComment.totalCount = result_by_hot.data.totalCount;
    },
  },
  provide() {
    return {
      getToplistComments: this.getToplistComments,
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.detail-content {
  font-size: 14px;
  display: flex;
  width: 982px;
  border: 1px solid #d3d3d3;
  margin: 0 auto;
}
.detail-content .main-content {
  padding: 30px 30px 40px 39px;
  width: calc(100% - 270px);
  background-color: white;
}
.detail-content .aside {
  width: 270px;
  padding: 20px 40px 40px 30px;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  background-color: white;
}
.asdie-item .label {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.8em;
  margin-bottom: 1.5em;
  color: #333;
  font-size: 0.8em;
  font-weight: 600;
}
/* 喜欢这个歌单的人 */
.subscribers-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}
.subscribers-wrapper a {
  margin-bottom: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
}
.subscribers-wrapper img {
  width: 100%;
  cursor: pointer;
}
/* 相关推荐歌单 */
.relatedPlaylist-wrapper {
  margin-bottom: 40px;
}
.relatedPlaylist {
  display: flex;
  margin: 15px 0;
  width: 100%;
}
.relatedPlaylist img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.relatedPlaylist .desc {
  width: 100%;
  margin-left: 10px;
}
.relatedPlaylist .desc h2 {
  margin-bottom: 5px;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
  font-size: 1em;
  font-weight: normal;
  cursor: pointer;
}
.relatedPlaylist .desc h2:hover {
  text-decoration: underline;
}
.relatedPlaylist .desc span {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
.relatedPlaylist .desc span:hover {
  text-decoration: underline;
}
/* 网易云多端下载 */
.download-apps {
}
.download-apps ul {
  height: 65px;
  background-image: url("../../assets/icon/sprite.png");
  background-position: 0 -392px;
  list-style: none;
}
.download-apps ul li a {
  background-image: url("../../assets/icon/sprite.png");
  display: none;
  width: 42px;
  height: 48px;
}
.download-apps ul li.ios {
  display: inline-block;
  width: 42px;
  height: 48px;
}
.download-apps ul li.ios:hover a {
  display: inline-block;
  background-position: 0 -472px;
}
.pc {
  display: inline-block;
  width: 60px;
  height: 48px;
  margin: 0 26px 0 30px;
}
.pc a {
  display: none;
  width: 100%;
}
.pc:hover a {
  display: inline-block;
  background-position: -72px -472px;
}
.android {
  display: inline-block;
  width: 40px;
  height: 48px;
}
.android a {
  display: none;
  width: 100%;
}
.android:hover a {
  display: inline-block;
  background-position: -158px -472px;
}
.slogan {
  color: #999;
  font-size: 12px;
}      
.download-more {
  margin: 25px 0;
  font-size: 13px;
  text-align: center;
}
.download-btn {
  display: inline-block;
  width: 120px;
  height: 30px;
  background-image: linear-gradient(90deg, #ff5a4c 0%, #ff1d12 100%);
  border-radius: 18px;
  line-height: 30px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  margin-top: 15px;
}
</style>
