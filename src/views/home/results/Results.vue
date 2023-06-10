<template>
  <div v-loading="loading" class="w-full h-full overflow-hidden my-4 md:my-6">
    <el-empty
      v-if="!results || !results.length && !loading"
      description="No available quizzes"
      class="w-full h-full font-bold text-white md:text-[28px]"
    />

    <div v-else class="h-full flex justify-center flex-wrap gap-x-6 gap-y-2 overflow-auto">
      <AppQuizCard
        v-for="result of results" :key="result.id"
        :title="'Junior Frontend Developer'"
        :score="result.score || 95"
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
const { results, loading } = storeToRefs(homeStore)

homeStore.getResults(authStore.activeUserData!.id)
</script>

<style scoped>

</style>
