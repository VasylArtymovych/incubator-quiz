<template>
  <div v-loading="loading" class="w-full h-full overflow-hidden my-4 md:my-6">
    <el-empty
      v-if="!availableQuizzes || !availableQuizzes.length && !loading"
      description="No available quizzes"
      class="w-full h-full"
    >
      <p class="font-semibold text-gray-medium">
        Please try to contact our support service:
      </p>
      <a
        href="mailto:info@softonix.com"
        class="font-bold text-gray underline"
      >
        Link</a>
    </el-empty>

    <div v-else class="h-full flex justify-center flex-wrap gap-x-6 gap-y-2 overflow-auto">
      <AppQuizCard
        v-for="quiz in availableQuizzes" :key="quiz.id"
        :title="quiz.title"
        :time="calcQuizTime(quiz)"
        class="w-[25%] min-w-[250px] max-w-[300px]"
        @onQuizBtnClick="$router.push({name: $routeNames.passQuiz, params:{id: quiz.id}, query: {step: 1}})"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const homeStore = useHomeStore()
const { availableQuizzes, loading } = storeToRefs(homeStore)
homeStore.getQuizzes()

const calcQuizTime = (quiz: IQuizPopulated) => {
  return quiz.questions.reduce((time, ques) => {
    time += ques.timer
    return time
  }, 0)
}

</script>

<style scoped>

</style>
