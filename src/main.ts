import { createApp } from 'vue'
import App from '@/App.vue'

import { router } from '@/router'
import { store } from '@/store/create-store'
import { VueGlobalPropertiesPlugin, MQPlugin } from '@/plugins'

import '@/assets/styles/main.scss'

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(VueGlobalPropertiesPlugin)
  .use(MQPlugin)
  .mount('#app')

export {
  app
}
