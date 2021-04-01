<template>
  <div class="suggest-box">
    <header>
      <a href="javascript:;">搜"{{keywords}}"相关用户</a>
    </header>
    <main>
      <ul>
        <!-- 单曲、歌手、专辑、歌单 -->
        <ul v-for="item in a.order" :key="item">
          <!-- <div>
            <i></i>
            <span>{{}}</span>
          </div>
          <ul>
            <li></li>
          </ul> -->
          {{item}}
        </ul>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  created() {},
  props: {
    // 搜索关键字
    keywords: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 搜索建议
      searchSuggest: {},
      a: {}
    };
  },
  computed: {
    
  },
  methods: {
    // 更新搜索建议
    updateSuggest(keywords) {
      this.request
        .get("/search/suggest", {
          params: {
            keywords
          }
        })
        .then((result) => {
          console.log(result);
           Object.assign(this.a, this.searchResult, result);
           console.log(this.a);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    // 监听keywords改变，动态获取搜索建议
    keywords(newKeyword) {
      this.updateSuggest(newKeyword);
    },

  },
};
</script>

<style scoped>
.suggest-box {
  top: 100px;
  width: 240px;
  height: 200px;
  position: absolute;
  z-index: 120;
  box-sizing: border-box;
  border: 1px solid #bebebe;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 7px #555;
  text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
}
</style>
