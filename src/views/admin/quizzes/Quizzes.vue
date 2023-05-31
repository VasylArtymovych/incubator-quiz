<template>
  <div
    v-loading="loading"
    class="flex flex-col h-full overflow-hidden"
  >
    <div class="flex my-3">
      <el-input
        v-model="searchedQuiz"
        placeholder="Search"
        clearable
        class="w-[300px]"
        @input="handleClearInputData"
      >
        <template #append>
          <el-button
            :type="$elComponentType.primary"
            @click="handleSearchQuiz"
          >
            Find
          </el-button>
        </template>
      </el-input>

      <el-button
        :type="$elComponentType.primary"
        class="flex items-center ml-auto"
        @click="$router.push({name: $routeNames.quiz, params: {quizId: 'new'}})"
      >
        <template #icon>
          <IconPlus />
        </template>
        ADD
      </el-button>
    </div>

    <AppTable
      v-if="quizzes"
      :dataset="quizzes"
      :headers="headings"
      fixedLast
      doNotChangeQuery
      class="h-full"
    >
      <template #questions="{row}">
        <p>
          {{ row.questions.length }}
        </p>
      </template>

      <template #actions="{row}">
        <el-button
          size="small"
          @click.stop="handleEdit(row)"
        >
          Edit
        </el-button>

        <el-popconfirm
          width="220"
          title="Are you sure to delete this?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="handleDelete(row)"
        >
          <template #reference>
            <el-button
              size="small"
              :type="$elComponentType.danger"
            >
              Delete
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </AppTable>

    <el-pagination
      v-if="totalCount"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[ 5, 10, 15, 20]"
      :total="totalCount"
      background
      layout="total,sizes, prev, pager, next, jumper"
      class="justify-center my-2"
      @current-change="handleChangeCurrentPage"
      @size-change="handleChangeSize"
    />
  </div>
</template>

<script setup lang="ts">
// import type { ITableHeading } from '@/types'
import { quizzesService } from './quizzes.service'

const router = useRouter()
const { $routeNames } = useGlobalProperties()

const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const searchedQuiz = ref('')
const quizzes = ref<IQuiz[] | null>([
  { id: 1, title: 'Quiz 1', questions: [1, 3, 4, 5, 7, 9] },
  { id: 2, title: 'Quiz 2', questions: [1, 3, 4, 5, 7, 9] },
  { id: 3, title: 'Quiz 3', questions: [1, 3, 4, 5, 7, 9] },
  { id: 4, title: 'Quiz 4', questions: [1, 3, 4, 5, 7, 9] }
])
const loading = ref(false)

const headings: any[] = [
  { label: 'Quiz title', prop: 'title', sortable: true },
  { label: 'Questions amount', prop: 'questions' },
  { label: 'Actions', prop: 'actions', width: 150 }
]

const handleSearchQuiz = () => {
  getQuizByTitle()
}

const handleClearInputData = (val: string) => {
  if (val === '') {
    currentPage.value = 1
    getQuizzes()
  }
}

const handleEdit = (quiz: IQuiz) => {
  router.push({ name: $routeNames.quiz, params: { quizId: quiz.id } })
}
const handleDelete = (quiz: IQuiz) => {
  deleteQuiz(quiz.id)
}

const handleChangeCurrentPage = (page: number) => {
  currentPage.value = page
  getQuizzes()
}
const handleChangeSize = (size: number) => {
  currentPage.value = 1
  pageSize.value = size
  getQuizzes()
}

async function getQuizByTitle () {
  if (!searchedQuiz.value) return
  try {
    loading.value = true
    const { data, error, count } = await quizzesService.getQuizByTitle(searchedQuiz.value)
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

async function getQuizzes () {
  try {
    loading.value = true
    const { data, error, count } = await quizzesService.getQuizzes(skip.value, limit.value)
    console.log(error)
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

async function deleteQuiz (id: number) {
  try {
    loading.value = true
    const { error, status } = await quizzesService.deleteQuiz(id)
    if (error) throw new Error(error.message)
    if (status === 204) {
      useSuccessNotification('Quiz was deleted')
      getQuizzes()
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}
</script>
