import { ethers } from 'ethers'
import { SIGNATURE_MESSAGE } from '@/constants'

export const getMetamaskAuthData = (isLogin = true) => window.ethereum.request({ method: 'eth_requestAccounts' })
  .then(async result => {
    // @TODO without specifying network as 'any' will get the error:
    // 'get' on proxy: property '_network' is a read-only and non-configurable data property...
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const wallet = result[0]
    const balance = await provider.getBalance(wallet)
    let signature = null
    if (isLogin) {
      signature = await provider.getSigner().signMessage(SIGNATURE_MESSAGE);
    }
    // console.log('auth', provider, wallet, balance, signature)

    return {
      provider,
      wallet,
      balance,
      signature,
    }
  })
  .catch(error => {
    console.log('auth err', error.message);
  })
