<!-- 专辑（碟）box -->
<template>
  <div class="playlist" :class="{'large': size=='big'}">
    <div class="imagebox">
      <img :src="coverImgUrl" alt=""/>
      <a href="javascript:;" class="mask"></a>
      <div class="bottom">
        <span class="headphone"></span>
        <span>{{palyCount}}</span>
        <span class="play"></span>
      </div>
    </div>
    <!--描述 -->
    <p class="dec">{{name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    coverImgUrl: {
      type: String
    },
    name: {
      type: String
    },
    palyCount: {
      type: Number
    }
  },
  created() {
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.playlist {
  width: 140px;
}
.playlist .imagebox {
  height: 140px;
  position: relative;
}
.playlist .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: 0 0;
  background-image: url('../assets/icon/coverall.png');
  text-decoration: none;
}

.playlist .bottom {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 27px;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba(0, 0, 0, .5);
  background-image: url('../assets/icon/coverall.png');
  background-position: 0 -537px;
  color: #ccc;
  font-size: 12px;
  line-height: 27px;
}
.playlist .bottom .headphone {
  width: 14px;
  height: 27px;
  margin-top: 8px;
  margin-right: 2px;
  background: url('../assets/icon/iconall.png');
  background-position: 0 -24px;
}
.playlist .bottom .play {
  margin-top: 5px;
  position: absolute;
  left: 80%;
  width: 16px;
  height: 17px;
  background-image: url('../assets/icon/iconall.png');
  background-position: 0 0;
  cursor: pointer;
}
.playlist .bottom .play:hover {
  background-position: 0 -60px;
}
.playlist .imagebox img {
  width: 140px;
  height: 140px;
}
.playlist .dec {
  margin: 5px 0 0 0 ;
  font-size: 14px;
}
</style>
