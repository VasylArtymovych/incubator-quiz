<template>
  <UpsetQuestion ref="dialogRef" />

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
      <span v-for="tag in row.tags" :key="tag">{{ tag }}; </span>
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
import UpsetQuestion from './components/UpsetQuestion.vue'
import type { ITableHeading } from '@/types'

const dialogRef = ref<InstanceType<typeof UpsetQuestion> | null >(null)

const questions = ref<IQuestion[] | null>([
  {
    id: '1',
    title: 'Is possible to change the name already defined function?',
    timer: 5,
    options: [
      { title: 'No, it is impossible', is_correct: false },
      { title: 'Func.name = newFuncName', is_correct: false },
      { title: 'Object.defineProperty()', is_correct: true }
    ],
    tags: ['FE', 'junior']
  }
])

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
  return row
}

const upsetQuestion = (row?: IQuestion) => {
  if (dialogRef.value) {
    dialogRef.value.openQuestionDialog(row)
  }
}

questionsService.getQuestions()
  .then(data => {
    console.log(data)
  })

</script>
