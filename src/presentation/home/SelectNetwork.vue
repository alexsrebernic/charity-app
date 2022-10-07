<template>
    <div class="h-12">
        <div class=" ml-2.5 absolute">
            <button @click="collapseSelect = !collapseSelect" id="states-button" data-dropdown-toggle="dropdown-states" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
            <Icon icon="cryptocurrency:eth" width="25" class="mr-1"  v-if="currentNetwork == 'Rinkeby'" />
            <Icon icon="cryptocurrency:bnb" width="25" class="mr-1"  v-if="currentNetwork == 'Binance-testnet'" />
            {{currentNetwork}} 
            <svg aria-hidden="true" class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div id="dropdown-states" v-if="collapseSelect" class=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                    <li v-for="(network,index) in avalaibleNetworks" :key="index">
                        <button @click="changeNetwork(network)" type="button" class="inline-flex py-2 px-4 w-full text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                            <div class="inline-flex items-center">
                                <Icon icon="cryptocurrency:eth" width="25" class="mr-1"  v-if="network == 'Rinkeby'" />
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
import { onMounted } from "@vue/runtime-core";
import { useUserStore } from "../../store/userStore";
const userStore = useUserStore()
const currentNetwork = ref("Rinkeby");
const avalaibleNetworks = ref(["Rinkeby","Binance-testnet"])
const collapseSelect = ref(false)
const emits = defineEmits(['changeSelectedNetwork'])
onMounted(() => {
    if(userStore.currentUserNetwork == 61){
        currentNetwork.value = "Binance-testnet"
    } else {
        currentNetwork.value = "Rinkeby"
    }
    avalaibleNetworks.value = avalaibleNetworks.value.filter(value => value !== currentNetwork.value)  
})

function changeNetwork( newNetwork ){
    avalaibleNetworks.value.push(currentNetwork.value)
    currentNetwork.value = newNetwork
    avalaibleNetworks.value = avalaibleNetworks.value.filter(value => value !== newNetwork)  
    collapseSelect.value = false
    emits('changeSelectedNetwork', newNetwork)
}
</script>
<style lang="">
    
</style>