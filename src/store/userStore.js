import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ user: {} }),
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
      
      logIn(){
        return new Promise( async ( resolve, reject ) => {
          if(typeof web3 === 'undefined') throw Error('No metamask founded!');
          let user = Moralis.User.current();
          if(!user){
            if(deviceType() == 'mobile' || deviceType() == 'tablet'){
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
          await Moralis.User.logOut();
          console.log(`User disconnected`);
          this.removeUser()
          resolve()
        })
      },
    },
})

const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
  }
  else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
  }
  return "desktop";
};