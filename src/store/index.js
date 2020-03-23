import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate' //解决刷新页面vuex数据丢失问题

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // loginInfo: {},
  },
  mutations: {
    // setloginInfo(state, payload) {
    //   state.loginInfo = payload;
    // },
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedState()]
})
