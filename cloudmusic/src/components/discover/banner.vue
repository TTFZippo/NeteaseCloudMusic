<!-- 轮播图 -->
<template>
  <div class="banner">
    <div class="banner-wrap">
      <div class="banner-main">
        <a href="javascript:;" class="back"></a>
        <div class="banner-image">
          <a href="javascript:;">
            <img
              :src="this.bannerData[1].imageUrl"
              alt=""
            />
          </a>
          <div class="dots">
            <a href="javascript:;" v-for="(item, index) in bannerData" :key="index"></a>
          </div>
        </div>
        <div class="download">
          <a href="https://music.163.com/#/download" class="download-btn"></a>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
        <a href="javascript:;" class="next"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAllBanners();
    console.log(this.bannerData);
  },
  data() {
    return {
      // 轮播图数据
      bannerData: [1,2],
      f: [, , , , , , , , ,],
    };
  },
  methods: {
    // 获取imageUrl和url
    addSetProperty(target) {
      Object.defineProperties(target, {
        geturl: {
          value: function () {
            return { imageUrl: this.imageUrl, url: this.url };
          },
        },
      });
    },
    // 获取所有banner数据
    getAllBanners() {
      this.request
        .get("/banner", {
          params: {
            type: 0+'&timestamp=1503019930020',
          },
        })
        .then((result) => {
          for (let i = 0; i < result.banners.length; i++) {
            this.addSetProperty(result.banners[i]);
            this.bannerData[i] = JSON.parse(JSON.stringify(result.banners[i].geturl()));
          }
            console.log(this.bannerData);
        });
        console.log(this.bannerData);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.banner {
  background-image: url("http://p1.music.126.net/20x3sRIYQaOt4ydN7FJyyw==/109951165870521372.jpg?imageView&blur=40x20");
  background-repeat: no-repeat;
  background-size: 6000px;
  background-position: center center;
}
.banner-wrap {
  width: 982px;
  margin: 0 auto;
}
.banner-main {
  /* border: 1px solid red; */
  position: relative;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
}

/* 中间图片部分 */
.banner-main .banner-image {
  position: relative;
  width: 730px;
}
.banner-main .banner-image img {
  width: 730px;
  height: 100%;
}
.banner-main .banner-image .dots {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -110%);
}
/* 导航点 */
.banner-main .banner-image .dots a {
  margin: 0 10px;
  display: inline-block;
  text-decoration: none;
  width: 6px;
  height: 6px;
  background-color: rgba(240, 240, 240, .6);
  border-radius: 50%;
}
.banner-main .banner-image .dots a.active,
.banner-main .banner-image .dots a:hover {
  background-color: rgb(196, 12, 12);
}

/* 上一张、下一张 */
.banner-main .back,
.banner-main .next {
  align-self: center;
  width: 38px;
  height: 63px;
  font-size: 64px;
  text-decoration: none;
  color: rgb(226, 230, 229);
  font-weight: 300;
  background-image: url("../../assets/icon/banner.png");
}
.banner-main .back {
  position: absolute;
  right: 104%;
  background-position: 0 -360px;
}
.banner-main .next {
  position: absolute;
  left: 104%;
  background-position: 0 -508px;
} 
.banner-main .back:hover {
  background-position: 0 -430px;
}
.banner-main .next:hover {
  background-position: 0 -578px;
} 

/* 下载客户端 */
.banner-main .download {
  flex-basis: 3000px;
  background-image: url('../../assets/icon/download.png');
  height: 285px;
}
.banner-main .download .download-btn {
  display: block;
  width: 215px;
  height: 56px;
  margin: 186px 0 0 19px;
}
.banner-main .download .download-btn:hover {
  background-image: url('../../assets/icon/download.png');
  background-position: 0 -290px;
}
.banner-main .download p {
  margin: 10px auto;
  text-align: center;
  font-size: 12px;
  color: #8d8d8d;
}
</style>
