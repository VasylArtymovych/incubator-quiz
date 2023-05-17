<template>
  <ul
    class="absolute top-[80px] w-full p-6 transition-[right] duration-300 ears-in md:static
    md:flex justify-end gap-4 md:p-0"
    :class="[isActive ? 'right-0': 'right-[-100%]']"
  >
    <li
      v-for="item in items" :key="item"
      class="flex justify-center p-4 hover:bg-slate-300 md:p-0 relative uppercase font-bold"
    >
      <RouterLink :to="`/${item}`">{{ item }}</RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean
}>()

const items = ['quizzes', 'questions', 'users']
</script>

<style scoped>
@media (min-width: 768px) {
  .router-link-active::after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: -23px;
  left: 0;
  background-color: blue;
}
}
</style>
