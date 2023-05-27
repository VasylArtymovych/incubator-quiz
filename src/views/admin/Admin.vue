<template>
  <Header />

  <DefaultContainer class="flex flex-col h-full overflow-hidden ">
    <RouterView />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
</script>
