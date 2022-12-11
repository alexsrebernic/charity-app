import { defineStore } from 'pinia'
import deviceType from '../utils/deviceType';
import { ethers } from 'ethers';
import contractABI from '../contracts/abis/Donee.json'
import avalaibleNetworks from '../utils/networksData'
import { useDonationsCardsStore } from './donationCardsStore';
import aggregatorV3InterfaceABI from '../contracts/abis/AggregatorV3InterfaceABI.json'
import axios from 'axios';
export const usePricesStore = defineStore('prices', {
    state: () => ({ 
      prices: {}
    }),
    getters: {
        getPriceOfToken(state){
            return (networkId) => state.prices[networkId]  
        }
    },
    actions: {
        async fetchPriceOfToken(networkId){
            if (ethereum) {
                console.log(networkId)
                const provider = new ethers.providers.JsonRpcProvider(avalaibleNetworks[networkId].JSONRPCProvider)
                const addr = avalaibleNetworks[networkId].ethUsdPriceFeed
                const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider)
                let decimals = await priceFeed.decimals();
                let roundData = await priceFeed.latestRoundData();
                const price = Number((roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2));
                this.prices[networkId] = price
                console.log(price)
                return price;
            } else {
                throw Error("This web app requires Metamask, please install Metamask")
            }
          
        },
    }
})

