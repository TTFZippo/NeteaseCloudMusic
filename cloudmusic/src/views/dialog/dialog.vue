<!-- 集成登录、注册功能的dialog -->
<template>
  <div>
    <dialog-frame>
      <template v-slot:title>
        <div>
            {{title}}
        </div>
      </template>

      <template v-slot:content>
        <index></index>
      </template>
    </dialog-frame>
  </div>
</template>

<script>
// dialogFrame为对话框框架，具体内容通过slot填充
import dialogFrame from '../../components/dialog_frame.vue'
import index from './dialog_content/index.vue'
export default {
  components: {
    'dialog-frame': dialogFrame,
    index
  },
  data () {
    return {
      title: '登录'
    }
  }
}

</script>

<style scoped>

</style>
