import { ethers } from 'ethers'

const getDefaultState = () => ({
  provider: null,
  wallet: null,
  balance: null,
})

const state = getDefaultState()

const getters = {
  getProvider: (state) => () => state.provider,
  getWallet: (state) => () => state.wallet,
  getBalance: (state) => () => state.balance,
}

const actions = {
  async login(state) {
    const requestAccounts = () => window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(async result => {
        // @TODO without specifying network as 'any' will get the error:
        // 'get' on proxy: property '_network' is a read-only and non-configurable data property...
        let provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
        let wallet = result[0]
        let balance = await provider.getBalance(wallet)
        console.log('auth', provider, wallet, balance)

        return {
          provider,
          wallet,
          balance
        }
      })
      .catch(error => {
        console.log('auth err', error.message);
      })

    const authData = await requestAccounts()

    state.commit('setAuthData', authData)

    // @TODO listener on account change - find appropriate place for this code
    window.ethereum.on('accountsChanged', async (accounts) => {
      const oldWallet = state.getters.getWallet()
      const newWallet = accounts[0]
      if (oldWallet !== newWallet) {
        console.log('wallet changed', oldWallet, '>>>', newWallet)
        state.commit('setAuthData', await requestAccounts())
      }
    })
  },
  logout(state) {
    state.commit('setAuthData', Object.assign(state, getDefaultState()))
  }
}

const mutations = {
  setProvider(state, provider) {
    state.provider = provider ? provider : null
  },
  setAuthData(state, payload) {
    state.provider = payload?.provider
    state.wallet = payload?.wallet
    state.balance = payload?.balance
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
