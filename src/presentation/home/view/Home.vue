<template >
    <div class="md:w-5/6 mx-auto pt-12">
       
        <div class="mt-6  gap-y-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <UserCard 
            @changeUserWalletState="changeUserWalletState"  
            :isUserWalletConnected="isUserWalletConnected"
            class="mx-auto"
            />
            <DonationCard 
            @changeUserWalletState="changeUserWalletState" 
            :isUserWalletConnected="isUserWalletConnected" 
            :data="donation"
            class="mx-auto" 
            />
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted, watch } from "@vue/runtime-core";
import DonationCard from "../DonationCard.vue";
import UserCard from "../UserCreateCard.vue";
import { ref } from "vue";
import { useUserStore } from "../../../store/userStore";

const userStore = useUserStore()
const isUserWalletConnected = ref(false)

watch(() => userStore.user, (newUser) => {
    if(Object.entries(newUser).length > 0){
         isUserWalletConnected.value = true
        console.log(newUser,'connected')
    } else {
        console.log(newUser,'disconnected')
        isUserWalletConnected.value = false
    }
})

onMounted(() => {
    if(Object.entries(useUserStore().getUser).length > 0) isUserWalletConnected.value = true
})

function changeUserWalletState(){
    isUserWalletConnected.value = !isUserWalletConnected.value
}

const displayToast = inject('toast')
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
</script>
<style lang="">

</style>