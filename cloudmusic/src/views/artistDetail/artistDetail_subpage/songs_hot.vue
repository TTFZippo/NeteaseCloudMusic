<!-- 热门歌曲 -->
<template>
  <div>
    <div class="operation">
      <a href="javascript:;" class="play">
        <i>
          <em class="icon"></em>
          播放
        </i>
      </a>
      <a href="javascript:;" class="add"></a>
      <a href="javascript:;" class="collect">
        <i> 收藏热门({{ currentListData.length }}) </i>
      </a>
    </div>
    <songlist
      :currentListData="currentListData"
      :isArtistDetail="true"
      class="songlist"
    ></songlist>
  </div>
</template>

<script>
import songlist from "../../../components/songlist/songlist.vue";
export default {
  props: {
    currentListData: {
      type: Array
    }
  },
  components: {
    songlist
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* 操作按钮 */
.operation {
  margin-bottom: 10px;
}
.operation a {
  padding: 0 5px 0 0;
  display: inline-block;
  height: 31px;
  line-height: 31px;
  background-image: url('../../../assets/icon/button2.png');
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  color: white;
  vertical-align: top;
}
.operation a i {
  color: black;
  display: inline-block;
  padding-left: 28px;
  background-image: url('../../../assets/icon/button2.png'); 
}
.operation  .play {
  padding: 0 5px 0 0;
  background-position: right -428px;
  vertical-align: top;
}
.operation  .play:hover i .icon {
  background-position: -28px -1622px;
}
.operation  .play:hover i {
  background-position: 0 -469px;
}
.operation  .play i{
  display: inline-block;
  line-height: 31px;
  height: 31px;
  padding: 0 7px 0 8px;
  background-position: 0 -387px;
  background-image: url('../../../assets/icon/button2.png');
  font-style: normal;
  vertical-align: top;
  color: white;
}
.operation  .play i .icon {
  display: inline-block;
  width: 20px;
  height: 18px;
  margin: 6px 2px 2px 0;
  background-position: 0 -1622px;
  background-image: url('../../../assets/icon/button2.png');  
  vertical-align: top;
}
.operation  .add {
  display: inline-block;
  margin-right: 5px;
  background-position: 0 -1588px;
  width: 31px;
  margin-left: -3px;
  padding-right: 0;
  padding: 0 5px 0 0;
}
.operation  .add:hover {
  background-position: -40px -1588px;
}
.operation .collect {
  height: 31px;
  line-height: 31px;
  padding: 0 5px 0 0;
  background-position: right -1020px;
  color: black;
  vertical-align: top;
}
.operation .collect:hover {
  background-position: right -1106px;
}
.operation .collect:hover i {
  background-position: 0 -1063px;
}
.operation .collect i {
  display: inline-block;
  background-position: 0 -977px;
  padding-right: 2px;
  padding-left: 28px;
  background-image: url('../../../assets/icon/button2.png'); 
  font-style: normal;
}
.operation .share {
  margin-right: 6px;
  background-position: right -1020px;
  padding: 0 5px 0 0;
  vertical-align: top;
  color: black;
}
.operation .share:hover {
  background-position: right -1106px;
}
.operation .share:hover i {
  background-position: 0 -1268px;
}
.operation .share i {
  display: inline-block;
  padding-left: 28px;
  background-position: 0 -1225px;
  background-image: url('../../../assets/icon/button2.png'); 
  font-style: normal;
}
.operation .download {
  background-position: right -1020px;
  margin-right: 5px;
}
.operation .download:hover {
  background-position: right -1106px;
}
.operation .download:hover i {
  background-position: 0 -2805px;
}
.operation .download i {
  background-position: 0 -2761px;
  padding-right: 2px;
  padding-left: 30px;
  font-style: normal;
}
.operation .comments {
  background-position: right -1020px;
  margin-right: 5px;
}
.operation .comments:hover {
  background-position: right -1106px;
}
.operation .comments:hover i {
  background-position: 0 -2805px;
}
.operation .comments i {
  background-position: 0 -2761px;
  padding-right: 2px;
  padding-left: 30px;
  font-style: normal;
}
</style>
