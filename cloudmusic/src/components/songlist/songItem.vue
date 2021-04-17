<!-- 单个歌曲 -->
<template>
  <div class="songitem-wrapper" :class="{'index_3': index < 3, 'even': index%2 == 0}">
    <div class="index_rank">
      <span class="index middle">{{index+1}}</span>
      <span class="rank middle"></span>
    </div>
    <div class="play-title">
      <img :src="songData.al.picUrl" alt="" v-if="index < 3">
      <span class="play middle"></span>
      <a href="javascript:;" class="title middle" :title="songData.name">{{songData.name}}</a>
    </div>
    <div class="dur-oper">
      <div class="time middle">{{duration(songData.dt)}}</div>
      <div class="oper">
        <span class="add middle"></span>
        <span class="collect middle"></span>
        <span class="share middle"></span>
        <span class="download middle"></span>
      </div>
    </div>

    <div class="art">
      <a href="javascript:;" class="artists middle">{{artists}}</a>
    </div>
    
  </div>
</template>

<script>
export default {
  created () {
    // console.log(this.songData);
  },
  props: {
    songData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    // 时长
    duration(dt) {
      return function(dt) {
        let dur = `0${parseInt(dt/60000)}:${parseInt((dt%60000)/1000)}`
        return dur;
      }
    },

    // 创作者
    artists() {
      let allArtists = "";
      this.songData.ar.forEach((item, index) => {
        allArtists += index==0 ? `${item.name}` : ` / ${item.name}`
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
.songitem-wrapper {
  width: 680px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.songitem-wrapper.even {
  background-color: rgb(245, 245, 245);
}
.songitem-wrapper a {
  color: black;
  text-decoration: none;
}
.songitem-wrapper a:hover {
  text-decoration: underline;
}
.songitem-wrapper img {
  margin-right: 6px;
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.songitem-wrapper>div {
  width: 20%;
  height: 30px;
}
.songitem-wrapper.index_3>div {
  padding: 10px 0;
  height: 50px;
}
.songitem-wrapper.index_3 .middle {
  line-height: 50px;
}
/* 序号和排序 */
.songitem-wrapper .index_rank {
  margin-left: 20px;
  width: 9%;
  color: #999;
}
.index_rank .rank {
  display: inline-block;
  margin: 0 0 0 20px;
  width: 16px;
  height: 17px;
  background-position: -67px -283px;
  background-image: url('../../assets/icon/icon.png');
  vertical-align: middle;
}
/* 歌名和播放按钮 */
.songitem-wrapper .play-title {
  width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play-title .play {
  margin: 0 5px 0 0;
  display: inline-block;
  width: 17px;
  height: 17px;
  background-position: 0 -103px;
  background-image: url('../../assets/icon/table.png');
  vertical-align: middle;
  cursor: pointer;
}
.play-title .play:hover {
  background-position: 0 -128px;
}
/* 歌曲时长和收藏等操作 */
.songitem-wrapper .dur-oper {
  width: 15%;
}
 .dur-oper .oper {
   display: none;
   line-height: 30px;
 }
 .songitem-wrapper.index_3 .oper {
   line-height: 50px;
 }
 .dur-oper .oper span {
   display: inline-block;
   margin: 0 1px;
   width: 18px;
   height: 16px;
   background-image: url('../../assets/icon/table.png');
   vertical-align: middle;
   cursor: pointer;
 }
.dur-oper .oper .add {
  width: 13px;
  height: 13px;
  background-position: 0 -700px;
  background-image: url('../../assets/icon/icon.png');
}
.dur-oper .oper .add:hover {
  background-position: -22px -700px;
}
.dur-oper .oper .collect {
  background-position: 0 -174px;
}
.dur-oper .oper .collect:hover {
  background-position: -20px -174px;
}
.dur-oper .oper .share {
  background-position: 0 -195px;
}
.dur-oper .oper .share:hover {
  background-position: -20px -195px;
}
.dur-oper .oper .download {
  width: 17px;
  background-position: -81px -174px;
}
.dur-oper .oper .download:hover {
  background-position: -104px -174px;
}
/* 鼠标移入操作按钮出现，移出消失 */
.songitem-wrapper:hover .dur-oper .time {
  display: none;
}
.songitem-wrapper:hover .dur-oper .oper {
  display: block;
}
.songitem-wrapper .art {
  width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.middle {
  line-height: 30px;
}
</style>
