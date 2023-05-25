<template>
  <div class="">
    <UpsertQuestion ref="dialogRef" />

    <el-button :type="$elComponentType.success" class="block ml-auto" @click="openUpsertDialog()">
      <template #icon>
        <IconPlus />
      </template>
      Add
    </el-button>

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

        <template #Actions>
          <el-select
            v-model="selectedTags"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="Select tags"
            style="width: 100%"
          >
            <el-option
              v-for="tag in tags"
              :key="tag"
              :label="tag.toUpperCase()"
              :value="tag"
            />
          </el-select>
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
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10, 15]"
        :total="totalCount"
        background
        layout="total,sizes, prev, pager, next, jumper"
        class="justify-center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UpsertQuestion from './components/UpsertQuestion.vue'
import type { ITableHeading } from '@/types'

const dialogRef = ref<InstanceType<typeof UpsertQuestion> | null >(null)
const isUpsertQuestion = ref(0)

const currentPage = ref(1)
const totalCount = ref<number>()
const pageSize = ref(3)
const from = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const to = computed(() => (from.value + pageSize.value - 1))

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

const handleDelete = (row: IQuestion) => {
  return questionsService.deleteQuestion(row.id)
    .then(data => {
      if (data.status === 204) {
        return useSuccessNotification('Question was successfully deleted')
      } else if (data.error) {
        return useErrorNotification(data.error.message)
      }
    })
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
}
const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const openUpsertDialog = (row?: IQuestion) => {
  if (dialogRef.value) {
    dialogRef.value.openQuestionDialog(row)
  }
}

watchEffect(() => {
  console.log(isUpsertQuestion.value)
  loading.value = true

  return Promise.allSettled([questionsService.getTags(),
    questionsService.getQuestions(from.value, to.value)])
    .then(({ 0: tagsRes, 1: questRes }) => {
      if (tagsRes.status === 'fulfilled') {
        const { data, error } = tagsRes.value
        if (error) throw new Error(error.message)
        if (data) {
          tags.value = new Set(data.flatMap((el) => el.tags).sort())
        }
      }

      if (questRes.status === 'fulfilled') {
        console.log(questRes)
        const { data, error, count } = questRes.value
        if (error) throw new Error(error.message)
        if (data) {
          questions.value = data as IQuestion[]
        }
        if (count) {
          totalCount.value = count
        }
      }
    })
    .finally(() => (loading.value = false))
    .catch(error => (useErrorNotification(error.message)))
})

watch(selectedTags, () => {
  questionsService.getQuestionsByTags(selectedTags.value)
    .then(data => {
      console.log(data)
    })
})

supabase.channel('insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'questions' },
    (payload) => {
      console.log('Insert', payload)
      isUpsertQuestion.value = Date.now()
    }
  )
  .subscribe()

supabase.channel('delete-channel')
  .on(
    'postgres_changes',
    { event: 'DELETE', schema: 'public', table: 'questions' },
    (payload) => {
      console.log('Delete', payload)
      if (totalCount.value) {
        isUpsertQuestion.value = Date.now()
      }
    }
  )
  .subscribe()

</script>
