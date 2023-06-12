<template>
  <div>
    <div class="flex justify-between my-3 bg-transparent">
      <el-select
        :size="type === 'sm' ? $elComponentSize.small : $elComponentSize.default"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select quiz title"
        clearable
        :tag-type="$elComponentType.primary"
        @change="() => {}"
      >
        <el-option
          v-for="title in uniqQuizTitles"
          :key="title"
          :label="title"
          :value="title"
        />
      </el-select>

      <el-input
        placeholder="User email"
        clearable
        :size="type === 'sm' ? $elComponentSize.small : $elComponentSize.default"
        class="w-[300px]"
        @input="()=>{}"
      >
        <template #append>
          <el-button
            :type="$elComponentType.primary"
            @click="()=>{}"
          >
            <IconSearch />
          </el-button>
        </template>
      </el-input>
    </div>

    <AppTable
      v-if="results"
      :dataset="results"
      :headers="headers"
      rowHeight="50px"
      fixedLast
      doNotChangeQuery
      tableScrollPadding="2px"
      class="h-full overflow-hidden"
    >
      <template #email="{row}">
        {{ row.user_row.email }}
      </template>
      <template #quizTitle="{row}">
        {{ row.quiz_row.title }}
      </template>
      <template #questions="{row}">
        {{ row.questions.length }}
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
const { type } = useWindowWidth()

const loading = ref(false)
const results = ref<IResult[] | null>(null)

const headers: any[] = [
  { label: 'Email', prop: 'email', minWidth: 240, contentClass: 'font-semibold xl:!text-lg' },
  { label: 'Quiz title', prop: 'quizTitle', minWidth: 260 },
  { label: 'Score', prop: 'percentage_score', sortable: true, minWidth: 130, maxWidth: 200 },
  { label: 'Questions', prop: 'questions', width: 100 }
]

const uniqQuizTitles = computed(() => {
  if (results.value) {
    return new Set(results.value.map((obj) => obj.quiz_row.title))
  }
})

const getAllResults = async () => {
  try {
    loading.value = true
    const { data, error } = await resultsService.getAllResults()
    console.log(data)
    if (error) throw new Error(error.message)
    if (data) {
      results.value = data as IResult[]
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

getAllResults()
</script>

<style scoped>

</style>
