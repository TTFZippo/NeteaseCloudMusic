import Vue from 'vue'
import VueRouter from 'vue-router'

// 发现音乐界面相关
import discover from '../views/discover/discover.vue'
const recommand = () => import ('../views/discover/discover_subpage/recommand/recommand.vue')
const toplist = () => import ('../views/discover/discover_subpage/toplist/toplist.vue')
const album = () => import ('../views/discover/discover_subpage/album.vue')
const artist = () => import ('../views/discover/discover_subpage/artist.vue')
const djradio = () => import ('../views/discover/discover_subpage/djradio.vue')
const playlist = () => import ('../views/discover/discover_subpage/playlist.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discover'
  },
  {
    path: '/discover',
    component: discover,
    redirect: '/discover/recommand',
    children: [
      {
        path: 'recommand',
        component: recommand
      },
      {
        path: 'toplist',
        component: toplist,
      },
      {
        path: 'album',
        component: album
      },
      {
        path: 'artist',
        component: artist
      },
      {
        path: 'djradio',
        component: djradio
      },
      {
        path: 'playlist',
        component: playlist
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
