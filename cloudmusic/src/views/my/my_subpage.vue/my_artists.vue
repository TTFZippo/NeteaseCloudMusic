<!--  -->
<template>
  <div>
    <div class="label">
      我的歌手（{{myArtists.count}}）
    </div>
    <div class="aritsts-wrapper">
      <div class="artist" v-for="(item,index) in myArtists.data" :key="index">
        <img :src="item.picUrl" alt="" class="avatar">
        <div class="desc">
          <div>
            <a href="javascript:;" class="name">{{item.name}}</a>
          </div>
          <div class="album-mv">
            <span v-if="item.albumSize" class="album">{{item.albumSize}}个专辑</span>
            <span v-if="item.mvSize">{{item.mvSize}}个MV</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    myArtists: {
      type: Object
    }
  },
  data () {
    return {

    }
  }
}

</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.label {
  padding-bottom: 5px;
  color: #333;
  border-bottom: 2px solid #c20c0c;
  font-size: 24px;
  font-weight: normal;
}
.artist {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
.artist .avatar {
  width: 80px;
  height: 80px;
}
.desc {
  padding: 10px;
}
.desc .name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
}
.desc .name:hover {
  text-decoration: underline;
}
.desc .album-mv {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
.desc .album {
  margin-right: 15px;
}
</style>
