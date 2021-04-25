<!-- 歌曲详情顶部介绍部分 -->
<template>
  <div class="intro">
    <!-- 左侧碟片图片 -->
    <div>
      <div class="img-container">
        <img :src="songBasicData.picUrl" alt="">
        <span class="mask"></span>
      </div>
      <!-- 外链播放器 -->
      <a href="javascript:;" class="outer-player">
        <i></i>
        生成外链播放器
      </a>
    </div>
    <!-- 右侧操作、歌名、歌词等 -->
    <div class="intro-main">
      <!-- 歌名 -->
      <div class="name">
        <span class="icon"></span>
        <h2>{{songBasicData.name}}</h2>
      </div>
      <!-- 歌手 -->
      <div class="artist">
        <span class="item-name">歌手：</span>
        <a href="javascraipt:;">{{songBasicData.artistName}}</a>
      </div>
      <!-- 所属专辑 -->
      <div class="album">
        <span class="item-name">所属专辑：</span>
        <a href="javascript:;">{{songBasicData.albumName}}</a>
      </div>
      <!-- 播放、点赞等操作 -->
      <div class="operation">
        <a href="javascript:;" class="play">
          <i>
            <em class="icon"></em>
            播放
          </i>
        </a>
        <a href="javascript:;" class="add"></a>
        <a href="javascript:;" class="collect">
          <i>
            收藏
          </i>
        </a>
        <a href="javascript:;" class="share">
          <i>
            分享
          </i>
        </a>
        <a href="javascript:;" class="download">
          <i>
            下载
          </i>
        </a>
        <a href="javascript:;" class="comments">
          <i>
            3
          </i>
        </a>
      </div>
      <!-- 歌词 -->
      <div class="lyric">
        <pre :style="{height: isSpread ? `${lyricLines*20}px`: `${13*20}px`}">{{lyricsWithoutTime}}</pre>
        <a href="javascript:;" class="spread-rollup" @click="isSpread=!isSpread" :class="{spread: isSpread}">
          {{isSpread ? '收起': '展开'}}
          <i></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    // 评论数
    commentCounts: {
      type: Number
    }
  },
  created () {
    this.getSongDetail(),
    this.getLyrics()
  },
  data () {
    return {
      songBasicData: {},
      lyric: "",
      // 歌词是否处于展开状态
      isSpread: false
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    // 将时间去掉后的歌词
    lyricsWithoutTime() {
      return this.lyric.replace(/\[\d+:\d+.\d+\]/g, "")
    },
    // 歌词行数
    lyricLines() {
      if(this.lyric) {
        return this.lyric.match(/\n/g).length;
      }
    }
  },
  methods: {
    // 获取歌曲详情
    async getSongDetail() {
      let id = this.id;
      let result = await this.request.get(`/song/detail?ids=${id}`);
      let {name, ar: [{name: artistName}], al: {name: albumName, picUrl}} = result.songs[0];
      this.songBasicData = {name, artistName, albumName, picUrl};
    },
    // 歌词
    async getLyrics() {
      let id = this.id;
      let result = await this.request.get(`/lyric?id=${id}`);
      this.lyric = result.lrc.lyric;
    }
  }
}

</script>

