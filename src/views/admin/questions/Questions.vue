<template>
  <div class="">
    <UpsertQuestion
      ref="dialogRef"
      @updated="updatedQuestion"
      @inserted="insertedQuestion"
    />
    <div class="flex justify-between">
      <el-select
        v-model="selectedTags"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select tags"
        clearable
        @change="handleChangeSelect"
      >
        <el-option
          v-for="tag in tags"
          :key="tag"
          :label="tag.toUpperCase()"
          :value="tag"
        />
      </el-select>

      <el-button :type="$elComponentType.success" class="block ml-auto" @click="openUpsertDialog()">
        <template #icon>
          <IconPlus />
        </template>
        Add
      </el-button>
    </div>
    <div v-loading.fullscreen="loading" class="overflow-hidden">
      <AppTable
        v-if="questions && tags"
        :data="questions"
        :headings="headings"
        class="h-full"
      >
        <template #options="{row}">
          <p v-for="(opt,i) in row.options" :key="i" :class="{'font-bold': opt.is_correct }">
            <span>{{ i+1 }}</span>: {{ opt.title }}
          </p>
        </template>

        <template #tags="{row}">
          <template v-if="row.tags.length > 0">
            <span v-for="tag in row.tags" :key="tag">{{ tag }}; </span>
          </template>
          <p v-else />
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

      <!-- <el-pagination
        v-if="totalCount"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 15]"
        :total="totalCount"
        background
        layout="total,sizes, prev, pager, next, jumper"
        class="justify-center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->

      <AppPagination
        v-if="totalCount"
        ref="paginationRef"
        :total="totalCount"
        layout="total,sizes, prev, pager, next, jumper"
        background
        :pageSize="3"
        :pageSizes="[3, 9, 12, 15]"
        @changeCurrent="handleChangeCurrent"
        @changeSize="handleChangeSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type AppPaginationVue from '@/components/AppPagination.vue'
import UpsertQuestion from './components/UpsertQuestion.vue'
import type { ITableHeading } from '@/types'

const dialogRef = ref<InstanceType<typeof UpsertQuestion> | null >(null)
const paginationRef = ref <InstanceType<typeof AppPaginationVue> | null>(null)

const totalCount = ref<number>()
const currentPage = ref(1)
const pageSize = ref(3)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const selectedTags = ref<string[]>([])
const tags = ref<Set<string> | null>(null)

const questions = ref<IQuestion[] | null>(null)
const loading = ref(false)

const headings: ITableHeading[] = [
  { label: 'Title', value: 'title', fixed: true, sortable: true, minWidth: 180 },
  { label: 'Options', value: 'options', minWidth: 150 },
  { label: 'Tags', value: 'tags' },
  { label: 'Timer', value: 'timer', minWidth: 70 },
  { label: 'Actions', value: 'actions', align: 'right', fixed: 'right', minWidth: 150 }
]

const handleEdit = (row: IQuestion) => {
  openUpsertDialog(row)
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

const handleDelete = (row: IQuestion) => {
  return questionsService.deleteQuestion(row.id)
    .then(data => {
      if (data.status === 204) {
        if (selectedTags.value.length) {
          getQuestionsByTags()
          getTags()
        } else {
          getData()
        }
        return useSuccessNotification('Question was successfully deleted')
      } else if (data.error) {
        return useErrorNotification(data.error.message)
      }
    })
}

const handleChangeCurrent = (page: number) => {
  currentPage.value = page
  if (selectedTags.value.length) {
    getQuestionsByTags()
  } else {
    getQuestions()
  }
}
const handleChangeSize = (size: number) => {
  pageSize.value = size
  if (selectedTags.value.length) {
    getQuestionsByTags()
  } else {
    getQuestions()
  }
}

const openUpsertDialog = (row?: IQuestion) => {
  if (dialogRef.value) {
    dialogRef.value.openQuestionDialog(row)
  }
}

const handleChangeSelect = () => {
  currentPage.value = 1
  getQuestionsByTags()
}

const getQuestions = async () => {
  try {
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
  }
}

const getTags = async () => {
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

const getQuestionsByTags = async () => {
  try {
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
  }
}

const getData = () => {
  getTags()
  getQuestions()
}
getData()
</script>
