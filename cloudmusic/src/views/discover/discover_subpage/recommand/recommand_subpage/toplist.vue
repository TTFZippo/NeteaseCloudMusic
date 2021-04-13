<!-- 榜单模块 -->
<template>
  <div>
    <div class="label">
      <a href="javascript:;" class="title">榜单</a>
      <span class="more">
        <a href="javascript:;">更多</a>
        <i></i>
      </span>
    </div>

    <div class="billboard-container">
      <div v-for="(item, index) in toplist_rec_data" class="billboard" :key="index">
        <header>
          <div>
            <img :src="item.coverImgUrl" alt="" class="coverImg">
            <a href="javascript:;" class="mask"></a>
          </div>
          <div class="title">
            <a :href="billboradHref(item.id)" class="title-content">{{item.name}}</a>
            <div class="btn">
              <a href="javascript:;" class="play"></a>
              <a href="javascript:;" class="collect"></a>
            </div>
          </div>
        </header>
        <ol>
          <li v-for="(songItem, songIndex) in toplistDetail[index]" :key="songIndex" class="song">
            <div class="oper-left" :class="{'red': songIndex < 3}">
              <span class="songIndex" href="javascript:;">{{songIndex+1}}</span>
              <a class="songName" href="javascript:;">{{songItem.name}}</a>
            </div>
            <div class="oper">
              <a href="javacsript:;" title="播放" class="play"></a>
              <a href="javacsript:;" title="添加到播放列表" class="addtolist"></a>
              <a href="javacsript:;" title="收藏" class="collect"></a>
            </div>
          </li>
        </ol>
        <a class="checkall" href="javascript:;">
          查看全部>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAlltopLists();
  },
  data() {
    return {
      // 推荐的榜单
      toplist_rec: ['飙升榜', '新歌榜', '原创榜'],
      // 榜单信息
      toplist_rec_data: [],
      // 榜单详细信息（具体的歌曲）
      toplistDetail: []
    };
  },
  computed: {
    billboradHref(id) {
      return function(id) {
        return `https://music.163.com/#/discover/toplist?id=${id}`
      }
    }
  },
  methods: {
    // 获取三个榜单的具体歌曲
    async getToplistsDetail(id) {
      let result = await this.request.get(`/playlist/detail?id=${id}`);
      return result.playlist.tracks;
    },

    // 获取三个榜单所有信息
    async getAlltopLists() {
      let result = await this.request.get('/toplist/detail');
      // 筛选toplist_rec（推荐的榜单）
      result = result.list.filter((item, index ,array) => this.toplist_rec.indexOf(item.name) != -1);
      // 根据榜单id获取该榜单下的歌曲
      for(let [index, item] of result.entries() ) {
        let {id, coverImgUrl, name} = item;
        this.toplist_rec_data.push({id, coverImgUrl, name});
        let detail = await this.getToplistsDetail(this.toplist_rec_data[index].id);
        detail.splice(10);
        this.toplistDetail.push(detail);
      }
    },

  },
  watch: {
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.label {
  display: flex;
  padding: 0 10px 0 34px;
  margin-bottom: 10px;
  height: 33px;
  border-bottom: 2px solid #c10d0c;
  background-image: url("../../../../../assets/icon/index.png");
  background-repeat: no-repeat;
  background-position: -225px -156px;
  line-height: 30px;
  color: #333;
  font-size: 12px;
}
.label .title {
  font-size: 20px;
  text-decoration: none;
  color: #333;
  font-weight: normal;
}
.label .tabs {
  margin-left: 24px;
  display: flex;
  list-style: none;  
  color: #666;
}
.label .tabs ul {
  list-style: none;
}
.label .tabs .single-tab {
  display: flex;
}
.label .more {
  margin-left: auto;
  text-decoration: none;
}
.label .more a {
  text-decoration: none;
  color: #333;
}
.label .more i {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("../../../../../assets/icon/index.png") no-repeat 0 9999px;
  background-position: 0 -240px;
}
.label .more a:hover,
.label .tabs .single-tab li:hover {
  text-decoration: underline;
  cursor: pointer;
}

.billboard-container {
  display: flex;
  justify-content: space-between;
  background-color: rgb(244, 244, 244);
}
.billboard-container .billboard {
  padding: 20px 0 0 0;
  border: 1px solid rgba(0, 0, 0, .2);
  flex:  1 1 33.3%;
}
.billboard-container .billboard header{
  padding-left: 10px;
  display: flex;
  position: relative;
}
.billboard-container .billboard header .mask {
  position: absolute;
  display: block;
  width: 80px;
  height: 80px;
  top: 0;
  left: 10px;
  background-image: url('../../../../../assets/icon/coverall.png');
  background-position: -145px -57px;
}
.billboard .title {
  padding: 10px 0 0 10px;
}
.billboard .title .btn {
  padding-top: 10px;
}
.billboard .title .btn a{
  display: inline-block;
  width: 22px;
  height: 22px;
  background-image: url('../../../../../assets/icon/index.png');
  text-decoration: none;
}
.billboard .title .btn .play {
  background-position: -267px -205px;
  margin-right: 10px;
}
.billboard .title .btn .play:hover {
  background-position: -267px -235px;
}
.billboard .title .btn .collect {
  background-position: -300px -205px;
}
.billboard .title .btn .collect:hover {
  background-position: -300px -235px;;
}
.billboard .title .title-content {
  text-decoration: none;
  color: rgb(26, 25, 25);
  font-weight: 600;
  font-size: 14px;
}
.billboard-container .billboard .coverImg {
  width: 80px;
  height: 80px;
}
.billboard-container .billboard ol {
  margin-top: 14px;
  list-style: none;
}
.billboard ol .song {
  padding: 5px 0 5px 15px;
  display: flex;
}
.billboard ol .song:nth-child(2n+1) {
  background-color: rgb(232, 232, 232);
}
/* 鼠标放上时出现 */
.billboard ol .song:hover .oper{
  display: flex;
}
.billboard ol .oper-left {
  font-size: 13px;
  line-height: 20px;
}
.billboard ol .oper-left a{
  color: black;
  text-decoration: none;
}
.billboard ol .oper-left a:hover {
  text-decoration: underline;
}
.billboard ol .oper-left .songIndex {
  margin-right: 8px;
}
.billboard ol .oper-left.red .songIndex{
  color: #c10d0c;
}
.billboard ol .oper-left {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.billboard ol .oper {
  display: flex;
  margin-left: auto;
  display: none;
}
.billboard ol .oper a{
  display: block;
  width: 20px;
  height: 20px;
  background-image: url('../../../../../assets/icon/index.png');
}
.billboard ol .oper a.play {
  background-position: -267px -268px;
}
.billboard ol .oper a.play:hover {
  background-position: -267px -288px;
}
.billboard ol .oper a.addtolist {
  background-image: url('../../../../../assets/icon/icon.png');
  background-position: 0 -698px;
}
.billboard ol .oper a.addtolist:hover {
  background-position: -22px -698px;
}
.billboard ol .oper a.collect {
  background-position: -297px -268px;
}
.billboard ol .oper a.collect:hover {
  background-position: -297px -288px;
}

.billboard .checkall {
  padding: 5px 15px 5px 0;
  display: block;
  box-sizing: border-box;
  width: 100%;
  text-align: right;
  background-color: rgb(232, 232, 232);
  text-decoration: none;
  font-size: 12px;
  color: black;
}
.billboard .checkall:hover {
  text-decoration: underline;
}

</style>
