import {db} from '../../firebase.config'
import { setDoc,doc,collection,addDoc,deleteDoc, Timestamp, getDoc } from 'firebase/firestore'

const getDocFromNetworkTestnetRef = (network,address) =>  doc(db,network,address)

function createCan(network,dataCan){
    return new Promise(async (resolve,reject) => {
        try {
            const {first_name,last_name,avatar_color,details,address} = dataCan
            if(await getCan(network,address)) reject("Address already have a can created")
            await setDoc(getDocFromNetworkTestnetRef(network,address),{
                first_name,
                last_name,
                avatar_color,
                details,
                createdAt: Timestamp.now(),
                total_donated: 0,
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
            await deleteDoc(getDocFromNetworkTestnetRef(network,address))
            resolve(true)
        } catch( error ){
            reject(error)
        }
    })
}
function getCan(network,address){
    return new Promise(async(resolve,reject) => {
        try {
            const can = (await getDoc(getDocFromNetworkTestnetRef(network,address)))
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
export { createCan,deleteCan }
