<template >
    <div @click="createCan"  :class="!isCreatingCan?'hover:bg-blue-800 bg-blue-700   ':'bg-white'" class="px-7 py-8 shadow-item-card rounded-xl transition" style="width:300px;height:300px;">
        <div v-if="isCreatingCan">
            <div class="flex justify-between">
                <div class=" space-y-2 pr-2">
                     <div class="">
                        <input
                        type="text"
                        v-model="data.first_name"
                        class="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none
                            rounded-lg
                        "
                        id="exampleTel0"
                        placeholder="First name"
                        />
                    </div>
                    <div class="">
                        <input
                        min="1"
                        type="text"
                        v-model="data.last_name"

                        class="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none
                            rounded-lg
                        "
                        id="exampleTel0"
                        placeholder="Last name"
                        />
                    </div>
                </div>
                <div class="flex hover-avatar-create flex-col text-white items-center justify-center">
                    <div
                    style="width:64px;height:64px"
                    :style="data.avatar_color?`background-color:${data.avatar_color}`:`background-color:#d1d5da`"
                     class="h-fit flex hover-display-icon items-center justify-center bg-gray-300 hover:bg-gray-400  rounded-full cursor-pointer hover:text-white transition">
                        <Icon @click="changeAvatarColor" class="m-auto icon hidden" width="40" color="white" icon="clarity:color-picker-line" />
                        <div class="text text-3xl text-black">{{data.first_name?data.first_name.charAt(0):''}}{{data.last_name?data.last_name.charAt(0):''}}</div>
                    </div>
                </div>
            </div>
            <div class="my-2">
                <label for="message" class="block  text-sm font-medium text-gray-400">Why they would donate you?</label>
                <textarea 
                v-model="data.details"
                style="resize:none"
                id="message" 
                rows="4"
                class="block p-2.5 w-full text-sm  bg-gray-50 rounded-lg 
                border border-gray-300 focus:ring-blue-700 focus:border-blue-100 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-800 dark:focus:border-blue-700" 
                maxlength="150"
                placeholder="Your message..." ></textarea>
            </div>
            <div>
                <ButtonCards
                class="rounded-lg py-2"
                :callback="submitDonationCard"
                :loading="isCreatingCanLoading"
                :success="success"
                :error="error"
                text="Create"
                />
            </div>
        </div>
        <div v-else class="flex items-center cursor-pointer    justify-center h-5/6 flex-col text-white">
            <Icon width="70px" icon="akar-icons:plus" />
            <span class="font-bold text-xl text-center">Create your own can!</span>
        </div>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { reactive, ref } from '@vue/reactivity';
import { inject, onMounted, watch, defineEmits } from '@vue/runtime-core';
import {
    useDonationsCardsStore
} from '../../store/donationCardsStore'
import { useUserStore } from "../../store/userStore";
import ButtonCards from '../common/ButtonCards.vue';
const isCreatingCan = ref(false)
const isCreatingCanLoading = ref(false)
const donationsCardsStore = useDonationsCardsStore()
const userStore = useUserStore()
const error = ref(false)
const success = ref(false)
const displayToast = inject('toast')
const data = reactive({
    avatar_color:'',
    first_name:'',
    last_name:'',
    details:'',
}) 

const emits = defineEmits(['changeUserWalletState','getDonationsCard'])
const props = defineProps({
    isUserWalletConnected: Boolean,
    selectedNetwork: Object
})
watch(() => props.isUserWalletConnected,(value) => {
    if(!value) isCreatingCan.value = false
})

async function createCan(){
    try {
        if(props.isUserWalletConnected){
            if(!isCreatingCan.value) return isCreatingCan.value = true;
        } else {
            await userStore.connectWallet()
            emits('changeUserWalletState')
            isCreatingCan.value = true
        }
    } catch (error){
        displayToast(error,'error')
        console.error(error)
    }
   
}

function changeAvatarColor(){
    const input = document.createElement('input')
    input.type = 'color'
    input.click()
    input.onchange = () => {
        data.avatar_color = input.value
    }
}
async function submitDonationCard(){
    try {
        if
        (props.selectedNetwork.id === userStore.currentUserNetworkId){
            if(!data.first_name || !data.last_name || !data.details) return displayToast('Please fill all the fields!','error')
            isCreatingCanLoading.value = true;
            await donationsCardsStore.createCan(userStore.currentUserNetworkId,data)
            displayToast("Can succesfully created!",'success')
            success.value = true
            setTimeout(() => {
                success.value = false
                isCreatingCanLoading.value = false;
            }, 2000);
            resetInputs()
            emits('getDonationsCard')
        } else {
            isCreatingCanLoading.value = false;
            return displayToast(`You aren't in the ${props.selectedNetwork.name} network, please change to the selected network `,'error')
        }
    } catch(e){
        isCreatingCanLoading.value = false;
        error.value = true
        setTimeout(() => {
            error.value = false
        }, 2000);
        displayToast(e.message,'error')
        
    }
  
}
function resetInputs(){
    data.avatar_color = ""
    data.details = ""
    data.first_name = ""
    data.last_name = "";
}
</script>
<style lang="scss">
.hover-display-icon:hover {
    .icon {
        display: block;
    }
    .text {
        display: none;
    }
}
</style>