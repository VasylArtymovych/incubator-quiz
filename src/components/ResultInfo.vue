<template>
  <ul v-if="currentResult" v-loading="loading" class="p-2 mt-3 height-full overflow-auto">
    <li
      v-for="ques in currentResult.questions" :key="ques.id"
      class="item relative p-2 mb-4 md:mb-5 rounded overflow-hidden text-sm md:text-base shadow-lg
      "
    >
      <h2 class="px-3 py-1 mb-2 font-semibold">
        {{ ques.title }}
      </h2>

      <div class="flex flex-col gap-2 md:flex-row md:flex-wrap">
        <p
          v-for="opt in ques.options" :key="opt.title"
          :class="{'bg-red-300 border border-accent': opt.title === hashedAnswers.get(ques.id).value,
                   '!bg-green-300': opt.is_correct}"
          class="item__opt px-3 py-1 flex items-center rounded-full bg-white text-xs border border-gray-medium"
        >
          {{ opt.title }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { createHashedObject } from '@/core/helpers'
const route = useRoute()
const homeStore = useHomeStore()
const { currentResult, loading } = storeToRefs(homeStore)

const hashedAnswers = computed(() => {
  if (currentResult.value) {
    return createHashedObject(currentResult.value.answers)
  }
  return null
})

homeStore.getResultById(+route.params.resultId)
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
