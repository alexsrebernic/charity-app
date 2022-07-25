<template lang="">
    <router-link   :to="href">{{name}}</router-link>
</template>
<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
    name: String,
    href: String,
})
const route = useRoute()
</script>
<style lang="">
    
</style>