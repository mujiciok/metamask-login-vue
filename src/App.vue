<template>
  <Header/>
  <HelloWorld msg="NFT"/>
  <SendEthForm/>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header'
import SendEthForm from '@/components/SendEthForm'

export default {
  name: 'App',
  components: {
    Header,
    HelloWorld,
    SendEthForm,
  }
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
