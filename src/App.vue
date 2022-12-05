<template>
  <main class="font-sans">
    <Transition name="toast">
      <div v-if="isToastVisible" class="fixed left-1/2 top-10 z-50">
        <Toast
          :type="toastType"
          :message="toastMessage"
          style="transform: translateX(-50%); z-index: 5;"
        />
      </div>
    </Transition>
    <!-- <WarningHeader /> -->
    <NavigationBar style="z-index: 4;"/>
    <div style="z-index: 3;" class="container max-w-8xl m-auto">
      <router-view></router-view>
    </div>
  </main>
</template>
<script setup>
import Toast from './presentation/common/Toast/Toast.vue';
import NavigationBar from './presentation/common/NavigationBar/NavigationBar.vue'
import WarningHeader from './presentation/common/WarningHeader.vue';
import avalaibleNetworks from "./utils/networksData"
import { ref } from "@vue/reactivity";
import { inject, onMounted, provide } from 'vue';
import { useUserStore } from './store/userStore';
import initializeAppUseCase from './useCases/initializeAppUseCase'
const isToastVisible = ref(false)
const toastMessage = ref('');
const toastType = ref('');
const toastTime = 3000;
const userStore = useUserStore()


window.ethereum.on('accountsChanged', async (accounts) => {
  userStore.removeUser()
  await userStore.logOut()
  window.location.reload()
})

window.ethereum.on("chainChanged", async (chain) => {
  window.location.reload();
});
onMounted(async () => {
  try {
    await checkWeb3()
    await initializeAppUseCase()
  } catch( error ){
    console.error(error)
    displayToast(error,'error')
  }
})

async function checkWeb3(){
  const ethereum = window.ethereum
  if(!ethereum || !ethereum.on){
    displayToast("This web app requires Metamask, please install Metamask",'error')
  } else {
    userStore.currentUserNetworkId = window.ethereum.chainId.slice(2)
  }
}

function displayToast(_message,_type){
    toastMessage.value = _message;
    toastType.value = _type;
    isToastVisible.value = true;
    setTimeout(() => {
        isToastVisible.value = false;
        toastMessage.value = "";
        toastType.value = "";
    }, toastTime);
}
provide('toast',displayToast);
provide('avalaibleNetworks',avalaibleNetworks)

</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.shadow-item-card{
box-shadow:
  0px 0px 1.6px rgba(0, 0, 0, 0.004),
  0px 0px 3.7px rgba(0, 0, 0, 0.008),
  0px 0px 6.2px rgba(0, 0, 0, 0.013),
  0px 0px 9.1px rgba(0, 0, 0, 0.019),
  0px 0px 12.6px rgba(0, 0, 0, 0.022),
  0px 0px 16.6px rgba(0, 0, 0, 0.024),
  0px 0px 21.3px rgba(0, 0, 0, 0.026),
  0px 0px 26.9px rgba(0, 0, 0, 0.028),
  0px 0px 34.3px rgba(0, 0, 0, 0.029),
  0px 0px 51px rgba(0, 0, 0, 0.03)
;
}

</style>
