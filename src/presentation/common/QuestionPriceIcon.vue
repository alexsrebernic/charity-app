<template >
        <div @mouseover.once="getAmountInUsd()"  class="tooltip">
            <span class="tooltiptext ">
              <Icon  v-if="loading" class="animate-spin mx-auto" width="20"  icon="gg:spinner" color="white" />
              <span v-else>${{amountInUsd}}</span>
            </span>
            <Icon width="20" icon="codicon:question" class="cursor-pointer hover:text-gray-400 transition"/>
        </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import {usePricesStore} from '../../store/tokenPricesStore'
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
const loading = ref(false)
const amountInUsd = ref('')
const displayToast = inject('toast')
const pricesStore = usePricesStore()
const props = defineProps({
  amountToken:[Number,String],
  networkId: [Number,String]
})
async function getAmountInUsd(){
  try {
    loading.value = true
    let price;
    if(pricesStore.getPriceOfToken(props.networkId)){
      price = pricesStore.getPriceOfToken(props.networkId)
    } else {
      price = await pricesStore.fetchPriceOfToken(
        props.networkId,
      )
    }
    loading.value = false
    return amountInUsd.value = Number(price * props.amountToken).toFixed(2)
  } catch ( e ){
    loading.value = false
    displayToast(e,'error')
  }
}
</script>
<style lang="css">
.tooltip {
position: relative;
display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>