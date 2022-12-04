import { defineStore } from 'pinia'
import deviceType from '../utils/deviceType';
export const useUserStore = defineStore('user', {
    state: () => ({ 
      user: {} ,
      currentUserNetworkId : ''
    }),
    getters: {
      getUser: (state) => state.user,
    },
    actions: {
      setCurrentUser(){
        this.user = Moralis.User.current();
      },
      removeUser(){
        this.user = {}
      },
      logIn(){
        return new Promise( async ( resolve, reject ) => {
          if(typeof web3 === 'undefined') throw Error('No metamask founded!');
          let user = Moralis.User.current();
          const device = deviceType()
          if(!user){
            if(device == 'mobile' || device == 'tablet'){
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
            this.setCurrentUser()
            console.log(`User with address ${user.attributes.ethAddress} connected`);
            resolve(user)
          } else {
            this.setCurrentUser()
            resolve(user)
          }
        })
      },
      async logOut() {
        return new Promise( async ( resolve, reject ) => {
          try {
            await Moralis.User.logOut();
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

