import {db} from '../../firebase.config'
import { setDoc,doc,collection,addDoc,deleteDoc, Timestamp, getDoc, getDocs, updateDoc } from 'firebase/firestore'

const getDocRefFromNetworkTestnet = (network,address) =>  doc(db,network,address)
const getNetworkRefCollection = (network) => collection(db,network)
function createCan(network,dataCan){
    return new Promise(async (resolve,reject) => {
        try {
            const {first_name,last_name,avatar_color,details,address} = dataCan
            if(await getCan(network,address)) reject("Address already have a can created")
            await setDoc(getDocRefFromNetworkTestnet(network,address),{
                first_name,
                last_name,
                avatar_color,
                details,
                donors: [],
                createdAt: Timestamp.now(),
                total_balance: 0,
                current_balance: 0,
            })
            resolve(true)
        } catch ( error ){
            reject(error)
        }
    })
}
function deleteCan(network,address){
    return new Promise(async (resolve,reject) => {
        try {
            await deleteDoc(getDocRefFromNetworkTestnet(network,address))
            resolve(true)
        } catch( error ){
            reject(error)
        }
    })
}
function getCan(network,address){
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
}
function getCansFromNetwork(network){
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
}
function donateToCan(network,can,donor){
    return new Promise(async(resolve,reject) => {
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
export { createCan,deleteCan,getCan,getCansFromNetwork,donateToCan }
