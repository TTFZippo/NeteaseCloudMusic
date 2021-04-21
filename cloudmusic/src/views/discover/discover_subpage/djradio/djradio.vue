<!-- 主播电台 -->
<template>
  <div>
    <div class="djradio-wrapper">
      <div class="tags-wrapper">
        <a
          href="javascript:;"
          v-for="item in categoriesData"
          :key="item.categoryId"
          :class="{ active: activeCategory === item.categoryName }"
          @click="changeCategory(item)"
        >
          <div class="icon"></div>
          <span clas="category-name">{{ item.categoryName }}</span>
        </a>
      </div>
      <div v-if="!activeCategory">
        <!-- 推荐节目和节目排行榜 -->
        <div class="rank-rec">
          <div class="recommand-programs-wrapper">
            <div class="label">
              <h2>推荐节目</h2>
              <a href="javascript:;">更多></a>
            </div>
            <div class="recommand-programs">
              <rec-program-item v-for="(item, index) in recommandPrograms" :key="item.name" :program="item" :isOdd="index%2 != 0">
              </rec-program-item>
            </div>
          </div>
          <div class="rank-programs-wrapper">
            <div class="label">
              <h2>节目排行榜</h2>
              <a href="javascript:;">更多></a>
            </div>
            <div class="rank-programs">
              <rank-program-item v-for="(item, index) in rankedPrograms" :key="item.name" :program="item" :isOdd="index%2 != 0" :index="index">
              </rank-program-item>
            </div>
          </div>
        </div>

        <!-- 电台的推荐 -->
        <div class="rec-radio" v-for="(item_type, index_type) in recRadioData" :key="index_type">
          <div class="label">
            <h2>{{recRadiosName[index_type]}} · 电台</h2>
            <a href="javascript:;">更多></a>
          </div>
          <div class="raidoboxs-wrapper">
            <div v-for="(item_radio, index_radio) in item_type.djRadios" :key="index_radio">
              <div v-if="index_radio < 4" class="radio-box">
                <img :src="item_radio.picUrl" alt="">
                <div class="desc">
                  <h3>{{item_radio.name}}</h3>
                  <span>{{item_radio.rcmdtext}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <djradio-by-cat v-else></djradio-by-cat>
    </div>
    <footer>
      <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import footer from "../../../../components/footer/footer.vue";
import recitem from './djradio_subpage/rec-pro-item.vue'
import rankitem from './djradio_subpage/rank-program-item.vue'
import djradio_by_cat from './djradio_subpage/djradio_by_cat.vue'
import djradio_tags_style from "../../../../assets/style/djradio_tags.css";
export default {
  components: {
    "my-footer": footer,
    "rec-program-item": recitem,
    'rank-program-item': rankitem,
    'djradio-by-cat': djradio_by_cat
  },
  created() {
    this.getAllcategories();
    this.getAllrecPrograms();
    this.getAllRankedPrograms();
    this.getRankedDjs();
    this.getRadioPageRecommand();
  },
  data() {
    return {
      // 节目分类标签及其代表节目
      categoriesData: [],
      activeCategory: "",
      recommandPrograms: [],
      rankedPrograms: [],
      // 所有推荐电台
      recRadiosId: [2,6,5,3,2001,11],
      recRadiosName: ['音乐故事','助眠解压','侃侃而谈','情感调频','创作翻唱', '其他'],
      recRadioData: [],
      // 根据分类子页面数据
      categorySubPageData: {}
    };
  },
  methods: {
    // 获取所有电台标签
    async getAllcategories() {
      let result = await this.request.get("/dj/category/recommend");
      result = result.data;
      this.categoriesData = [];
      for (let [, item] of result.entries()) {
        let { categoryId, categoryName } = item;
        this.categoriesData.push({ categoryId, categoryName });
      }
      this.categoriesData.push({
        categoryId: 99999,
        categoryName: "常见问题"
      });
      this.categoriesData.push({
        categoryId: 88888,
        categoryName: "我要做主播"
      });
      // console.log(this.categoriesData);
    },

    // 切换分类
    changeCategory(item) {
      this.activeCategory = item.categoryName;
    },

    // 推荐节目
    async getAllrecPrograms() {
      let result = await this.request.get('/program/recommend');
      result = result.programs;
      for(let [,item] of result.entries()) {
        let {name: programName, radio: {category, name: artistName, picUrl}} = item;
        this.recommandPrograms.push({name: programName, category, artistName, picUrl});
      }
    },

    // 节目排行榜
    async getAllRankedPrograms() {
      let result = await this.request.get('/dj/program/toplist?limit=10&offset=0');
      result = result.toplist;
      for(let [,item] of result.entries()) {
        let {rank, lastRank, score, program: {coverUrl, name, dj: {brand}}} = item;
        this.rankedPrograms.push({rank, lastRank, score, coverUrl, name, brand})
      }
      // console.log(this.rankedPrograms);
    },

    // 分类优秀电台
    async getRankedDjs(type=3) {
      let result = await this.request.get(`/dj/recommend/type?type=${type}`);
    },

    // 获取主播电台页的推荐电台（每组四个）
    async getRadioPageRecommand() {
      for(let i = 0; i < this.recRadiosId.length; i++) {
        let result = await this.request.get(`/dj/recommend/type?type=${this.recRadiosId[i]}`);
        this.recRadioData.push(result);
        // console.log(result);
      }
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.djradio-wrapper {
  width: 982px;
  box-sizing: border-box;
  padding: 40px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  background-color: white;
}

/* 节目分类标签 */
/* 分类标签的bgimage 由外部djradio_tags_style文件确定*/
.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.tags-wrapper a {
  display: block;
  margin: 0 0 25px 33px;
  width: 70px;
  height: 70px;
  background-position: 0 9999px;
  background-image: url("../../../../assets/icon/radio_bg.png");
  background-repeat: no-repeat;
  color: #888;
  text-decoration: none;
  font-size: 12px;
  text-align: center;
}
.tags-wrapper a:hover {
  background-position: 0 0;
}
.tags-wrapper a.active {
  background-position: -70px 0;
}
.tags-wrapper a .icon {
  width: 48px;
  height: 48px;
  cursor: pointer;
  background-position: 0 0;
  margin: 0 auto;
}
.tags-wrapper a .category-name {
  margin-top: 2px;
}

/* 推荐节目、节目排行榜 */
.rank-rec {
  display: flex;
  margin-top: 30px;
  margin-bottom: 40px;
  justify-content: space-between;
}
.rank-programs-wrapper,
.recommand-programs-wrapper {
  width: 426px;
}
.label {
  display: flex;
  border-bottom: 2px solid #c20c0c;
}
.label a{
  margin-left: auto;
  line-height: 40px;
  text-decoration: none;
  color: #666;
  font-size: 12px;
}
.label a:hover {
  text-decoration: underline;
}
.label h2 {
  font-weight: normal;
}
.rank-programs,
.recommand-programs {
  border: 1px solid #e2e2e2;
}

/* 推荐电台 */
.rec-radio {
  margin-bottom: 50px;
}
.rec-radio img {
  width: 120px;
}
.raidoboxs-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.radio-box {
  padding: 20px 0;
  padding-right: 10px;
  
  border-top: 1px solid rgba(0, 0, 0, .1);
  width: 440px;
  display: flex;
}
.radio-box .desc {
  padding-top: 10px;
  width: 250px;
  margin-left: 20px;
}
.radio-box .desc h3 {
  font-size: 18px;
  color: #333;
  /* margin-bottom: 1px; */
}
.radio-box .desc span {
  display: block;
  margin-top: 24px;
  color: #999;
  font-size: 12px;
}
.radio-box .desc span ,
.radio-box .desc h3 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
