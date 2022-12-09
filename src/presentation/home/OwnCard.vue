<template >
    <div class="px-7 flex flex-col justify-between  py-8   shadow  rounded-xl " style="width:300px;height:300px;">
        <div class="flex justify-between flex-">
            
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
                <span class="font-medium">Balance: </span>
                <span :title="selectedNetwork.token" class="text-blue-700 font-medium">{{data.current_balance}}</span>
                <QuestionPriceIcon
                :amountToken="data.current_balance"
                :userContractAddress="data.can_address"
                :networkId="selectedNetwork.id"
                />
                <span title="Total Donated" class="font-medium truncate">Total donated: </span>
                <span :title="selectedNetwork.token" class="text-blue-700 font-medium "><span></span>{{data.total_balance}} </span>
                <QuestionPriceIcon
                :amountToken="data.total_balance"
                :userContractAddress="data.can_address"
                :networkId="selectedNetwork.id"
                />
            </div>
        </div>
        <div>
            <div class="flex justify-center">
                <div class="w-full ">
                    <ButtonCards
                    class="rounded-lg py-2"
                    :callback="withdraw"
                    :loading="loading"
                    :success="success"
                    :error="error"
                    text="Withdraw"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ref } from '@vue/reactivity';
import { inject, defineEmits } from '@vue/runtime-core';
import { useUserStore } from '../../store/userStore';
import QuestionPriceIcon from '../common/QuestionPriceIcon.vue';
import ButtonCards from '../common/ButtonCards.vue';
import { useDonationsCardsStore } from '../../store/donationCardsStore';
const displayToast = inject('toast')
const emits = defineEmits(['changeUserWalletState'])
const donationCardStore = useDonationsCardsStore()
const loading = ref(false)
const success = ref(false)
const error = ref(false)
const props = defineProps({
    data: Object,
    selectedNetwork: Object,
}) 
function getCreatedAtDate(date){
    return new Date(Number(date.seconds * 1000)).toLocaleDateString()
}
async function withdraw(){
    try {
        if(props.data.current_balance == 0) return displayToast("Don't have enough balance to withdraw","error")
        loading.value= true
        if(!props.isUserWalletConnected){
        await useUserStore().connectWallet();
        emits('changeUserWalletState')
        }
         await donationCardStore.withdraw(props.data)
        loading.value= false
        success.value = true
        setTimeout(() => {
            success.value = false
        }, 2000);
        displayToast("Withdrawal completed successfully!","success")
    } catch( e ){
        displayToast(e.message,'error')
        loading.value = false
        error.value = true
        setTimeout(() => {
            error.value = false
        }, 2000);
        console.error(e)
    }

}


</script>
<style lang="css">
    :root {
	--gradient-shadow: linear-gradient(
		45deg,
		#448AFF,
		#BBDEFB,
		#90CAF9,
		#64B5F6,
		#42A5F5,
		#2196F3,
		#1E88E5,
		#448AFF,
		#64B5F6,
		#42A5F5
	);
}
.shadow {
position: relative;
background: white;
}
.shadow:before,
.shadow:after {
	content: "";
	position: absolute;
	top: -2px;
	left: -2px;
	background: var(--gradient-shadow);
	background-size: 400%;
	width: calc(100% + 4px);
    border-radius:15px;
	height: calc(100% + 4px);
	z-index: -1;
	animation: animate 20s linear infinite;
}

.shadow:after {
	filter: blur(20px);
}

@keyframes animate {
	0% {
		background-position: 0 0;
	}
	50% {
		background-position: 300% 0;
	}
	100% {
		background-position: 0 0;
	}
}

        
</style>