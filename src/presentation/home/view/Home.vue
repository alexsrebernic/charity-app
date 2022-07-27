<template >
    <div class="md:w-3/4 mx-auto pt-12">
        <div class="px-5 md:px-0 ">
            <h1 class="text-2xl font-medium">Here you can donate to anyone else in cryptocurrencies, or you can create a "can" and receive donations, all of this in <span class="text-blue-700 underline">cryptocurrencies</span>.</h1>
            <h1 class="text-2xl font-medium">The assets you can use are <span class="text-blue-700 underline">ETH</span> or <span class="text-blue-700 underline">BNB</span> depending on the network you are, and please try to be in the test networks, if you donate real money it will <span class="text-red-600">disappear</span>.</h1>
        </div>
        <div>
            <DonationCard :data="donation"/>
        </div>
    </div>
</template>
<script setup>
import { inject } from "@vue/runtime-core";
import DonationCard from "../DonationCard.vue";
import UserCard from "../UserCard.vue";
import { ref } from "vue";

const displayToast = inject('toast')
const donations = ref([{
    owner_address: '0x7b48d3b279645a27f63ecfcef49c71086a626680',
    first_name: "Alex",
    last_name:"Srebernic",
    total_donated: 320,
    created_at: '26/7/2022',
    last_donated_address: "0x59583810eb074ccc5c26397c621a27ac11889225",
    details: 'Hello world'
}])
const donation = ref({
    owner_address: '0x7b48d3b279645a27f63ecfcef49c71086a626680',
    first_name: "Alex",
    last_name:"Srebernic",
    total_donated: 320,
    created_at: '26/7/2022',
    last_donated_address: "0x59583810eb074ccc5c26397c621a27ac11889225",
    details: '¡Hello world!'
})
</script>
<style lang="">

</style>