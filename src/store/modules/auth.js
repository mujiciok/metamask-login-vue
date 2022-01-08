import { HTTP } from '@/plugins/axios'
import { SIGNATURE_MESSAGE } from '@/constants'
import { getMetamaskAuthData } from '@/utils/ethers'

const getDefaultState = () => ({
  provider: null,
  wallet: null,
  balance: null,
})

const state = getDefaultState()

const getters = {
  getProvider: (state) => () => state.provider, // method-style access to provider as it is an object
  getWallet: (state) => state.wallet,
  getBalance: (state) => state.balance,
}

const actions = {
  loginBackend(state, payload) {
    HTTP.post('metamask-auth', payload)
      .then((res) => {
        console.log('backend res', res)
      })
      .catch((err) => {
        console.log('backend err', err)
      })
    console.log(state)
  },
  requestAccounts(state) {
    getMetamaskAuthData(false)
      .then((res) => {
        state.commit('setMetamaskAuthData', res)
      })
  },
  login(state) {
    getMetamaskAuthData()
      .then((res) => {
        state.commit('setMetamaskAuthData', res)

        this.dispatch('auth/loginBackend', {
          address: res.wallet,
          signature: res.signature,
          message: SIGNATURE_MESSAGE,
        })
      })
  },
  logout(state) {
    state.commit('setMetamaskAuthData', Object.assign(state, getDefaultState()))
  }
}

const mutations = {
  setAuthData(state, payload) {
    state.token = payload?.token
    state.user = payload?.user
  },
  setMetamaskAuthData(state, payload) {
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
