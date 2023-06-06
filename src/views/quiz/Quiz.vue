<template>
  <DefaultContainer
    v-if="question"
    class="flex flex-col h-full overflow-hidden"
  >
    <AppTimer
      class="ml-auto my-4"
      :width="60"
      :strokeWidth="3"
      :time="10"
    />

    <div class="flex flex-col h-full overflow-auto p-4 lg:px-8">
      <div class="relative  p-2 mb-8 rounded-lg bg-borderGradient shadow-lg shadow-gray-medium">
        <h2 class="p-2 md:p-6 font-semibold bg-catskill-white rounded-sm select-none md:text-lg">
          {{ question?.title }}
        </h2>
      </div>

      <div
        v-for="(opt, i) in question.options"
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
      class="button-next self-end py-1 pl-3 pr-1 mb-4 mr-4 flex justify-center items-center text-white cursor-pointer"
      role="button"
    >
      NEXT
      <IconArrowRight class="ml-2" />
    </button>
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
const selectedOption = ref<string>()

const question = ref<IQuestion | null>({
  id: 7,
  title: 'Is possible to change the name already defined function?',
  timer: 5,
  options: [
    {
      title: 'No, it is impossible',
      is_correct: false
    },
    {
      title: 'Func.name = newFuncName',
      is_correct: false
    },
    {
      title: 'Object.defineProperty()',
      is_correct: true
    }
  ],
  tags: [
    'FE',
    'junior',
    'middle',
    'senior'
  ]
})

const confirmReload = (event: BeforeUnloadEvent) => {
  console.log(event)
  event.preventDefault()
  // event.returnValue = '' // Required for Chrome and Edge

  // const shouldReload = confirm('Are you sure you want to reload the page?')
  // if (shouldReload) {
  //   window.removeEventListener('beforeunload', confirmReload)
  // }
}

onMounted(() => {
  window.addEventListener('beforeunload', confirmReload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', confirmReload)
})

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
</style>
