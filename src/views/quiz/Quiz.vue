<template>
  <div v-if="question">
    <DefaultContainer>
      <AppTimer
        class="ml-auto my-4"
        :width="60"
        :strokeWidth="3"
        :time="7"
      />

      <el-card>
        <h2>{{ question?.title }}</h2>

        <p v-for="(opt, i) in question.options" :key="i">{{ i+1 }}: {{ opt.title }}</p>
      </el-card>
    </DefaultContainer>
  </div>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'

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

</script>

<style lang="scss" scoped>
</style>
