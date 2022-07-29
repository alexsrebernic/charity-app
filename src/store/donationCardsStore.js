import { defineStore } from 'pinia'

export const useDonationsCardsStore = defineStore('donations_cards', {
    state: () => ({ donations_cards: [] }),
    getters: {
        getUserDonationCard(state){
            return (owner_address) => state.donations_cards.filter(card => card.owner == owner_address)
        },
        getDonationsCard(state){
            return state.donations_cards
        },
    },
    actions: {
        async createUserDonationCard(_data){
            let data = _data;
            if(!data.avatar_color) data.avatar_color = "#d1d5da"
            data.avatar_color.slice(1)

        }
    }
})