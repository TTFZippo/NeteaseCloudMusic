<!-- 二维码登录页面 -->
<template>
  <div>
    <login-form></login-form>
  </div>
</template>

<script>
import loginForm from '../../../components/dialog/login_form.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    'login-form': loginForm
  }
}

</script>

<style scoped>

</style>
