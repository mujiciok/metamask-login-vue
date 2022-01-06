import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcon from '@/plugins/fontAwesome'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts().then()

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)

app.use(store)
app.use(vuetify)
app.mount('#app')
