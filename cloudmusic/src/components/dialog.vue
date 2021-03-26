<!-- 注册、登录对话框-->
<template>
  <div
    
    class="dialog"
    open
    @mousedown="move"
    @mousemove="isOver"
  >
    对话框
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      isMouseDown: false,
    };
  },
  methods: {
    isOver(e) {
      console.log(e.target.offsetTop)
      if(e.pageX - e.target.offsetLeft <= 0) e.target.style.left = 0;
      if(e.pageX - e.target.offsetTop <= 0) e.target.style.Top = 0;
    },
    move(e) {
      console.log(e.target.offsetTop)
      // if(e.target.offsetTop <= 0) return;
      var x = e.pageX - e.target.offsetLeft;
      var y = e.pageY - e.target.offsetTop;
      // 鼠标按下并移动时，实时更新对话框的位置
      document.addEventListener('mousemove', move);

      function move(e) {
          e.target.style.left = e.pageX - x + 'px';
          e.target.style.top = e.pageY - y + 'px';
      }
      // 鼠标松开时，移除拖拽的动作
      document.addEventListener('mouseup', function() {
          document.removeEventListener('mousemove', move);
      });
    }
  },
};
</script>

<style scoped>
.dialog {
  width: 300px;
  height: 300px;
  border: 2px solid black;
  cursor: move;
  position: absolute;
}
</style>
