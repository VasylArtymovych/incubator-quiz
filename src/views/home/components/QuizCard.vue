<template>
  <div
    class="card relative border border-borderCard text-left m-3"
    :style="{width, minWidth, maxWidth}"
  >
    <div class="pt-28 px-5 pb-10 bg-bgrDark min-h-[35vh]">
      <p class="time-text absolute top-[90px] right-[20px] opacity-[0.2] m-0 text-[110px]">
        {{ calcQuizTime }}
      </p>
      <h2 class="text-[28px] leading-10 text-titleWhite mb-4">
        {{ quiz.title }}
      </h2>
      <button
        class="btn relative bg-transparent border border-titleWhite py-3 px-5 text-titleWhite rounded-[3px]
        cursor-pointer overflow-hidden hover:text-bgrDark"
        @click="$router.push({name: $routeNames.passQuiz, params:{id: quiz.id}, query: {step: 1}})"
      >
        Go to quiz
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  quiz: IQuizPopulated
  width?: string
  minWidth?: string
  maxWidth?: string
}>()

const calcQuizTime = computed(() => {
  return props.quiz.questions.reduce((time, ques) => {
    time = ques.timer
    return time
  }, 0)
})
</script>

<style lang="scss" scoped>
  .card {
    display: inline-block;
    z-index: 1;
  }

  .time-text {
    transition: all 0.3s ease-in-out;
  }

  .btn {
    transition: all 0.3s ease-in-out;
    transform: translateY(-40px);
    opacity: 0;
    z-index: 1;
  }

  .btn::before{
    content: '';
    position: absolute;
    width: 120%;
    height: 100%;
    background-color: #b7b7b7;
    top: 0;
    opacity: 0;
    left: -120px;
    border-radius: 0 20px 20px 0;
    z-index: -1;
    transition: all 0.3s ease-in-out;
  }

  .card:hover .btn {
    transform: translateY(10px);
    opacity: 1;
  }
  .card:hover .time-text {
    top: 60px;
    opacity: 0.6;
  }

  .btn:hover::before {
    left: 0;
    opacity: 0.5;
  }

  .card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: white;
    transform: skew(2deg, 2deg);
  }
  .card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.02);
  }

  .card:nth-of-type(1)::before {
    background: #C9FFBF;
    background: -webkit-linear-gradient(to right, #FFAFBD, #C9FFBF);
    background: linear-gradient(to right, #FFAFBD, #C9FFBF);
    }
  .card:nth-of-type(2):before {
    background: #f2709c;
    background: -webkit-linear-gradient(to right, #ff9472, #f2709c);
    background: linear-gradient(to right, #ff9472, #f2709c);
  }
  .card:nth-of-type(3):before {
    background: #c21500;
    background: -webkit-linear-gradient(to right, #ffc500, #c21500);
    background: linear-gradient(to right, #ffc500, #c21500);
  }
  // .card:nth-of-type(4):before {
  //   background: #FC354C;
  //   background: -webkit-linear-gradient(to right, #0ABFBC, #FC354C);
  //   background: linear-gradient(to right, #0ABFBC, #FC354C);
  // }
</style>
