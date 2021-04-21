<!-- 推荐节目item -->
<!-- 基于program-item -->
<template>
  <div>
    <program-item :program="program" :isOdd="isOdd">
      <div slot="rank" class="rank">
      </div>
      <div slot="tag-progress" class="tag">
        {{program.category}}
      </div>
    </program-item>
  </div>
</template>

<script>
import programItem from './program-item'
export default {
  props:{
    program: {
      type: Object,
      required: true
    },
    isOdd: {
      type: Boolean,
      required: false
    }
  },
  components: {
    'program-item': programItem
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>
.tag {
  border: 1px solid #999;
  margin: 12px 0;
  margin-left: 55px;
  padding: 0 5px;
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.tag:hover {
  color: #666;
  border-color: #666;
}
.rank {
  width: 22px;
}
</style>
