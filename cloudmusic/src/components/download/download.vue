<!-- 多端下载（安卓，苹果，pc） -->
<template>
  <div class="asdie-item download-apps">
    <div class="label">网易云多端下载</div>
    <ul>
      <li class="ios"><a href="javascript:;"></a></li>
      <li class="pc"><a href="javascript:;"></a></li>
      <li class="android"><a href="javascript:;"></a></li>
    </ul>
    <span class="slogan">同步歌单，随时畅听320k好音乐</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
/* 网易云多端下载 */
.download-apps {
}
.download-apps .label {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.8em;
  margin-bottom: 1.5em;
  color: #333;
  font-size: 0.8em;
  font-weight: 600;
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
</style>
