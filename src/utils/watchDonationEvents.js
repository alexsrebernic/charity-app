import { ethers, utils } from 'ethers'
import {abi} from '../contracts/abis/Donee.json'
import getDonors from './getDonors'
import networksData from '../helpers/networksData'
import { useDonationsCardsStore } from '../store/donationCardsStore'
import { useUserStore } from '../store/userStore'

export default async () => {
    try {
        for(const networkId in networksData){
            console.log(networkId)
            const donors = await getDonors()
            const network = networksData[networkId]
            const wbsProvider = network.webSocketProvider;
            if(!wbsProvider) return
            const provider = new ethers.providers.WebSocketProvider(wbsProvider);
            donors.forEach(donor => {
                const contract = new ethers.Contract(donor,abi,provider)
                contract.on("donation", (from,to,value,event) => {
                    // if(useUserStore().user == donor) return
                    useDonationsCardsStore().getUpdatedDataFromCan(networkId,donor,amount)
                })
            })
            
        }
    } catch(e){
        console.error(e)
    }
}