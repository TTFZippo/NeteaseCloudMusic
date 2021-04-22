<!-- 歌单详情页面 -->
<template>
  <div>
    <main class="detail-content">

      <aside>

      </aside>
    </main>
    <footer>
      <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import footer from '../../components/footer/footer.vue'
export default {
  created () {
    let id = this.$route.query.id;
    console.log(id);
    this.request.get(`/playlist/detail?id=${id}`).then(result => {
      console.log(result);
    })
  },
  components: {
    'my-footer': footer
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped>
.detail-content {
  width: 982px;
  height: 1000px;
  border: 1px solid red;
  margin: 0 auto;
}
</style>
