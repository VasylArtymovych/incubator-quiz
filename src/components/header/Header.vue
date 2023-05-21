<template>
  <header class="relative py-2  bg-slate-200">
    <DefaultContainer class="flex justify-between items-center">
      <div
        class="flex justify-center items-center cursor-pointer"
        @click="$router.push({name: $routeNames.rootPage})"
      >
        <img :src="owlLogo" alt="logo" class="w-12 h-12">
        <p class="font-bold font-main">QUIZ</p>
      </div>

      <NavBar :isActive="isActive" />

      <div class="flex">
        <BurgerButton :isActive="isActive" class="md:hidden" @toggleActive="isActive = !isActive" />

        <el-dropdown trigger="click" @command="handleClick">
          <el-avatar
            :src="userLogo"
            alt="user-logo"
            class="ml-6 shrink-0 text-base"
          >
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

</style>
