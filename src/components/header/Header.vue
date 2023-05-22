<template>
  <header class="relative py-2  bg-slate-200">
    <DefaultContainer class="flex justify-between items-center">
      <div
        class="flex justify-center items-center cursor-pointer"
        @click="$router.push({name: $routeNames.rootPage})"
      >
        <img :src="owlLogo" alt="logo" class="w-12 h-12">
        <p class="logo-text font-bold text-2xl">QUIZ</p>
      </div>

      <NavBar :isActive="isActive" />

      <div class="flex">
        <BurgerButton :isActive="isActive" class="md:hidden" @toggleActive="isActive = !isActive" />

        <el-dropdown trigger="click" @command="handleClick">
          <el-avatar :src="userLogo" alt="user-logo" class="ml-6 shrink-0 text-base">
            User
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Log out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </DefaultContainer>
  </header>
</template>

<script setup lang="ts">
import userLogo from '@/assets/images/person-icon.png'
import owlLogo from '@/assets/images/owl_logo.png'
import DefaultContainer from '@/layouts/DefaultContainer.vue'

const authStore = useAuthStore()

const isActive = ref(false)

const handleClick = () => {
  localStorage.removeItem('iq-user')
  authStore.logOut()
}
</script>

<style lang="scss" scoped>
.logo-text {
  background-color: black;
  background-image: linear-gradient(
    to right,
    #ff4713 10%,
    #000000,
  );
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  animation: rainbow-text 1000ms linear alternate infinite;
}
@keyframes rainbow-text {
  20% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 20%,
      #000000,
    );
  }
  40% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 40%,
      #000000,
    );
  }
  60% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 60%,
      #000000,
    );
  }
  80% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 80%,
      #000000,
    );
  }
  100% {
    background-image: linear-gradient(
      to right,
      #000000,
      #ff4713 100%,
      #000000,
    );
  }
}
</style>
