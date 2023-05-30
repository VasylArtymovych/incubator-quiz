<template>
  <div v-loading="loading" class="flex flex-col h-full mt-3">
    <div class="flex ">
      <el-input
        v-model="searchedQuiz"
        placeholder="Search" clearable
        class="w-[300px]"
        @clear="getQuizzes()"
        @input="handleEmptyInputData"
      >
        <template #append>
          <el-button :type="$elComponentType.primary" @click="handleSearchQuiz">
            Find
          </el-button>
        </template>
      </el-input>

      <el-button
        :type="$elComponentType.primary" class="flex items-center ml-auto"
        @click="$router.push({name: $routeNames.quiz, params: {quizId: 'new'}})"
      >
        <template #icon>
          <IconPlus />
        </template>
        ADD
      </el-button>
    </div>

    <AppTable v-if="quizzes" :data="quizzes" :headings="headings">
      <template #questions="{row}">
        <p>
          {{ row.questions.length }}
        </p>
      </template>

      <template #actions="{row}">
        <el-button size="small" @click.stop="handleEdit(row)">
          Edit
        </el-button>

        <el-popconfirm
          width="220" title="Are you sure to delete this?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="handleDelete(row)"
        >
          <template #reference>
            <el-button size="small" :type="$elComponentType.danger">
              Delete
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </AppTable>

    <el-pagination
      v-if="totalCount"
      id="pagination"
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
import type { ITableHeading } from '@/types'
import { quizzesService } from './quizzes.service'

const router = useRouter()
const { $routeNames } = useGlobalProperties()

const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const searchedQuiz = ref('')
const quizzes = ref<IQuiz[] | null>(null)
const loading = ref(false)

const headings: ITableHeading[] = [
  { label: 'Quiz title', value: 'title', fixed: true, sortable: true },
  { label: 'Questions amount', value: 'questions' },
  { label: 'Actions', value: 'actions', align: 'right', fixed: 'right', width: 150 }
]

const handleSearchQuiz = () => {
  getQuizByTitle()
}

const handleEmptyInputData = () => {
  return ''
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
  try {
    loading.value = true
    console.log(searchedQuiz.value)
    const res = await quizzesService.getQuizByTitle(searchedQuiz.value)
    console.log(res)
    // if (error) throw new Error(error.message)
    // if (data) {
    //   quizzes.value = data as IQuiz[]
    // }
    // if (count) {
    //   totalCount.value = count
    // }
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
    console.log('count: ', count)
    console.log('data: ', data)
    console.log('error: ', error)
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
      getQuizzes()
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}
</script>
