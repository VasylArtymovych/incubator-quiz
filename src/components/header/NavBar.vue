<template>
  <ul
    class="absolute z-50 top-[74px] w-full py-4 transition-[right] duration-300 ears-in md:static
    md:flex justify-end gap-4 md:p-0 bg-black md:bg-inherit font-bold text-white md:text-lg xl:text-2xl"
    :class="[isActive ? 'right-0': 'right-[-100%]']"
  >
    <li
      v-show="$route.name !== $routeNames.rootPage"
      class="flex justify-center items-center"
    >
      <RouterLink
        :to="$routeNames.rootPage"
        class="link relative w-full text-center p-4 md:p-0 hover:text-accent"
      >
        Home
      </RouterLink>
    </li>

    <li
      v-show="$route.name === $routeNames.rootPage"
      class="flex justify-center items-center"
    >
      <RouterLink
        :to="$routeNames.admin"
        class="link relative w-full text-center p-4 md:p-0 hover:text-accent"
      >
        Dashboard
      </RouterLink>
    </li>

    <li
      v-for="item in items" :key="item"
      class="flex justify-center items-center"
    >
      <RouterLink
        :to="`/admin/${item}`"
        class="link relative w-full text-center p-4 md:p-0 hover:text-accent capitalize"
      >
        {{ item }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean
}>()

const items = ['quizzes', 'questions', 'users']
</script>

<style lang="scss" scoped>

.link.router-link-active {
    @apply text-accent
  }
  @media (min-width: 768px) {
    .link.router-link-active {
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
  }

  .link {
    &::after {
      content: '';
        display: block;
        width: 0;
        height: 1px;
        position: absolute;
        left: 50%;
        background-color: #ff4713;
        transition: left .3s ease,width .3s ease;
    }
  }
  .link:hover::after {
    width: 100%;
    left: 0;
  }
</style>
