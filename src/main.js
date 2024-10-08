import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui';
import overflowTooltip from './utils/tip'
 
Vue.directive('overflow-tooltip', overflowTooltip)

// jquery
import $ from 'jquery'
Vue.prototype.$ = $

import './assets/fonts/font.css'

//使用vue-video
import VideoPlayer from 'vue-video-player/src';
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

import Video from 'video.js'
import 'video.js/dist/video-js.css' 
Vue.prototype.$video = Video

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import 'animate.css'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
import wow from 'wowjs'
Vue.prototype.$wow = wow
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'qGToYpGeKSWyiSbcbCHQuXve76nylEKK'
})
// amfe-flexible
import './utils/amfe-flexible'
// 公共样式
import './assets/css/main.css'
import 'element-ui/lib/theme-chalk/index.css' //引用 element-ui 样式
import 'element-ui/lib/theme-chalk/display.css'
import "wowjs/css/libs/animate.css"

Vue.use(vueAwesomeSwiper);

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
