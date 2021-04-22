<!-- 基于标签的子页面 -->
<template>
  <div class="subpage_by_cat">
    <div>
      <div class="label">
        <h2>优秀新电台</h2>
      </div>
      <div class="good-radios-wrapper">
        <div v-for="(item, index) in categorySubPageData.recommandRadios" :key="index" :style="{display: index < 5 ? 'block': 'none'}">
          <div class="good-radio" v-if="index < 5">
            <img :src="item.picUrl" alt="">
            <h2>{{item.name}}</h2>
            <span>{{item.rcmdtext}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="ranked-radio-part">
      <div class="label">
        <h2>电台排行榜</h2>
        <a href="javascript:;">
          <span>上升最快</span>
          <span class="line">|</span>
          <span>最热电台</span>
        </a>
      </div>
      <div class="ranked-radio-wrapper">
        <div class="ranked-raido" v-for="(item, index) in categorySubPageData.rankedRadios.djRadios" :key="index">
          <img :src="item.picUrl" alt="">
          <div class="desc">
            <h2>{{item.name}}</h2>
            <div class="icon-name">
              <i></i>
              <span class="nickname">{{item.dj.nickname}}</span>
            </div>
            <div class="count">
              <span class="totoalCount">共{{item.programCount}}期</span>
              <span class="subCount">订阅{{item.subCount}}次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagenation :totalCount="categorySubPageData.rankedRadios.count" :pageSize="30" class="pagenation"></pagenation>
  </div>
</template>

<script>

import pagenation from '../../../../../components/pagenation/pagenation.vue'
export default {
  props: {
    categorySubPageData: {
      type: Object,
      // required: true
    }
  },
  components: {
    'pagenation': pagenation
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.subpage_by_cat {
  margin-top: 20px;
}
.label {
  display: flex;
  padding-bottom: 10px;
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

/* 优秀新电台 */
.good-radios-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.good-radio {
  width: 150px;
}
.good-radio img {
  width: 150px;
}
.good-radio h2 {
  color: #333;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
}
.good-radio span {
  color: #999;
  font-size: 12px;
}

/* 电台排行榜 */
.ranked-radio-part {
  margin-top: 20px;
}
.ranked-radio-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.ranked-raido {
  padding: 0 20px 0 20px;
  margin-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  box-sizing: border-box;
  width: 450px;
  display: flex;
}
.ranked-raido img{
  width: 120px;
  height: 120px;
}
.ranked-raido .desc {
  margin-left: 20px;
  padding: 18px 0;
  color: #333;
}
.ranked-raido .desc .icon-name {
  margin-top: 22px;
  margin-bottom: 10px;
}
.ranked-raido .desc h2 {
  font-size: 18px;
}
.ranked-raido .desc i {
  display: inline-block;
  width: 14px;
  height: 15px;
  background-image: url('../../../../../assets/icon/icon.png');
  background-position: -50px -300px;
}
.ranked-raido .desc .nickname {
  margin-left: 5px;
  font-size: 12px;
}
.ranked-raido .desc .count {
  font-size: 12px;
  color: #999;
}

.pagenation {
  margin-top: 20px;
}
</style>
