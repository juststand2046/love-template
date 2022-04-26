import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueResource from 'vue-resource';

Vue.config.productionTip = false;

Vue.use(vueResource);
Vue.http.options.emulateJSON = true;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
