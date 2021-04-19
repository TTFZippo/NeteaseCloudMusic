<!-- 侧边分类 -->
<template>
  <div class="art-nav-wrapper">
    <div v-for="value_area in area" :key="value_area.key" class="artist-type">
      <h2 class="artist-type-title">{{ value_area.value }}</h2>
      <ul class="artist-type-list" v-if="value_area.value == '推荐'">
        <li>
          <a
            href="javascript:;"
            @click="beActived($event)"
            :class="{ active: activeType == '推荐歌手' }"
            >推荐歌手</a
          >
        </li>
        <li>
          <a
            href="javascript:;"
            @click="beActived($event)"
            :class="{ active: activeType == '入驻歌手' }"
            >入驻歌手</a
          >
        </li>
      </ul>
      <ul class="artist-type-list" v-else>
        <li v-for="(value_type, key_type) in type" :key="key_type">
          <a
            href="javascript:;"
            @click="beActived($event, key_type, value_area.key)"
            :class="{
              active: activeType == `${value_area.value}${value_type}`,
            }"
          >
            {{ value_area.value }}{{ value_type }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: {
        1: "男歌手",
        2: "女歌手",
        3: "组合/乐队",
      },
      area: [
        { key: -1, value: "推荐" },
        { key: 7, value: "华语" },
        { key: 96, value: "欧美" },
        { key: 8, value: "日本" },
        { key: 16, value: "韩国" },
        { key: 0, value: "其他" },
      ],
      // 当前选中歌手分类
      activeType: "推荐歌手",
      activeTypeIndex: -1,
      activeAreaIndex: -1,
    };
  },
  methods: {
    beActived(event, typeIndex, areaIndex) {
      this.activeTypeIndex = typeIndex;
      this.activeAreaIndex = areaIndex;
      this.activeType = event.target.innerText;
    },
  },
  watch: {
    activeType(newValue) {
      let activeArtistData = {
        activeType: newValue,
        activeTypeIndex: this.activeTypeIndex,
        activeAreaIndex: this.activeAreaIndex,
      };
      this.$emit("artistTypeChange", activeArtistData);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.art-nav-wrapper {
  width: 180px;
  padding: 51px 0 40px 7px;
  border: 1px solid #d3d3d3;
  background-color: rgb(249, 249, 249);
}
.artist-type {
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #c0bfbf;
}
.artist-type-title {
  height: 25px;
  padding-left: 14px;
  font-size: 16px;
  font-family: "Microsoft Yahei";
  color: #333;
}
.artist-type-list {
  list-style: none;
}
.artist-type-list li {
  width: 133px;
  margin-bottom: 2px;
}
.artist-type-list li a {
  display: inline-block;
  /* width: 133px; */
  width: 133px;
  padding-left: 27px;
  height: 29px;
  line-height: 29px;
  color: #333;
  background-image: url("../../../../../assets/icon/singer.png");
  background-position: 0 -30px;
  text-decoration: none;
  font-size: 12px;
}
.artist-type-list li a:hover {
  text-decoration: underline;
}
.artist-type-list li a.active {
  background-position: 0 0;
  color: #c20c0c;
}
</style>
