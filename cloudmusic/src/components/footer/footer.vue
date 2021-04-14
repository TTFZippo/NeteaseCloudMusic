<!-- 页面底部协议 -->
<template>
  <div class="footer-wrapper">
    <div class="footer-content">
      <div class="copy">
        <p class="link-container">
          <span v-for="item in links" :key="item" class="link">
            <a href="javascript:;">{{item}}</a>
            <span class="line">|</span>
          </span>
        </p>
        <p>
          <span class="copy-right">网易公司版权所有©1997-2021</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png">浙网文[2021] 1186-054号</a>
        </p>
        <p>
          <span class="report">违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：</span>
          <a href="mailto:ncm5990@163.com">ncm5990@163.com</a>
        </p>
        <p>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" class="desc">粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564">
            <span class="police-logo"></span>
            <span>浙公网安备 33010902002564号</span>
          </a>
        </p>
      </div>
      <ul class="enter">
        <li v-for="(item,index) in enterLinks" :key="index">
          <a href="javascript:;"></a>
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: ['服务条款', '隐私政策', '儿童隐私政策', '版权投诉指引', '意见反馈'],
      enterLinks: [,,,,,]
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.footer-wrapper {
  padding-top: 10px;
  padding-bottom: 50px;
  background-color: rgb(242, 242, 242);
  font-size: 12px;
  border-top: 1px solid rgba(0, 0, 0, .1);
}
.footer-content {
  display: flex;
  margin: 0 auto;
  width: 982px;
}
.footer-content span,
.footer-content a {
  text-decoration: none;
  color: #666;
}
.footer-content a:hover {
  text-decoration: underline;
}
.copy p{
  margin: 8px 0;
}
.copy .link-container a{
  color: #999;
}
.copy .line {
  margin: 0 12px;
}
.copy .copy-right,
.copy .desc,
.copy .report {
  margin-right: 10px;
}
.copy .police-logo {
  display: inline-block;
  vertical-align:text-bottom;
  width: 14px;
  height: 14px;
  background-image: url('../../assets/icon/police.png');
  background-size: cover;
}

.enter {
  display: flex;
  width: 420px;
  margin-left: auto;
  padding-top: 15px;
  list-style: none;
  justify-content: space-between;
}
.enter li {
  width: 60px;
  height: 70px;
}
.enter li a {
  height: 45px;
  width: 50px;
  margin: 0 auto;
  display: block;
  background-image: url('../../assets/icon/foot_enter_new.png');
  background-size: 110px 552px;
}
.enter li span {
  display: inline-block;
  width: 72px;
  height: 14px;
  margin: 5px 5px 0;
  background-size: 180px 139px;
  background-image: url('../../assets/icon/foot_enter_tt.png');
}
.enter li:nth-of-type(1) a {
  background-position: -60px -456.5px;
}
.enter li:nth-of-type(2) a {
  background-position: -60px -101px;
}
.enter li:nth-of-type(3) a {
  background-position: 0 0;
}
.enter li:nth-of-type(4) a {
  background-position: -60px -50px;
}
.enter li:nth-of-type(5) a {
  background-position: 0 -101px;
}

.enter li:nth-of-type(1) span {
  background-position: 0 -108px;
}
.enter li:nth-of-type(2) span {
  background-position: -1px -91px;
}
.enter li:nth-of-type(3) span {
  background-position: 0 0;
}
.enter li:nth-of-type(4) span {
  background-position: 0 -54px;
}
.enter li:nth-of-type(5) span {
  background-position: -1px -72px;
}
</style>
