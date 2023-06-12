<template>
  <ul
    class="absolute z-50 top-[81px] md:static w-full py-4 md:p-0 transition-[right] duration-300 ears-in
    md:flex justify-end gap-4 lg:gap-8  bg-black md:bg-inherit font-bold text-white md:text-lg xl:text-2xl"
    :class="[isActive ? 'right-0': 'right-[-100%]']"
  >
    <template v-if="role === 'admin'">
      <li
        v-for="item in adminRoutes" :key="item"
        class="flex justify-center items-center"
      >
        <RouterLink
          :to="`/admin/${item}`"
          class="link relative w-full text-center p-4 md:p-0 hover:text-accent capitalize"
        >
          {{ item }}
        </RouterLink>
      </li>
    </template>

    <template v-if="role === 'user'">
      <li
        v-show="$route.name !== $routeNames.rootPage"
        class="flex justify-center items-center"
      >
        <RouterLink
          :to="{name: $routeNames.rootPage}"
          class="link relative w-full text-center p-4 md:p-0 hover:text-accent"
        >
          Home
        </RouterLink>
      </li>
      <li
        v-for="item in userRoutes" :key="item.route"
        class="flex justify-center items-center"
      >
        <RouterLink
          :to="`/${item.route}`"
          class="link relative w-full text-center p-4 md:p-0 hover:text-accent capitalize"
        >
          {{ item.name }}
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean
  role: 'admin' | 'user'
}>()

const adminRoutes = ['quizzes', 'questions', 'users', 'results']
const userRoutes = [
  { route: 'availableQuizzes', name: 'quizzes' },
  { route: 'results', name: 'results' }
]
</script>

<style lang="scss" scoped>

.link.router-link-exact-active {
    @apply text-accent
  }
  @media (min-width: 768px) {
    .link.link.router-link-exact-active {
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
