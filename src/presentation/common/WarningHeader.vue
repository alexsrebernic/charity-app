<template>
    <transition >
        <div v-if="isShowing" class="flex items-center justify-center bg-red-500">
            <div class="flex items-center px-3 py-1">
                <span class="text-white text-xs md:text-sm lg:text-base  font-semibold px-2">Please be careful which network you are on, try to be on the ethereum "Goerli" testnet or the binance testnet!</span>
                <div @click="isShowing = false" class="cursor-pointer">
                    <Icon color="white" icon="emojione-monotone:heavy-multiplication-x" />
                </div>
            </div>
        </div>
    </transition>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ref } from '@vue/reactivity';
import { useUserStore } from '../../store/userStore';
const isShowing = ref(true)
const userStore = useUserStore()
</script>
<style lang="scss">

</style>