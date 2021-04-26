<!-- 顶部导航栏 -->
<template>
  <div class="container">
    <nav class="wrapper">
      <div class="right-part">
        <h1 class="logo">
          <a href="javascript:;"></a>
        </h1>
        <ul class="nav-items">
          <li @click="gotoDiscovery">
            <span>
              <a href="javascript:;">
                <em>发现音乐</em>
                <!-- 点击时出现的小三角 -->
                <sub class="tri" v-if="currentPage=='发现音乐'">&nbsp;</sub>
              </a>
            </span>
          </li>
          <li @click="gotoMypage">
            <span>
              <a href="javascript:;">
                <em>我的音乐</em>
                <sub class="tri" v-if="currentPage=='我的音乐'">&nbsp;</sub>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a href="javascript:;">
                <em>朋友</em>
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
          <div v-if="avatarUrl" class="avatar-box">
            <img :src="window.sessionStorage.getItem('avatarUrl')" alt="" class="avatar">
            <ul class="oper">
              <li>我的主页</li>
              <li>我的消息</li>
              <li>我的等级</li>
              <li>会员认证</li>
              <li>个人设置</li>
              <li>实名认证</li>
              <li @click="logout">退出</li>
            </ul>
          </div>
          <a href="javascript:;" @click="login" v-else>登录</a>
        </div>
      </div>
    </nav>
    <my-dialog v-if="isLoginShow()">

    </my-dialog>
  </div>
</template>

<script>
import dialog from '../../views/dialog/dialog.vue'
import searchBox from '../searchbox/searchbox.vue'
import {mapMutations, mapGetters} from 'vuex'
export default {
  created () {
    this.avatarUrl = window.sessionStorage.getItem('avatarUrl');
  },
  data() {
    return {
      search_keyword: "",
      // 控制searchbox弹出
      isSearhcboxShow: false,
      avatarUrl: '',
      currentPage: '发现音乐',
      window: window
    };
  },
  components: {
    'search-box': searchBox,
    'my-dialog': dialog
  },
  computed: {
    
  },
  methods: {
    ...mapMutations(['changeLoginPageStatus']),
    ...mapGetters(['isLoginShow', 'getAccountData']),
    login() {
      this.changeLoginPageStatus(true);
    },
    // 跳转至我的音乐
    gotoMypage() {
      this.currentPage = '我的音乐'
      this.$router.push('/my');
    },
    // 跳转至发现音乐界面
    gotoDiscovery() {
      this.currentPage = '发现音乐'
      this.$router.push('/discover');
    },
    // 退出登录
    logout() {
      this.request.get('/logout');
      window.sessionStorage.removeItem('avatarUrl');
      window.sessionStorage.removeItem('id');
      window.sessionStorage.removeItem('nickname');
      this.avatarUrl = ''
    }
  },
  watch: {
    
  }
};  
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  display: block;
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
.avatar-box {
  position: relative;
  padding-top: 8px;
  /* cursor: pointer; */
}
.avatar-box:hover .oper {
  display: block;
}
.avatar-box .oper {
  display: none;
  width: 158px;
  position: absolute;
  top: 60px;
  left: -50px;
  list-style: none;
  background-color: rgb(36, 36, 36);
  border: 1px solid #202020;
  box-shadow: 0 8px 24px 0 rgb(0 0 0 / 50%);
  border-radius: 4px;
  line-height: 20px;
  color:#ccc;
}
.avatar-box .oper li {
  margin: 5px 0;
  cursor: pointer;
}
/* 登陆后显示头像 */
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
