import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ user: null }),
    getters: {
      getUser: (state) => state.user,
    },
    actions: {
      setUser(_user){
        this.user = _user
      },
      removeUser(){
        this.user = null
      },
      async authenticateWithMetamask(){
      return new Promise( async ( resolve, reject ) => {
        const user = await Moralis.authenticate({
          signingMessage: "Log in using Moralis",
        })
        resolve(user)
      })
    
      },
      async authenticateWithWalletConnection(){
        return new Promise( async ( resolve, reject ) => {
          const user = await  Moralis.authenticate({ provider: "walletconnect",
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar",
          ]
          })
          resolve(user)
        })
      
      },
      
      logIn(method){
        return new Promise( async ( resolve, reject ) => {
          if(typeof web3 === 'undefined') throw Error('No metamask founded!');
          let user = Moralis.User.current();
          if(!user){
            if(method === 'mobile'){
              user = await Moralis.authenticate({ provider: "walletconnect",
                mobileLinks: [
                "rainbow",
                "metamask",
                "argent",
                "trust",
                "imtoken",
                "pillar",
              ]})
            } else {
              user = await Moralis.authenticate({
                signingMessage: "Log in using Moralis",
              })
            }
            this.setUser(user)
            console.log(`User with address ${user.attributes.ethAddress} connected`);
            resolve(user)
          } else {
            this.setUser(user)
            resolve(user)
          }
        })
      },
      async logOut() {
        return new Promise( async ( resolve, reject ) => {
          await Moralis.User.logOut();
          console.log(`User with address ${this.user.attributes.ethAddress} disconnected`);
          this.removeUser()
          resolve()
        })
      }
    },
})