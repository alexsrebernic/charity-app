<template >
    <div>
        <div class="border-b w-4/6 border-gray-300 border-solid ">
            <div class="font-semibold my-2 tracking-tighter">
                <h1 class="text-3xl  ">
                    About
                </h1>
            </div>
        </div>
        <div class="mt-10">
            <div>
                <p class="font-medium text-xl">In order to contact me or see more projects where i work you can check my social media.</p>
            </div>
            <div>
                <ul class="space-y-3 mt-4">
                    <li  v-for="(item,index) in socialMedia" :key="index">
                        <div class="flex space-x-3 items-center">
                            <a :href="item.url">
                                <Icon width="40" :icon="item.icon" />
                            </a>
                            <span class="text-xl align-center text-center">{{ item.username }}</span>
                        </div>                  
                      
                    </li>
                  
                </ul>

            </div>
        </div>
        
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ref } from '@vue/reactivity';
const socialMedia = ref([
    {
        icon:"radix-icons:linkedin-logo",
        username:"Alex Srebernic",
        url:"https://www.linkedin.com/in/alex-srebernic-201427213/",
    },
    {
        icon:"mdi:gmail",
        username:"alexsrebernic@gmail.com",
        url:"mailto:alexsrebernic@gmail.com",
    },
    {
        icon:"mdi:github",
        username:"alexsrebernic",
        url:"https://github.com/alexsrebernic",
    },
    {
        icon:"mdi:stackoverflow",
        username:"alexsc_",
        url:"https://stackoverflow.com/users/17751576/alexsc",
    }
])
</script>
<style lang="scss">
    .first-letter {
  font-size: 35px;
}
</style>