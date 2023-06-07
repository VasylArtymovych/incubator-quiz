<template>
  <Header />
  <DefaultContainer class="flex flex-col h-full">
    <el-empty
      description="No available quizzes"
      class="w-full h-full font-bold md:text-[28px]"
    />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'

</script>
