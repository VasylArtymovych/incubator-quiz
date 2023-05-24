<template>
  <UpsertQuestion ref="dialogRef" />

  <el-button :type="$elComponentType.success" @click="openUpsertDialog()">
    <template #icon>
      <IconPlus />
    </template>
    Add
  </el-button>

  <AppTable
    v-if="questions"
    :data="questions"
    :headings="headings"
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
</template>

<script setup lang="ts">
import UpsertQuestion from './components/UpsertQuestion.vue'
import type { ITableHeading } from '@/types'

const dialogRef = ref<InstanceType<typeof UpsertQuestion> | null >(null)

const currentPage = ref(1)
const totalCount = ref<number>(1)
const pageSize = ref(3)
const from = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const to = computed(() => (from.value + pageSize.value - 1))

const questions = ref<IQuestion[] | null>(null)

const headings: ITableHeading[] = [
  { label: 'Title', value: 'title', fixed: true, sortable: true, minWidth: 180 },
  { label: 'Options', value: 'options', minWidth: 150 },
  { label: 'Tags', value: 'tags' },
  { label: 'Timer', value: 'timer', minWidth: 70 },
  { label: 'Actions', value: 'actions', align: 'right', fixed: 'right', minWidth: 90 }
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
  const limit = totalCount.value > to.value ? to.value : totalCount.value

  return questionsService.getQuestions(from.value, limit)
    .then((res) => {
      if (res.error) {
        return useErrorNotification(res.error.message)
      }
      console.log(res)
      questions.value = res.data as IQuestion[]
      if (res.count) {
        totalCount.value = res.count
      }
    })
})

supabase.channel('insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'questions' },
    (payload) => {
      console.log(payload)
      totalCount.value ? totalCount.value += 1 : totalCount.value = 1
    }
  )
  .subscribe()

supabase.channel('delete-channel')
  .on(
    'postgres_changes',
    { event: 'DELETE', schema: 'public', table: 'questions' },
    (payload) => {
      console.log(payload)
      if (totalCount.value) {
        totalCount.value -= 1
      }
    }
  )
  .subscribe()

</script>
