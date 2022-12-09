<template lang="">
   <button @click="callback" class="
   w-full text-white justify-center flex items-center  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm  h-full text-center transition  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
   :class="{
        'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700': !loading && !success && !error,
        'bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700':loading,
        'bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 dark:bg-green-600 dark:hover:bg-green-700':success,
        'bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 dark:bg-red-600 dark:hover:bg-red-700':error
   }"
   >
        <Transition :duration="{ enter: 400, leave: 300 }" name="fade" mode="out-in">
            <Icon  v-if="loading" class="animate-spin" width="20"  icon="gg:spinner" color="white" />
            <Icon  v-else-if="success" width="20" icon="mdi:tick" color="white" />
            <Icon  v-else-if="error" width="20" icon="ph:x-circle" color="white" />
            <span v-else>{{text}}</span>
        </Transition>
    </button>
</template>
<script setup>
import { Icon } from '@iconify/vue';

defineProps({
    callback: [Promise, Function],
    loading: Boolean,
    success:Boolean,
    error:Boolean,
    text:String,
})
</script>

<style lang="scss">
    .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>