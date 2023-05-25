<template>
  <Header />

  <DefaultContainer class="flex flex-col overflow-hidden h-full">
    <RouterView />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
</script>
