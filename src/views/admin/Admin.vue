<template>
  <Header />

  <DefaultContainer class="h-full overflow-hidden ">
    <RouterView />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
</script>
