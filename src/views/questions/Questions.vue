<template>
  <UpsertQuestion ref="dialogRef" />

  <el-button :type="$elComponentType.success" @click="upsetQuestion()">
    <template #icon>
      <IconPlus />
    </template>
    Add
  </el-button>
  <AppTable v-if="questions" :data="questions" :headings="headings">
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
</template>

<script setup lang="ts">
import UpsertQuestion from './components/UpsertQuestion.vue'
import type { ITableHeading } from '@/types'

const dialogRef = ref<InstanceType<typeof UpsertQuestion> | null >(null)

const questions = ref<IQuestion[] | null>(null)

const headings: ITableHeading[] = [
  { label: 'Title', value: 'title', sortable: true, minWidth: 200 },
  { label: 'Options', value: 'options', minWidth: 150 },
  { label: 'Tags', value: 'tags' },
  { label: 'Timer', value: 'timer', sortable: true, minWidth: 90 },
  { label: 'Actions', value: 'actions', align: 'right', minWidth: 90 }
]

const handleEdit = (row: IQuestion) => {
  upsetQuestion(row)
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

const upsetQuestion = (row?: IQuestion) => {
  if (dialogRef.value) {
    dialogRef.value.openQuestionDialog(row)
  }
}

questionsService.getQuestions()
  .then(({ data, error }) => {
    if (error) {
      return useErrorNotification(error.message)
    }
    questions.value = data as IQuestion[]
  })

</script>
