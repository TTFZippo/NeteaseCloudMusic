<!-- 右侧边栏 -->
<!-- 静态数据-->
<template>
  <div class="aside-wrapper">
    <!-- 用户登录 -->
    <div class="user-info-wrapper">
      <div class="user-info">
        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
        <a href="javascript:;">用户登录</a>
      </div>
    </div>

    <!-- 入驻歌手 -->
    <div class="settled-artists">
      <div class="label">
        <h3>入驻歌手</h3>
        <a href="javascript:;">查看全部></a>
      </div>
      <ul>
        <li v-for="(item, index) in artists_settled" :key="index">
          <a href="javascript:;">
            <img :src="item.imgUrl" alt="">
            <div class="artist-desc">
              <span class="name">{{item.name}}</span>
              <span>{{item.intro}}</span>
            </div>
          </a>
        </li>
      </ul>
      <a href="javascript:;" class="apply">申请成为网易音乐人</a>
    </div>

    <!-- 热门主播 -->
    <div class="anchor">
      <div class="label">
        <h3>热门主播</h3>
      </div>
      <ul>
        <li v-for="(item, index) in anchor" :key="index">
          <a href="javascript:;">
            <img :src="item.imgUrl" alt="">
            <div class="anchor-desc">
              <span class="name">{{item.name}}</span>
              <span>{{item.intro}}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 入驻歌手
      artists_settled: [
        {
          imgUrl: 'https://p1.music.126.net/rCsLFXha6SLis0tV7yZ5fA==/109951165588539704.jpg?param=180y180',
          name: '张惠妹aMEI',
          intro: '亞洲國寶級傳奇天后「 a MEI」我是a MEI，一個你認識很久，卻認識不完的女人。'
        },
        {
          imgUrl: 'https://p1.music.126.net/7BUW9dnqOMF1dn3ioKJOMg==/109951162820707114.jpg?param=180y180',
          name: 'Fine乐团',
          intro: '独立音乐人'
        },
        {
          imgUrl: 'https://p1.music.126.net/TiRAIiIihOgtBgYB6DZRXA==/109951162916034289.jpg?param=180y180',
          name: '萬曉利',
          intro: '民谣歌手、中国现代'
        },
        {
          imgUrl: 'https://p1.music.126.net/w_UWOls2uCkFN_U62788Xg==/18806046882229308.jpg?param=180y180',
          name: '音乐人赵雷',
          intro: '民谣歌手'
        },
        {
          imgUrl: 'https://p1.music.126.net/NDsX060FnCtiDMZN-c_9Gw==/3438172872737957.jpg?param=180y180',
          name: '王三溥',
          intro: '音乐人'
        },
      ],
      // 主播
      anchor: [
        {
          imgUrl: 'https://p1.music.126.net/H3QxWdf0eUiwmhJvA4vrMQ==/1407374893913311.jpg?param=180y180',
          name: '陈立',
          intro: '心理学家、美食家陈立教授'
        },
        {
          imgUrl: 'https://p1.music.126.net/GgXkjCzeH4rqPCsrkBV1kg==/109951164843970584.jpg?param=180y180',
          name: '刘维-Julius',
          intro: '歌手、播客节目《维维道来》主理人'
        },
        {
          imgUrl: 'https://p1.music.126.net/S7dd9GvTPwl5IHym8qF8VA==/109951164999332400.jpg?param=180y180',
          name: '莫非定律MoreFeel',
          intro: ''
        },
        {
          imgUrl: 'https://p1.music.126.net/NHjNoFpLDEZ-3OR9h35z1w==/109951165825466770.jpg?param=180y180',
          name: '碎嘴许美达',
          intro: '脱口秀网络红人'
        },
        {
          imgUrl: 'https://p1.music.126.net/CpUdHPNvBvN7kebvL21TTA==/109951163676573083.jpg?param=180y180',
          name: '银临Rachel',
          intro: '古风音乐人 '
        },
      ]
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.aside-wrapper {
  width: 100%;
}
.user-info {
  /* border: 1px solid red; */
  width: 100%;
  height: 126px;
  background-position: 0 0;
  background-image: url('../../../../../assets/icon/index.png');
}
.user-info p {
  width: 205px;
  margin: 16px auto;
  line-height: 22px;
  color: #666;
  font-size: 12px;
}
.user-info a {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 31px;
  background-image: url('../../../../../assets/icon/index.png');
  background-position: 0 -195px;
  line-height: 31px;
  text-decoration: none;
  color: white;
  text-align: center;
  font-size: 12px;
}
.user-info a:hover{
  background-position: -110px -195px;
}
.anchor,
.settled-artists {
  /* width: calc(100% - 100px); */
  margin-top: 15px;
  padding: 0 18px;
  box-sizing: border-box;
}
.anchor .label,
.settled-artists .label {
  display: flex;
  padding-bottom: 6px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 18px;
}
.anchor .label h3,
.settled-artists .label h3 {
  font-size: 12px;
}
.settled-artists .label a {
  margin-left: auto;
  color: #666;
  font-size: 12px;
  text-decoration: none;
}
.settled-artists .label a:hover {
  text-decoration: underline;
}
.anchor ul,
.settled-artists ul {
  list-style: none;
}
.anchor ul li,
.settled-artists ul li {
  margin-top: 10px;
}
.anchor ul li a,
.settled-artists ul li a{
  display: flex;
  text-decoration: none;
  color: #666;
  font-size: 12px;
}

.settled-artists ul .artist-desc {
  width: 100%;
  border: 1px solid rgba(77, 55, 55, 0.1);
  /* padding: 0 0 0 10px; */
  box-sizing: border-box;
  background-color: #fafafa;
}

.settled-artists ul .artist-desc:hover {
  background-color: #f4f4f4;
}
.anchor ul .anchor-desc span,
.settled-artists ul .artist-desc span {
  display: block;
  margin: 10px 0 0 10px;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.anchor ul .anchor-desc .name,
.settled-artists ul .artist-desc .name {
  margin-bottom: 8px;
  color: black;
  font-weight: 600;
}
.anchor img,
.settled-artists img {
  width: 62px;
  height: 62px;
}
.settled-artists .apply {
  margin-top: 10px;
  display: block;
  width: 100%;
  line-height: 31px;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 4px;
  background-image: linear-gradient(rgb(254, 254, 254), rgb(242, 242, 242));
  color: black;
  text-decoration: none;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
}
.settled-artists .apply:hover {
  background-image: linear-gradient(rgb(255, 255, 255), rgb(248, 248, 248));
}


</style>
