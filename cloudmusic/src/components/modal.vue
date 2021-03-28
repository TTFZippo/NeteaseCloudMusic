<!-- 提示框 -->
<template>
  <div class="modal" v-if="isShowing">
    请先勾选《服务条款》《隐私政策》《儿童隐私政策》
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowing: false
    }
  },
  props: {
    isShow:{
      type: Boolean
    }
  },
  watch: {
    // 控制modal出现时间并通知父组件
    isShow: function() {
      this.isShowing = this.isShow
      if(this.isShowing) {
        setTimeout(() => {
          this.isShowing = false;
          this.$emit('finished', true)
        }, 1500);
      }

    }
  },
  methods: {}
}

</script>

<style scoped>
  .modal {
    padding: 10px 10px;
    position:fixed;
    top:50%;
    right:50%;
    transform: translate(50%, 50%);
    z-index: 999;
    width: 220px;
    background-color: rgba(51, 51, 51, .8);
    color: white;
  }
</style>
