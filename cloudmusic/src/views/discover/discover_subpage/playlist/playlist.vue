<!-- 歌单 -->
<template> 
  <div>
    <div class="playlist-container" @click.capture="categoriesDisappar">
      <category :allCategories="allCategories" :isCategoriesDisappar="isCategoriesDisappar" @currentCatChange="changeCat"></category>
      <div class="playlist-wrapper">
        <playlist-box
        class="playlist-box"
        v-for="item in playlists"
        :key="item.id"
        :name="item.name"
        :coverImgUrl="item.coverImgUrl"
        :palyCount="item.playCount"
        ></playlist-box>
      </div>
      <pagenation :pageSize=35 :totalCount="totalCount" class="pagenation" @activedIndexChange="changePage"  :isChangeCat="isChangeCat"></pagenation>
    </div>
    <footer>
        <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import category from './playlist_subpage/category.vue'
import playlistBox from '../../../../components/playlistBox.vue'
import footer from '../../../../components/footer/footer.vue'
import pagenation from '../../../../components/pagenation/pagenation.vue'
export default {
  components: {
    'playlist-box': playlistBox,
    'category': category,
    'my-footer': footer,
    'pagenation': pagenation
  },
  created () {
    this.getAllCategories();
    this.getPlaylists();
  },
  data () {
    return {
      // 所有分类标签
      allCategories: {},
      isCategoriesDisappar: true,
      // 歌单具体信息
      playlists: [],
      // 该分类歌单总数
      totalCount: '',
      currentCat: '',
      // 是否切换分类
      isChangeCat: false
    }
  },
  methods: {
    // 获取所有歌单分类标签（category）
    async getAllCategories() {
      const result = await this.request.get('/playlist/catlist');
      let {categories, sub} = result;
      this.allCategories = {categories, sub};
    },
    // 分类选择框出现
    categoriesDisappar() {
      this.isCategoriesDisappar = !this.isCategoriesDisappar;
    },
    // 根据category获取歌单
    async getPlaylists(cat='全部', currentPage=1) {
      let offset = (currentPage-1) * 35;
      let result = await this.request.get(`/top/playlist?limit=35&order=hot&cat=${cat}&offset=${offset}`);
      this.totalCount = result.total;
      result = result.playlists;
      this.playlists = [];
      for (const [, item] of result.entries()) {
        let { coverImgUrl, name, playCount, id } = item;
        this.playlists.push({ coverImgUrl, name, playCount, id });
      }
      console.log(result);
    },
    // 分页
    changePage(currentPage) {
      this.getPlaylists(this.currentCat, currentPage);
    },
    // 根据分类切换
    changeCat(currentCat) {
      this.isChangeCat = !this.isChangeCat; 
      this.currentCat = currentCat;
      this.getPlaylists(currentCat, 1);
    }
  }
}

</script>

<style scoped>
/* 整个歌单页面 */
.playlist-container {
  width: 982px;
  padding: 40px 30px 20px 30px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: white;
}

/* 装歌单的容器 */
.playlist-wrapper {
  display: flex;
  padding-top: 20px;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
}
.playlist-wrapper .playlist-box {
  margin: 10px 10px;
}

/* 分页 */
.pagenation {
  margin: 30px auto;
}
</style>
