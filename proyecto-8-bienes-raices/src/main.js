import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VueFire, VueFireAuth } from 'vuefire';
import App from './App.vue';
import router from './router'
import { firebaseApp } from './config/firebase';
const app = createApp(App)
//Firebase
app.use(VueFire,{
    firebaseApp,
    modules:[VueFireAuth()],
})
app.use(createPinia())
app.use(createVuetify({
    components,
    directives,
}));

app.use(router)

app.mount('#app')
