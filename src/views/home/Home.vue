<template>
  <Header />
  <DefaultContainer class="flex flex-col h-full overflow-hidden">
    <div
      v-if="$route.fullPath === '/'"
      class="flex justify-center items-center h-full"
    >
      <div
        class="relative w-[250px] md:w-[350px] xl:w-[450px] aspect-[3/4] bg-accent rotate-[-10deg]
        shadow-md shadow-black"
      >
        <div
          class="absolute top-0 left-0 w-full h-full p-4 bg-white rotate-[10deg] shadow-[-1px_5px_3px__rgba(0,0,0,0.6)]"
        >
          <h1 class="font-bold text-2xl text-center">Welcome to  <em class="text-accent">QUIZ</em> !</h1>
          <p class="text-justify text-xs indent-3">
            We are happy to introduce to you the QuizApp that has been developed to assess the skills of
            candidates for various job vacancies and streamline the decision-making process for recruiters
            when reviewing applications.
          </p>
          <p>To pass the quiz, go to section <em>Quizzes</em> and answer the questions within the allocated time.</p>
          <p>In section <em>Results</em> you are able to see your results correct answers.</p>
        </div>
      </div>
    </div>я
    <RouterView />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
</script>

<style scoped lang="scss">

</style>
