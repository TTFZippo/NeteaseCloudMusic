<!-- 艺人介绍 -->
<template>
  <div>
    <h2 class="label">
      <i></i>
      {{name}}简介
    </h2>
    <span class="desc">{{briefDesc}}</span>
  </div>
</template>

<script>
export default {
  created () {
    let id = this.$route.query.id;
    this.getArtistDesc(id);
  },
  data () {
    return {
      briefDesc: '',
      name: ''
    }
  },
  methods: {
    // 获取歌手描述
    async getArtistDesc(id) {
      let result = await this.request.get(`/artist/detail?id=${id}`);
      this.briefDesc = result.data.artist.briefDesc;
      this.name = result.data.artist.name;
    },
  }
}

</script>

<style scoped>

.label {
  margin: 28px 0 8px 0;
  font-size: 14px;
  color: #333;
}
.label i {
  display: inline-block;
  height: 14px;
  width: 3px;
  background: #c10d0c;
}
.desc {
  line-height: 25px;
  color: #666;
  text-indent: 2em;
  font-size: 12px;
}
</style>
