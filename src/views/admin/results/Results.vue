<template>
  <div v-loading="loading" />
  <div
    v-if="results"
    class="results flex flex-col w-full h-full overflow-hidden"
  >
    <div class="flex items-start gap-5  my-3 bg-transparent ">
      <div>
        <p class="pl-1 mb-1 text-accent text-sm font-semibold">User email</p>
        <el-select
          v-model="selectedUserIds"
          multiple
          filterable
          remote
          reserve-keyword
          remote-show-suffix
          collapse-tags
          collapse-tags-tooltip
          :size="$mq.smaller('md').value ? $elComponentSize.small : $elComponentSize.default"
          placeholder="Enter user email"
          :remote-method="remoteUsersMethod"
          :loading="userSelectLoading"
          @change="handleChangeSelect"
        >
          <el-option
            v-for="item in userSelectData"
            :key="item.id"
            :label="item.email"
            :value="item.id"
          />
        </el-select>
      </div>

      <div>
        <p class="pl-1 mb-1 text-accent text-sm font-semibold">Quiz title</p>
        <el-select
          v-model="selectedQuizIds"
          multiple
          filterable
          remote
          reserve-keyword
          remote-show-suffix
          collapse-tags
          collapse-tags-tooltip
          :size="$mq.smaller('md').value ? $elComponentSize.small : $elComponentSize.default"
          placeholder="Enter quiz title"
          :remote-method="remoteQuizzesMethod"
          :loading="quizSelectLoading"
          @change="handleChangeSelect"
        >
          <el-option
            v-for="item in quizSelectData"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>

    <AppTable
      :dataset="sortedResults"
      :headers="headers"
      rowHeight="50px"
      fixedLast
      doNotChangeQuery
      tableScrollPadding="2px"
      class="h-full overflow-hidden"
      @sortBy="sortBy"
    >
      <template #email="{row}">
        <p
          class="cursor-pointer"
          @click="$router.push({name: $routeNames.userResult, params: {resultId: row.id}})"
        >
          {{ row.user_row.email }}
        </p>
      </template>
      <template #quizTitle="{row}">
        {{ row.quiz_row.title }}
      </template>
      <template #questions="{row}">
        {{ row.questions.length }}
      </template>
      <template #percentage_score="{row}">
        <p :class="{'text-white font-semibold pt-[2px] pr-2': $mq.smaller('md').value}">
          {{ $mq.smaller('md').value ? 'Score:' : '' }} {{ row.percentage_score }}%
        </p>
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
const headers: any[] = [
  { label: 'Email', prop: 'email', minWidth: 240, contentClass: 'font-semibold xl:!text-lg' },
  { label: 'Quiz title', prop: 'quizTitle', minWidth: 260 },
  { label: 'Questions', prop: 'questions', minWidth: 130, maxWidth: 200 },
  { label: 'Score', prop: 'percentage_score', sortable: true, width: 100 }
]

const loading = ref(false)
const quizSelectLoading = ref(false)
const userSelectLoading = ref(false)
const totalCount = ref(0)

const selectedQuizIds = ref<number[]>([])
const quizSelectData = ref<IQuiz[]| null>(null)
const selectedUserIds = ref<string[]>([])
const userSelectData = ref<IUser[]| null>(null)

const results = ref<IResult[] | null>(null)

const sortingPropOrder = ref<ISortPropOrderResults | null>(null)
const sortedResults = computed(() => {
  if (sortingPropOrder.value && results.value) {
    const { prop, order } = sortingPropOrder.value

    return [...results.value].sort((prev, next) => {
      if (order === 'ASC') {
        return (prev[prop] as number) - (next[prop] as number)
      } else if (order === 'DESC') {
        return (next[prop] as number) - (prev[prop] as number)
      } else {
        return 0
      }
    })
  } else {
    return results.value
  }
})

const remoteQuizzesMethod = async (query: string) => {
  try {
    quizSelectLoading.value = true
    const { data, error } = await resultsService.getQuizzesBySearchQuery(query)
    if (error) throw new Error(error.message)
    if (data) {
      quizSelectData.value = data as IQuiz[]
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    quizSelectLoading.value = false
  }
}

const remoteUsersMethod = async (query: string) => {
  try {
    userSelectLoading.value = true
    const { data, error } = await resultsService.getUsersBySearchQuery(query)
    if (error) throw new Error(error.message)
    if (data) {
      userSelectData.value = data as IUser[]
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    userSelectLoading.value = false
  }
}

const getResultsBySelectedValues = () => {
  if (selectedQuizIds.value.length && selectedUserIds.value.length) {
    getResultsByQuizTitleUserId()
  } else if (selectedQuizIds.value.length) {
    getResultsByQuizTitle()
  } else if (selectedUserIds.value.length) {
    getResultsByUserId()
  } else {
    getAllResults()
  }
}

const handleChangeSelect = () => {
  getResultsBySelectedValues()
}

const sortBy = (val: string) => {
  if (val) {
    const sortData = val.split(',') as [TPropResults, TOrder]
    sortingPropOrder.value = { prop: sortData[0], order: sortData[1] }
  } else {
    sortingPropOrder.value = null
  }
}

const getResultsByQuizTitle = async () => {
  try {
    loading.value = true
    const { data, count, error } =
    await resultsService.getResultsByQuizTitle(selectedQuizIds.value)

    if (error) throw new Error(error.message)
    if (data) {
      results.value = data as IResult[]
    }
    if (count) {
      totalCount.value = count
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

const getResultsByUserId = async () => {
  try {
    loading.value = true
    const { data, count, error } =
    await resultsService.getResultsByUserId(selectedUserIds.value)

    if (error) throw new Error(error.message)
    if (data) {
      results.value = data as IResult[]
    }
    if (count) {
      totalCount.value = count
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

const getResultsByQuizTitleUserId = async () => {
  try {
    loading.value = true
    const { data, count, error } =
    await resultsService
      .getResultsByQuizTitleUserId(selectedQuizIds.value, selectedUserIds.value)

    if (error) throw new Error(error.message)
    if (data) {
      results.value = data as IResult[]
    }
    if (count) {
      totalCount.value = count
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

const getAllResults = async () => {
  try {
    loading.value = true
    const { data, error, count } = await resultsService.getAllResults()

    if (error) throw new Error(error.message)
    if (data) {
      results.value = data as IResult[]
    }
    if (count) {
      totalCount.value = count
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}
getAllResults()
</script>
