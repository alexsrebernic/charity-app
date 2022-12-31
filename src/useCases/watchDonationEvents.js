import { ethers, utils } from 'ethers'
import {abi} from '../contracts/abis/Donee.json'
import networksData from '../helpers/networksData'
import { useDonationsCardsStore } from '../store/donationCardsStore'
import { useUserStore } from '../store/userStore'
import { doc, onSnapshot } from "firebase/firestore";

export default async (donationCards) => {
    try {
        for(const networkId in networksData){
            const network = networksData[networkId];
            console.log(donationCards)
            const donors = await donationCards[network.name];
            const wbsProvider = network.webSocketProvider;
            if(!wbsProvider) return;
            const provider = new ethers.providers.WebSocketProvider(wbsProvider);
            donors.forEach(({can_address,owner_address}) => {
                const contract = new ethers.Contract(can_address,abi,provider);
                contract.on("donation", (from,to,value,event) => {
                    console.log(from,to,event,value,donor);
                    if(useUserStore().user == owner_address) return
                    useDonationsCardsStore().getUpdatedDataFromCan(networkId,owner_address);
                });
            });
        };
    } catch(e){
        console.error(e)
    }
}