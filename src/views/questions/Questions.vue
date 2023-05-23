<template>
  <UpsetQuestion ref="dialogRef" />

  <el-button :type="$elComponentType.success" @click="addQuestion">
    <template #icon>
      <IconPlus />
    </template>
    Add
  </el-button>
  <div>
    Questions Page
  </div>
</template>

<script setup lang="ts">
import UpsetQuestion from './components/UpsetQuestion.vue'

const dialogRef = ref<InstanceType<typeof UpsetQuestion> | null >(null)

const qustions = [
  {
    title: 'For what is used tag "Pre"?',
    options: [
      { label: 'option1', correct: false },
      { label: 'option2', correct: true },
      { label: 'option3', correct: false },
      { label: 'option4', correct: false }
    ],
    tags: ['FE', 'FS', 'junior']
  }
]
console.log(qustions)

const addQuestion = () => {
  if (dialogRef.value) {
    dialogRef.value.openQuestionDialog()
  }
}

</script>
