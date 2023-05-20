<template>
  <header class="flex justify-between items-center p-6 relative bg-slate-200">
    <div>Logo</div>

    <NavBar v-if="isNavShown" :isActive="isActive" />

    <div class="flex">
      <BurgerButton :isActive="isActive" class="md:hidden" @toggleActive="isActive = !isActive" />

      <el-dropdown trigger="click" @command="handleClick">
        <el-avatar
          :src="userLogo"
          alt="user-logo"
          class="ml-2 shrink-0 text-base"
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
  </header>
</template>

<script setup lang="ts">
import userLogo from '@/assets/images/person-icon.png'
const route = useRoute()
const router = useRouter()
const { $routeNames } = useGlobalProperties()

const isActive = ref(false)

const isNavShown = computed(() => route.meta.role === 'admin@softonix.org')

const handleClick = () => {
  localStorage.removeItem('iq-user')
  authService.logOut()
    .then(() => {
      window.location.href = router.resolve($routeNames.login).href
    })
}
</script>

<style lang="scss" scoped>

</style>
