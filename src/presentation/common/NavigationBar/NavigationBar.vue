<template >
<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <a href="/home" class="flex items-center">
      <span class="self-center text-xl font-semibold whitespace-nowrap hover:text-blue-700 transition dark:text-white ">CryptoFund</span>
  </a>
  <div class="flex md:order-2 sm:space-x-2">
    <div v-if="Object.keys(user || null).length === 0">
      <button  @click="login('desktop')" type="button" class="text-white hidden lg:block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connect Wallet
      </button>
      <button @click="login('mobile')"  class="text-white shadow-md  lg:hidden bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
          Connect Wallet
      </button>
    </div>
    <div v-else>
      <button @click="isUserDropdownShowing = !isUserDropdownShowing" v-if="user" class="text-black border shadow-md  bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  md:mr-0 dark:bg-none dark:hover:bg-white dark:focus:ring-white dark:text-white" >
        {{user.attributes.ethAddress.slice(0,6)}}...{{user.attributes.ethAddress.slice(user.attributes.ethAddress.length - 4)}}
      </button>
      <Transition name="fade">
        <div @click="logout" v-if="isUserDropdownShowing" class="absolute w-32 cursor-pointer text-black border shadow-md  bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 my-2 rounded-lg text-sm px-5 py-2.5 text-center  md:mr-0 dark:bg-none dark:hover:bg-white dark:focus:ring-white dark:text-white "  >
              Log out
        </div>
      </Transition>
      
    </div>
   
    <button @click="isBurguerMenuShowing = !isBurguerMenuShowing" data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
  <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
      <li>
        <NavLink
        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        name="Home"
        href="/home"
        />
      </li>
      <li>
        <NavLink
        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        name="About"
        href="/about"
        />
      </li>
      <li>
        <NavLink
        class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        name="Documentation"
        href="/docs"
        />
      </li>
    </ul>
  </div>
  </div>
  <Transition name="fade">
    <div v-if="isBurguerMenuShowing" class="absolute " style="width:93%">
      <div   class="border-b  md:hidden  w-full rounded-sm p-4  shadow-md">
          <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <NavLink
              class="mobile-nav-link rounded-sm block py-3 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              name="Home"
              href="/home"
              />
            </li>
            <li>
              <NavLink
              class="mobile-nav-link rounded-sm block py-3 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              name="About"
              href="/about"
              />
            </li>
            <li>
              <NavLink
              class="mobile-nav-link rounded-sm block py-3 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              name="Documentation"
              href="/docs"
              />
            </li>
          </ul>
      </div>
    </div>
    
  </Transition>
</nav>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { inject, onMounted, watch } from "@vue/runtime-core";
import { useUserStore } from "../../../store/userStore";
import NavLink from "./NavLink.vue";
const isBurguerMenuShowing = ref(false)
const isUserDropdownShowing = ref(false)
const user = ref({})
const userStore = useUserStore()
const displayToast = inject("toast")

watch(() => userStore.user, (newUser) => {
  user.value = newUser
})

async function login(method){
  try {
    await userStore.logIn(method)
  } catch ( error ) {
    displayToast( `Something goes wrong when log in user: ${error}`, "error")
    console.error(error)
  }
}
async function logout() {
  try {
    userStore.logOut()
    .finally(() => {
      user.value = {};
      isUserDropdownShowing.value = false;
    })
  } catch( error ) {
    displayToast( `Something goes wrong when login out user ${user.value.attributes.ethAddress}: ${error}`,'error')
    console.error(error)
  }
}

</script>
<style lang="scss" scoped>
a[aria-current="page"] {
  --tw-text-opacity: 1;
  color: rgb(29 78 216 / var(--tw-text-opacity));
}
.mobile-nav-link[aria-current="page"]{
  background: rgb(29 78 216 / var(--tw-text-opacity));
  color:white;
}
</style>