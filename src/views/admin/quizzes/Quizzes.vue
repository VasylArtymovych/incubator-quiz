<template>
  <div class="flex flex-col h-full">
    <el-button :type="$elComponentType.primary" class="flex items-center ml-auto" @click="()=>{}">
      <template #icon>
        <IconPlus />
      </template>
      ADD
    </el-button>

    <AppTable v-if="quizzes" :data="quizzes" :headings="headings">
      <template #questions>
        <p v-for="quiz in quizzes" :key="quiz.id">
          {{ quiz.questions.length }}
        </p>
      </template>
    </AppTable>

    <el-pagination
      v-if="totalCount"
      id="pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[ 3, 9, 15, 20]"
      :total="totalCount"
      background
      layout="total,sizes, prev, pager, next, jumper"
      class="justify-center mt-auto mb-2"
      @current-change="handleChangeCurrentPage"
      @size-change="handleChangeSize"
    />
  </div>
</template>

<script setup lang="ts">
import type { ITableHeading } from '@/types'
import { quizzesService } from './quizzes.service'
const totalCount = ref<number>(0)
const currentPage = ref(1)
const pageSize = ref(9)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const quizzes = ref<IQuiz[] | null>(null)
const loading = ref(false)

const headings: ITableHeading[] = [
  { label: 'Quiz title', value: 'title', fixed: true, sortable: true },
  { label: 'Questions amount', value: 'questions' },
  { label: 'Actions', value: 'actions', align: 'right', fixed: 'right', width: 150 }
]

const handleChangeCurrentPage = (page: number) => {
  currentPage.value = page
  getQuizzes()
}
const handleChangeSize = (size: number) => {
  currentPage.value = 1
  pageSize.value = size
  getQuizzes()
}

async function getQuizzes () {
  try {
    loading.value = true
    const { data, error, count } = await quizzesService.getQuizzes(skip.value, limit.value)
    if (error) throw new Error(error.message)
    if (data) {
      quizzes.value = data as IQuiz[]
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

getQuizzes()
</script>
