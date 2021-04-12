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
      <a href="javascript:;" class="previous" @click="previous"></a>
      <main class="swiper-content">
        <div
          class="roll"
          :style="{
            transform: `translate(-${101 * activeIndex}%)`,
            transition: istransition ? 'transform 1s linear' : ''
          }"
        >
          <div
            class="swiper-part"
            v-for="(item, index) in allAlbums"
            :key="index"
          >
            <album
              v-for="(albumItem, albumIndex) in item"
              :key="albumIndex"
              :albumData="albumItem"
            ></album>
          </div>
        </div>
      </main>
      <a href="javascript:;" class="next" @click="next"></a>
    </div>
  </div>
</template>

<script>
import album from "../../../../../components/album.vue";
export default {
  created() {
  },
  components: {
    album,
  },
  computed: {
    albums_part1() {
      return this.albums.filter(
        (item, index, array) => index > 4 && index <= 9
      );
    },
    albums_part2() {
      return this.albums.filter(
        (item, index, array) => index >= 0 && index <= 4
      );
    },
    allAlbums() {
      let allAlbums = [
        this.albums_part2,
        this.albums_part1,
        this.albums_part2,
        this.albums_part1,
      ];
      return allAlbums;
    },
  },
  props: {
    albums: {
      type: Array,
    },
  },
  data() {
    return {
      activeIndex: 0,
      istransition: true // 临界切换activeIndex时关闭
    };
  },
  methods: {
    // 上一张
    previous() {
      // 到达左边临界
      if(this.activeIndex == 0)  {
        this.istransition = false;
        this.activeIndex = 2;
        setTimeout(() => {
          this.istransition = true;
          this.activeIndex--;
        }, 10);
      } else {
        this.istransition = true;
        this.activeIndex--;
      }
    },
    // 下一张
    next() {
      if(this.activeIndex == 3)  {
        this.istransition = false;
        this.activeIndex = 1;
        setTimeout(() => {
          this.istransition = true;
          this.activeIndex++;
        }, 10);
      } else {
        this.istransition = true;
        this.activeIndex++;
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
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
.label .more i {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("../../../../../assets/icon/index.png") no-repeat 0 9999px;
  background-position: 0 -240px;
}
.label .more a:hover,
.label .tabs .single-tab li:hover {
  text-decoration: underline;
  cursor: pointer;
}
.swiper {
  position: relative;
  display: flex;
  background-color: rgb(245, 245, 245);
}
.swiper .swiper-content {
  margin-top: 20px;
  height: 180px;
  position: relative;
  display: flex;
  overflow: hidden;
  width: 95%;
}
.swiper .swiper-content .roll {
  display: flex;
  position: relative;
  width: 100%;
}
.swiper .swiper-content .roll .swiper-part {
  display: flex;
  transition: left 1s linear;
}

.swiper .previous,
.swiper .next {
  width: 17px;
  height: 17px;
  flex-basis: 17px;
  align-self: center;
  background: url("../../../../../assets/icon/index.png");
}
.swiper .previous {
  background-position: -260px -75px;
}
.swiper .previous:hover {
  background-position: -280px -75px;
}
.swiper .next {
  background-position: -300px -75px;
}
.swiper .next:hover {
  background-position: -320px -75px;
}
</style>
