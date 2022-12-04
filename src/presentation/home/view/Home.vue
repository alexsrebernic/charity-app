<template >
    <div class="md:w-5/6 mx-auto ">
        <SelectNetwork @changeSelectedNetwork="changeSelectedNetwork"/>
        <div class="mt-6  gap-y-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <UserCreateCard 
            @changeUserWalletState="changeUserWalletState"  
            :isUserWalletConnected="isUserWalletConnected"
            :selectedNetwork="selectedNetwork"
            class="mx-auto"
            v-if="!userHaveCan"
            />
            <OwnCard
            v-else
            class="mx-auto"
            :data="ownCardData"
            />
            <DonationCard 
            @changeUserWalletState="changeUserWalletState" 
            :isUserWalletConnected="isUserWalletConnected" 
            :selectedNetwork="selectedNetwork"
            :data="donation"
            class="mx-auto" 
            />
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, watch } from "@vue/runtime-core";
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
const selectedNetwork = ref('')

const displayToast = inject('toast')
const avalaibleNetworks = inject("avalaibleNetworks")
const donations = ref([])
const donation = ref({
    owner_address: '0x7b48d3b279645a27f63ecfcef49c71086a626680',
    first_name: "Alex",
    last_name:"Srebernic",
    total_donated: 320,
    created_at: '26/7/2022',
    last_donated_address: "0x59583810eb074ccc5c26397c621a27ac11889225",
    details: '¡Hello world¡Hello world¡Hello world¡Hello world¡Hello world!overflow-autooverflow-autooverflow-autooverflow-auto wooverflow-autooverflow-autooverflow-autooverflow-autooverflow-autooverflow-autorld!'
})
const ownCardData = ref({})

watch(() => userStore.user,async (newUser) => {
    if(Object.entries(newUser).length > 0){
        isUserWalletConnected.value = true
        const userCan = await donationCardsStore.getCan(userStore.currentUserNetworkId,userStore.user.attributes.ethAddress)
        if(userCan){
            ownCardData.value = userCan
            userHaveCan.value = true
        } 
    } else {
        isUserWalletConnected.value = false
        userHaveCan.value = false
    }
})

onMounted(async () => {
    if(Object.entries(userStore.getUser).length > 0){
        isUserWalletConnected.value = true
        const userCan = await donationCardsStore.getCan(selectedNetwork,userStore.user.attributes.ethAddress)
        console.log(selectedNetwork)
        if(userCan){
            ownCardData.value = userCan
            userHaveCan.value = true
        } 
    }
})

function changeUserWalletState(){
    isUserWalletConnected.value = !isUserWalletConnected.value
}
function changeSelectedNetwork(value){
    selectedNetwork.value = value
}

</script>
<style lang="">

</style>