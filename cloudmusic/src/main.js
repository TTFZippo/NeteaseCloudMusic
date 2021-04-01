import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/global.css'

import request from '../src/request/request.js'
Vue.prototype.request = request

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
