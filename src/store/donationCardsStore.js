import { defineStore } from 'pinia'

export const useDonationsCardsStore = defineStore('donations_cards', {
    state: () => (
        { 
        "binance-testnet": [],
        "rinkeby":[] 
        }
        ),
    getters: {
        getUserDonationCard(state){
            return (owner_address,network) => state[network].filter(card => card.owner == owner_address)
        },
        getBinanceDonationsCard(state){
            return state['binance-testnet']
        },
        getRinkebyDonationsCard(state){
            return state['rinkeby']
        },
        removeUserDonationCard(owner_address,network){
            this[network] = this[network].filter(card => card.owner != owner_address)
        }
    },
    actions: {
        async createUserDonationCard(_data){
            let data = _data;
            if(!data.avatar_color) data.avatar_color = "#d1d5da"
            data.avatar_color.slice(1)
        }
    }
})