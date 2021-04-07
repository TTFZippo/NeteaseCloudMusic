<!--搜索结果框-->
<template>
  <div class="suggest-box"  v-if="isShow && isSearhcboxShow">
    <header class="search-user">
      <a href="javascript:;">搜"{{ keywords }}"相关用户></a>
    </header>
    <main class="main-suggest">
      <!-- 单曲、歌手、专辑、歌单 -->
      <ul class="">
        <ul v-for="(item, key) in searchResult" :key="key" class="suggest-item-container">
          <li class="suggest-items">
            <!-- 左侧 -->
            <div class="right-item">
              <i></i>
              <h3>{{ item_cn(key) }}</h3>
            </div>
            <!-- 右侧 -->
            <ul class="left-item">
              <li v-for="(item1, index1) in item" :key="item1.name+index1">{{ item1.name }}</li>
            </ul>
          </li>
        </ul>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    // 搜索关键字
    keywords: {
      type: String,
      default: "",
    },
    isSearhcboxShow: {
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      // 搜索建议
      searchSuggest: {},
      // 搜索结果
      searchResult: {},
      // 控制搜索结果框出现
      isShow: false
    };
  },
  computed: {
    // 将键名转化为中文
    item_cn(key) {
      return function (key) {
        let itemTranslate = {
          songs: "歌曲",
          artists: "歌手",
          albums: "专辑",
          playlists: "歌单",
        };
        return itemTranslate[key];
      };
    },
  },
  methods: {
    // 更新搜索建议
    updateSuggest(keywords) {
      this.request
        .get("/search/suggest", {
          params: {
            keywords,
          },
        })
        .then((result) => {
          if (result) {
            result = result.result
            this.isShow = true;
            // 过滤order
            const { albums, artists, playlists, songs } = result;
            let tempData = JSON.stringify({
              songs,
              artists,
              albums,
              playlists,
            });
            console.log(this.searchResult);
            this.searchResult = JSON.parse(tempData);
          } else {
            this.isShow = false;
            this.searchResult = {};
          }
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
* {
  margin: 0;
  padding: 0;
}
.suggest-box {
  top: 40px;
  width: 240px;
  position: absolute;
  z-index: 120;
  box-sizing: border-box;
  border: 1px solid #bebebe;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 7px #555;
  text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
  color: black;
  font-size: 12px;
}
/* 搜xxx相关用户 */
.search-user {
  padding: 8px 0 8px 6px;
}
.search-user a {
  text-decoration: none;
  color: #787878;
}
.search-user a:hover {
  background-color: rgb(227, 229, 231);
}

.main-suggest {
  border-top: 1px solid rgb(227, 229, 231);
}
.suggest-item-container:nth-of-type(2n) .left-item{
  background-color: rgb(249, 248, 248);
}
.suggest-items {
  display: flex;
  justify-content: space-between;
  list-style: none;
}
.suggest-items ul {
  list-style: none;
}

.right-item {
  margin-left: 15px;
  margin: 8px 0 0 15px;
  font-weight: 400;
}
.right-item h3 {
  font-weight: 400;
  font-size: 14px;
}

.left-item {
  padding: 8px 0;
  border-left: 1px solid rgb(227, 229, 231);
  border-bottom: 1px solid rgb(227, 229, 231);
  flex-basis: 170px;
}
.left-item li {
  padding: 4px 10px;
  width: 165px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.left-item li:hover {
  cursor: pointer;
  background-color: rgb(227, 229, 231);
}
</style>
