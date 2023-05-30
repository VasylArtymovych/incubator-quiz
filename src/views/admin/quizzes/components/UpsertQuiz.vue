<template>
  <div v-loading="loading" class="flex flex-col h-full overflow-hidden pt-3">
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

    <el-collapse v-model="activeNames" accordion class="flex flex-col h-full overflow-hidden" @change="handleChange">
      <el-collapse-item title="Questions" name="1" class="border-t border-b border-accent">
        <Questions
          :showCheckbox="true"
          :selectedRows="selectedQuestions"
          @selectionChange="handleSelectionChangeQuestions"
        />
      </el-collapse-item>

      <el-collapse-item title="Users" name="2" class="border-b border-accent">
        <UsersList v-if="false" :showCheckbox="true" @selectionChange="handleSelectionChangeUsers" />
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

const props = defineProps<{quizId: number | null}>()
const router = useRouter()
const { $routeNames } = useGlobalProperties()

const activeNames = ref([])
const selectedQuestions = ref<number[]>([])
const selectedUsers = ref<string[]>([])
const loading = ref(false)

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

const handleSelectionChangeQuestions = (val: number[]) => {
  console.log('valChange: ', val)
  selectedQuestions.value = val
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

// todo for users property
const getQuizById = async (id: number) => {
  try {
    const { error, data } = await quizzesService.getQuizById(id)
    if (error) throw new Error(error.message)
    if (data) {
      formModel.title = data.title
      selectedQuestions.value = data.questions
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  }
}
props.quizId && getQuizById(props.quizId)

// todo for users property
const createQuiz = async () => {
  try {
    loading.value = true
    const payload = { title: formModel.title, questions: selectedQuestions.value }
    const { error, status } = await quizzesService.addQuiz(payload)
    if (error) throw new Error(error.message)
    if (status === 201) {
      return router.push({ name: $routeNames.quizzes })
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
// .el-collapse .el-collapse-item__header {
//   background-color: transparent;
//   --el-collapse-header-bg-color: transparent;
// }
</style>
