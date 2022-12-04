<template>
    <div class="h-12">
        <div class=" ml-2.5 absolute bg-white">
            <button @click="collapseSelect = !collapseSelect" id="states-button" data-dropdown-toggle="dropdown-states" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
            <Icon icon="cryptocurrency:eth" width="25" class="mr-1"  v-if="currentNetwork == 'Goerli'" />
            <Icon icon="cryptocurrency:bnb" width="25" class="mr-1"  v-if="currentNetwork == 'Binance-testnet'" />
            {{currentNetwork}} 
            <svg aria-hidden="true" class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div  v-if="collapseSelect" class="relative z-40 w-44 bg-white rounded-xl shadow-xl divide-y divide-gray-100  dark:bg-gray-700">
                <ul class="py-1 text-sm bg-white text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                    <li v-for="(network,index) in avalaibleNetworksArray" :key="index">
                        <button @click="changeNetwork(network)" type="button" class="inline-flex bg-white py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                            <div class="inline-flex items-center">
                                <Icon icon="cryptocurrency:eth" width="25" class="mr-1"  v-if="network == 'Goerli'" />
                                <Icon icon="cryptocurrency:bnb" width="25" class="mr-1"  v-if="network == 'Binance-testnet'" />
                                {{network}}
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { Icon } from '@iconify/vue';
import { inject, onMounted } from "@vue/runtime-core";
import { useUserStore } from "../../store/userStore";
const userStore = useUserStore()
const currentNetwork = ref("");
const avalaibleNetworks = inject("avalaibleNetworks")
const avalaibleNetworksArray = ref(["Goerli","Binance-testnet"])
const collapseSelect = ref(false)
const emits = defineEmits(['changeSelectedNetwork'])
onMounted(() => {
    if(avalaibleNetworks[userStore.currentUserNetworkId]) {
        changeNetwork(avalaibleNetworks[userStore.currentUserNetworkId].name)
    } else {
        changeNetwork("Goerli")
    }
})

function changeNetwork( newNetwork ){
    if(currentNetwork.value) avalaibleNetworksArray.value.push(currentNetwork.value)
    currentNetwork.value = newNetwork
    avalaibleNetworksArray.value = avalaibleNetworksArray.value.filter(value => value !== newNetwork)  
    collapseSelect.value = false
    emits('changeSelectedNetwork', newNetwork)
}
</script>
<style lang="">
    
</style>