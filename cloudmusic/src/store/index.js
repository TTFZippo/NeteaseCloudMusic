import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // dialog当前页
    dialog_currPage: 'index',
    // 账户信息
    account: {}
  },
  mutations: {
    /**
     * 切换dialog页面（路由）
     * @param next  将要去的页面
     */
    changeDialogState(state, next='index') {
      state.dialog_currPage = next;
    },

 
  },
  actions: {
  },
  modules: {
  },
  getters: {
    dialog_curr(state) {
      return state.dialog_currPage
    }
  }
})
