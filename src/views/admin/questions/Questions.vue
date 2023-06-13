<template>
  <div v-loading="quesLoading" class="questions flex flex-col h-full overflow-hidden bg-transparent">
    <UpsertQuestion
      ref="dialogRef"
      @updated="updatedQuestion"
      @inserted="insertedQuestion"
    />
    <div class="flex justify-between my-3 bg-transparent">
      <el-select
        v-model="selectedTags"
        :size="type === 'sm' ? $elComponentSize.small : $elComponentSize.default"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select tags"
        clearable
        :tag-type="$elComponentType.primary"
        @change="handleChangeSelect"
      >
        <el-option
          v-for="tag in tags"
          :key="tag"
          :label="tag.toUpperCase()"
          :value="tag"
        />
      </el-select>

      <el-tag
        v-if="questions && selectedRows"
        class="self-end"
      >
        {{ type==='sm'? '': ' Selected:' }} {{ selectedRows.length }} of {{ totalCount }}
      </el-tag>

      <!-- <el-statistic v-if="questions && selectedRows" :value="selectedRows.length">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Checked:
          </div>
        </template>
        <template #suffix>of {{ totalCount }}</template>
      </el-statistic> -->

      <el-button
        :type="$elComponentType.primary"
        plain
        :size="type === 'sm' ? $elComponentSize.small : $elComponentSize.default"
        class="flex items-center" @click="openUpsertDialog()"
      >
        <template #icon>
          <IconPlus />
        </template>
        Add
      </el-button>
    </div>

    <AppTable
      v-if="questions && tags"
      :selected="selectedRows"
      :dataset="sortedQuestions"
      :headers="headers"
      rowHeight="50px"
      fixedLast
      doNotChangeQuery
      tableScrollPadding="2px"
      class="h-full overflow-hidden"
      @sortBy="sortBy"
      @update:selected="(val: number[])=> $emit('selectionChange', val)"
    >
      <template #options="{row}">
        <el-popover
          placement="top"
          trigger="hover"
          effect="dark"
          :show-after="200"
          :width="400"
        >
          <template #reference>
            <div>
              <p class="truncate">1: {{ row.options[0].title }}</p>
              <p class="truncate">2: {{ row.options[1].title }}</p>
            </div>
          </template>
          <div>
            <p
              v-for="(opt,i) in row.options" :key="i"
              :class="{'font-bold text-accent': opt.is_correct }"
            >
              <span>{{ i+1 }}</span>: {{ opt.title }}
            </p>
          </div>
        </el-popover>
      </template>

      <template #tags="{row}">
        <template v-if="row.tags.length && row.tags.length > 2">
          <el-popover
            placement="top"
            trigger="hover"
            effect="dark"
            :show-after="200"
            :width="400"
          >
            <template #reference>
              <div class="text-accent">
                <template v-if="type === 'xl'">
                  <el-tag v-for="i of 3" :key="i" class="mr-1">
                    {{ row.tags[i-1] }}
                  </el-tag>
                  <span v-if="row.tags.length > 3" class="ml-2">...</span>
                </template>

                <template v-else>
                  <el-tag v-for="i of 2" :key="i" class="mr-1">
                    {{ row.tags[i-1] }}
                  </el-tag>
                  <span v-if="row.tags.length > 2">...</span>
                </template>
              </div>
            </template>
            <div>
              <el-tag
                v-for="tag in row.tags" :key="tag"
                class="mr-1"
              >
                {{ tag }}
              </el-tag>
            </div>
          </el-popover>
        </template>
        <template v-else>
          <el-tag
            v-for="tag in row.tags" :key="tag"
            class="mr-1"
          >
            {{ tag }}
          </el-tag>
        </template>
      </template>

      <template #timer="{row}">
        <el-tag round>
          {{ row.timer }}
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
          @confirm="handleDelete(row)"
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
      v-if="questions && tags && totalCount"
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
import UpsertQuestion from './components/UpsertQuestion.vue'
interface IProps {
  selectedRows?: any[]
}

const { type } = useWindowWidth()

defineProps<IProps>()
defineEmits(['selectionChange'])

const dialogRef = ref<InstanceType<typeof UpsertQuestion> | null >(null)

