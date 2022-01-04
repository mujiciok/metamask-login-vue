import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcon from '@/plugins/fontAwesome'
import store from './store'

// const Web3 = require('web3')
// const VueWeb3 = require('vue-web3')


const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)

app.use(store)
app.mount('#app')

// app.use(store)

// Vue.use(VueWeb3, { web3: new Web3(window.web3.currentProvider) })
