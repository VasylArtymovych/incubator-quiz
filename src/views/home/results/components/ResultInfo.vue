<template>
  <ul v-loading="loading" class="p-2 mt-3 height-full overflow-auto">
    <li
      v-for="(ques, i) in currQuizQues" :key="ques.id"
      class="item relative p-2 mb-4 md:mb-5 rounded overflow-hidden text-sm md:text-base bg-warmGray-400
      "
    >
      <h2 class="px-3 py-1 mb-2 font-semibold">
        {{ ques.title }}
      </h2>

      <div class="flex flex-col gap-2 md:flex-row md:flex-wrap">
        <p
          v-for="opt in ques.options" :key="opt.title"
          :class="{'bg-red-300 border border-white': opt.title === currentResult?.answers[i].value,
                   '!bg-green-300': opt.is_correct}"
          class="item__opt px-3 py-1 flex items-center rounded-full bg-white text-xs"
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
.item {
  box-shadow: inset 0 0 30px #000, 0 0 10px #000, 2px 2px 10px #000;
  filter: brightness(80%);
  transform: scale(0.98);
  transition: all 0.3s;
}
.item:hover {
  box-shadow: 0 0 15px #000, 3px 3px 15px #000;
  filter: brightness(100%);
  transform: scale(1);
}
.item__opt {
  flex-basis: calc((100% - 8px) / 2);
  flex-shrink: 0;
}
</style>
