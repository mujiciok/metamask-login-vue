<template>
  <v-form>
    <v-text-field
      v-model="address"
      label="Address"
      required
    />
    <v-text-field
      v-model="amount"
      label="Amount"
      required
    />
    <v-btn @click="send">Send</v-btn>
  </v-form>
</template>

<script>
import { ethers } from 'ethers'
import { mapGetters } from 'vuex'

const defaultState = {
  address: '0x1c172711612e61ecE1a6c09EAABb2e1e41A5C796',
  amount: "0.0001",
}

export default {
  name: "SendEthForm",
  data: () => ({
    address: defaultState.address,
    amount: defaultState.amount,
  }),
  computed: {
    ...mapGetters({
      getProvider: 'auth/getProvider',
    })
  },
  methods: {
    clear() {
      // @TODO any other method to do that?
      this.address = defaultState.address
      this.amount = defaultState.amount
    },
    send() {
      console.log('sending')
      const signer = this.getProvider().getSigner()

      const value = ethers.utils.parseEther(this.amount)
      const tx = {
        to: this.address,
        value: value
      }
      console.log('tx data', tx)

      signer.sendTransaction(tx).then((tx) => {
        console.log('success', tx);
        this.clear()
      }).catch((err) => {
        console.log('fail', err)
      });
    }
  }
}
</script>

<style lang="sass" scoped>
  form
    display: grid
    margin: 0 25%
</style>