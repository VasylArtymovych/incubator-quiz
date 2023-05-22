<template>
  <div>
    Questions Page
  </div>
</template>

<script setup lang="ts">
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
</script>
