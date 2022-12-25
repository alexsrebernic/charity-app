import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import avalaibleNetworks from "../helpers/networksData"
import { useDonationsCardsStore } from "../store/donationCardsStore";
import { useUserStore } from "../store/userStore";
export default async function (){
    try {
        const userStore = useUserStore()
        const donationCardStore = useDonationsCardsStore()
        for (const networkId in avalaibleNetworks){
            const networkName = avalaibleNetworks[networkId].name
            console.log(networkId)
            onSnapshot(collection(db, networkName), (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const can = change.doc.data()
                    if (change.type === "added") {
                        console.log("New donee: ", can);
                        donationCardStore.pushCan(networkName,can)
                    }
                    if (change.type === "modified") {
                        donationCardStore.replaceCan(networkName,can)
                        console.log("Modified donee: ", can);
                    }
                    if (change.type === "removed") {
                        console.log("Removed donee: ", can);
                    }
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