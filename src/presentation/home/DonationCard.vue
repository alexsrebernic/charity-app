<template >
    <div class="px-7 py-8 shadow-xl rounded-xl border-blue-700" style="width:300px;height:400px;border:1px solid black;">
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
        <div>
            <div>
                {{data.details}}
            </div>
        </div>
        <div>
            <span>Total donated:</span>
            <span>{{data.total_donated}}</span>
        </div>
        <div>
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                    <input
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
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    id="exampleTel0"
                    placeholder="$"
                    />
                </div>
                <div>
                    <button>
                        Donate!
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    data: Object
})
</script>
<style lang="">
    
</style>