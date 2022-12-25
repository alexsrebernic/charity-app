import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import avalaibleNetworks from "../helpers/networksData"
import { useDonationsCardsStore } from "../store/donationCardsStore";
export default async function (){
    try {
        const donationCardStore = useDonationsCardsStore()
        for (const networkId in avalaibleNetworks){
            const networkName = avalaibleNetworks[networkId].name
            onSnapshot(collection(db, networkName), (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const can = change.doc.data()
                    if (change.type === "added") {
                        donationCardStore.pushCan(networkName,can)
                    }
                    if (change.type === "modified") {
                        donationCardStore.replaceCan(networkName,can)
                    }
                    // if (change.type === "removed") {
                    //     console.log("Removed donee: ", can);
                    // }
                });
            },(error) => {
                console.error(error)
            });
        }
        return console.log("Listening to changes!")
    } catch ( e ) {
        return e
    }
}