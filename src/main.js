import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import Vue from 'vue'
// import excel from 'vue-excel-export'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
 
// Vue.use(excel)

// Vue.component('v-select', vSelect)

// Vue.use(VueAxios, axios)

const app = createApp(App);
app.use(router);
app.mount('#app');