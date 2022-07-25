import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
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
      }
    },
})