<template>
  <div class="w-8 h-8 relative cursor-pointer">
    <span
      class="absolute top-[50%] left-0 block w-full h-1 rounded-xl transition-all ease-in-out
        before:block before:w-full before:h-1 before:bg-accent before:rounded-xl before:translate-y-[-10px]
        before:transition-all
        after:block after:w-full after:h-1 after:bg-accent after:rounded-xl after:translate-y-[8px]
        after:transition-all"
      :class="[isActive ?
        'bg-transparent before:origin-top-left before:rotate-45 after:origin-bottom-left after:-rotate-45' :
        'bg-accent']"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isActive: boolean
}>()
</script>
