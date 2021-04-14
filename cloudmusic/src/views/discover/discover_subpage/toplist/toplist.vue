<!-- 排行榜 -->
<template>
  <div class="wrapper">
    <main class="main-content">
      <!-- 侧边导航栏 -->
      <aside class="aside">
        <nav-menu :listData="toplistTags"></nav-menu>
      </aside>
      <!-- 左侧主内容 -->
      <div>

      </div>
    </main>
    <footer>
      <!-- <my-footer></my-footer> -->
    </footer>
  </div>
</template>

<script>
import footer from '../../../../components/footer/footer.vue'
import navMenu from './toplist_subpage/navMenu.vue'
export default {
  created() {
    this.getToplistTags();
  },
  components: {
    'my-footer': footer,
    'nav-menu': navMenu
  },
  data () {
    return {
      toplistTags: []
    }
  },
  methods: {
    // 获取所有榜单(id、name等)
    async getToplistTags() {
      let result  = await this.request.get('/toplist');
      result = result.list;
      // TODO:封装这个提取函数
      for(let [index, item] of result.entries()) {
        let {coverImgUrl, id, name, updateFrequency} = item;
        this.toplistTags.push({coverImgUrl, id, name, updateFrequency});
      }
    },

    // 根据歌单id获取单个榜单的详细信息
    // id-default: 19723756(飙升榜)
    async getToplistData(id=19723756) {
      const result = await this.request.get(`/playlist/detail?id=${id}`);
    }
  }
}

</script>

<style scoped>
.wrapper {
  background-color: rgb(245, 245, 245);
}
.main-content {
  display: flex;
  width: 982px;
  border: 1px solid rgba(0, 0, 0, .1);
  margin: 0 auto;
}
.main-content .aside {
  width: 240px;
  border: 1px solid rgba(0, 0, 0, .1);
}
</style>
