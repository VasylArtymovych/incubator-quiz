<template>
  <div
    class="card relative z-[1] inline-block text-left my-2 h-fit"
  >
    <div class="relative flex flex-col justify-center px-5 bg-bgrDark aspect-[3.2/4] overflow-hidden">
      <p
        v-if="isCompleted"
        class="px-8 text-white bg-red-700 text-center absolute top-[30px] left-[-30px] -rotate-45"
      >
        Completed
      </p>
      <p
        class="time absolute top-[10%] right-[30px] opacity-[0.5] m-0 text-base
        leading-[0.9] transition-all duration-300 ease-in-out text-white"
      >
        <span class="text-xs mr-2 text-accent">{{ time ? "Quiz time:" : isCompleted ? 'Score:' : '' }}</span>
        <template v-if="time">
          {{ convertSeconds(time).hours }}h:{{ convertSeconds(time).mins }}m:{{ convertSeconds(time).secs }}s
        </template>
        <template v-if="isCompleted">
          {{ score }}%
        </template>
      </p>
      <h2 class="title text-[28px] leading-10 text-titleWhite mb-4 opacity-[0.8]">
        {{ title }}
      </h2>
      <button
        class="btn relative bg-transparent border border-titleWhite py-3 px-5 text-titleWhite rounded-[3px]
        cursor-pointer overflow-hidden hover:text-bgrDark"
        @click="$emit('onQuizBtnClick')"
      >
        {{ isCompleted ? 'Go to result' : "Go to quiz" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertSeconds } from '@/core/helpers'
defineProps<{
  title: string
  time?: number
  isCompleted?: boolean
  score?: number
}>()

defineEmits(['onQuizBtnClick'])
</script>

<style lang="scss" scoped>
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
    left: -120%;
    border-radius: 0 20px 20px 0;
    z-index: -1;
    transition: all 0.3s ease-in-out;
  }

  .btn:hover::before {
    left: 0;
    opacity: 0.5;
  }

  .card:hover .btn {
    transform: translateY(20px);
    opacity: 1;
  }
  .card:hover .title {
    opacity: 1;
    transform: scale(1.05);
  }

  .card:hover .time {
    opacity: 1;
    transform: scale(1.1);
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
    background-color: rgba(255, 255, 255, 0.04);
  }

  .card:nth-of-type(odd)::before {
    background: #ff4713;
    background: -webkit-linear-gradient(to right, #ff4713, #ffa389);
    background: linear-gradient(to right, #ff4713, #ffa389);
    }
  .card:nth-of-type(even):before {
    background: #ff4713;
    background: -webkit-linear-gradient(to right, #ffa389, #ff4713);
    background: linear-gradient(to right,  #ffa389, #ff4713);
  }
</style>
