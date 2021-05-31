import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import toast from 'components/common/toast'

Vue.use(ElementUI)
Vue.use(toast)

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
