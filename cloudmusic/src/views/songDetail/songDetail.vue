<!-- 歌曲详情 -->
<template>
  <div class="songDetail">
    <main class="main">
      <!-- 歌曲顶部详情 -->
      <intro></intro>
      <!-- 评论 -->
      <comment :allComment="allComment" :id="id" class="comment"></comment>
    </main>
    <aside class="aside">
      <!-- 相似歌曲 -->
      <div class="simi-songs">
        <div class="label">
          相似歌曲
        </div>
        <div class="simi-song" v-for="item in simiSongs" :key="item.id">
          <div>
            <div class="simi-songame">{{item.name}}</div>
            <div class="simi-artistname">{{item.allArtists}}</div>
          </div>
          <div class="oper">
            <a href="javascript:;" class="play"></a>
            <a href="javascript:;" class="add"></a>
          </div>
        </div>
      </div>
      <!-- 多端下载 -->
      <download></download>
    </aside>
  </div>
</template>

<script>
import download from '../../components/download/download.vue'
// 歌曲顶部详情
import intro from './songDetail_subpage/intro.vue'
import comment from '../discover/discover_subpage/toplist/toplist_subpage/comment.vue'
export default {
  components: {
    'download': download,
    'intro': intro,
    'comment': comment
  },
  created () {
    let id = this.$route.query.id;
    // console.log(id);
    
    // 歌曲评论
    this.request.get(`/comment/music?id=${id}&limit=5&offset=5`).then(result => {
      console.log(result);
    })
    
    // 相似歌曲
    this.request.get(`/simi/song?id=${id}`).then(result => {
      // console.log(result);
    })
    this.getSimiSongs();
    this.getToplistComments(this.id);
  },
  data () {
    return {
      // 相似歌手
      simiSongs: [],
      // 该歌单的所有评论
      allComment: {
        comment_by_hot: {},
        comment_by_time: {},
        // 总量
        totalCount: ''
      },
    }
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  methods: { 
    // 获得相似歌曲
    async getSimiSongs() {
      let result = await this.request.get(`/simi/song?id=${this.id}`);
      for(let [,item] of result.songs.entries()) {
        // 所有的歌手的名字拼接
        let allArtists = "";
        item.artists.forEach((item, index) => {
          allArtists += index==0 ? `${item.name}` : ` \/ ${item.name}`
        })
        item.allArtists = allArtists;
      }
      this.simiSongs = result.songs;
    },

    // 获取歌单评论
    async getToplistComments(id, pageNo=1, cursor) {
      let timestamp = new Date().getTime();
      // 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
      if(cursor) {
        let  result_by_time = await this.request.get(`/comment/new?type=0&pageNo=${pageNo}&id=${id}&sortType=3&pageSize=20&${timestamp}&cursor=${cursor}`);
        this.allComment.comment_by_time = result_by_time.data;
      } else {
        // 按时间排序
        let  result_by_time = await this.request.get(`/comment/new?type=0&pageNo=${pageNo}&id=${id}&sortType=3&pageSize=20&${timestamp}`);
        this.allComment.comment_by_time = result_by_time.data;
      }
      // 按热度排序
      let  result_by_hot = await this.request.get(`/comment/new?type=0&pageNo=${pageNo}&id=${id}&sortType=2&pageSize=20&${timestamp}`);
      this.allComment.comment_by_hot = result_by_hot.data;
      this.allComment.totalCount = result_by_hot.data.totalCount;
    }
  },
  provide() {
    return {
      getToplistComments: this.getToplistComments
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.songDetail {
  display: flex;
  width: 982px;
  border: 1px solid black;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  background-color: white;
}
.songDetail .main {
  box-sizing: border-box;
  padding: 20px 30px 30px 30px;
  width: 713px;
}
.songDetail .aside {
  box-sizing: border-box;
  padding: 20px 40px 40px 30px;
  width: 270px;
  border-left: 1px solid #d3d3d3;
}
.aside .label {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.8em;
  margin-bottom: 1.5em;
  color: #333;
  font-size: 0.8em;
  font-weight: 600;
}
/* 相似歌曲 */
.aside .simi-songs {
  font-size: 12px;
  margin-bottom: 30px;
}
.simi-song {
  display: flex;
  margin-bottom: 10px;
}
.simi-song  .simi-artistname {
  color: #999;
}
/* 相似歌曲的播放添加按钮 */
.simi-song .oper {
  margin-left: auto;
}
.simi-song .oper a {
  display: inline-block;
  width: 10px;
  height: 11px;
}
.simi-song .play {
  margin-right: 15px;
  background-position: -69px -455px;
  background-image: url('../../assets/icon/icon2.png');
}
.simi-song .add {
  background-position: -87px -454px;
  background-image: url('../../assets/icon/icon2.png');
}
/* 评论 */
.comment {
  margin-top: 80px;
}
</style>
