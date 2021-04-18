<!-- 展示评论框 -->
<template>
  <div class="comment-box">
    <div class="avatar-container">
      <img :src="commentData.user.avatarUrl" alt="">
    </div>

    <div class="comment-content">
      <div>
        <a href="javascript:;" class="publisher">{{commentData.user.nickname}}：</a>
        <p>{{commentData.content}}</p>
      </div>

      <div class="comment-status">
        <span class="publishTime">{{publishTime}}</span>
        <span>
          <a href="javascript:;" @click="deleteComment(commentData.commentId, 2)" v-if="nickname == commentData.user.nickname" class="delete">删除</a>
          <a href="javascript:;" class="like">
            <i class="like-icon"></i>
            ({{commentData.likedCount}})
          </a>
          <span class="line">|</span>
          <a href="javascript:;" class="reply">回复</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import timeFormat from '../../utils/time.js'
export default {
  created () {
    this.nickname = window.sessionStorage.getItem('nickname');
  },
  props: {
    commentData: {
      required: true
    },
    // 资源id
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      nickname: ''
    }
  },
  computed: {
    publishTime() {
      return timeFormat(this.commentData.time, 'Y年m月d日H时i分')
    }
  },
  methods: {
    async deleteComment(commentId, type) {
      let id = this.id;
      const result = await this.request.get(`/comment?t=0&type=${type}&id=${id}&commentId=${commentId}`);
    }
  }
}

</script>

<style scoped>
.comment-box {
  display: flex;
  padding: 15px 0;
  border-top: 1px dotted #ccc;
  font-size: 12px;
  color: #333;
}
.comment-box a {
  text-decoration: none;
}
.comment-box a:hover {
  text-decoration: underline;
}
.avatar-container {
  width: 50px;
  height: 50px;
}
.avatar-container img {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.comment-content {
  padding: 2px 0 0 0;
  margin-left: 20px;
  width: calc(100% - 50px);
}
.comment-content .publisher {
  color: #0c73c2;
}
.comment-content p{
  display: inline;
}
.comment-status {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}
.comment-status .publishTime {
  color: #999;
}
.comment-status .like {
  color: #333;
}
.comment-status .like i{
  display: inline-block;
  width: 15px;
  height: 14px;
  background-position: -150px 0;
  background-image: url('../../assets/icon/icon2.png');
  vertical-align: top;
  
}
.comment-status .reply {
  color: #666;
}
.comment-status .line {
  padding: 0 10px;
  color: #999;
}
.comment-box:hover .delete {
  display: inline-block;
}
.delete {
  display: none;
  margin-right: 10px;
  color: #666;
}
</style>
