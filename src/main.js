import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'default-passive-events'
import router from './router'
import toast from 'components/common/toast'
import store from './store'
import VueVideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(ElementUI)
Vue.use(toast)
Vue.use(VueVideoPlayer)

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
