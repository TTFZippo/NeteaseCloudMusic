<!-- 手机号登录页面 -->
<template>
  <div>
    <login-form @submit="login"></login-form>
    <footer class="footer">
      <a href="javascript:;" @click="changeDialogState('index')">&lt;其他登录方式</a
      >
      <a href="javascript:;">没有账号？免费注册&gt;</a>
    </footer>
  </div>
</template>

<script>
import loginForm from "../../../components/dialog/login_form.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    "login-form": loginForm,
  },
  methods: {
    ...mapMutations(["changeDialogState"]),
    // 登录
    login(loginData) {
      // console.log(e);
      const { account: phone, password } = loginData;
      this.request
        .get("/login/cellphone", {
          params: {
            phone,
            password,
          },
        })
        .then((result) => {
          console.log(result);
          // 将头像和名称存储起来
          window.sessionStorage.setItem('avatarUrl', result.profile.avatarUrl);
          window.sessionStorage.setItem('nickname', result.profile.nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 16px;
  background-color: rgb(247, 247, 247);
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
}
.footer a {
  text-decoration: none;
  color: rgb(61, 138, 210);
}
</style>
