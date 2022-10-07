import { defineStore } from 'pinia'

export const useDonationsCardsStore = defineStore('donations_cards', {
    state: () => (
        { 
        "Binance-testnet": [],
        "Rinkeby":[] 
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
})