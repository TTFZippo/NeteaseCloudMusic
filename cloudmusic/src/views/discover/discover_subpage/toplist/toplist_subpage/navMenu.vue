<!-- 侧边导航栏 -->
<template>
  <div class="wrapper">
    <h2>云音乐特色榜</h2>
    <ul>
      <li
        v-for="(item, index) in listData_cloud"
        :key="index"
        :class="{ active: index == cloud_active }"
        @click="
          cloud_active = index;
          global_active = 9999;
          changeList(item.id);
        "
      >
        <a href="javascript:;" class="item-wrapper">
          <img :src="item.coverImgUrl" alt="" />
          <div class="desc">
            <span class="name">{{ item.name }}</span>
            <span class="update-frequency">{{ item.updateFrequency }}</span>
          </div>
        </a>
      </li>
    </ul>
    <h2>全球媒体榜</h2>
    <ul>
      <li
        v-for="(item, index) in listData_global"
        :key="index"
        :class="{ active: index == global_active }"
        @click="
          global_active = index;
          cloud_active = 9999;
          changeList(item.id);
        "
      >
        <a href="javascript:;" class="item-wrapper">
          <img :src="item.coverImgUrl" alt="" />
          <div class="desc">
            <span class="name">{{ item.name }}</span>
            <span class="update-frequency">{{ item.updateFrequency }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // 榜单数据
    listData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // 云音乐特色榜
    listData_cloud() {
      let temp = JSON.parse(JSON.stringify(this.listData));
      return temp.splice(0, 4);
    },
    // 全球媒体榜
    listData_global() {
      let temp = JSON.parse(JSON.stringify(this.listData));
      temp.splice(0, 4);
      return temp;
    },
  },
  data() {
    return {
      // 点击进入active状态
      // 两者互斥成为active，global_active初始值设为一个远大于index的数
      global_active: 99999,
      cloud_active: 0,
    };
  },
  methods: {
    changeList(id) {
      this.$router.push({
        path: '',
        query: {
          id
        }
      })
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  background-color: rgb(245, 245, 245);
  padding-top: 15px;
}
.wrapper h2 {
  padding-left: 10px;
  margin: 20px 0 15px 0;
  font-size: 15px;
}
.wrapper ul {
  list-style: none;
  margin-top: 10px;
}
.wrapper ul li {
  padding: 10px 0 10px 18px;
}
.wrapper ul li:hover {
  background-color: rgb(244, 242, 242);
}
.wrapper ul li.active {
  background-color: rgb(230, 230, 230);
}
.wrapper .item-wrapper {
  display: flex;
  text-decoration: none;
  color: black;
}
.wrapper .item-wrapper .desc {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.wrapper .item-wrapper .desc .update-frequency {
  margin-top: 6px;
  color: #666;
}
.wrapper img {
  width: 40px;
  height: 40px;
}
</style>
