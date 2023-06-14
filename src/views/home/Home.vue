<template>
  <Header />
  <DefaultContainer class="flex flex-col h-full overflow-hidden">
    <div
      v-if="$route.fullPath === '/'"
      class="flex justify-center items-center h-full"
    >
      <div
        class="relative w-[300px] md:w-[350px] xl:w-[450px] aspect-[3/4] bg-accent rotate-[-10deg]
        shadow-md shadow-black"
      >
        <div
          class="absolute top-0 left-0 w-full h-full p-4 bg-white rotate-[10deg] shadow-[-1px_5px_3px__rgba(0,0,0,0.6)]"
        >
          <h1 class="mb-3 font-bold text-lg md:text-2xl text-center">
            Welcome to  <em class="text-accent">QuizCraft</em> !
          </h1>
          <p class="mb-3 text-justify text-sm lg:text-base indent-3">
            We are happy to introduce to you the TechQuizApp that has been developed to assess the skills of
            candidates for various job vacancies and streamline the decision-making process for recruiters
            when reviewing applications.
          </p>
          <p class="mb-3 indent-3 text-sm lg:text-base">
            To pass a quiz, go to section <em class="text-accent">Quizzes</em>
            chose the available quiz and answer the questions within the allocated time.
          </p>
          <p class="indent-3 text-sm lg:text-base">
            In section <em class="text-accent">Results</em>
            you are able to see your quiz score and results of your answers.
          </p>
        </div>
      </div>
    </div>
    <RouterView />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
</script>

<style scoped lang="scss">

</style>
