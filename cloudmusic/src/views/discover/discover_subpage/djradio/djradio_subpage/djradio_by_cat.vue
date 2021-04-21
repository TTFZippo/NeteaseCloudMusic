<!-- 基于标签的子页面 -->
<template>
  <div>
    <div>
      <div class="label">
        <h2>优秀新电台</h2>
      </div>
      <div class="good-radios-wrapper">
        <div>
          <img src="" alt="">
          <h2></h2>
          <span></span>
        </div>
      </div>
    </div>

    <div>
      <div class="label">
        <h2>电台排行榜</h2>
        <a href="javascript:;">
          <span>上升最快</span>
          <span class="line">|</span>
          <span>最热电台</span>
        </a>
      </div>
      <div class="ranked-radio-wrapper">
        <div class="ranked-raido">
          <img src="" alt="">
          <div>
            <h2></h2>
            <div>
              <i></i>
              <span></span>
            </div>
            <div>
              <span>共{{}}期</span>
              <span>订阅{{}}次</span>
            </div>
          </div>
        </div>
        <pagenation></pagenation>
      </div>
    </div>
  </div>
</template>

<script>
import pagenation from '../../../../../components/pagenation/pagenation.vue'
export default {
  components: {
    'pagenation': pagenation
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>
.label {
  display: flex;
  border-bottom: 2px solid #c20c0c;
}
.label a{
  margin-left: auto;
  line-height: 40px;
  text-decoration: none;
  color: #666;
  font-size: 12px;
}
.label a:hover {
  text-decoration: underline;
}
.label h2 {
  font-weight: normal;
}
</style>
