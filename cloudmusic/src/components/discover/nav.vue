<!-- 发现音乐顶部红色导航栏 -->
<template>
  <div class="wrapper">
    <div class="nav-container">
      <ul class="item-container">
        <li v-for="(item, index) in navitems" :key="item"><a href="javascript:;" @click="goActive(item, index)" :class="{'active': currentIndex == index}">{{item}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navitems: ['推荐', '排行榜', '歌单', '主播电台', '歌手', '新碟上架'],
      navitems_en: {
        '推荐': 'recommand',
        '排行榜': 'toplist',
        '歌单': 'playlist',
        '主播电台': 'djradio',
        '歌手': 'artist',
        '新碟上架': 'album',
      },
      currentIndex: 0
    }
  },
  methods: {
    // 切换acitve类名更换底色
    changeIndex(index) {
      this.currentIndex = index;
    },
    // 路由跳转
    changeRoute(item) {
      let route = this.navitems_en[item];
      this.$router.push(`/discover/${route}`);
    },
    // 变色并跳转
    goActive(item, index) {
      this.changeIndex(index);
      this.changeRoute(item);
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  width: 100%;
  background-color: rgb(194, 12, 12);
}
.nav-container {
  width: 1100px;
  padding-left: 200px;
  box-sizing: border-box;
  margin: 0 auto;
  padding-bottom: 3px;
}
.item-container {
  display: flex;
  height: 30px;
  list-style: none;
  font-size: 12px;
  font-weight: 500;
}
.item-container li {
  line-height: 30px;
  margin-right: 4%;
  cursor: pointer;
}
.item-container li a {
  padding: 2px 10px;
  text-decoration: none;
  color: white;
}
.item-container li:hover a {
  
  background-color: rgb(155, 9, 9);
  border-radius: 10px;
}
/* 被点击状态 */
.item-container li a.active {
  background-color: rgb(155, 9, 9);
  border-radius: 10px;
}
</style>
