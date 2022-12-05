import { useDonationsCardsStore } from "../store/donationCardsStore";
import { connectToFirebaseEmulator } from "../../firebase.config";
export default async function initializeAppUseCase(){
    if (process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    typeof console !== 'undefined'
    ) connectToFirebaseEmulator()
    await useDonationsCardsStore().fetchDonationsCards()
    return
}