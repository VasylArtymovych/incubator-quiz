<template>
  <el-dialog
    v-model="dialogVisible"
    title="Create question"
    @closed="onCloseDialog"
  >
    <el-form
      ref="formRef"
      v-loading="loading"
      :model="formModel"
      :rules="formRules"
      label-position="top"
      class="form"
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
        <el-input v-model="opt.title" clearable placeholder="Answer" />
        <el-radio
          v-model="correctOpt"
          :label="index"
          class="shrink-0 text-[10px] flex"
        >
          Correct
        </el-radio>

        <el-button
          v-if="index > 1"
          :size="$elComponentSize.small" circle
          class="hover:text-red-300"
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
        <el-input-number
          v-model="formModel.timer"
          :size="$elComponentSize.small"
          :min="5" :max="60"
        />

        <el-button
          :size="$elComponentSize.small"
          class="option"
          @click="addOption"
        >
          <template #icon>
            <IconPlus />
          </template>
          Add option
        </el-button>
      </el-form-item>

      <el-form-item
        prop="tags"
        label="Position tags"
      >
        <el-select
          v-model="formModel.tags"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose/create tags"
          class="w-full"
        >
          <el-option
            v-for="item in tagOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button :type="$elComponentType.danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm">{{ updatingQuestionId ? "Update": 'Create' }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['inserted', 'updated'])
const dialogVisible = ref(false)
const formRef = useElFormRef()
const updatingQuestionId = ref('')
const loading = ref(false)

const formModel = ref<TUpsetQuestion | IQuestion>({
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
})
const formRules = useElFormRules({
  title: [useRequiredRule(), useMinLenRule(12)],
  timer: [useRequiredRule()]
})
const optionRules = [useRequiredRule()]

const correctOpt = ref<number>()
const tagOptions = ref(['FE', 'BE'])

const addOption = () => {
  formModel.value.options.push({
    title: '',
    is_correct: false
  })
}

const removeOption = (index: number) => {
  formModel.value.options.splice(index, 1)
}

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      formModel.value.options.map((opt, i) => {
        (i === correctOpt.value)
          ? opt.is_correct = true
          : opt.is_correct = false

        return opt
      })
      if (updatingQuestionId.value) {
        updateQuestion()
      } else {
        createQuestion()
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetFrom = () => {
  formModel.value = {
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
  correctOpt.value = undefined
}

const onCloseDialog = () => {
  resetFrom()
}

const openQuestionDialog = (row?: IQuestion) => {
  updatingQuestionId.value = ''

  if (row) {
    updatingQuestionId.value = row.id
    formModel.value = row
    correctOpt.value = row.options.findIndex(opt => (opt.is_correct === true))
  }
  dialogVisible.value = true
}

const updateQuestion = async () => {
  try {
    loading.value = true
    const { error, status } = await questionsService.updateQuestion(formModel.value as IQuestion)
    if (error) throw new Error(error.message)
    if (status === 204) {
      emit('updated')
      dialogVisible.value = false
      useSuccessNotification('Question was successfully updated')
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

const createQuestion = async () => {
  try {
    loading.value = true
    const { error, status } = await questionsService.addQuestion(formModel.value)
    if (error) {
      return useErrorNotification(error.message)
    }
    if (status === 201) {
      emit('inserted')
      dialogVisible.value = false
      useSuccessNotification('Question was successfully updated')
    }
  } catch (error) {

  } finally {
    loading.value = false
  }
}
defineExpose({
  openQuestionDialog
})
</script>

<style lang="scss">
.options .el-form-item__content {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
}
.el-radio__input{
  display: flex;
  align-items: center;
  gap: 2px;
  color: aqua;
}

.timerItem .el-form-item__content {
  justify-content: space-between;
}

.el-dialog {
  background-image: linear-gradient(to top right,  #234e77 0%, #080814 50%, #234e77 100%);
  border: 1px solid #8269e7;

  & .el-dialog__title {
    --el-text-color-primary: #68c0e8;
  }
  & .el-dialog__headerbtn {
    --el-color-info: white;
  }
}

.form {
  --el-fill-color-blank: #234e77;
  --el-text-color-regular:  #68c0e8;
  --el-input-text-color: white;
  --el-border: #8269e7;
  --el-border-color: #8269e7;

  & .el-textarea__inner {
    --el-input-text-color: white;
  }
}

.el-input {
  --el-input-border-color: #8269e7;
  --el-input-bg-color: #153553;
  --el-input-text-color: white;
}

.el-button.option {
  --el-button-bg-color: #234e77;
  --el-button-text-color: rgb(187, 186, 186);
}
.el-button.option:hover {
  --el-button-hover-bg-color: #8269e7;
  --el-button-hover-text-color: white;
}

.el-select .el-select__input {
  --el-select-multiple-input-color: white;
}

.el-popper {
  --el-bg-color-overlay: #8269e7;
  --el-text-color-regular: white;
  --el-fill-color-light: #234e77;
  --el-color-primary:  #68c0e8;
  --el-dropdown-menuItem-hover-fill: #234e77;
}

.el-tag {
  --el-fill-color: #8269e7;
  --el-color-info: white;
}

.el-tag__close:hover{
  --el-tag-hover-color: #234e77;
}

.el-input-number {
  --el-text-color-regular: white;
  --el-fill-color-light:  #234e77;
}

.el-input-number__decrease:hover,
.el-input-number__increase:hover {
  --el-color-primary: white;
  --el-fill-color-light: #8269e7;
}

.el-dialog__body {
  --el-text-color-regular: #68c0e8;
}
</style>
