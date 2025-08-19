import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import Icons from "./plugins/icons"


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Icons)

app.mount('#app')