const totalCount = ref<number>(0)
const currentPage = ref(1)
const pageSize = ref(10)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const selectedTags = ref<string[]>([])
const tags = ref<Set<string> | null>(null)

const quesLoading = ref(false)
const sortingPropOrder = ref<ISortPropOrderQues | null>(null)

const questions = ref<IQuestion[] | null>(null)

const sortedQuestions = computed(() => {
  if (sortingPropOrder.value && questions.value) {
    const { prop, order } = sortingPropOrder.value

    return [...questions.value].sort((prev, next) => {
      if (order === 'ASC') {
        return (typeof prev[prop] === 'string')
          ? (prev[prop] as string).localeCompare(next[prop] as string)
          : (prev[prop] as number) - (next[prop] as number)
      } else if (order === 'DESC') {
        return (typeof prev[prop] === 'string')
          ? (next[prop] as string).localeCompare(prev[prop] as string)
          : (next[prop] as number) - (prev[prop] as number)
      } else {
        return 0
      }
    })
  } else {
    return questions.value
  }
})

const headers: any[] = [
  { label: 'Title', prop: 'title', sortable: true, minWidth: 240, contentClass: 'font-semibold xl:!text-lg' },
  { label: 'Options', prop: 'options', minWidth: 160 },
  { label: 'Tags', prop: 'tags', minWidth: 130, maxWidth: 200 },
  { label: 'Timer', prop: 'timer', sortable: true, width: 100 },
  { label: 'Actions', prop: 'actions', width: 120, contentCenter: true }
]

const handleEdit = (row: IQuestion) => {
  openUpsertDialog(row)
}

const handleDelete = async (row: IQuestion) => {
  try {
    const { status, error } = await questionsService.deleteQuestion(row.id)
    if (error) throw new Error(error.message)

    if (status === 204) {
      if (selectedTags.value.length) {
        getQuestionsByTags()
        getTags()
      } else {
        getData()
      }
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  }
}

const insertedQuestion = () => {
  if (selectedTags.value.length) {
    getQuestionsByTags()
    getTags()
  } else {
    getData()
  }
}

const updatedQuestion = () => {
  if (selectedTags.value.length) {
    getQuestionsByTags()
    getTags()
  } else {
    getData()
  }
}

const sortBy = (val: string) => {
  if (val) {
    const sortData = val.split(',') as [TPropQues, TOrder]
    sortingPropOrder.value = { prop: sortData[0], order: sortData[1] }
  } else {
    sortingPropOrder.value = null
  }
}

const handleChangeCurrentPage = (page: number) => {
  currentPage.value = page
  if (selectedTags.value.length) {
    getQuestionsByTags()
  } else {
    getQuestions()
  }
}
const handleChangeSize = (size: number) => {
  currentPage.value = 1
  pageSize.value = size
  if (selectedTags.value.length) {
    getQuestionsByTags()
  } else {
    getQuestions()
  }
}

const handleChangeSelect = () => {
  currentPage.value = 1
  getQuestionsByTags()
}

const openUpsertDialog = (row?: IQuestion) => {
  if (dialogRef.value) {
    dialogRef.value.openQuestionDialog(row)
  }
}

async function getQuestions () {
  try {
    quesLoading.value = true
    const { data, error, count } = await questionsService.getQuestions(skip.value, limit.value)
    if (error) throw new Error(error.message)
    if (data) {
      questions.value = data as IQuestion[]
    }
    if (count) {
      totalCount.value = count
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    quesLoading.value = false
  }
}

async function getTags () {
  try {
    const { data, error } = await questionsService.getTags()
    if (error) throw new Error(error.message)
    if (data) {
      tags.value = new Set(data.flatMap((el) => el.tags).sort())
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  }
}

async function getQuestionsByTags () {
  try {
    quesLoading.value = true
    const { data, error, count } = await questionsService
      .getQuestionsByTags(selectedTags.value, skip.value, limit.value)

    if (error) throw new Error(error.message)
    if (data) {
      questions.value = data as IQuestion[]
    }
    if (count) {
      totalCount.value = count
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    quesLoading.value = false
  }
}

async function getData () {
  getTags()
  getQuestions()
}
getData()
</script>
