<!-- 节目排行item -->
<!-- 基于program-item -->
<template>
  <program-item :program="program" :isOdd="isOdd">
    <div slot="rank" class="rank">
      <span class="index">
        {{ index_digit2 }}
      </span>
      <span
        :class="{
          advance: advanceRank > 0,
          declined: advanceRank < 0,
          keep: advanceRank === 0,
          new: advanceRank === 'new'
        }"
      >
        <i></i>
        <span v-if="advanceRank!=='new'">{{ advanceRank }}</span>
      </span>
    </div>
    <span slot="tag-progress" class="pro-progress">
        <progress :value="program.score/1000" max="100"></progress>
    </span>
  </program-item>
</template>

<script>
import programItem from "./program-item";
export default {
  props: {
    program: {
      type: Object,
      required: true,
    },
    isOdd: {
      type: Boolean,
      required: false,
    },
    index: {
      type: Number,
    },
  },
  components: {
    "program-item": programItem,
  },
  data() {
    return {};
  },
  computed: {
    // 将index设置成两位
    index_digit2() {
      let indexCopy = this.index;
      return indexCopy <= 8 ? `0${++indexCopy}` : ++indexCopy;
    },
    // 进步名次
    advanceRank() {
      if (this.program.lastRank < 0) return "new";
      return this.program.lastRank - this.program.rank;
    },
  },
};
</script>

<style scoped>
/* 排名 */
.rank {
  display: flex;
  flex-direction: column;
  padding: 3px 12px;
  font-size: 12px;
  text-align: center;
  color: #999;
}
.index .index {
  font-size: 14px;
}
.rank i {
  display: inline-block;
  margin-bottom: 1px;
  margin-right: 2px;
  width: 6px;
  height: 6px;
  background-image: url('../../../../../assets/icon/icon.png');
}
.rank .advance {
  color: #ba2226;
}
.rank .advance i {
  background-position: -74px -304px;
} 
.rank .keep {
  color: #999;
}
.rank .keep i {
  background-position: -74px -274px;
}
.rank .declined {
  color: #4abbeb;
}
.rank .declined i{
  background-position: -74px -324px;
}
.rank .new i {
  width: 16px;
  height: 17px;
  background-position: -67px -283px;
}
/* 进度条 */
.pro-progress {
  margin: 0 15px 0 auto;
}
.pro-progress progress {
  width: 100px;
  height: 8px;
  color:#f00;
  background:#EFEFF4;
  border-radius: 15px;
}
 progress::-webkit-progress-bar{     
    background-color: rgb(222, 222, 222);
    border-radius: 15px;
 }
/* 表示已完成进度背景色 */
progress::-webkit-progress-value{
  background: rgb(198, 198, 198);
  border-radius: 15px; 
 }
</style>
