<template>
  <div>
    <el-form
      ref="formRef"
      label-position="top"
      :rules="formRules"
      :model="formModel"
      class="form"
    >
      <el-form-item label="Quiz title" prop="title">
        <el-input v-model="formModel.title" />
      </el-form-item>

      <el-form-item v-if="adminStore.questions" label="Quiz questions">
        <AppTable
          ref="tableRef"
          :data="adminStore.questions" :headings="headings" showCheckbox
          @selectionChange="handleSelectionChange"
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
            <el-button size="small" @click.stop="tableRef.toggleSelection(row)">
              Add
            </el-button>
          </template>
        </AppTable>
      </el-form-item>
    </el-form>

    <el-button native-type="submit" :type="$elComponentType.primary" class="block ml-auto w-[30%]">
      Send
    </el-button>
  </div>
</template>

<script setup lang="ts">
import type { ITableHeading } from '@/types'
const tableRef = ref()
const formRef = useElFormRef()
const formModel = useElFormModel<INewQuiz | IQuiz>({
  title: '',
  questions: []
})
const formRules = useElFormRules({
  title: [useRequiredRule(), useMinLenRule(12)]
})

const adminStore = useAdminStore()
const selectedQuestions = ref<IQuestion[]>([])
const headings: ITableHeading[] = [
  { label: 'Title', value: 'title', fixed: true, sortable: true, minWidth: 180 },
  { label: 'Options', value: 'options', minWidth: 150 },
  { label: 'Tags', value: 'tags' },
  { label: 'Timer', value: 'timer', sortable: true, minWidth: 70 },
  { label: 'Actions', value: 'actions', align: 'right', fixed: 'right', width: 150 }
]

const handleSelectionChange = (val: IQuestion[]) => {
  selectedQuestions.value = val
  console.log(val)
}

adminStore.getQuestions(0, 5)

</script>

<style scoped>

</style>
