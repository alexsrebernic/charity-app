<template>
  <main>
    <Transition name="toast">
      <div v-if="isToastVisible" class="fixed left-1/2 top-10 z-50">
        <Toast
          :type="toastType"
          :message="toastMessage"
          style="transform: translateX(-50%)"
        />
      </div>
    </Transition>
    <NavigationBar/>
    <div>
      <router-view></router-view>
    </div>
  </main>
</template>
<script setup>
import Toast from './presentation/common/Toast/Toast.vue';
import NavigationBar from './presentation/common/NavigationBar/NavigationBar.vue'
import { ref } from "@vue/reactivity";
import { onMounted } from 'vue';

const isToastVisible = ref(false)
const toastMessage = ref('');
const toastType = ref('');
const toastTime = 3000;

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
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.toast-enter-active,
.toast-leave-active {
	transition: all 1s ease;
}

.toast-enter-from,
.toast-leave-to {
	opacity: 0;
	transform: translateY(-100%);
}

.toast-enter-to,
.toast-leave-from {
	opacity: 1;
	transform: translateY(0%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
