<template>
  <div
    class="relative flex justify-center items-center"
    :style="`width: ${width}px;  height: ${width}px; --strokeDasharray: ${strokeDasharray}`"
  >
    <div
      class="circles-wrap absolute w-full h-full rounded-full flex justify-center items-start
      before:bg-accent"
    />
    <svg class="relative w-full h-full rotate-[270deg]">
      <circle
        :r="radius" :cx="radius" :cy="radius"
        class="fill-white translate-x-[5px] translate-y-[5px] stroke-black"
        :style="`stroke-width: ${strokeWidth}px`"
      />
      <circle
        :r="radius" :cx="radius" :cy="radius"
        class="second-circle fill-transparent translate-x-[5px] translate-y-[5px]"
        :style="`stroke-width: ${strokeWidth}px; animation-duration: ${time}s; stroke: ${strokeColor}`"
      />
    </svg>
    <div class="absolute text-sm text-black font-semibold">
      {{ addLeadingZero(mins, 2) }}:{{ addLeadingZero(secs, 2) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { addLeadingZero } from '@/core/helpers'

const props = withDefaults(defineProps<{
  width?: number
  strokeWidth?: number
  strokeColor?: string
  time: number

}>(), {
  width: 100,
  strokeWidth: 2,
  strokeColor: '#ff4713'
})

const emit = defineEmits(['timeIsUp'])

const timer = ref()
const endTime = ref(0)
const mins = ref(0)
const secs = ref(0)

const radius = computed(() => (props.width / 2 - 5))
const strokeDasharray = computed(() => (Math.ceil(2 * Math.PI * radius.value)))

onMounted(() => {
  endTime.value = Date.now() + ((props.time + 1) * 1000)

  timer.value = setInterval(function () {
    const diff = endTime.value - Date.now()
    if (diff <= 0) {
      emit('timeIsUp')
      return clearInterval(timer.value)
    }
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    const min = Math.floor((((diff % day) % hour) / minute))
    const sec = Math.floor(((((diff % day) % hour) % minute) / second))

    mins.value = min
    secs.value = sec
  }, 1000)
})
</script>

<style lang="scss" scoped>
.second-circle {
  stroke-dasharray: var(--strokeDasharray);  //2*PI*r
  animation: timer linear forwards;
  // stroke-dashoffset: 0;
}

.circles-wrap::before {
  content: "";
  position: absolute;
  top: 3px;
  width: 4px;
  height: 4px;
  box-shadow: 0 0 5px #ff4713, 0 0 10px #ff4713;
  border-radius: 50%;
  z-index: 2;
}

@keyframes timer {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: var(--strokeDasharray);
  }
}
</style>
