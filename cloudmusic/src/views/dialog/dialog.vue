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
        <index v-if="currentPage=='index'"></index>
        <login-email v-if="currentPage=='login_email'"></login-email>
        <login-phone v-if="currentPage=='login_phone'"></login-phone>
        <login-qrcode v-if="currentPage=='login_qrcode'"></login-qrcode>
        <signup v-if="currentPage=='signup'"></signup>
      </template>
    </dialog-frame>
  </div>
</template>

<script>
// dialogFrame为对话框框架，具体内容通过slot:content填充
import dialogFrame from '../../components/dialog/dialog_frame.vue'
import index from './dialog_content/index.vue'
import loginEmail from './dialog_content/login_email.vue'
import loginPhone from './dialog_content/login_phone.vue'
import loginQRcode from './dialog_content/login_qrcode.vue'
import signup from './dialog_content/signup.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    'dialog-frame': dialogFrame,
    'login-email': loginEmail,
    'login-phone': loginPhone,
    'login-qrcode':loginQRcode,
    'signup':signup,
    index
  },
  data () {
    return {
      title: '登录'
    }
  },
  computed: {
    currentPage() {
      return this.dialog_curr();
    }
  },
  methods: {
    ...mapGetters(['dialog_curr']),
  }
}

</script>

<style scoped>

</style>
