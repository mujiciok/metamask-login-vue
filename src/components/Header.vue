<template>
  <div class="container">
    <div class="item" id="logo">NFT Upload</div>
    <div class="item content">
      <span class="wallet" v-if="getFormattedWallet">{{ getFormattedWallet }}</span>
      <span class="balance" v-if="getFormattedBalance">
        {{ getFormattedBalance }}
        <font-awesome-icon :icon="['fab', 'ethereum']"/>
      </span>
    </div>
    <div class="item">
      <font-awesome-icon icon="sign-in-alt" v-if="getWallet()" @click="signOut"/>
      <font-awesome-icon icon="sign-out-alt" v-if="!getWallet()" @click="signIn"/>
    </div>
  </div>
</template>

<script>
import { ethers } from 'ethers'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Header",
  data: function() {
    return {
      error: '',
    }
  },
  updated() {
    console.log('updated')
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // @TODO observer for network change - find appropriate place for this code
    provider.on("network", (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        console.log('network changed')
        window.location.reload();
      }
    });
  },
  computed: {
    ...mapGetters({
      getWallet: 'auth/getWallet',
      getBalance: 'auth/getBalance',
    }),
    getFormattedBalance() {
      if (!this.getBalance()) {
        return null
      }
      let formattedBalance = ethers.utils.formatEther(this.getBalance())
      formattedBalance = parseFloat(formattedBalance.toString()).toFixed(5)

      return formattedBalance
    },
    getFormattedWallet() {
      let wallet = this.getWallet()

      return wallet ? wallet.replace(wallet.substr(4,34), '...') : null
    }
  },
  // @TODO update balance after transaction
  // watch: {
  //   balance: 'getBalance'
  // },
  methods: {
    ...mapActions({
      login: 'auth/login',
      logout: 'auth/logout',
    }),
    async signIn() {
      if (window.ethereum && window.ethereum.isMetaMask) {
        this.login()
      } else {
        this.$data.error = 'MetaMask not installed'
        console.log(this.$data.error);
      }
    },
    signOut() {
      this.logout()
    },
  }
}
</script>

<style lang="sass" scoped>
  .container
    display: flex
    justify-content: space-between
    align-items: center
    gap: 40px
    background-color: lightgrey
    padding: 10px 30px
    height: 50px
    .item
      flex-grow: 0
      &.content
        display: flex
        justify-content: flex-end
        gap: 20px
        align-items: center
        font-size: 1.5rem
        flex-grow: 1
        .wallet
          font-weight: bolder
          font-size: 1.2rem
        .balance
          font-size: 2rem
          color: green
          svg
            cursor: default
            font-size: 2rem
      &#logo
        line-height: 50px
        color: darkslategray
        font-weight: bolder
        font-size: 2.5rem
    svg
      font-size: 3rem
      color: darkslategray
      &:hover
        cursor: pointer
</style>