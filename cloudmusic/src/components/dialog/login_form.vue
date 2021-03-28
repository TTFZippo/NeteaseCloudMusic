<!-- 邮箱、手机号、密码输入框 -->
<template>
  <main class="">

    <header class="form-header">
      <label class="label">
        手机号：
      </label>

      <div>
        <select name="area-code" id="">
          <option value="">+86</option>
        </select>
        <input type="tel">
      </div>

      <label class="label">
        密码：
      </label>
      <div>
        <input type="password">
      </div>
      <div class="notice">
        <div>
          <input type="checkbox">
          <span>自动登录</span>
        </div>
        <div class="forget">
          忘记密码？
        </div>
      </div>
      
      <button>登录</button>
    </header>

    
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.form-header {
  padding: 20px 26% 0 26%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: rgba(0, 0, 0, .6);
  font-weight: 600;
}
.form-header>* {
  margin-top: 10px;
}
.form-header select {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  width: 22%;
  border: 1px solid rgba(0, 0, 0, .2);
}
.form-header input {
  height: 28px;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 2px;
  outline: none;
}
.form-header select {
  height: 32px;
}
.form-header input[type="tel"] {
  width: 73%;
}
.form-header input[type="password"] {
  width: 95%;
}
.form-header .label {
  align-self: flex-start;
}
.form-header .notice {
  display: flex;
  justify-content: space-between;
}
.notice input[type="checkbox"] {
  vertical-align: middle;
}
.notice .forget {
  line-height: 31px;
}
.form-header button {
  height: 32px;
  background-image: linear-gradient(180deg, rgb(94, 163, 227), rgb(30, 111, 191));
  border: 1px solid rgba(0, 0, 0, .1);
  outline: none;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  letter-spacing: 2px;
}



</style>