<style scoped>
.intro {
  width: 90%;
  display: flex;
  justify-content: space-around;
}
a {
  color: #0c73c2;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
/* 左侧图片部分 */
.img-container {
  margin-top: 20px;
  position: relative;
  width: 198px;
  height: 198px;
}
.img-container img {
  width: 130px;
  height: 130px;
  margin: 34px;
}
.img-container .mask {
  display: block;
  position: absolute;
  width: 206px;
  height: 205px;
  top: -4px;
  left: -4px;
  background-position: -140px -580px;
  background-image: url('../../../assets/icon/coverall.png');
}
/* 外链播放器 */
.outer-player {
  margin-top: 20px;
  display: block;
  text-align: center;
  font-size: 12px;
  text-decoration: underline;
}
.outer-player i {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-position: -34px -863px;
  background-image: url('../../../assets/icon/icon.png');
  vertical-align: middle;
}
/* 歌名 */
.intro-main .name .icon {
  display: inline-block;
  margin-right: 10px;
  width: 54px;
  height: 24px;
  background-position: 0 -463px;
  background-image: url('../../../assets/icon/icon.png');
  vertical-align: sub;
}
.intro-main .name h2 {
  display: inline-block;
  font-weight: 500;
}
/* 歌手 */
.item-name {
  color: #999;
}
.album,
.artist {
  font-size: 12px;
  margin-bottom: 8px;
}
/* 歌词 */
.lyric {
  margin-top: 30px;
  font-size: 12px;
  line-height: 20px;
}
.lyric pre {
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
}
.lyric .spread-rollup i {
  width: 11px;
  height: 8px;
  background-position: -65px -520px;
  display: inline-block;
  background-image: url('../../../assets/icon/icon.png');
}
.lyric .spread.spread-rollup i{
  background-position: -45px -520px;
}
/* 操作按钮 */
.operation a {
  padding: 0 5px 0 0;
  display: inline-block;
  height: 31px;
  line-height: 31px;
  background-image: url('../../../assets/icon/button2.png');
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: white;
  vertical-align: top;
}
.operation a i {
  color: black;
  display: inline-block;
  padding-left: 28px;
  background-image: url('../../../assets/icon/button2.png'); 
}
.operation  .play {
  padding: 0 5px 0 0;
  background-position: right -428px;
  vertical-align: top;
}
.operation  .play:hover i .icon {
  background-position: -28px -1622px;
}
.operation  .play:hover i {
  background-position: 0 -469px;
}
.operation  .play i{
  display: inline-block;
  line-height: 31px;
  height: 31px;
  padding: 0 7px 0 8px;
  background-position: 0 -387px;
  background-image: url('../../../assets/icon/button2.png');
  font-style: normal;
  vertical-align: top;
  color: white;
}
.operation  .play i .icon {
  display: inline-block;
  width: 20px;
  height: 18px;
  margin: 6px 2px 2px 0;
  background-position: 0 -1622px;
  background-image: url('../../../assets/icon/button2.png');  
  vertical-align: top;
}
.operation  .add {
  display: inline-block;
  margin-right: 5px;
  background-position: 0 -1588px;
  width: 31px;
  margin-left: -3px;
  padding-right: 0;
  padding: 0 5px 0 0;
}
.operation  .add:hover {
  background-position: -40px -1588px;
}
.operation .collect {
  height: 31px;
  line-height: 31px;
  padding: 0 5px 0 0;
  background-position: right -1020px;
  color: black;
  vertical-align: top;
}
.operation .collect:hover {
  background-position: right -1106px;
}
.operation .collect:hover i {
  background-position: 0 -1063px;
}
.operation .collect i {
  display: inline-block;
  background-position: 0 -977px;
  padding-right: 2px;
  padding-left: 28px;
  background-image: url('../../../assets/icon/button2.png'); 
  font-style: normal;
}
.operation .share {
  margin-right: 6px;
  background-position: right -1020px;
  padding: 0 5px 0 0;
  vertical-align: top;
  color: black;
}
.operation .share:hover {
  background-position: right -1106px;
}
.operation .share:hover i {
  background-position: 0 -1268px;
}
.operation .share i {
  display: inline-block;
  padding-left: 28px;
  background-position: 0 -1225px;
  background-image: url('../../../assets/icon/button2.png'); 
  font-style: normal;
}
.operation .download {
  background-position: right -1020px;
  margin-right: 5px;
}
.operation .download:hover {
  background-position: right -1106px;
}
.operation .download:hover i {
  background-position: 0 -2805px;
}
.operation .download i {
  background-position: 0 -2761px;
  padding-right: 2px;
  padding-left: 30px;
  font-style: normal;
}
.operation .comments {
  background-position: right -1020px;
  margin-right: 5px;
}
.operation .comments:hover {
  background-position: right -1106px;
}
.operation .comments:hover i {
  background-position: 0 -1465px;
}
.operation .comments i {
  background-position: 0 -1465px;
  padding-right: 2px;
  padding-left: 30px;
  font-style: normal;
}
</style>
