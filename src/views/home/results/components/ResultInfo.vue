<template>
  <ul v-loading="loading" class="mt-3">
    <li
      v-for="ques in currQuizQues" :key="ques.id"
      class="p-2 bg-slate-300 mb-3"
    >
      <h2 class="">
        {{ ques.title }}
      </h2>
      <div class="flex w-full">
        <p
          v-for="opt in ques.options" :key="opt.title"
          :class="{'text-green-700': opt.is_correct}"
          class="w-[50%]"
        >
          {{ opt.title }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore()
const homeStore = useHomeStore()
const { availableQuizzes, currentResult, loading } = storeToRefs(homeStore)

const currQuizQues = computed(() => {
  return availableQuizzes.value?.find(quiz => quiz.id === currentResult.value?.quiz)?.questions
})

homeStore.getQuizzes()
homeStore.getResultById(authStore.activeUserData!.id, +route.params.resultId)
</script>

<style scoped>

</style>
