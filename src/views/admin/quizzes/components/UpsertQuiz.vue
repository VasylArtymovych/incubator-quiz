<template>
  <div class="flex flex-col h-full overflow-hidden pt-3">
    <el-form
      ref="formRef"
      label-position="top"
      :rules="formRules"
      :model="formModel"
      class="form"
    >
      <el-form-item label="Quiz title" prop="title">
        <el-input v-model="formModel.title" clearable />
      </el-form-item>
    </el-form>

    <el-collapse v-model="activeNames" class="flex flex-col h-full overflow-hidden" @change="handleChange">
      <el-collapse-item title="Questions" name="1" class="">
        <Questions :showCheckbox="true" @selectionChange="handleSelectionChangeQuestions" />
      </el-collapse-item>

      <el-collapse-item title="Users" name="2">
        <UsersList :showCheckbox="true" @selectionChange="handleSelectionChangeUsers" />
      </el-collapse-item>
    </el-collapse>

    <div class="flex justify-end my-2">
      <el-button :type="$elComponentType.primary">
        Cancel
      </el-button>
      <el-button :type="$elComponentType.success" @click="onUpsertQuiz">
        Send
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Questions from '../../questions/Questions.vue'
import UsersList from '../../users-list/UsersList.vue'

const activeNames = ref([])
const selectedQuestions = ref<number[]>([])
const selectedUsers = ref<string[]>([])

const formRef = useElFormRef()
const formModel = useElFormModel<{title: string}>({
  title: ''
})
const formRules = useElFormRules({
  title: [useRequiredRule()]
})

const handleChange = <T, >(val: T) => {
  console.log('active', val)
}

const handleSelectionChangeQuestions = (val: IQuestion[]) => {
  selectedQuestions.value = val.map(item => item.id)
}
const handleSelectionChangeUsers = (val: IUser[]) => {
  selectedUsers.value = val.map(item => item.id)
}

const onUpsertQuiz = () => {
  formRef.value?.validate(isValid => {
    if (isValid) {
      createQuiz()
    }
  })
}

const createQuiz = async () => {
  try {
    const payload = { title: formModel.title, questions: selectedQuestions.value }
    const res = await quizzesService.addQuiz(payload)
    console.log(res)
  } catch (error: any) {
    return useErrorNotification(error.message)
  }
}
</script>

<style lang="scss" scoped>
// .el-collapse .el-collapse-item__header {
//   background-color: transparent;
//   --el-collapse-header-bg-color: transparent;
// }
</style>
