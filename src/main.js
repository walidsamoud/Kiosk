import Vue from 'vue'
import App from './App.vue'
import {ApiConfigs, authHeader} from './_helpers'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
// i18n
import i18n from './i18n/i18n.js'
if(!localStorage.getItem('Language')) { localStorage.setItem('Language', 'en') }
// Vue Router
import { router } from './_helpers';
Bugsnag.start({
    apiKey: 'a8dde7f55dab42f680479a97a0a41d78',
    plugins: [new BugsnagPluginVue()]
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')

// Moment
import moment from 'moment';
import 'moment-timezone';
moment.locale(i18n.locale == 'ar' ? 'ar-tn' : i18n.locale);
Vue.prototype.$moment = moment;
import Pusher from 'pusher-js' // import Pusher
Vue.prototype.$pusher = new Pusher(process.env.VUE_APP_PUSHER_ID, {
  cluster: 'eu',
  encrypted: true,
  authEndpoint: ApiConfigs.broadcast_url+ApiConfigs.pusher.auth,
  auth: {
      headers: { ...authHeader() }
  }
});

Bugsnag.getPlugin('vue').installVueErrorHandler(Vue)