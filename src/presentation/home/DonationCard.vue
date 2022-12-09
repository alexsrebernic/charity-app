<template >
    <div class="px-7 flex flex-col justify-between  py-8 shadow-item-card rounded-xl " style="width:300px;height:300px;">
        <div class="flex justify-between">
            <div class="">
                <h1 class="font-bold text-blue-700 text-2xl">{{data.first_name}} {{data.last_name}}</h1>
                <span v-if="data.createdAt" class="text-sm font-semibold text-gray-400">Created: {{getCreatedAtDate(data.createdAt)}}</span>
            </div>
            <div >
                <img 
                class="rounded-full"
                :src=" data.avatar? 
                data.avatar:
                `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}&background=${data.avatar_color?data.avatar_color.substring(1):'d1d5da'}`" 
                :alt="`${data.first_name}'s avatar'`">
            </div>
        </div>
        <div class="h-full flex flex-col justify-between py-2">
            <div  class="  overflow-y-auto mb-4" style="height:96px">
                <p class=" " >
                    {{data.details}}
                </p>
            </div>
            <div class="flex space-x-1 items-center">
                <span class="font-medium truncate" title="Total donated:" >Total donated: </span>
                <span :title="selectedNetwork.token" class="text-black font-medium truncate"> <span class="text-blue-700">{{data.total_balance}}</span> {{selectedNetwork.token}}</span>
                <QuestionPriceIconVue
                :amountToken="data.total_balance"
                :userContractAddress="data.can_address"
                :networkId="selectedNetwork.id"
                />
            </div>
        </div>
        <div>
            <div class="flex justify-center">
                <div class="w-1/2">
                    <input
                    v-model="amount"
                    min="1"
                    type="number"
                    class="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none
                        rounded-l-lg
                    "
                    id="exampleTel0"
                    :placeholder="`${selectedNetwork.token} Amount`"
                    />
                </div>
                <div class="w-1/2">
                    <ButtonCards 
                    :callback="fund"
                    :loading="isDonationLoading" 
                    :error="error"
                    :success="success"
                    text="Fund" class="rounded-r-lg"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from '@vue/reactivity';
import { inject, defineEmits } from '@vue/runtime-core';
import { useDonationsCardsStore } from '../../store/donationCardsStore';
import { useUserStore } from '../../store/userStore';
import QuestionPriceIconVue from '../common/QuestionPriceIcon.vue';
import ButtonCards from '../common/ButtonCards.vue';
const amount = ref(null)
const displayToast = inject('toast')
const userStore = useUserStore()
const isDonationLoading = ref(false)
const success = ref(false);
const error = ref(false);
const donationsCardStore = useDonationsCardsStore()
const emits = defineEmits(['changeUserWalletState'])

const props = defineProps({
    data: Object,
    isUserWalletConnected: Boolean,
    selectedNetwork: Object,
}) 
function getCreatedAtDate(date){
    return new Date(Number(date.seconds * 1000)).toLocaleDateString()
}
async function fund(){
    try {
        if(!props.isUserWalletConnected){
        await useUserStore().connectWallet();
        emits('changeUserWalletState')
        }
        if(props.selectedNetwork.id !== userStore.currentUserNetworkId){
            return displayToast(`You aren't in the ${props.selectedNetwork.name} network, please change to the selected network `,'error')
        }
        if(!amount.value) return 
        isDonationLoading.value = true
        await donationsCardStore.donateToCan(
            props.data,
            amount.value
        )
        amount.value = 0
        isDonationLoading.value = false
        success.value = true
        setTimeout(() => {
            success.value = false
        }, 2000);
    } catch( e ){
        isDonationLoading.value = false
        error.value = true
        setTimeout(() => {
            error.value = false
        }, 2000);
        displayToast(e.message,'error')
    }
   
}


</script>
<style lang="">
    
</style>