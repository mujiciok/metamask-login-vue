import { ethers } from 'ethers'

const state = () => ({
  provider: null,
  wallet: null,
  balance: null,
})

const getters = {
  getProvider: (state) => () => state.provider,
  getWallet: (state) => () => state.wallet,
  getBalance: (state) => () => state.balance,
}

const actions = {
  async login(state) {
    const requestAccounts = () => window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(async result => {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        let wallet = result[0]
        let balance = await provider.getBalance(wallet)

        state.commit('setAuthData', {
          provider,
          wallet,
          balance
        })
      })
      .catch(error => {
        console.log(error.message);
      })

    requestAccounts()

    window.ethereum.on('accountsChanged', function (accounts) {
      const oldWallet = state.getters.getWallet()
      const newWallet = accounts[0]
      console.log(oldWallet, newWallet)
      if (oldWallet !== newWallet) {
        console.log('wallet changed')
        requestAccounts()
      }
    })
  },
  logout(state) {
    state.commit('setAuthData', {
      provider: null,
      wallet: null,
      balance: null,
    })
  }
}

const mutations = {
  setProvider(state, provider) {
    state.provider = provider ? provider : null
  },
  setAuthData(state, payload) {
    state.provider = payload.provider
    state.wallet = payload.wallet
    state.balance = payload.balance
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
