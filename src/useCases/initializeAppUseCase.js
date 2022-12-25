import { useDonationsCardsStore } from "../store/donationCardsStore";
import { connectToFirebaseEmulator } from "../../firebase.config";
import watchNewDoneeEvents from './watchNewDoneeEvents';
import watchDonationEvents from './watchDonationEvents';
import listenToAllEvents from "./listenToAllEvents";
import { doc, onSnapshot } from "firebase/firestore";

export default async function initializeAppUseCase(){
    try {
        if (process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        typeof console !== 'undefined') connectToFirebaseEmulator()
    // useDonationsCardsStore().fetchDonationsCards().then(async function (donationsCards){
    //     // WITH SOLIDITY EVENTS
    //     // await watchNewDoneeEvents()
    //     // await watchDonationEvents(donationsCards)
    // })
     // WITH FIRESTORE LISTENER
        await listenToAllEvents()
    return
    } catch ( e ) {
        console.error(e)
    } 
}


