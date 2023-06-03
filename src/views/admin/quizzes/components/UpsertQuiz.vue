<template>
  <div
    v-loading="loading"
    class="upsert-quiz flex flex-col h-full overflow-hidden pt-3"
  >
    <el-form
      ref="formRef"
      label-position="top"
      :rules="formRules"
      :model="formModel"
      class="mb-4"
    >
      <el-form-item
        label="Quiz title"
        prop="title"
      >
        <el-input
          v-model="formModel.title"
          clearable
          placeholder="Quiz title"
        />
      </el-form-item>
    </el-form>

    <el-collapse
      accordion
      class="flex flex-col h-full overflow-hidden border-b-0 border-t border-accentLight1"
    >
      <el-collapse-item
        title="Questions"
        name="1"
      >
        <Questions
          :selectedRows="selectedQuestions"
          @selectionChange="handleQuestionsSelectionChange"
        />
      </el-collapse-item>

      <el-collapse-item
        title="Users"
        name="2"
      >
        <UsersList
          :selectedRows="selectedUsers"
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
  selectedQuestions.value = val
}
const handleUsersSelectionChange = (val: string[]) => {
  selectedUsers.value = val
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

const getQuizById = async (id: number) => {
  try {
    const { error, data } = await quizzesService.getQuizById(id)
    if (error) throw new Error(error.message)
    if (data) {
      formModel.title = data.title
      selectedQuestions.value = data.questions
      selectedUsers.value = data.users
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  }
}
props.quizId && getQuizById(props.quizId)

const createQuiz = async () => {
  try {
    loading.value = true
    const payload = { title: formModel.title, questions: selectedQuestions.value, users: selectedUsers.value }
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

const updateQuiz = async () => {
  if (!props.quizId) return useErrorNotification('Quiz id is missing')

  try {
    loading.value = true
    const payload = { title: formModel.title, questions: selectedQuestions.value, users: selectedUsers.value }
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
