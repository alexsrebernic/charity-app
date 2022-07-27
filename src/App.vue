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
    <NavigationBar style="z-index: 4;"/>
    <div style="z-index: 3;" class="container max-w-8xl m-auto">
      <router-view></router-view>
    </div>
  </main>
</template>
<script setup>
import Toast from './presentation/common/Toast/Toast.vue';
import NavigationBar from './presentation/common/NavigationBar/NavigationBar.vue'
import { ref } from "@vue/reactivity";
import { inject, onMounted, provide } from 'vue';
import { useUserStore } from './store/userStore';
const isToastVisible = ref(false)
const toastMessage = ref('');
const toastType = ref('');
const toastTime = 3000;
const Moralis = inject('moralis')
const userStore = useUserStore()
Moralis.onAccountChanged(async ( account ) => {
  userStore.removeUser()
  await userStore.logOut()
  window.location.reload()
})
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
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


</style>
