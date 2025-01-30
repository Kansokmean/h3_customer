import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import '@fontsource/kantumruy-pro';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createI18n } from 'vue-i18n';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_HOST

import App from './App.vue'
import router from './router'
import {en} from '@/lang/en'
import {km} from '@/lang/km'
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'km',
    fallbackLocale: 'km',
    messages: {
        en: en,
        km: km
    }
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
