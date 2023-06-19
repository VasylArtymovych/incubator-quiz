<template>
  <div
    v-loading="loading"
    class="quizzes flex flex-col h-full overflow-hidden"
  >
    <div class="flex justify-between items-end my-3">
      <div>
        <p class="pl-1 mb-1 text-accent text-sm font-semibold">
          Find Quiz
        </p>
        <el-input
          v-model="searchedQuiz"
          placeholder="Quiz title"
          clearable
          :size="$mq.smaller('md').value ? $elComponentSize.small : $elComponentSize.default"
          class="w-[300px]"
          @input="handleClearInputData"
        >
          <template #append>
            <el-button
              :type="$elComponentType.primary"
              @click="handleSearchQuiz"
            >
              <IconSearch />
            </el-button>
          </template>
        </el-input>
      </div>

      <el-button
        :type="$elComponentType.primary"
        plain
        class="flex items-center"
        @click="$router.push({name: $routeNames.upsertQuiz, params: {quizId: 'new'}})"
      >
        <template #icon>
          <IconPlus />
        </template>
        ADD
      </el-button>
    </div>

    <AppTable
      v-if="sortedQuizzes"
      :dataset="sortedQuizzes"
      :headers="headings"
      fixedLast
      doNotChangeQuery
      tableScrollPadding="2px"
      class="h-full overflow-hidden"
      @sortBy="sortBy"
    >
      <template #questions="{row}">
        <el-tag v-if="row.questions" round>
          {{ row.questions.length }}
        </el-tag>
      </template>

      <template #users="{row}">
        <el-tag v-if="row.users" round>
          {{ row.users.length }}
        </el-tag>
      </template>

      <template #actions="{row}">
        <el-button
          size="small"
          :type="$elComponentType.warning"
          plain
          @click.stop="handleEdit(row)"
        >
          <IconEdit />
        </el-button>

        <el-popconfirm
          width="220"
          title="Are you sure to delete this?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="() => { handleDelete(row) }"
        >
          <template #reference>
            <el-button
              size="small"
              :type="$elComponentType.danger"
            >
              <IconDelete />
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </AppTable>

    <el-pagination
      v-if="quizzes && totalCount"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[ 5, 10, 15, 20]"
      :total="totalCount"
      background
      :small="$mq.smaller('md').value"
      :layout="`total, ${$mq.smaller('md').value ? '': 'sizes'},
      prev, pager, next, ${$mq.smaller('md').value ? '': 'jumper'}`"
      class="quizzes--align-center"
      @current-change="handleChangeCurrentPage"
      @size-change="handleChangeSize"
    />
  </div>
</template>

<script setup lang="ts">
import { sortStringData } from '@/core/helpers'
import { quizzesService } from './quizzes.service'

const router = useRouter()
const { $routeNames } = useGlobalProperties()

const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const searchedQuiz = ref('')
const sortingPropOrder = ref<ISortPropOrderQuiz | null>(null)
const loading = ref(false)

const quizzes = ref<IQuiz[] | null>(null)

const sortedQuizzes = computed(() => {
  if (sortingPropOrder.value && quizzes.value) {
    const { prop, order } = sortingPropOrder.value

    return sortStringData([...quizzes.value], order, prop)
  } else {
    return quizzes.value
  }
})

const headings: any[] = [
  { label: 'Quiz title', prop: 'title', sortable: true, minWidth: 120, contentClass: 'font-semibold xl:!text-lg' },
  { label: 'Questions', prop: 'questions', minWidth: 60 },
  { label: 'Users', prop: 'users', minWidth: 60 },
  { label: 'Actions', prop: 'actions', width: 120 }
]

const sortBy = (val: string) => {
  if (val) {
    const sortData = val.split(',') as [TPropQuiz, TOrder]
    sortingPropOrder.value = { prop: sortData[0], order: sortData[1] }
  } else {
    sortingPropOrder.value = null
  }
}

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
  router.push({ name: $routeNames.upsertQuiz, params: { quizId: quiz.id } })
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

getQuizzes()
</script>
