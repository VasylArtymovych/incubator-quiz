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
        class="ml-auto my-4"
        :width="60"
        :strokeWidth="3"
        :time="currentQuestion.timer"
        @timeIsUp="onNextClick"
      />

      <div class="flex flex-col h-full overflow-auto p-4 lg:px-8">
        <div class="relative  p-2 mb-8 rounded-lg bg-borderGradient shadow-lg shadow-gray-medium">
          <h2 class="p-2 md:p-6 font-semibold bg-catskill-white rounded-sm select-none md:text-lg">
            {{ currentQuestion?.title }}
          </h2>
        </div>

        <div
          v-for="(opt, i) in currentQuestion.options"
          :key="i"
          class="option-wrap group p-1 mb-6 bg-borderGradient2 rounded-md hover:scale-[0.99] shadow-lg shadow-white
        hover:shadow-accentLight2  md:w-[70%] md:self-center"
          :class="{'bg-borderGradientChecked scale-[0.99] shadow-none': selectedOption === opt.title}"
        >
          <p
            class="option-text p-2 bg-catskill-white option select-none hover:shadow-accentLight2"
            :class="{'selected bg-green-100 font-semibold': selectedOption === opt.title}"
            @click="selectedOption = opt.title"
          >
            <span class="font-semibold"> {{ i+1 }}</span>: {{ opt.title }}
          </p>
        </div>
      </div>

      <button
        class="button-next py-1 pl-3 pr-2 mb-6 mr-2 md:py-2 md:pl-5 md:pr-4 md:text-lg
      flex justify-center items-center self-end text-white cursor-pointer"
        role="button"
        @click="onNextClick"
      >
        {{ (currentStep - 1) === lastQuesIndx ? 'Finish' : 'NEXT' }}
        <IconArrowRight class="ml-3" />
      </button>
    </div>
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
const authStore = useAuthStore()
const homeStore = useHomeStore()
const quizStore = useQuizStore()
const { currentQuiz, currentQuestion, loading, answers } = storeToRefs(quizStore)

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
      title: currentQuestion.value.title,
      value: selectedOption.value
    }
    quizStore.addAnswer(currAnswer)
    selectedOption.value = ''
  }
}

const saveResults = async () => {
  loading.value = true
  const result = {
    user: authStore.activeUserData!.id,
    quiz: quizId.value,
    answers: answers.value
  } as IPayload
  try {
    const { status, error } = await homeService.saveResults(result)
    if (error) throw new Error(error.message)
    if (status === 201) {
      router.replace({ name: $routeNames.results })
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

const onNextClick = () => {
  if ((currentStep.value - 1) === lastQuesIndx.value) {
    addCurrentAnswer()
    saveResults()
  } else {
    addCurrentAnswer()
    currentStep.value += 1
    quizStore.setCurrentQuestion(currentStep.value)
    router.replace({
      name: $routeNames.passQuiz,
      params: { id: quizId.value },
      query: { step: currentStep.value }
    })
  }
}

const setCurrentQuizAndQuestion = async () => {
  if (homeStore.availableQuizzes && homeStore.availableQuizzes.length) {
    const currQuiz = homeStore.availableQuizzes.find((quiz) => quiz.id === quizId.value)
    currQuiz && quizStore.setCurrentQuiz(currQuiz)
  } else {
    await quizStore.getQuizById(quizId.value)
  }

  quizStore.setCurrentQuestion(currentStep.value)
}

onBeforeMount(() => {
  setCurrentQuizAndQuestion()
})

// const confirmReload = (event: BeforeUnloadEvent) => {
//   event.preventDefault()
//   event.returnValue = '' // Required for Chrome and Edge
// }

// onMounted(() => {
//   window.addEventListener('beforeunload', confirmReload, { capture: true })
// })

// onBeforeUnmount(() => {
//   window.removeEventListener('beforeunload', confirmReload)
// })

</script>

<style lang="scss" scoped>
.option-wrap:hover > .option-text:not(.selected) {
  @apply bg-accentLight3
}

.button-next {
  border: none;
  outline: none;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-next:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff4713,
    #ff7300,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: wave-rainbow 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.button-next:hover.button-next:before {
  background: #ff4713;
}

.button-next:after {
  z-index: -1;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(130deg, black 30%, #ff4713 50%, black 70% );
  border-radius: 10px;
}

@keyframes wave-rainbow {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
