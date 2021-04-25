<!-- 歌单的首部（介绍） -->
<template>
  <div class="playlistheader-wrapper" :class="{'detail': isDetail}">
    <div class="img-container">
      <img :src="currentListData.coverImgUrl" alt="">
      <span class="mask"></span>
    </div>
    <div class="description">
      <div class="list-name">
        <i v-if="isDetail" class="detail-icon"></i>
        <h2>
          {{currentListData.name}}  
        </h2>
      </div>
      <div class="update-time" v-if="!isDetail">
        <i></i>
        <span>最近更新：{{updateTime}}</span>
        <span class="updatefrequency">({{currentListData.updateFrequency}})</span>
      </div>
      <!-- 歌单详情的创建者，创建时间 -->
      <div class="create" v-else>
        <img class="creater-avatar" :src="currentListData.avatarUrl" alt="" align="absmiddle">
        <span class="creater">{{currentListData.nickname}}</span>
        <span class="create-time">{{createTime}}创建</span>
      </div>
      <div class="operation">
        <a href="javascript:;" class="play">
          <i>
            <em class="icon"></em>
            播放
          </i>
        </a>
        <a href="javascript:;" class="add"></a>
        <a href="javascript:;" class="collect">
          <i>
            ({{currentListData.subscribedCount}})
          </i>
        </a>
        <a href="javascript:;" class="share">
          <i>
            ({{currentListData.shareCount}})
          </i>
        </a>
        <a href="javascript:;" class="download">
          <i>
            下载
          </i>
        </a>
        <a href="javascript:;" class="comments">
          <i>
            ({{currentListData.commentCount}})
          </i>
        </a>
      </div>
      <!-- 歌单详情的标签 -->
      <div v-if="isDetail" class="tags">
        <span>标签：</span>
        <span v-for="item in currentListData.tags" :key="item" class="tag">{{item}}</span>
      </div>
      <!-- 歌单详情的介绍 -->
      <div v-if="isDetail" class="intro">
        <span>介绍：</span>
        <span>{{currentListData.description}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from '../utils/time.js'
export default {
  props: {
    currentListData: {
      type: Object
    },
    // 是否是详情页的歌单
    isDetail: {
      type: Boolean
    }
  },
  created () {
    // console.log(this.currentListData);
  },
  data () {
    return {
    }
  },
  computed: {
    updateTime() {
      return  dateFormat(this.currentListData.updateTime, 'm月d日')
    },
    createTime() {
      return dateFormat(this.currentListData.createTime, 'Y年m月d日');
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.playlistheader-wrapper {
  margin-bottom: 50px;
  margin: 10px 0 50px 0;
  display: flex;
}
.img-container {
  width: 150px;
  height: 150px;
  position: relative;
  padding: 3px;
  border: 1px solid rgba(0, 0, 0, .2);
}
.img-container img {
  width: 150px;
  height: 150px;
}
.img-container .mask {
  left: 0;
  position: absolute;
  width: 150px;
  height: 150px;
  background-position: -230px -380px;
  background-image: url('../assets/icon/coverall.png');
}
.description {
  padding: 18px 0 0 0;
  margin-left: 30px;
}
.description .list-name h2{
  font-size: 20px;
  font-weight: 500;
}
.description .update-time {
  margin: 10px 0 30px 0;
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, .7);
}
.description .update-time .updatefrequency {
  color: rgba(0, 0, 0, .4);
}
.description .update-time i {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 5px;
  background-position: -18px -682px;
  background-image: url('../assets/icon/icon.png');
  vertical-align: middle;
}
/* 操作按钮 */
.operation a {
  padding: 0 5px 0 0;
  display: inline-block;
  height: 31px;
  line-height: 31px;
  background-image: url('../assets/icon/button2.png');
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: white;
  vertical-align: top;
}
.operation a i {
  color: black;
  display: inline-block;
  padding-left: 28px;
  background-image: url('../assets/icon/button2.png'); 
}
.operation  .play {
  padding: 0 5px 0 0;
  background-position: right -428px;
  vertical-align: top;
}
.operation  .play:hover i .icon {
  background-position: -28px -1622px;
}
.operation  .play:hover i {
  background-position: 0 -469px;
}
.operation  .play i{
  display: inline-block;
  line-height: 31px;
  height: 31px;
  padding: 0 7px 0 8px;
  background-position: 0 -387px;
  background-image: url('../assets/icon/button2.png');
  font-style: normal;
  vertical-align: top;
  color: white;
}
.operation  .play i .icon {
  display: inline-block;
  width: 20px;
  height: 18px;
  margin: 6px 2px 2px 0;
  background-position: 0 -1622px;
  background-image: url('../assets/icon/button2.png');  
  vertical-align: top;
}
.operation  .add {
  display: inline-block;
  margin-right: 5px;
  background-position: 0 -1588px;
  width: 31px;
  margin-left: -3px;
  padding-right: 0;
  padding: 0 5px 0 0;
}
.operation  .add:hover {
  background-position: -40px -1588px;
}
.operation .collect {
  height: 31px;
  line-height: 31px;
  padding: 0 5px 0 0;
  background-position: right -1020px;
  color: black;
  vertical-align: top;
}
.operation .collect:hover {
  background-position: right -1106px;
}
.operation .collect:hover i {
  background-position: 0 -1063px;
}
.operation .collect i {
  display: inline-block;
  background-position: 0 -977px;
  padding-right: 2px;
  padding-left: 28px;
  background-image: url('../assets/icon/button2.png'); 
  font-style: normal;
}
.operation .share {
  margin-right: 6px;
  background-position: right -1020px;
  padding: 0 5px 0 0;
  vertical-align: top;
  color: black;
}
.operation .share:hover {
  background-position: right -1106px;
}
.operation .share:hover i {
  background-position: 0 -1268px;
}
.operation .share i {
  display: inline-block;
  padding-left: 28px;
  background-position: 0 -1225px;
  background-image: url('../assets/icon/button2.png'); 
  font-style: normal;
}
.operation .download {
  background-position: right -1020px;
  margin-right: 5px;
}
.operation .download:hover {
  background-position: right -1106px;
}
.operation .download:hover i {
  background-position: 0 -2805px;
}
.operation .download i {
  background-position: 0 -2761px;
  padding-right: 2px;
  padding-left: 30px;
  font-style: normal;
}
.operation .comments {
  background-position: right -1020px;
  margin-right: 5px;
}
.operation .comments:hover {
  background-position: right -1106px;
}
.operation .comments:hover i {
  background-position: 0 -1465px;
}
.operation .comments i {
  background-position: 0 -1465px;
  padding-right: 2px;
  padding-left: 30px;
  font-style: normal;
}
/* 歌单详情 */
.detail .img-container {
  width: 208px;
  height: 208px;
}
.detail .img-container img {
  width: 208px;
  height: 208px;
}
.detail .creater-avatar {
  width: 35px;
  height: 35px;
}
.detail .detail-icon {
  display: inline-block;
  width: 54px;
  height: 24px;
  background-image: url('../assets/icon/icon.png');
  background-position: 0 -243px;
  vertical-align: top;
}
.detail .description  h2 {
  display: inline-block;
}
/* 创建者 */
.detail .create {
  vertical-align: middle;
  font-size: 12px;
  margin: 10px 0 15px 0;
}
.detail .creater {
  color: #0c73c2;
  margin-left: 6px;
  cursor: pointer;
}
.detail .creater:hover {
  text-decoration: underline;
}
.detail .create-time {
  color: #999;
  margin-left: 30px;
}
.detail .tags,
.detail .intro {
  margin: px 0;
  font-size: 12px;
  color: #666;
}
.detail .tags {
  margin: 20px 0;
  margin-bottom: 5px;
}
/* 标签 */
.detail .tag {
  display: inline-block;
  padding: 1px 8px;
  margin: 0 3px;
  border: 1px solid rgba(0, 0, 0,  .1);
  border-radius: 20px;
  background-image: linear-gradient(rgb(249, 249, 249), rgb(240, 240, 240));
  color: #999;
  cursor: pointer;
}
.detail .tag:hover {
  background-image: linear-gradient(rgb(255, 255, 255), rgb(250, 250, 250));
}
</style>
