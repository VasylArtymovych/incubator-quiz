<template>
  <el-dialog
    v-model="dialogVisible"
    title="Create question"
    @closed="onCloseDialog"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item
        prop="title"
        label="Question title"
      >
        <el-input
          v-model="formModel.title" type="textarea"
          :autosize="{ minRows: 2, maxRows: 2 }"
          resize="none"
          placeholder="Type your question"
        />
      </el-form-item>

      <el-form-item
        v-for="(opt, index) in formModel.options"
        :key="index"
        :label="'Option' + (index+1)"
        :prop="'options.' + index + '.title'"
        :rules="optionRules"
        class="options"
      >
        <el-input v-model="opt.title" />
        <el-radio
          v-model="correctOpt"
          :label="index"
          class="shrink-0 text-[10px] flex"
        >
          Correct
        </el-radio>

        <el-button
          v-if="index>1"
          type="danger" :size="$elComponentSize.small" circle
          @click="removeOption(index)"
        >
          <span class="w-3 h-3">X</span>
        </el-button>
      </el-form-item>

      <el-form-item
        prop="timer"
        label="Question time"
        class="timerItem"
      >
        <el-input-number v-model="formModel.timer" :size="$elComponentSize.small" :min="5" :max="60" />

        <el-button :size="$elComponentSize.small" @click="addOption">
          <template #icon>
            <IconPlus />
          </template>
          Add option
        </el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm">Create</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import cloneDeep from 'lodash.clonedeep'

const dialogVisible = ref(false)
const formRef = useElFormRef()
const initialFormData = {
  title: '',
  timer: 5,
  options: [
    {
      title: '',
      is_correct: false
    },
    {
      title: '',
      is_correct: false
    }
  ],
  tags: []
}
const formModel = ref(cloneDeep(initialFormData))
const formRules = useElFormRules({
  title: [useRequiredRule(), useMinLenRule(12)],
  timer: [useRequiredRule()]
})
const optionRules = [useRequiredRule()]
const correctOpt = ref<number>()

const removeOption = (index: number) => {
  formModel.value.options.splice(index, 1)
}

const addOption = () => {
  formModel.value.options.push({
    title: '',
    is_correct: false
  })
}

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
      formModel.value.options.map((opt, i) => {
        if (i === correctOpt.value) {
          opt.is_correct = true
        }
        return opt
      })
      console.log(formModel.value)
      dialogVisible.value = false
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetFrom = () => {
  formModel.value = cloneDeep(initialFormData)
  correctOpt.value = undefined
}

const onCloseDialog = () => {
  resetFrom()
}

const openQuestionDialog = () => (dialogVisible.value = true)

defineExpose({
  openQuestionDialog
})
</script>

<style>
.options .el-form-item__content {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
}
.el-radio__input{
  display: flex;
  align-items: center;
  gap: 2px;
}

.timerItem .el-form-item__content {
  justify-content: space-between;
}

</style>
