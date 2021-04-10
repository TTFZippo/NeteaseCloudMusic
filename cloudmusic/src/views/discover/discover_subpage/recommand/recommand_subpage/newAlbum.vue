<!-- 新碟上架 -->
<template>
  <div class="wrapper">
    <div class="label">
      <a href="javascript:;" class="title">新碟上架</a>
      <span class="more">
        <a href="javascript:;">更多</a>
        <i></i>
      </span>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <album v-for="(item, index) in albums"  :key="index" :albumData="item"></album>
    </div>
  </div>
</template>

<script>
import album from '../../../../../components/album.vue'
export default {
  created () {
    
  },
  components: {
    album
  },
  props: {
    albums: {
      type: Array
    }
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.wrapper {
  height: 400px;
  margin-bottom: 50px;
}
/* 热门推荐顶部信息 */
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
.label .more i{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url('../../../../../assets/icon/index.png') no-repeat 0 9999px;
  background-position: 0 -240px;
}
.label .more a:hover,
.label .tabs .single-tab li:hover {
  text-decoration: underline;
  cursor: pointer;
}

</style>
