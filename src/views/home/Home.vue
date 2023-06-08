<template>
  <Header />
  <DefaultContainer v-loading="loading" class="flex flex-col h-full dddd">
    <el-empty
      v-if="!availableQuizzes || !availableQuizzes.length && !loading"
      description="No available quizzes"
      class="w-full h-full font-bold text-white md:text-[28px]"
    />
    <el-tabs v-else type="border-card" class="tabs w-full h-full">
      <el-tab-pane label="Available quizzes">
        <QuizCard
          v-for="quiz in availableQuizzes" :key="quiz.id"
          :quiz="quiz"
          width="30%"
          minWidth="300px"
          maxWidth="350px"
        />
      </el-tab-pane>
      <el-tab-pane label="Completed quizzes">
        <div>
          <p>Completed quiz</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'

const quizzesStore = useQuizzesStore()
const { availableQuizzes, loading } = storeToRefs(quizzesStore)

quizzesStore.getQuizzes()

</script>
<style lang="scss" scoped>
  .dddd {
    background-color: rgba(0, 0, 0, 0.787);
  }
  .tabs {
    background-color: transparent;
    border: none;
    // background-color: rgba(0, 0, 0, 0.787);
  }
</style>
