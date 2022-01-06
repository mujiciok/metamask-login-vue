<template>
  <v-app>
    <Header/>
    <v-main>
      <HelloWorld msg="NFT"/>
      <SendEthForm v-if="getWallet"/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header'
import SendEthForm from '@/components/SendEthForm'
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    Header,
    HelloWorld,
    SendEthForm,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters({
      getWallet: 'auth/getWallet',
    }),
  },
}
</script>

<style lang="sass">
  body
    margin: 0
    padding: 0
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
</style>
