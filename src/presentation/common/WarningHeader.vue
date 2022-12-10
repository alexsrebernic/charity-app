<template>
    <transition >
        <div v-if="isShowing" class="flex items-center justify-center bg-red-500">
            <div class="flex items-center px-3 py-1">
                <Icon color="white" width="30" icon="material-symbols:warning-outline" />
                <span class="text-white text-center text-xs md:text-sm lg:text-base  font-semibold px-2">Please be careful which network you are on!</span>
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