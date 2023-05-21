<template>
  <Header />

  <DefaultContainer class="minHeightVh text-center">
    ADMIN PAGE
    <RouterView />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
</script>
