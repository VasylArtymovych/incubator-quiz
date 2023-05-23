<template>
  <el-dialog v-model="questionDialogVisible" title="Create question">
    <el-form
      ref="questionFormRef" :model="questionForm"
      label-position="top"
    >
      <el-form-item label="Question title" prop="title" :rules="questionFormRules">
        <el-input
          v-model="questionForm.title" type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }" resize="none" placeholder="Type your question"
        />
      </el-form-item>

      <el-form-item
        v-for="(opt, i) in questionForm.options"
        :key="i"
        :prop="'domains.' + i + '.title'"
        :rules="{
          required: true,
          message: 'option can not be null',
          trigger: 'blur',
        }"
      >
        <el-input v-model="opt.title" />
        <el-radio v-model="opt.is_correct" class="shrink-0 text-[10px] flex"> Correct</el-radio>
        <el-button
          type="danger" :size="$elComponentSize.small" circle
          @click="removeOption(i)"
        >
          <span class="w-3 h-3">X</span>
        </el-button>
      </el-form-item>

      <el-button :size="$elComponentSize.small" @click="addOption">Add option</el-button>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button @click="submitForm">
          Create
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const questionDialogVisible = ref(false)

const questionFormRef = useElFormRef()
const questionForm = useElFormModel({
  title: '',
  options: [{ title: '', is_correct: false }],
  tags: []
})
const questionFormRules = useElFormRules({
  title: [useRequiredRule(), useMinLenRule(12)]

})
const correctOption = ref('')

const addOption = () => {
  questionForm.options.push({ title: '', is_correct: false })
}

const removeOption = (index: number) => {
  questionForm.options.splice(index, 1)
}

const submitForm = () => {
  if (!questionFormRef.value) return
  questionFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      console.log(questionForm)
    } else {
      console.log('error submit!')
      console.log(fields)
      return false
    }
  })
}

const openQuestionDialog = () => (questionDialogVisible.value = true)

defineExpose({
  openQuestionDialog
})
</script>

<style>
.el-radio__input{
  display: flex;
  align-items: center;
  gap: 2px;
}

</style>
