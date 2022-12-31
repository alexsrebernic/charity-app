import { defineStore } from 'pinia'
import deviceType from '../utils/deviceType';
import { ethers } from 'ethers';
import contractABI from '../contracts/abis/Donee.json'
import avalaibleNetworks from '../helpers/networksData'
import { useDonationsCardsStore } from './donationCardsStore';
export const useUserStore = defineStore('user', {
    state: () => ({ 
      user: null ,
      currentUserNetworkId : ''
    }),
    getters: {
      getUser: (state) => state.user,
    },
    actions: {
      setCurrentUser(user){
        this.user = user;
      },
      removeUser(){
        this.user = ""
      },
      async getUserContract(userContractAddress){
        try {
          const { ethereum } = window
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(userContractAddress, contractABI.abi, signer)
            return contract
          }
        }
        catch (e) {
          console.log('e', e)
        }
      },
      async connectWallet(){
        const { ethereum } = window
        if (!ethereum) throw Error('Must connect to MetaMask!')
        const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log('Connected: ', myAccounts[0])
        this.user = myAccounts[0]
      },
      async logOut() {
        return new Promise( async ( resolve, reject ) => {
          try {
            console.log(`User disconnected`);
            this.removeUser()
            resolve(true)
          } catch(error){
            reject(error)
          }
          
        })
      },
    },
    persist:true
})

