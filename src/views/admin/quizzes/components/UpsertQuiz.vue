<template>
  <div
    v-loading="loading"
    class="flex flex-col h-full overflow-hidden pt-3"
  >
    <el-form
      ref="formRef"
      label-position="top"
      :rules="formRules"
      :model="formModel"
      class="form"
    >
      <el-form-item
        label="Quiz title"
        prop="title"
      >
        <el-input
          v-model="formModel.title"
          clearable
        />
      </el-form-item>
    </el-form>

    <el-collapse
      accordion
      class="quiz-collapse flex flex-col h-full overflow-hidden"
    >
      <el-collapse-item
        title="Questions"
        name="1"
        class="border-t border-b border-accent"
      >
        <Questions
          :showCheckbox="true"
          :selectedRows="selectedQuestions"
          @selectionChange="handleQuestionsSelectionChange"
        />
      </el-collapse-item>

      <el-collapse-item
        title="Users"
        name="2"
        class="border-b border-accent"
      >
        <UsersList
          :showCheckbox="true"
          @selectionChange="handleUsersSelectionChange"
        />
      </el-collapse-item>
    </el-collapse>

    <div class="flex justify-end my-2">
      <el-button
        :type="$elComponentType.primary"
        @click="$router.push({name: $routeNames.quizzes, replace: true},)"
      >
        Cancel
      </el-button>
      <el-button
        :type="$elComponentType.success"
        @click="onUpsertQuiz"
      >
        {{ quizId ? 'Update' : 'Create' }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Questions from '@/views/admin/questions/Questions.vue'
import UsersList from '@/views/admin/users-list/UsersList.vue'

const props = defineProps<{quizId: number | null}>()

const router = useRouter()
const { $routeNames } = useGlobalProperties()

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

const handleQuestionsSelectionChange = (val: number[]) => {
  console.log('valChange: ', val)
  selectedQuestions.value = val
}
const handleUsersSelectionChange = (val: IUser[]) => {
  selectedUsers.value = val.map(item => item.id)
}

const onUpsertQuiz = () => {
  formRef.value?.validate(isValid => {
    if (isValid) {
      if (props.quizId) {
        updateQuiz()
      } else {
        createQuiz()
      }
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
      useSuccessNotification('Quiz was created')
      return router.push({ name: $routeNames.quizzes })
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}
// todo for users property
const updateQuiz = async () => {
  if (!props.quizId) return useErrorNotification('Quiz id is missing')

  try {
    loading.value = true
    const payload = { title: formModel.title, questions: selectedQuestions.value }
    const { error, status } = await quizzesService.updateQuiz(payload, props.quizId)
    if (error) throw new Error(error.message)
    if (status === 204) {
      useSuccessNotification('Quiz was updated')
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
