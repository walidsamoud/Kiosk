import Vue from 'vue'
import App from './App.vue'
import {ApiConfigs, authHeader} from './_helpers'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
//Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Vuex Store
import { store } from './_store';

//Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCaretLeft);
library.add(faCaretRight);
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

require ('./assets/css/style.scss');
let fullConfig= JSON.parse(localStorage.getItem('kiosk')) ;
console.log(fullConfig);

if(fullConfig!=null){
  var config= JSON.parse( fullConfig.kiosk.config );
}

Vue.mixin({
  data:  function() {
    return {
      mixin: null,
      get Config() {
        this.mixin= fullConfig;
        return this.mixin;
      }
    }
  }
});
new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
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



let bodyStyles = document.body.style;
bodyStyles.setProperty('--primary', config.primaryDark);
bodyStyles.setProperty('--primary-medium', config.primaryMedium);
bodyStyles.setProperty('--primary-light', config.primaryLight);

bodyStyles.setProperty('--secondary', config.secondary);
bodyStyles.setProperty('--info', config.info);