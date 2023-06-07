<template>
  <Header />
  <DefaultContainer class="flex flex-col h-full home">
    <el-empty
      description="No available quizzes"
      class="w-full h-full font-bold text-white md:text-[28px]"
    />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'

const availableQuizzes = ref()
const completedQuizzes = ref()

</script>
<style lang="scss" scoped>
  .home {
    background-color: rgba(0, 0, 0, 0.395);
  }
</style>
