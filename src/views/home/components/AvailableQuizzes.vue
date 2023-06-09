<template>
  <div v-loading="loading" class="flex flex-wrap ">
    <el-empty
      v-if="!availableQuizzes || !availableQuizzes.length && !loading"
      description="No available quizzes"
      class="w-full h-full font-bold text-white md:text-[28px]"
    />

    <template v-else>
      <QuizCard
        v-for="quiz in availableQuizzes" :key="quiz.id"
        :quiz="quiz"
        class="w-[25%] min-w-[250px] max-w-[300px]"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
const quizzesStore = useQuizzesStore()
const { availableQuizzes, loading } = storeToRefs(quizzesStore)
quizzesStore.getQuizzes()
</script>

<style scoped>

</style>
