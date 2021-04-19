<!-- 歌单顶部分类部分 -->
<template>
  <div class="label">
    <h1>{{currentCat}}</h1>
    <div class="categories-wrapper">
      <a href="javascript:;" class="choose-cat" @click="isCategoriesShow_in_category = !isCategoriesShow_in_category">
        <i>
          选择分类
          <em></em>
        </i>
      </a>
      <div class="categories" :class="{'categoriesShow': isCategoriesShow_in_category}"   @click="isCategoriesShow_in_category = true; isCategoriesShow_in_category = false">
        <div class="tri-icon">
          <i></i>
        </div>

        <div class="all-style-wrapper">
          <a href="javascript:;" class="all-style"  @click="currentCat = '全部'">全部风格</a>
        </div>
        
        <div>
          <div v-for="(item, index) in allCategories.categories" :key="item+index" class="cat-sub">
            <div class="sub-title">
              <div class="title-icon-wrapper">
                <i :class="`title-icon${index}`"></i>
              </div>
              <h1 class="title">{{item}}</h1>
            </div>
            <div class="sub-wrapper"> 
              <a v-for="(item_sub, index_sub) in sortedCategories[index]" :key="index_sub" href="javascript:;" @click="currentCat = item_sub.name; isCategoriesShow_in_category = false">
                {{item_sub.name}}
                <span class="line">|</span> 
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot">
      <a href="javascript:;">热门</a>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    },
  props: {
    allCategories: {
      type: Object,
      required: true
    },
    isCategoriesDisappar: {
      type: Boolean
    }
  },
  computed: {
    sortedCategories() {
      let sortedCategories = [];
      if(!this.allCategories.sub) return;
      for(let [index, item] of this.allCategories.sub.entries()) {
        if(!sortedCategories[item.category]) {
          // 第一次出现的item.category对应的数组置成空数组，否则没有push方法
          sortedCategories[item.category] = [];
        }
        sortedCategories[item.category].push(item);
      }
      return sortedCategories;
    }
  },
  data () {
    return {
        // 控制分类标签出现(点击分类按钮时生效)
        isCategoriesShow_in_category: false,
        // 当前选中的分类
        currentCat: '全部'
      }
  },
  methods: {
    
  },
  watch: {
    isCategoriesDisappar(newValue) {
      this.isCategoriesShow_in_category = false;
    },
    currentCat(newValue) {
      this.$emit('currentCatChange', newValue);
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.label {
  padding-bottom: 2px;
  height: 40px;
  line-height: 40px;
  display: flex;
  border-bottom: 2px solid #c20c0c;
}
.label a {
  text-decoration: none;
  color: black;
}
.label h1 {
  font-size: 24px;
  font-weight: 400;
}

.categories-wrapper {
  position: relative;
}

/* 选择分类按钮 */
.categories-wrapper .choose-cat {
  display: inline-block;
  margin-left: 10px;
  padding: 0 5px 0 0;
  background-image: url('../../../../../assets/icon/button2.png');
  background-position: right -100px;
  height: 31px;
  line-height: 31px;
  color: #0c73c2;
  font-size: 12px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
.choose-cat:active i{
  background-position: 0 -141px;
}
.choose-cat:active i em {
  background-position: -70px -543px;
}
.choose-cat i {
  display: inline-block;
  padding: 0 10px 0 15px;
  background-image: url('../../../../../assets/icon/button2.png');
  background-position: 0 -59px;
  height: 31px;
  line-height: 31px;
  font-style: normal;
}
.choose-cat i em {
  display: inline-block;
  background: url('../../../../../assets/icon/icon.png');
  background-position: -70px -543px;
  width: 8px;
  height: 5px;
  vertical-align: middle;
}

/* 右侧热门按钮 */
.hot {
  margin-top: 5px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-left: auto;
  border-radius: 3px;
  background-image: linear-gradient(rgb(210, 12, 13), rgb(168, 9, 9));
  font-size: 14px;

}
.hot a {
  display: inline-block;
  color: white;
}
.hot a:hover {
  text-decoration: underline;
}

/* 弹出的标签选择框 */
.categories {
  display: none;
  position: absolute;
  width: 720px;
  left: -70px;
  top: 50px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, .3);
  border: 1px solid rgb(0, 0, 0, .2);
  border-radius: 2px;
  background-color: white;
  z-index: 3;
}
.categories.categoriesShow {
  display: block;
}
/* 顶部小三角 */
.tri-icon {
  width: 100%;
}
.tri-icon i {
  display: inline-block;
  position: absolute;
  top: -11px;
  left: 120px;
  width: 24px;
  height: 11px;
  background-position: -48px 0;
  position: absolute;
  background-image: url('../../../../../assets/icon/iconall.png');
  font-style: normal;
  z-index: 5;
}
.categories .all-style-wrapperder {
  
}
/* 全部风格按钮 */
.all-style-wrapper {
  padding: 12px 0 5px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
.all-style {
  border: 1px solid rgba(0, 0, 0, .2);
  padding: 5px 14px;
  background-image: linear-gradient(rgb(255, 255, 255), rgb(244, 244, 244));
  border-radius: 2px;
  font-size: 12px;
  color: #666;
}
.all-style:hover {
  text-decoration: underline;
}
/* 单个分类（Eg:语种） */
.cat-sub {
  padding: 0 0 0 24px;
  display: flex;
  box-sizing: border-box;
  font-size: 12px;
}
.sub-title {
  padding-top: 10px;
  width: 80px;
  display: flex;
  border-right: 1px solid rgba(0, 0, 0, .1);
}
.sub-wrapper {
  padding-top: 10px;
  padding-left: 10px;
  width: 600px;
  display: flex;
  flex-wrap: wrap;
}
.sub-wrapper .line {
  padding: 0 5px;
  color: rgba(0, 0, 0, .3);
}
.sub-wrapper a:hover {
  text-decoration: underline;
}
.title-icon-wrapper {
  height: 40px;
}
.cat-sub i {
  display: inline-block;
  width: 23px;
  height: 23px;
  margin-right: 5px;
  line-height: 40px;
  background-image: url('../../../../../assets/icon/icon.png');
  vertical-align: middle;
}
/* 语种 */
.title-icon0 {
  background-position: -20px -735px;
}
/*  */
.title-icon1 {
  background-position: 0 -60px;
}
/* 场景 */
 .title-icon2 {
  background-position: 0 -88px;
}
/* 情感 */
 .title-icon3 {
  display: none;
  background-position: 0 -117px;
}
/* 主题 */
 .title-icon4  {
  background-position: 0 -141px;
}

h1.title {
  font-size: 12px;
  font-weight: 600;
}
</style>
