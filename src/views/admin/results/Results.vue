<template>
  <div v-loading="loading" />
  <div
    v-if="results"
    class="results flex flex-col w-full h-full overflow-hidden"
  >
    <div class="flex justify-between my-3 bg-transparent">
      <el-select
        v-model="selectedQuizIds"
        :size="type === 'sm' ? $elComponentSize.small : $elComponentSize.default"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select quiz title"
        clearable
        :tag-type="$elComponentType.primary"
        @change="handleChangeSelect"
      >
        <el-option
          v-for="item in quizSelectData"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>

      <el-select
        v-model="selectedUserIds"
        :size="type === 'sm' ? $elComponentSize.small : $elComponentSize.default"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select user email"
        clearable
        :tag-type="$elComponentType.primary"
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
        {{ row.user_row.email }}
      </template>
      <template #quizTitle="{row}">
        {{ row.quiz_row.title }}
      </template>
      <template #questions="{row}">
        {{ row.questions.length }}
      </template>
      <template #percentage_score="{row}">
        <p :class="{'text-white font-semibold pt-[2px] pr-2': type === 'sm'}">
          {{ type === 'sm'? 'Score:' : '' }} {{ row.percentage_score }}%
        </p>
      </template>
    </AppTable>

    <el-pagination
      v-if="results"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[ 5, 10, 15, 20]"
      :total="totalCount"
      background
      :small="type==='sm'"
      :layout="`total,sizes, prev, pager, next, ${type==='sm' ? '': 'jumper'}`"
      class="justify-center my-2"
      @current-change="handleChangeCurrentPage"
      @size-change="handleChangeSize"
    />
  </div>
</template>

<script setup lang="ts">
const { type } = useWindowWidth()

const loading = ref(false)

const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const headers: any[] = [
  { label: 'Email', prop: 'email', minWidth: 240, contentClass: 'font-semibold xl:!text-lg' },
  { label: 'Quiz title', prop: 'quizTitle', minWidth: 260 },
  { label: 'Questions', prop: 'questions', minWidth: 130, maxWidth: 200 },
  { label: 'Score', prop: 'percentage_score', sortable: true, width: 100 }
]

const selectedQuizIds = ref<number[]>([])
const quizSelectData = ref<IQuizSelectOptionData[]| null>(null)
const selectedUserIds = ref<string[]>([])
const userSelectData = ref<IUserSelectOptionData[]| null>(null)

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

const getResultsBySelectedValues = () => {
  currentPage.value = 1
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

const handleChangeCurrentPage = (page: number) => {
  currentPage.value = page
  getResultsBySelectedValues()
}
const handleChangeSize = (size: number) => {
  currentPage.value = 1
  pageSize.value = size
  getResultsBySelectedValues()
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
    await resultsService.getResultsByQuizTitle(selectedQuizIds.value, skip.value, limit.value)

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
    await resultsService.getResultsByUserId(selectedUserIds.value, skip.value, limit.value)

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
      .getResultsByQuizTitleUserId(selectedQuizIds.value, selectedUserIds.value, skip.value, limit.value)

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
    const { data, error, count } = await resultsService.getAllResults(skip.value, limit.value)

    if (error) throw new Error(error.message)
    if (data) {
      results.value = data as IResult[]
      quizSelectData.value = data.map((obj) => ({ id: obj.quiz_id, title: obj.quiz_row.title }))
      userSelectData.value = data.map((obj) => ({ id: obj.user_id, email: obj.user_row.email }))
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

<style scoped>

</style>
