<!-- 排行榜 -->
<template>
  <div class="wrapper">
    <main class="main-content">
      <!-- 侧边导航栏 -->
      <aside class="aside">
        <nav-menu :listData="toplistTags"></nav-menu>
      </aside>
      <!-- 左侧主内容 -->
      <main class="content">
        <list-content :currentListData="currentListData"></list-content>
        <comment :allComment="allComment" :id="id"></comment>
      </main>
    </main>
    <footer>
      <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import footer from '../../../../components/footer/footer.vue'
import navMenu from './toplist_subpage/navMenu.vue'
import listContent from './toplist_subpage/listContent.vue'
import comment from './toplist_subpage/comment.vue'
export default {
  created() {
    this.getToplistTags();
    this.getToplistData(19723756);
    this.getToplistComments();
  },
  components: {
    'my-footer': footer,
    'nav-menu': navMenu,
    'list-content': listContent,
    'comment': comment
  },
  data () {
    return {
      toplistTags: [],
      currentListId: '',
      currentListData: {},
      // 该歌单的所有评论
      allComment: {
        comment_by_hot: {},
        comment_by_time: {},
        totalCount: ''
      },
      // 资源id
      id: '19723756'
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
      let result = await this.request.get(`/playlist/detail?id=${id}`);
      let {coverImgUrl, updateTime, name, subscribedCount, shareCount, commentCount, playCount, tracks, trackCount} = result.playlist;
      let updateFrequency = this.toplistTags.filter((item, index, array) => item.id==id)[0].updateFrequency;
      this.currentListData = {coverImgUrl, updateTime, name, subscribedCount, shareCount, commentCount, tracks, playCount, updateFrequency, trackCount};
    },

    // 获取歌单评论
    async getToplistComments(id=19723756, pageNo=1) {
      let timestamp = new Date().getTime();
      // 按时间排序
      let  result_by_time = await this.request.get(`/comment/new?type=2&id=${id}&sortType=3&pageSize=20&${timestamp}`);
      this.allComment.comment_by_time = result_by_time.data;
      // 按热度排序
      let  result_by_hot = await this.request.get(`/comment/new?type=2&pageNo=${pageNo}&id=${id}&sortType=2&pageSize=20&${timestamp}`);
      this.allComment.comment_by_hot = result_by_hot.data;
      this.allComment.totalCount = result_by_hot.data.totalCount;
    }
  },
  watch: {
    $route(newValue) {
      let newId = newValue.query.id;
      this.getToplistData(newId);
      this.getToplistComments(newId);
      this.id = newId;
    }
  },
  provide() {
    return {
      getToplistComments: this.getToplistComments
    }
  }
}
</script>

<style scoped>
.wrapper {
  background-color: rgb(245, 245, 245);
  font-family: Arial, Helvetica, sans-serif;
}
.main-content {
  display: flex;
  width: 982px;
  border: 1px solid rgba(0, 0, 0, .2);
  margin: 0 auto;
}
.main-content .aside {
  width: 400px;
  border: 1px solid rgba(0, 0, 0, .2);
}
.main-content .content {
  width: 100%;
  padding: 30px;
  background-color: rgb(255, 255, 255);
}
</style>
