<template>
  <ul
    class="absolute z-50 top-[64px] w-full py-4 transition-[right] duration-300 ears-in md:static
    md:flex justify-end gap-4 md:p-0 bg-white md:bg-inherit"
    :class="[isActive ? 'right-0': 'right-[-100%]']"
  >
    <li
      v-show="$route.path !== '/'"
      class="flex justify-center p-4 hover:bg-slate-300 md:p-0 relative uppercase font-bold"
    >
      <RouterLink :to="$routeNames.rootPage">
        home
      </RouterLink>
    </li>
    <li
      v-show="$route.path === '/'"
      class="flex justify-center p-4 hover:bg-slate-300 md:p-0 relative uppercase font-bold"
    >
      <RouterLink :to="isAdmin ? $routeNames.admin : $routeNames.user">
        dashboard
      </RouterLink>
    </li>
    <template v-if="isAdmin">
      <li
        v-for="item in items" :key="item"
        class="flex justify-center p-4 hover:bg-slate-300 md:p-0 relative uppercase font-bold"
      >
        <RouterLink :to="`/admin/${item}`">{{ item }}</RouterLink>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean
}>()

const items = ['quizzes', 'questions', 'users']
const authStore = useAuthStore()

const isAdmin = computed(() => authStore.activeUserData?.email === 'admin@softonix.org')
</script>

<style scoped>
@media (min-width: 768px) {
  .router-link-active::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: -20px;
  left: 0;
  background-color: blue;
}
}
</style>
