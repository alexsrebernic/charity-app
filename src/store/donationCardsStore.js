import { defineStore } from 'pinia'
import { setDoc,doc,collection,addDoc,deleteDoc, Timestamp, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import {db} from "../../firebase.config"
const getDocRefFromNetworkTestnet = (network,address) =>  doc(db,network,address)
const getNetworkRefCollection = (network) => collection(db,network)
export const useDonationsCardsStore = defineStore('donations_cards', {
    state: () => (
        { 
        "Binance-testnet": [],
        "Goerli":[] 
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
        createCan(network,dataCan){
            return new Promise(async (resolve,reject) => {
                try {
                    const {first_name,last_name,avatar_color,details,address} = dataCan
                    if(await getCan(network,address)) reject("Address already have a can created")
                    const can = {
                        first_name,
                        last_name,
                        avatar_color,
                        details,
                        donors: [],
                        createdAt: Timestamp.now(),
                        total_balance: 0,
                        current_balance: 0,
                    }
                    await setDoc(getDocRefFromNetworkTestnet(network,address),can)
                    this[network].push(can);
                    resolve(true)
                } catch ( error ){
                    reject(error)
                }
            })
        },
        deleteCan(network,address){
            return new Promise(async (resolve,reject) => {
                try {
                    await deleteDoc(getDocRefFromNetworkTestnet(network,address))
                    resolve(true)
                } catch( error ){
                    reject(error)
                }
            })
        },
        getCan(network,address){
            return new Promise(async(resolve,reject) => {
                try {
                    const can = (await getDoc(getDocRefFromNetworkTestnet(network,address)))
                    if(!can.exists){
                        resolve(null)
                    } else {
                        resolve(can.data())
                    }
                } catch(error){
                    reject(error)
                }
            })
        },
        getCansFromNetwork(network){
            return new Promise(async(resolve,reject) => {
                try {
                    const cans = (await getDocs(getNetworkRefCollection(network)))
                    if(cans.size == 0){
                        resolve(null)
                    } else {
                        resolve(cans.docs)
                    }
                } catch(error){
                    reject(error)
                }
            })
        },
        donateToCan(network,can,donor){
            return new Promise(async (resolve,reject) => {
                try {
                
                    const newTotalBalanceCan = Number(can.total_balance) + Number(donor.amountDonated);
                    const newCurrentBalanceCan = Number(can.current_balance) + Number(donor.amountDonated);
                    const newArrayOfDonors = [...can.donors, donor.address]
                    await updateDoc(getDocRefFromNetworkTestnet(network,can.address),{
                        total_balance : newTotalBalanceCan,
                        current_balance : newCurrentBalanceCan,
                        donors: newArrayOfDonors,
                    })
                    resolve(true)
                } catch(error){
                    reject(error)
                }
            })
        }
    }
})