<template>
  <div v-loading="loading" class="w-full h-full overflow-hidden my-4 md:my-6">
    <el-empty
      v-if="!userResults || !userResults.length && !loading"
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
        v-for="result of userResults" :key="result.id"
        :title="result.quiz_row.title"
        :score="result.percentage_score"
        isCompleted
        class="w-[25%] min-w-[250px] max-w-[300px]"
        @onQuizBtnClick="$router.push({name: $routeNames.resultInfo, params: {resultId: result.id}})"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const homeStore = useHomeStore()
const { userResults, loading } = storeToRefs(homeStore)

onMounted(() => {
  loading.value = true
  // todo: remove setTimeout when this issue will be fixed on supabase
  setTimeout(() => {
    homeStore.getResults(authStore.activeUserData!.id)
  }, 2000)
})
</script>

<style scoped>

</style>
