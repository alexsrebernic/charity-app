<template >
    <div class="px-7 flex flex-col justify-between  py-8   shadow  rounded-xl " style="width:300px;height:300px;">
        <div class="flex justify-between ">
            <div class="">
                <h1 class="font-bold text-blue-700 text-2xl">{{data.first_name}} {{data.last_name}}</h1>
                <span v-if="data.createdAt" class="text-sm font-semibold text-gray-400">Created: {{getCreatedAtDate(data.createdAt)}}</span>
            </div>
            <div >
                <img 
                class="rounded-full"
                :src=" data.avatar? 
                data.avatar:
                `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}&background=${data.avatar_color?data.avatar_color:'d1d5da'}`" 
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
                <span class="text-blue-700 font-medium">{{data.current_balance}}$</span>
                <span>
                    <Icon width="20" icon="codicon:question" class="cursor-pointer hover:text-gray-400 transition"/>
                </span>
                <span title="Total Donated" class="font-medium truncate">Total donated: </span>
                <span class="text-blue-700 font-medium">{{data.current_balance}}$</span>
                <span>
                    <Icon width="20" icon="codicon:question" class="cursor-pointer hover:text-gray-400 transition"/>
                </span>
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
                    placeholder="$"
                    />
                </div>
                <div class="w-1/2">
                    <button @click="withdraw" class="w-full text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm  h-full text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Withdraw
                    </button>
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

const amount = ref(0)
const displayToast = inject('toast')

const emits = defineEmits(['changeUserWalletState'])
const props = defineProps({
    data: Object,
}) 
function getCreatedAtDate(date){
    return new Date(Number(date.seconds * 1000)).toLocaleDateString()
}
async function withdraw(){
    if(amount.value == 0) return 
    if(!props.isUserWalletConnected){
        await useUserStore().logIn();
        emits('changeUserWalletState')
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