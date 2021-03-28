<!-- 注册、登录对话框-->
<template>
  <div class="dialog">
    <!-- 顶部拖动部分 -->
    <header class="header draggable">
      <slot name="title" class="title">登录</slot>
      <span class="shut" @click="shut()">X</span>
    </header>

    <!-- 主内容框 -->
    <main class="content">
      <slot name="content"></slot>
    </main>
  </div>
</template>

<script>
import dragObject from "../../utils/drag.js";
export default {
  beforeCreate() {
    dragObject.enable();
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>

<style scoped>
.dialog {
  width: 528px;
  /* height: 400px; */
  position: absolute;
  border-radius: 6px;
  box-shadow: 0 5px 16px rgb(0 0 0 / 80%);
  overflow: hidden;
}
.header {
  height: 38px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  background-color: rgb(45, 45, 45);
  font-weight: bold;
  color: white;
  line-height: 38px;
  cursor: move;
}
.header .shut {
  font-weight: 400;
  font-size: 12px;
  color: rgb(136, 136, 136);
  cursor: pointer;
}

</style>
