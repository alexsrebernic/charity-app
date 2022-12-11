import { ethers } from 'ethers'
import {abi} from '../contracts/abis/Factory.json'
import networksData from '../helpers/networksData'
import { useDonationsCardsStore } from '../store/donationCardsStore'
import { useUserStore } from '../store/userStore'
export default () => {
    try {
        for(const networkId in networksData){
            const network = networksData[networkId]
            const wbsProvider = network.webSocketProvider;
            const address = network.factoryContractAddress;
            if(!wbsProvider) return
            const provider = new ethers.providers.WebSocketProvider(wbsProvider);
            const contract = new ethers.Contract(address,abi,provider)
            contract.on("newDonee", (from,to,value,event) => {
                const newDoneeAddress = to.args[0];
                // if(useUserStore().user == newDoneeAddress) return
                console.log(useUserStore().user == newDoneeAddress)
                useDonationsCardsStore().addNewCan(networkId,newDoneeAddress)
            })
        }
    } catch(e){
        console.error(e)
    }
}