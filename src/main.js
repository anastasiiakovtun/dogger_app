import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(VueQueryPlugin)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .mount('#app')