<template >
    <div class="px-7 flex flex-col justify-between  py-8 shadow-xl rounded-xl border-blue-700" style="width:300px;height:300px;border:1px solid black;">
        <div class="flex justify-between">
            <div class="">
                <h1 class="font-bold text-blue-700 text-2xl">{{data.first_name}} {{data.last_name}}</h1>
                <span class="text-sm font-semibold text-gray-400">Created: {{data.created_at}}</span>
            </div>
            <div >
                <img 
                class="rounded-full"
                :src=" data.avatar? 
                data.avatar:
                `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}`" 
                :alt="`${data.first_name}'s avatar'`">
            </div>
        </div>
        <div class="h-full flex flex-col justify-between py-2">
            <div>
                <p>
                    {{data.details}}
                </p>
            </div>
            <div class="flex space-x-1 items-center">
                <span class="font-medium">Total donated: </span>
                <span class="text-blue-700 font-medium">{{data.total_donated}}$</span>
                <span>
                    <Icon width="20" icon="codicon:question" class="cursor-pointer hover:text-gray-400 transition"/>
                </span>
            </div>
        </div>
        <div>
            <div class="flex justify-center">
                <div class="w-1/2">
                    <input
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
                    <button class="w-full text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm  h-full text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Fund!
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    data: Object
})
</script>
<style lang="">
    
</style>