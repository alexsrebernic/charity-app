<template>
<div 
    id="alert-1" 
    class="flex p-4 mb-4  rounded-lg " role="alert"
    :class="getClass()"
>
    <svg :class="getTextClass()" aria-hidden="true" class="flex-shrink-0 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    <div :class="getTextClass()" class="ml-3 text-sm font-medium ">
    {{message}}
    </div>
</div>
</template>
<script setup>
function getClass() {
  if (props.type === "success") return "text-green-700 bg-green-100  dark:bg-green-200 dark:text-green-800";
  if (props.type == "error") return "text-red-700 bg-red-100  dark:bg-red-200 dark:text-red-800";
  if (props.type == "info") return "text-blue-700 bg-blue-100  dark:bg-blue-200 dark:text-blue-800";
  if (props.type == "warning") return "text-yellow-700 bg-yellow-100  dark:bg-yellow-200 dark:text-yellow-800";
}
function getTextClass(){
  if (props.type === "success") return "text-green-700  dark:text-green-800";
  if (props.type == "error") return "text-red-700  dark:text-red-800";
  if (props.type == "info") return "text-blue-700 dark:text-blue-800";
  if (props.type == "warning") return "text-yellow-700 dark:text-yellow-800";
}
function getIconClass(){
  if (props.type === "success") return "bg-green-100 text-green-500 focus:ring-green-400 hover:bg-green-200 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300";
  if (props.type == "error") return "bg-red-100 text-red-500 focus:ring-red-400 hover:bg-red-200 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300";
  if (props.type == "info") return "bg-blue-100 text-blue-500 focus:ring-blue-400  hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300";
  if (props.type == "warning") return "bg-yellow-100 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300";
}
const props = defineProps({
    type:String,
    message:String
});
</script>
<style lang="scss">
    
</style>