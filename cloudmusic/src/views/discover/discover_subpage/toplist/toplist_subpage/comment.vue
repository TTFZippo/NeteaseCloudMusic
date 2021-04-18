<!-- 评论 -->
<template>
  <div class="listcomment-wrap">
    <div class="label">
      <div>
        <h2>评论</h2>
        <span class="commentCount">共{{allComment.totalCount}}评论</span>
      </div>
    </div>

    <!-- 发表评论 -->
    <div class="mk-comment">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="avatarUrl ? avatarUrl: defaultUrl" :alt="avatarUrl">
      </div>
      <!-- 右侧操作区 -->
      <div class="right-oper">
        <div class="inputarea">
          <textarea name="" id="" cols="30" rows="10" placeholder="评论" v-model="commentContent"></textarea>
        </div>
        <div class="btns">
          <span>
            <i class="emoj icon"></i>
            <i class="at icon"></i>
          </span>
          <span>
            <span class="rest-count">{{restWord}}</span>
            <a href="javascript:;" class="post" @click="post">评论</a>
          </span>
        </div>
        <div class="corr">
          <em class="arrline">◆</em>
          <span class="arrclr">◆</span>
        </div>
      </div>
    </div>

    <!-- 热门评论和最新评论 -->
    <div class="comment-hot_new">
      <!-- 只有在分页1出现 -->
      <div class="comment-hot" v-if="activedIndex==1">
        <h3>精彩评论</h3>
        <comment-box :commentData="comments_by_hot[index]" :id="id" v-for="(item, index) in comments_by_hot" :key="index"></comment-box>
      </div>
      <div class="comment-time">
        <h3>最新评论</h3>
        <comment-box :commentData="comments_by_time[index]" :id="id" v-for="(item, index) in comments_by_time" :key="index"></comment-box>
      </div>
    </div>

    <!-- 分页 -->
    <pagenation :totalCount="allComment.totalCount" @activedIndexChange="changePage"></pagenation>

  </div>
</template>

<script>
import commentBox from '../../../../../components/comment/commentBox.vue'
import pagenation from '../../../../../components/pagenation/pagenation.vue'
export default {
  created () {
    this.avatarUrl = window.sessionStorage.getItem('avatarUrl');
  },
  components: {
    'comment-box': commentBox,
    'pagenation': pagenation
  },
  props: {
    allComment: {
      type: Object,
      required: true
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      // 头像地址
      avatarUrl: '',
      defaultUrl: require('../../../../../assets/images/default_avatar.jpg'),
      // 评论内容
      commentContent: '',
      activedIndex: 1
    }
  },
  computed: {
    // 可输入字数
    restWord() {
      return 140 - this.commentContent.length;
    },
    // 热门评论数据
    comments_by_hot() {
      return this.allComment.comment_by_hot.comments;
    },
    // 最新评论数据
    comments_by_time() {
      return this.allComment.comment_by_time.comments;
    },
    // 记录上一条数据的time
    cursor() {
      let length = this.allComment.comment_by_time.comments.length;
      return this.allComment.comment_by_time.comments[length-1].time;
    }
  },
  methods: {
    // 提交评论
    post() {
      this.request.get(`/comment?t=1&type=2&id=19723756&content=${this.commentContent}`);
      this.getToplistComments(this.id, this.activedIndex, this.cursor);
    },

    // 根据分页刷新数据
    changePage(activedIndex) {
      this.activedIndex = activedIndex;
      this.getToplistComments(this.id, activedIndex, this.cursor);
    }
  },
  inject: ['getToplistComments']
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.listcomment-wrap {
  margin-top: 40px;
}
.label {
  border-bottom: 2px solid #c20c0c;
}
.label h2 {
  display: inline;
  margin-right: 20px;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
}
.label .commentCount {
  font-size: 12px;
  color: #666;
  line-height: 30px;
}

.mk-comment {
  margin-top: 20px;
  /* border: 1px solid red; */
  display: flex;
}
.mk-comment .avatar {
  width: 50px;
  height: 50px;
}
.mk-comment .avatar img {
  width: 100%;
  height: 100%;
}
.mk-comment .right-oper {
  margin-left: auto;
  width: calc(100% - 75px);
}
.mk-comment .inputarea textarea {
  padding-left: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border: 1px solid #cdcdcd;
  resize: none;
  outline: none;
}
.mk-comment .inputarea textarea::placeholder {
  color: #999;
  font-family: Arial, Helvetica, sans-serif;
}
.right-oper {
  position: relative;
}
.right-oper .btns {
  padding-top: 8px;
  display: flex;
  justify-content: space-between;
}
.right-oper .btns .icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url('../../../../../assets/icon/icon.png');
  cursor: pointer;
}
.right-oper .btns .emoj {
  margin-right: 10px;
  background-position: -40px -490px;
}
.right-oper .btns .at {
  background-position: -60px -490px;
}
.right-oper .btns .rest-count {
  margin-right: 8px;
  color: #999;
  font-size: 12px;
  line-height: 16px;
}
.right-oper .btns .post {
  display: inline-block;
  width: 46px;
  height: 25px;
  background-position: -84px -64px;
  background-image: url('../../../../../assets/icon/button.png');
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 12px;
  line-height: 25px;
}
.right-oper .btns .post:hover {
  background-position: -84px -94px;
}

/* 小三角 */
.corr {
  position: absolute;
  top: 15px;
  left: -8px;
}
.arrline {
  display: block;
  font-family: "SimSun";
  font-size: 15px;
  font-style: normal;
  font-weight: normal;
  height: 10px;
  line-height: normal;
  color: #cdcdcd;
  text-align: left;
}
.arrclr {
  display: block;
  margin: -10px 0 0 1px;
  font-family: "SimSun";
  font-size: 15px;
  font-style: normal;
  font-weight: normal;
  height: 10px;
  line-height: normal;
  color: #fff;
}

.comment-hot_new {
  margin-top: 25px;
}
.comment-time h3,
.comment-hot h3 {
  border-bottom: 1px solid #cfcfcf;
  font-size: 12px;
}

</style>
