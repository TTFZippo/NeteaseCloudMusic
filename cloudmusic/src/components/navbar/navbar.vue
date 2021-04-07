<!-- 顶部导航栏 -->
<template>
  <div class="container">
    <nav class="wrapper">
      <div class="right-part">
        <h1 class="logo">
          <a href="javascript:;"></a>
        </h1>
        <ul class="nav-items">
          <li>
            <span>
              <a href="javascript:;">
                <em>发现音乐</em>
                <!-- 点击时出现的小三角 -->
                <sub class="tri">&nbsp;</sub>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:;">
                <em>我的音乐</em>
                <sub class="tri">&nbsp;</sub>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:;">
                <em>朋友</em>
                <sub class="tri">&nbsp;</sub>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:;">
                <em>商城</em>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:;">
                <em>音乐人</em>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:;">
                <em>下载客户端</em>
              </a>
              <sup class="hot">&nbsp;</sup>
            </span>
          </li>
        </ul>
      </div>

      <div class="left-part">
        <div class="input-container">
          <div>
            <input type="text" placeholder="音乐/视频/电台/用户" v-model="search_keyword" @blur="isSearhcboxShow=false" @focus="isSearhcboxShow=true"/>
            <search-box :keywords="search_keyword" :isSearhcboxShow="isSearhcboxShow"></search-box>
          </div>
        </div>
        <div class="creator-center">创作者中心</div>
        <div class="login">
          <a href="javascript:;">登录</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import searchBox from '../searchbox/searchbox.vue'
export default {
  created () {
    // console.log(this)
    // this.request.get('/banner', {
    //   params: {
    //     type: 0
    //   }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   // console.log(err);
    // })
  },
  data() {
    return {
      search_keyword: "",
      // 控制searchbox弹出
      isSearhcboxShow: false
    };
  },
  components: {
    'search-box': searchBox
  },
  methods: {
    
  }
};  
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  background-color: #242424;
  border-bottom: 5px solid rgb(194, 12, 12);
}
.wrapper {
  width: 1100px;
  height: 69px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: #242424;
  color: white;
}
.wrapper .right-part {
  display: flex;
}
.wrapper a {
  color: white;
}
/* 网易云音乐logo */
.wrapper .logo {
  width: 180px;
  height: 100%;
  background: url("../../assets/images/topbar.png") no-repeat;
  background-position: 0 0;
}

/* 页面导航选项 */
.wrapper .nav-items {
  list-style: none;
  display: flex;
  justify-content: space-around;
}
.wrapper .nav-items li {
  position: relative;
  padding: 0 10px;
  line-height: 69px;
}
.wrapper .nav-items li:hover {
  background-color: rgb(0, 0, 0);
  cursor: pointer;
}
.wrapper .nav-items a {
  text-decoration: none;
}
.wrapper .nav-items em {
  font-style: normal;
}
/* 点击时出现的小三角 */
.wrapper .nav-items .tri {
  display: block;
  position: absolute;
  top: 63px;
  left: 50%;
  transform: translate(-50%);
  width: 12px;
  height: 7px;
  background: url("../../assets/images/topbar.png") no-repeat;
  background-position: -226px 0;
}
.wrapper .nav-items .hot {
  display: block;
  position: absolute;
  top: 21px;
  left: 100px;
  width: 28px;
  height: 19px;
  background: url("../../assets/images/topbar.png") no-repeat;
  background-position: -190px 0;
}
.wrapper .left-part {
  display: flex;
}
.wrapper .input-container {
  position: relative;
  width: 158px;
  height: 32px;
  margin-top: 22px;
  margin-left: 50px;
  border-radius: 32px;
  background: url("../../assets/images/topbar.png") no-repeat;
  background-position: 0 -99px;
  background-color: white;
}
.wrapper .input-container input {
  position: relative;
  width: 78%;
  margin: 8px 0 0 30px;
  border: none;
  outline: none;
  line-height: 16px;
  color: #333;
  font-size: 12px;
}
.wrapper .input-container input::placeholder {
  color: #9b9b9b;
}

.wrapper .creator-center {
  margin: 19px 0 0 12px;
  width: 90px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  border: 1px solid #4F4F4F;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}
.wrapper .creator-center:hover {
  border: 1px solid #ccc;
}

.wrapper  .login {
  text-align: center;
  line-height: 69px;
  width: 60px;
}
.wrapper  .login a {
  text-decoration: none;
  color: #787878;
  font-size: 12px;
}
.wrapper  .login a:hover {
  text-decoration: underline;
}
</style>
