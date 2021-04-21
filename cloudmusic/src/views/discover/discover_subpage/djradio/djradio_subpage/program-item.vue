<!-- 单个节目 -->
<template>
  <div class="program-item-wrapper" :class="{'odd': isOdd}">
    <slot name="rank"></slot>
    <a class="img-wrapper">
      <img :src="program.picUrl || program.coverUrl" alt="">
      <i href="" class="play"></i>
    </a>
    <div class="desc">
      <h2 class="name">{{program.name}}</h2>
      <p class="artist-name">{{program.artistName || program.brand}}</p>
    </div>
    <slot name="tag-progress"></slot>
  </div>
</template>
<script>
import a from '../../../../../assets/icon/iconall.png'
export default {
  props: {
    program: {
      type: Object,
      required: true
    },
    isOdd: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data () {

    return {
    }
  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.program-item-wrapper {
    width: 424px;
  height: 40px;
  padding: 10px 0;
  padding-right: 0;
  display: flex;
}
.program-item-wrapper.odd {
  background-color: rgb(247, 247, 247);
}
.program-item-wrapper:hover .img-wrapper i{
  display: block;
}
.img-wrapper {
  position: relative;
  cursor: pointer;
}
.img-wrapper img {
  width: 40px;
  height: 40px;
}
.img-wrapper i {
  position: absolute;
  display: none;
  width: 22px;
  height: 22px;
  background-position: 0 -85px;
  top: 20%;
  left: 20%;
  background-image: url('../../../../../assets/icon/iconall.png');
}
.desc {
  padding: 2px 0;
  width: 208px;
  font-size: 12px;
  margin: 0 0 0 10px;
}
.desc .name,
.desc .artist-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.desc .name:hover,
.desc .artist-name:hover {
  text-decoration: underline;
}
.desc .name {
  margin-bottom: 4px;
  color: #333;
  font-size: 12px;
  font-weight: normal;
}
.desc .artist-name {
  color: #999;
}
img {
  width: 100px;
}
</style>
