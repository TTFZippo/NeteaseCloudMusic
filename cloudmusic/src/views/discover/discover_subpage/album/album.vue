<!-- 新碟上架 -->
<template>
  <div>
    <main class="albums-wrapper">
      <div class="hot-albums">
        <div class="label">
          <h2>热门新碟</h2>
        </div>
        <div class="hot-albums-wrapper">
          <album v-for="(item, index) in hotAlbums_lt10" :key="index" :albumData="item" size='large' class="album"></album>
        </div>
      </div>
      <div class="new-albums">
        <div class="label">
          <h2>全部新碟</h2>
          <span v-for="(item,index) in area" :key="item">
            <a href="javascript:;" @click="changeArea(item)">{{item}}</a>
            <a href="javascript:;" class="line" v-if="index < area.length-1">|</a>
          </span>
        </div>
        <div class="new-albums-wrapper">
          <album v-for="(item, index) in newAlbums.albums" :key="index" :albumData="item" size='large' class="album"></album>
        </div>
      </div>
      <pagenation :totalCount="newAlbums.total" :pageSize="35" @activedIndexChange="changePage" class="pagenation"></pagenation>
    </main>
    <footer>
      <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import footer from '../../../../components/footer/footer.vue'
import pagenation from '../../../../components/pagenation/pagenation.vue'
import album from '../../../../components/album.vue'
export default {
  created () {
    this.getHotAlbums();
    this.getNewAlbums();
  },
  components: {
    'my-footer': footer,
    'pagenation': pagenation,
    'album': album
  },
  data () {
    return {
      newAlbums: {albums:[]},
      hotAlbums: {albums:[]},
      area: ['全部', '华语', '欧美', '韩国', '日本'],
      activePage: 1,
      activeArea: '全部',
      actvieAreaReflect: {
        '全部': 'ALL',
        '华语': 'ZH',
        '欧美': 'EA',
        '韩国': 'KR',
        '日本': 'JP'
      },
      isAreaChange: false
    }
  },
  computed: {
    // 热门新碟前十个
    hotAlbums_lt10() {
      return this.hotAlbums.albums.filter(
        (item, index, array) => index < 10
      );
    },
   
  },
  methods: {
    // 热门新碟
    async getHotAlbums() {
      let result = await this.request.get(`/album/newest`);
      this.hotAlbums = result;
    },
    // 其他新碟（华语、欧美、全部等）
    async getNewAlbums(area='ALL', offset=1, limit=35) {
      let result = await this.request.get(`/album/new?area=${area}&limit=${limit}&offset=${offset}`);
      this.newAlbums = result;
    },
    // 分页
    changePage(page) {
      this.activePage = page;
      let area = this.actvieAreaReflect[this.activeArea];
      this.getNewAlbums(area, page, undefined);
    },
    // 切换地区
    changeArea(area) {
      this.isAreaChange = !this.isAreaChange;
      this.activeArea = area;
      area = this.actvieAreaReflect[this.activeArea];
      this.getNewAlbums(area, this.activePage, undefined);
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.albums-wrapper {
  width: 982px;
  padding: 40px;
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  background-color: rgb(255, 255, 255);
}
.hot-albums-wrapper {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.album {
  margin-bottom: 8px;
}
.label {
  height: 34px;
  border-bottom: 2px solid #c20c0c;
  padding-bottom: 6px;
  margin-bottom: 5px;
}
.label h2 {
  font-weight: 400;
}
.new-albums .label {
  display: flex;
}
.new-albums .label h2 {
  margin-right: 18px;
}
.new-albums .label .line {
  padding: 0 10px;
}
.new-albums .label span {
   line-height: 40px;
   font-size: 12px;
}
.new-albums .label span a {
  text-decoration: none;
  color: #666;
}
.new-albums .label span a:hover {
  text-decoration: underline;
}

.new-albums-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.pagenation {
  margin-top: 30px;
}
</style>
