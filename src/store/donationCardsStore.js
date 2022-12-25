import { defineStore } from 'pinia'
import { setDoc,doc,collection,addDoc,deleteDoc, Timestamp, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import {db} from "../../firebase.config"
import { useUserStore } from "../store/userStore"
import networksData from "../helpers/networksData"
import {abi} from "../contracts/abis/Factory.json"
import { ethers, Signer } from 'ethers'
import avalaibleNetworks from '../helpers/networksData'
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
            return (owner_address,network) => state[network].filter(card => card.owner_address == owner_address).pop()
        },
        getAllCards(state){
            return (network) => state[network]
        },
        getCardsWithoutUserCard(state){
            return (owner_address,network) => state[network].filter(card => card.owner_address !== owner_address)
        }
    },
    actions: {
        deleteCan(networkId,address){
            return new Promise(async (resolve,reject) => {
                try {
                    const network = networksData[networkId].name
                    await deleteDoc(getDocRefFromNetworkTestnet(network,address))
                    this[network].splice(this[network].findIndex(can => can.address == address),1);
                    resolve(true)
                } catch( error ){
                    reject(error)
                }
            })
        },
        pushCan(networkName,can){
            if(this[networkName].find(a => a.can_address == can.can_address)) return
            this[networkName] = [...this[networkName], can]
        },
        replaceCan(networkName,can){
            this[networkName].splice(this[networkName].findIndex(a => a.can_address == can.can_address),1,can);
        },
        getCan(networkId,address){
            return new Promise(async(resolve,reject) => {
                try {
                    console.log(networkId,address)
                    const network = networksData[networkId].name
                    const can = await getDoc(getDocRefFromNetworkTestnet(network,address))
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
        getCansFromNetwork(networkId){
            return new Promise(async(resolve,reject) => {
                try {
                    const network = networksData[networkId].name
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
        async createCan(networkId,dataCan){
                try {
                    const {first_name,last_name,avatar_color,details} = dataCan
                    const owner_address = useUserStore().user;
                    if(await this.getCan(networkId,owner_address)) return reject("Address already have a can created")
                    const networkName = networksData[networkId].name;
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await provider.send('eth_requestAccounts', [])
                    const signer = provider.getSigner()
                    const contractAddress =  networksData[networkId].factoryContractAddress;
                    const contract = new ethers.Contract(contractAddress, abi, signer)
                    const transactionResponse = await contract.createNewDonee()
                    await this.listenForTransactionMine(transactionResponse, provider)
                    const response = await transactionResponse.wait()
                    const can_address = response.events[0].args[1]
                    const can = {
                        can_address,
                        owner_address,
                        first_name,
                        last_name,
                        avatar_color,
                        details,
                        donors: [],
                        createdAt: Timestamp.now(),
                        total_balance: 0,
                        current_balance: 0,
                    }
                    await setDoc(getDocRefFromNetworkTestnet(networkName,owner_address),can)
                    this.pushCan(networkName,can)
                    console.log("Can succesfully created!")
                } catch ( error ){
                    console.error(error)
                    throw Error(error)
                }
        },
        donateToCan(can,amountDonated){
            console.log("Donating to can")
            return new Promise(async (resolve,reject) => {
                try {
                    const { user, currentUserNetworkId } = useUserStore()
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await provider.send('eth_requestAccounts', [])
                    const userContract = await useUserStore().getUserContract(can.can_address)
                    const response = await userContract.donate({
                        value: ethers.utils.parseEther(String(amountDonated)) 
                    })
                    await this.listenForTransactionMine(response, provider)
                    const network = networksData[currentUserNetworkId].name
                    can.total_balance = Number(can.total_balance) + Number(amountDonated);
                    can.current_balance = Number(can.current_balance) + Number(amountDonated);
                    can.donors = [...can.donors, user]
                    await updateDoc(getDocRefFromNetworkTestnet(network,can.owner_address),{
                        total_balance : can.total_balance,
                        current_balance : can.current_balance,
                        donors: can.donors,
                    })
                    console.log("Donation succesfully executed")
                    resolve(true)
                } catch(error){
                    reject(error)
                }
            })
        },
        async withdraw(can){
            const { user, currentUserNetworkId } = useUserStore()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', [])
            const userContract = await useUserStore().getUserContract(can.can_address)
            const response = await userContract.withdraw()
            await this.listenForTransactionMine(response, provider)
            const network = networksData[currentUserNetworkId].name
            can.current_balance = 0;
            await updateDoc(getDocRefFromNetworkTestnet(network,can.owner_address),{
                current_balance : 0,
            })
            console.log("Withdrawl succesfully executed")
        },
        listenForTransactionMine(transactionResponse, provider) {
            console.log(`Mining ${transactionResponse.hash}`)
            return new Promise((resolve, reject) => {
                try {
                    provider.once(transactionResponse.hash, (transactionReceipt) => {
                        console.log(
                            `Completed with ${transactionReceipt.confirmations} confirmations. `
                        )
                        resolve()
                    })
                } catch (error) {
                    reject(error)
                }
            })
        },
        async fetchDonationsCards(){
            console.log("Fetch donations cards...")
            const data = {}
            for(const networkId in avalaibleNetworks){
                const networkName = avalaibleNetworks[networkId].name
                const cardsQuery = (await getDocs(getNetworkRefCollection(avalaibleNetworks[networkId].name))).docs
                const cards = []
                for await(const doc of cardsQuery) {
                    cards.push(doc.data());
                }
                this[networkName] = data[networkName] = cards
            }
            return data
        },
        async getUpdatedDataFromCan(networkId,address){
            const networkName = networksData[networkId].name
            const check = setInterval( async () => {
                const can = await this.getCan(networkId,address);
                if(can){
                    this.replaceCan(networkName,can)
                    clearInterval(check)
                    return
                }
            }, 3000);
        },
        async addNewCan(networkId,address){
            const check = setInterval( async () => {
                const can = await this.getCan(networkId,address);
                if(can){
                    this.pushCan(networksData[networkId].name,can)
                    clearInterval(check)
                    return
                }
            }, 3000);
        }
    }
})