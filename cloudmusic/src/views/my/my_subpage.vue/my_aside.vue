<!-- 我的音乐界面侧边栏 -->
<template>  
  <div class="my-aside">
    <!-- 我的歌手 -->
    <div>
      <div class="title" @click="activeItem='我的歌手'" :class="{active: activeItem === '我的歌手'}">我的歌手（{{asideData.artistsCount}}）</div>
    </div>
    <!-- 创建的歌单 -->
    <div class="created-playlists">
      <div class="title">创建的歌单({{asideData.playlist_created.length}})</div>
      <div>
        <!-- 单个歌单 -->
        <div v-for="(item,index) in asideData.playlist_created" :key="index" class="per-playlist" :class="{active: activeItem === item.name}"  @click="activeItem=item.name" >
          <img :src="item.coverImgUrl" alt="">
          <div class="desc">
            <span class="name">{{item.name}}</span>
            <span class="totalCount">{{item.trackCount}}首</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 收藏的歌单 -->
    <div class="collected-playlists">
      <div class="title">收藏的歌单({{asideData.playlist_collected.length}})</div>
      <div>
        <!-- 单个歌单 -->
        <div v-for="(item,index) in asideData.playlist_collected" :key="index" class="per-playlist"  :class="{active: activeItem === item.name}"  @click="activeItem=item.name">
          <img :src="item.coverImgUrl" alt="">
          <div class="desc">
            <span class="name">{{item.name}}</span>
            <span class="totalCount">{{item.trackCount}}首 by{{item.creator.nickname}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    asideData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      activeItem: 'AZ'
    }
  },
  methods: {
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.my-aside {
  padding-top: 40px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  cursor: pointer;
  padding: 1px 25px;
  font-family: simsun,\5b8b\4f53;
}

/* 单个歌单 */
.per-playlist {
  display: flex;
  padding: 5px;
  padding-left: 20px;
  padding-right: 10px;
  cursor: pointer;
}
.per-playlist img {
  width: 40px;
  height: 40px;
}
.per-playlist .desc{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  font-size: 12px;
}
.per-playlist .desc .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.per-playlist .desc .totalCount  {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 被选中项 */
.active {
  background-color: rgb(238, 238, 238);
}
</style>
