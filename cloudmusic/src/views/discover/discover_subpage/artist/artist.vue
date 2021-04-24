<!-- 歌手 -->
<template>
  <div class="artist-wrapper">
    <nav-menu @artistTypeChange="changeArtistType"></nav-menu>
    <div class="artist-cotent-wrapper">
      <header>
        <!-- 标题 -->
        <div class="label">
          <h2>{{title}}</h2>
        </div>
        <!-- 首字母筛选条件 -->
        <div class="initial-wrapper" v-if="activeType">
          <a href="javascript:;" v-for="item in initials" :key="item" :class="{'initial-active': `${item}`==activeInitial}" @click="changeInitial(item)">{{item}}</a>
        </div>
      </header>
      <main class="artist-main">
        <div class="artist-box-wrapper">
          <div class="artist-box" v-for="item in artistData_indexlt10" :key="item.id" @click="gotoArtistDetail(item.id)">
              <div class="img-wrapper">
                <img :src="item.img1v1Url" alt="">
                <a class="mask"></a>
              </div>
              <p>
                <span class="artistname">{{item.name}}</span>
                <i class="personal-icon"></i>
              </p>
          </div>
        </div>

        <div class="artist-text-wrapper">
          <span v-for="item in artistData_indexgt10" :key="item.id">
            {{item.name}}
            <i class="personal-icon"></i>
          </span>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import navMenu from './artist_subpage/navMenu.vue'
export default {
  components: {
    'nav-menu': navMenu
  },
  created () {
    this.getArtistsData();
  },
  data () {
    return {
      // 当前选中首字母（含热门和其他）
      activeInitial: '热门',
      // 默认为全部
      activeType: '',
      activeArea: '',
      title: '热门歌手',
      // 当页歌手信息
      artistData: []
    }
  },
  computed: {
    // 首字母筛选条件(含热门和其他)
    initials() {
      let initials = ['热门'];
      for(var i=0;i<26;i++){
        initials.push(String.fromCharCode((65+i)));
      }
      initials.push('其他'); 
      return initials;
    },
    // 前10个歌手（展示照片）
    artistData_indexlt10() {
      let artistDatalt10 = this.artistData.splice(0, 10);
      return artistDatalt10;
    },
    // 后90个歌手（展示名字）
    artistData_indexgt10() {
      return this.artistData;
    }
  },
  methods: {
    // 切换歌手分类
    changeArtistType(activeArtistData) {
      // 切换时，默认重设为热门
      this.activeInitial = '热门';
      let {activeTypeIndex: type, activeAreaIndex: area, activeType: title} = activeArtistData;
      this.getArtistsData(type, area, -1);
      this.activeType = type;
      this.activeArea = area;
      this.title = title;
    },
    // 切换首字母
    changeInitial(activeInitial) {
      this.activeInitial = activeInitial;
      // 热门 => -1   其他 => 0
      let activeInitialTrans = this.activeInitial;
      activeInitialTrans = activeInitialTrans=='热门' ? -1 : (activeInitialTrans=='其他' ? 0 :  activeInitialTrans);
      this.getArtistsData(this.activeType, this.activeArea, activeInitialTrans);
    },
    // 获取歌手
    // type=-1 : 全部 || area=-1：全部 || initial=-1 ：热门
    async getArtistsData(type=-1, area=-1, initial=-1) {
      let result = await this.request.get(`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=100`);
      result = result.artists;
      this.artistData = result;
      console.log(result);
    },

    // 跳转至歌手详情
    gotoArtistDetail(id) {
      this.$router.push({
        path: 'artist/detail',
        query: {
          id
        }
      })
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.artist-wrapper {
  display: flex;
  width: 982px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
}
.artist-cotent-wrapper {
  width: calc(100% - 220px);
  padding: 40px;
  background-color: white;
}
/* 标题 */
.label {
  border-bottom: 2px solid #c20c0c;
  height: 40px;
}
.label h2 {
  font-size: 24px;
  font-weight: normal;
  font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
}
/* 字母筛选部分 */
.initial-wrapper {
  display: flex;
  margin-top: 20px;
  padding: 0 5px;
  justify-content: space-between;
}
.initial-wrapper a {
  padding: 0 5px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
}
.initial-wrapper a.initial-active {
  background-color: #c20c0c;
  border-radius: 2px;
  color: #fff;
}
.initial-wrapper a:hover {
  text-decoration: underline;
}

.artist-main {
  margin-top: 20px;
  font-size: 12px;
}

/* 歌手照片展示部分 */
.artist-box-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.artist-box {
  width: 130px;
  height: 154px;
  padding: 0 0 30px 0;
  line-height: 1.4;
}
.artist-box p{
  display: flex;
}
.artist-box p i {
  margin-left: auto;
}
.artist-box .img-wrapper {
  position: relative;
  margin-bottom: 5px;
  width: 130px;
  height: 130px;
  cursor: pointer;
}
.artist-box .img-wrapper img {
  width: 100%;
  height: 100%;
}
.artist-box .img-wrapper a {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../../../../assets/icon/coverall.png');
  background-position: 0 -680px;
}
.artistname {
  cursor: pointer;
}
.artistname:hover {
  text-decoration: underline;
}

/* 无图片的歌手部分 */
.artist-text-wrapper {
  width: 102%;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px rgba(0, 0, 0, .4) dotted;
  justify-content: space-between;
}
.artist-text-wrapper span {
  width: 144px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;

}
  /* 个人首页icon */
.personal-icon {
  display: inline-block;
  margin-left: 3px;
  height: 18px;
  width: 17px;
  background-position: 0 -740px;
  background-image: url('../../../../assets/icon/icon.png');
  vertical-align: middle;
}
</style>
