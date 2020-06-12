import Vue from 'vue'
import Vuesax from 'vuesax'
import Vuex from 'vuex'
import {ApiConfigs, authHeader} from './_helpers'
import App from './App.vue'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';
// Vuex Store
import { store } from './_store';
// Theme Configurations
import '../themeConfig.js'
// Perfectscrollbar
// import PerfectScrollbar from "vue2-perfect-scrollbar";
// import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";
// Vue.use(PerfectScrollbar);
import Vuebar from 'vuebar';

//import promise
import 'es6-promise/auto';

import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

Bugsnag.start({
    apiKey: 'a8dde7f55dab42f680479a97a0a41d78',
    plugins: [new BugsnagPluginVue()]
})

Vue.use(Vuesax);
Vue.use(Vuebar);
Vue.use(Vuex)

// Theme Configurations
import 'prismjs'
import 'prismjs/themes/prism.css'
import VsPrism from './components/prism/VsPrism.vue';
Vue.component(VsPrism.name, VsPrism);

// i18n
import i18n from './i18n/i18n.js'
if(!localStorage.getItem('Language')) { localStorage.setItem('Language', 'en') }
// Vue Router
import { router } from './_helpers';
Vue.config.productionTip = true;
//Vue.config.silent = true;


new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
import '@/assets/scss/style.scss'

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