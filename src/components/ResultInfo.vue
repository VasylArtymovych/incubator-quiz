<template>
  <div v-if="currentResult" class="flex flex-col h-full overflow-hidden w-full max-w-[1000px] mx-auto">
    <h2 class="mt-4 font-semibold text-center text-lg md:text-xl">
      {{ currentResult.quiz_row.title }}
    </h2>
    <div class="flex justify-between mt-3 px-2 text-sm md:text-base">
      <p>
        <span class="font-semibold">User:</span> {{ currentResult.user_row.email }}
      </p>
      <p>
        <span class="font-semibold">Score:</span> {{ currentResult.percentage_score }}%
      </p>
    </div>
    <ul v-if="currentResult" v-loading="loading" class="p-2 mt-3 height-full overflow-auto">
      <li
        v-for="ques in currentResult.questions" :key="ques.id"
        class="item relative p-3 pt-2 mb-4 md:mb-5 rounded overflow-hidden text-sm shadow-lg bg-white"
      >
        <h2 class="mb-2 font-semibold text-base md:text-lg">
          {{ ques.title }}
        </h2>

        <div class="flex flex-col gap-2 md:flex-row md:flex-wrap">
          <p
            v-for="opt in ques.options" :key="opt.title"
            :class="{'bg-red-300 border border-accent': opt.title === hashedAnswers.get(ques.id).value,
                     '!bg-green-300': opt.is_correct}"
            class="item__opt px-3 py-1 flex items-center rounded-full bg-catskill-white border
            border-gray-medium"
          >
            {{ opt.title }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { createHashedObject } from '@/core/helpers'
const route = useRoute()
const userResultsStore = useUserResultsStore()
const { currentResult, loading } = storeToRefs(userResultsStore)

const hashedAnswers = computed(() => {
  if (currentResult.value) {
    return createHashedObject(currentResult.value.answers)
  }
  return null
})

userResultsStore.getResultById(+route.params.resultId)
</script>

<style scoped>
.item {
  box-shadow:  -3px -3px 5px 1px rgb(0 0 0 / 0.1), 3px 3px 5px 1px rgb(0 0 0 / 0.1);
  transition: all 0.3s;
}
.item__opt {
  flex-basis: calc((100% - 8px) / 2);
  flex-shrink: 0;
}
</style>
