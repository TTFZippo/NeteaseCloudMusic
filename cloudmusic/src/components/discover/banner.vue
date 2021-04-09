<!-- 轮播图 -->
<template>
  <div
    class="banner"
    :style="{
      backgroundImage: `url(${bannerData[activeIndex].backgroundImage})`,
    }"
  >
    <div class="banner-wrap">
      <div class="banner-main">
        <a href="javascript:;" class="back" @click="back"></a>
        <div class="banner-image">
          <a href="">
            <img
              :src="bannerData[activeIndex].imageUrl"
              alt=""
              :class="{ auto: isAuto, active: isActive }"
            />
          </a>
          <div class="dots">
            <a
              href="javascript:;"
              v-for="(item, index) in bannerData"
              :key="index"
              :class="{ active: index == activeIndex }"
              @click="beActived(index)"
            ></a>
          </div>
        </div>
        <div class="download">
          <a href="https://music.163.com/#/download" class="download-btn"></a>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
        <a href="javascript:;" class="next" @click="next"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getAllBanners();
    this.autoplay();

  },
  data() {
    return {
      // 当前banner
      activeIndex: 0,
      // 轮播图数据
      bannerData: [
        {
          imageUrl: "",
          url: "",
        },
      ],

      canChange: false,
      isActive: true,
      isAuto: false
    };
  },
  methods: {
    autoplay(delay = 2000) {
      const timer1 = setInterval(() => {
        if(this.canChange) {
          this.isActive = true;
          this.next();
        } else {
          this.isActive = false;
        }
        this.canChange = !this.canChange
      }, delay);

    },
    // 点击导航点，改变banner图
    beActived(index) {
      this.activeIndex = index;
    },
    // 上一张
    back() {
      this.activeIndex > 0
        ? this.activeIndex--
        : (this.activeIndex = this.bannerData.length - 1);
    },
    // 下一张
    next() {
      this.activeIndex < 9 ? this.activeIndex++ : (this.activeIndex = 0);
    },
    // 获取imageUrl和url
    addSetProperty(target) {
      Object.defineProperties(target, {
        geturl: {
          value: function () {
            return {
              imageUrl: this.imageUrl,
              url: this.url,
              backgroundImage: `${this.imageUrl}?imageView&blur=40x20`,
            };
          },
        },
      });
    },
    // 获取所有banner数据
    async getAllBanners() {
      const result = await this.request.get("/banner", {
        params: {
          type: 0 + "&timestamp=15030199300251",
        },
      });
      this.bannerData = [];
      for (let i = 0; i < result.banners.length; i++) {
        this.addSetProperty(result.banners[i]);
        this.bannerData.push(result.banners[i].geturl());
      }
      // console.log(this.bannerData);
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
  /* background-color: rgba(255, 255, 255, 0.1); */
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
  opacity: 0;
  transition: opacity 2s linear;
}
/* 自动播放使用 */
.banner-main .banner-image img.active {
  opacity: 1;
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
  background-color: rgba(240, 240, 240, 0.6);
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
  background-image: url("../../assets/icon/download.png");
  height: 285px;
}
.banner-main .download .download-btn {
  display: block;
  width: 215px;
  height: 56px;
  margin: 186px 0 0 19px;
}
.banner-main .download .download-btn:hover {
  background-image: url("../../assets/icon/download.png");
  background-position: 0 -290px;
}
.banner-main .download p {
  margin: 10px auto;
  text-align: center;
  font-size: 12px;
  color: #8d8d8d;
}
</style>
