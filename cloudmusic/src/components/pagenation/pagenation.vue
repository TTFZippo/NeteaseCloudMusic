<!-- 分页 -->
<template>
  <div class="pagenation-wrapper">
    <div>
      <button @click="prev" :disabled="activedIndex <= 1" class="prev-next">&lt;上一页</button>
      <a v-for="(item,index) in pageBtnContent" :key="item+index" @click="changePageNo(item)" :class="{ellipsis: item=='...', pageBtn: item!='...', active: item==activedIndex}" href="javascript:;">{{item}}</a>
      <button @click="next" :disabled="activedIndex >= pageCount" class="prev-next">下一页&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 20,
      required: false
    },
    totalCount: {
      required: true
    }
  },
  data () {
    return {
      activedIndex: 1
    }
  },
  computed: {
    // 总页数
    pageCount() {
      let pageCount = parseInt(this.totalCount / this.pageSize);
      if((this.totalCount / this.pageSize) > pageCount) {
        pageCount++;
      }
      return pageCount;
    },
    // 分页按钮填充内容
    pageBtnContent() {
      let pageBtnArray = [];
      let ac = this.activedIndex;
      let pc = this.pageCount;
      if(pc <= 9) { 
        for(let i = 0; i <= pc-1; i++) {
          pageBtnArray[i] = i+1;
        }
      } else if (pc > 9) {
        if(ac < 6) {
          pageBtnArray = [1,2,3,4,5,6,7,8,'...',pc]
        } else if(ac >= 6 && ac <= pc-4) {
          pageBtnArray = [1,'...',ac-3, ac-2,ac-1,ac,ac+1,ac+2,ac+3,'...', pc];
        } else if(ac > pc-4) {
          pageBtnArray = [1,'...',pc-7,pc-6,pc-5,pc-4,pc-3,pc-2, pc-1,pc]
        }
      }
      return pageBtnArray;
    }
  },
  methods: {
    prev() {
      if(this.activedIndex > 1) {
        this.activedIndex--;
      }
    },
    next() {
      if(this.activedIndex < this.pageCount) {
        this.activedIndex++;
      }
    },
    changePageNo(item) {
      if(item!='...') {
        this.activedIndex = item;
      }
    }
  },
  watch: {
    activedIndex(newValue) {
      console.log(newValue);
      this.$emit('activedIndexChange', newValue);
    }
  }
}

</script>

<style scoped>
.pagenation-wrapper {
  
  display: flex;
  justify-content: center;
}
.pagenation-wrapper .prev-next {
  padding: 0 10px;
  cursor: pointer;
  height: 24px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 1px;
  background-image: linear-gradient(rgb(248, 248, 248), rgb(230, 230, 230));
  font-size: 12px;
}
.pagenation-wrapper .prev-next:hover {
  background-image: linear-gradient(rgb(250, 250, 250), rgb(240, 240, 240));
}
.pagenation-wrapper .prev-next:disabled {
  cursor: default;
}
.pagenation-wrapper .pageBtn {
  display: inline-block;
  padding: 0 8px;
  margin: 0 2px;
  height: 22px;
  line-height: 24px;
  border-radius: 1px;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, .2);
  color: black;
  font-size: 12px;
}
.pagenation-wrapper .pageBtn:hover {
  border: 1px solid rgba(0, 0, 0, .8);
}
.pagenation-wrapper .ellipsis {
  cursor: default;
  text-decoration: none;
}
.pagenation-wrapper .active {
  background-color: rgb(230, 25, 34);;
  color: #fff;
}
.pagenation-wrapper .active:hover {
  cursor: default;
  border: 1px solid rgba(0, 0, 0, .2);
}
</style>
