<template >
    <div >
        <SelectNetwork @changeSelectedNetwork="changeSelectedNetwork"/>
        <div class="mt-6">
        </div>
        <div class="mt-6  gap-y-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <Transition  :duration="{ enter: 500, leave: 200 }" name="fade" mode="out-in">
                <UserCreateCard 
                @changeUserWalletState="changeUserWalletState"
                @getDonationsCards="getDonationsCard"  
                :isUserWalletConnected="isUserWalletConnected"
                :selectedNetwork="selectedNetwork"
                class="mx-auto"
                v-if="!userHaveCan"
                />
                <OwnCard
                v-else
                class="mx-auto"
                :data="ownCardData"
                :selectedNetwork="selectedNetwork"
                />
            </Transition>
            <DonationCard 
            v-for="(donation, index) in donations" :key="index"
            @changeUserWalletState="changeUserWalletState" 
            :isUserWalletConnected="isUserWalletConnected" 
            :selectedNetwork="selectedNetwork"
            :data="donation"
            class="mx-auto" 
            />
        </div>
    </div>
</template>
<script  setup>
import { inject, onMounted, reactive, watch } from "@vue/runtime-core";
import DonationCard from "../DonationCard.vue";
import UserCreateCard from "../UserCreateCard.vue";
import OwnCard from "../OwnCard.vue";
import SelectNetwork from "../SelectNetwork.vue";
import { ref } from "vue";
import { useUserStore } from "../../../store/userStore";
import { useDonationsCardsStore } from "../../../store/donationCardsStore";
const donationCardsStore = useDonationsCardsStore()
const userStore = useUserStore()
const isUserWalletConnected = ref(false)
const userHaveCan = ref(false)
const selectedNetwork = ref({})

const displayToast = inject('toast')
const avalaibleNetworks = inject("avalaibleNetworks")
const donations = ref([])
const ownCardData = ref({})

watch(() => userStore.user,async (newUser) => {
   await checkUser(newUser);
   await getDonationsCard()
})
watch(() => donationCardsStore[selectedNetwork.value.name],async (newCards) => {
    await getDonationsCard()
    await checkUser(userStore.getUser)
})
onMounted(async () => {
   await checkUser(userStore.getUser);
   await getDonationsCard();
//    await watchEvents(useUserStore.currentUserNetworkId)
})



async function getUserBalance(){
    const amount = await userStore.getUserBalance()
    return amount
}
async function checkUser(user){
    if(user){
        isUserWalletConnected.value = true
        const userCan =  donationCardsStore.getUserDonationCard(user,selectedNetwork.value.name)
        if(userCan){
            ownCardData.value = userCan
            userHaveCan.value = true
        }  else {
            ownCardData.value = {}
            userHaveCan.value = false
        }
    } else {
        isUserWalletConnected.value = false
        ownCardData.value = false;
        userHaveCan.value = false
    }
}
async function getDonationsCard(){
    if(userStore.user){
        donations.value = donationCardsStore.getCardsWithoutUserCard(userStore.user,selectedNetwork.value.name)
    } else {
        donations.value = donationCardsStore.getAllCards(selectedNetwork.value.name)
    }
}
function changeUserWalletState(){
    isUserWalletConnected.value = !isUserWalletConnected.value
}
async function changeSelectedNetwork(network){
    selectedNetwork.value = network
    if(userStore.user){
        const userCan = await donationCardsStore.getCan(selectedNetwork.value.id,userStore.user)
        if(userCan){
            ownCardData.value = userCan
            userHaveCan.value = true
        }  else {
            ownCardData.value = {}
            userHaveCan.value = false
        }
    }
    await getDonationsCard()
}

</script>
<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>