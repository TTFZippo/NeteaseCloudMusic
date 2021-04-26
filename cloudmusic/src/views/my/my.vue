<!-- 我的界面 -->
<template>
  <div>
    <main class="main-content">
      <div class="aside">
        <my-aside :asideData="asideData"></my-aside>
      </div>
      <div class="content-area">
        <my-artist :myArtists="myArtists"></my-artist>
      </div>
    </main>
    <footer>
      <my-footer></my-footer>
    </footer>
  </div>
</template>

<script>
import footer from '../../components/footer/footer.vue'
import aside from './my_subpage.vue/my_aside.vue'
import my_artist from './my_subpage.vue/my_artists.vue'
export default {
  components: {
    'my-footer': footer,
    'my-aside': aside,
    'my-artist': my_artist
  },
  created () {
    let id = window.sessionStorage.getItem('id');
    this.request.get(`/user/detail?uid=${id}`).then(result => {
    })
    // 我的歌单
    this.request.get(`/user/playlist?uid=${id}`).then(result => {
      let myNickname = window.sessionStorage.getItem('nickname');
      for(let [,item] of result.playlist.entries()) {
        if(item.creator.nickname === myNickname) {
          this.asideData.playlist_created.push(item)
        } else {
          this.asideData.playlist_collected.push(item)
        }
      }
    })
    // 收藏的歌手
    this.request.get(`/artist/sublist`).then(result => {
      this.asideData.artistsCount = result.count;
      this.myArtists = result;
      console.log(this.myArtists);
    })
  },
  data () {
    return {
      // 侧边栏数据
      asideData: {
        artistsCount: '',
        // 创建的歌单
        playlist_created: [],
        // 收藏的歌单
        playlist_collected: []
      },
      // 我的歌手
      myArtists: {}
    }
  },
  methods: {
    
  }
}

</script>

<style scoped>
.main-content {
  display: flex;
  /* height: 1100px; */
  width: 982px;
  margin: 0 auto;
  border: 1px solid #d3d3d3;
  background-color: white;
}
.aside {
  display: block;
  width: 240px;
  border-right: 1px solid #d3d3d3;
  background-color: rgb(249, 249, 249);
}
.content-area {
  padding: 40px;
  width: calc(100% - 240px);
}
</style>
