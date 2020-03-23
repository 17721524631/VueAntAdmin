import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import moment from 'moment'
import md5 from 'js-md5'

Vue.prototype.$moment = moment;
Vue.prototype.$md5 = md5;

import './AntD'  //按需引入 注册新的组件往这加

import commonJs from './utils/common'
window.commonJs = commonJs
// 在组件内commonJs.xx调用

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // /* 路由发生变化修改页面title */
  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  NProgress.start()
  next()

  // if (to.meta.requireLogin) {  // 判断该路由是否需要登录权限
  //   if (store.state.loginInfo.token) {  // 判断当前的token是否存在
  //     next();
  //   }
  //   else {
  //     next({
  //       path: '/login'
  //     })
  //   }
  // }
  // else {
  //   next();
  // }
});

router.afterEach(() => {
  NProgress.done()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')