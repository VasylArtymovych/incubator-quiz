<template>
  <DefaultContainer
    v-loading="loading"
    class="h-full overflow-hidden"
  >
    <div
      v-if="currentQuestion"
      class="flex flex-col h-full overflow-hidden"
    >
      <AppTimer
        :key="currentStep"
        class="mx-auto my-4"
        :width="100"
        :strokeWidth="3"
        :time="currentQuestion.timer"
        @timeIsUp="onNextClick"
      />
      <div class="flex flex-col h-full overflow-auto p-4 lg:px-8">
        <div class="text-base font-semibold mb-3">
          Question:
          {{ currentStep }}/{{ currentQuiz?.questions.length }}
        </div>
        <div class="relative  p-2 mb-8 rounded-lg bg-borderGradient shadow-lg shadow-gray-medium">
          <h2 class="p-2 md:p-6 font-semibold bg-catskill-white rounded-sm select-none md:text-lg lg:text-2xl">
            {{ currentQuestion?.title }}
          </h2>
        </div>

        <div
          v-for="(opt, i) in currentQuestion.options"
          :key="i"
          class="option-wrap group p-1 mb-6 bg-borderGradient2 rounded-md hover:scale-[0.98] shadow-lg shadow-white
          hover:shadow-accentLight2  md:w-[70%] md:self-center transition-all duration-300"
          :class="{'scale-[0.98] shadow-none': selectedOption === opt.title}"
        >
          <p
            class="option-text py-2 px-4 bg-catskill-white option select-none hover:shadow-accentLight2"
            :class="{'selected !bg-black font-semibold text-white': selectedOption === opt.title}"
            @click="selectedOption = opt.title"
          >
            <span class="font-semibold"> {{ i+1 }}</span>: {{ opt.title }}
          </p>
        </div>
      </div>

      <button
        class="btn-next relative w-32 md:w-40 py-2 md:py-3 px-5 ml-auto mb-4 mr-2 flex justify-center items-center
        text-white border border-accent rounded-md cursor-pointer bg-buttonGradient transition-all duration-300
        ease-in-out hover:shadow-[1px_1px_3px_#ff4713,-1px_-1px_3px_#ff4713] hover:text-[larger]"
        role="button"
        @click="onNextClick"
      >
        {{ (currentStep - 1) === lastQuesIndx ? 'FINISH' : 'NEXT' }}
        <IconArrowRight class="ml-3" />
      </button>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'

const authStore = useAuthStore()
const availableQuizzesStore = useAvailableQuizStore()
const { currentQuiz, currentQuestion, availableQuizzes, loading, answers } = storeToRefs(availableQuizzesStore)

const route = useRoute()
const router = useRouter()
const { $routeNames } = useGlobalProperties()

const quizId = ref(+route.params.id)
const currentStep = ref(+route.query.step! || 1)
const selectedOption = ref<string>('')

const lastQuesIndx = computed(() => {
  if (currentQuiz.value?.questions.length) {
    return currentQuiz.value?.questions.length - 1
  } else {
    return 0
  }
})

const addCurrentAnswer = () => {
  if (currentQuestion.value) {
    const currAnswer = {
      id: currentQuestion.value.id,
      value: selectedOption.value
    }
    availableQuizzesStore.addAnswer(currAnswer)
    selectedOption.value = ''
  }
}

const saveResults = async () => {
  loading.value = true
  const result = {
    user_id: authStore.activeUserData!.id,
    quiz_id: quizId.value,
    answers: answers.value
  } as IPayload
  try {
    const { status, error } = await userResultsService.saveResults(result)
    if (error) throw new Error(error.message)
    if (status === 201) {
      router.replace({ name: $routeNames.userResults })
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
    answers.value = []
  }
}

const onNextClick = () => {
  if ((currentStep.value - 1) === lastQuesIndx.value) {
    addCurrentAnswer()
    saveResults()
  } else {
    addCurrentAnswer()
    currentStep.value += 1
    availableQuizzesStore.setCurrentQuestion(currentStep.value)
    router.replace({
      name: $routeNames.passQuiz,
      params: { id: quizId.value },
      query: { step: currentStep.value }
    })
  }
}

const setCurrentQuizAndQuestion = async () => {
  if (availableQuizzes.value.length) {
    const currQuiz = availableQuizzes.value.find((quiz) => quiz.id === quizId.value)
    currQuiz && availableQuizzesStore.setCurrentQuiz(currQuiz)
  } else {
    await availableQuizzesStore.getQuizById(quizId.value)
  }

  availableQuizzesStore.setCurrentQuestion(currentStep.value)
}

onBeforeMount(() => {
  setCurrentQuizAndQuestion()
})

// Code to prevent page reload
const preventNavigation = ref(true)

function beforeUnload (e: any) {
  if (preventNavigation.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', beforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeUnload)
  preventNavigation.value = false
})

onBeforeRouteLeave((to, from, next) => {
  if (preventNavigation.value) {
    if (window.confirm('Do you really want to leave? you have unsaved changes!')) {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})

</script>

<style lang="scss" scoped>
.option-wrap:hover > .option-text:not(.selected) {
  font-weight: 600;
  opacity: 0.9;
}
</style>
