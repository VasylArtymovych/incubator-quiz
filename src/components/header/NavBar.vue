<template>
  <ul
    class="absolute z-50 top-[74px] w-full py-4 transition-[right] duration-300 ears-in md:static
    md:flex justify-end gap-4 md:p-0 bg-secondBgr md:bg-inherit"
    :class="[isActive ? 'right-0': 'right-[-100%]']"
  >
    <li
      v-show="$route.path !== '/'"
      class="flex justify-center items-center md:p-0 relative font-bold"
    >
      <RouterLink
        :to="$routeNames.rootPage"
        class="navText w-full text-center p-4 md:p-0 hover:text-warmGray-300 hover:bg-bgMedium md:hover:bg-transparent
        md:text-warmGray-200 md:text-lg xl:text-2xl"
      >
        Home
      </RouterLink>
    </li>
    <li
      v-show="$route.path === '/'"
      class="flex justify-center items-center  md:p-0 relative font-bold"
    >
      <RouterLink
        :to="isAdmin ? $routeNames.admin : $routeNames.user"
        class="navText w-full text-center p-4 md:p-0 hover:text-warmGray-300 hover:bg-bgMedium md:hover:bg-transparent
        md:text-warmGray-200 md:text-lg xl:text-2xl"
      >
        Dashboard
      </RouterLink>
    </li>
    <template v-if="isAdmin">
      <li
        v-for="item in items" :key="item"
        class="flex justify-center items-center md:p-0 relative font-bold"
      >
        <RouterLink
          :to="`/admin/${item}`"
          class="navText w-full text-center p-4 md:p-0 hover:text-warmGray-300 hover:bg-bgMedium md:hover:bg-transparent
          md:text-warmGray-200 md:text-lg xl:text-2xl capitalize"
        >
          {{ item }}
        </RouterLink>
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

<style lang="scss" scoped>
@media (min-width: 768px) {
  .navText.router-link-active {
    background: linear-gradient(94deg, #ff4713 30%, #dab634 80%, #bab351 100%);
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      position: absolute;
      left: 0;
      background-color: #ff4713;
    }
  }

  .navText {
    background: linear-gradient(94deg, #8269e7 10%, #6089e9 55%, #68c0e8 100%);
    background-size: 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
}
</style>
