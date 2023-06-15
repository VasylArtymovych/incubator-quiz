<template>
  <Header />
  <DefaultContainer class="flex flex-col h-full overflow-hidden">
    <div
      v-if="$route.fullPath === '/'"
      class="flex justify-center items-center h-full"
    >
      <div
        class="relative w-[280px] md:w-[400px] xl:w-[460px] aspect-[3/4] bg-black rotate-[-15deg]
        shadow shadow-black"
      >
        <div
          class="absolute z-[1] top-0 left-0 w-full h-full p-4 md:p-6 bg-white rotate-[15deg]
          shadow-[-1px_5px_3px__rgba(0,0,0,0.6)] text-sm md:text-base xl:text-lg indent-3 flex flex-col"
        >
          <h1 class="mb-2 md:mb-3 font-bold text-lg md:text-3xl xl:text-4xl text-center indent-0">
            Welcome to  <em class="text-accent">QuizCraft</em> !
          </h1>
          <p class="mb-3 text-justify">
            We are happy to introduce to you the TechQuizApp that has been developed to assess the skills of
            candidates for various job vacancies and streamline the decision-making process for recruiters
            when reviewing applications.
          </p>
          <p class="mb-3 ">
            To pass a quiz, go to section <em class="text-accent">Quizzes</em>
            chose the available quiz and answer the questions within the allocated time.
          </p>
          <p>
            In section <em class="text-accent">Results</em>
            you are able to see your quiz score and results of your answers.
          </p>

          <img
            :src="owlLogo"
            alt="logo"
            class="w-4 h-4 md:w-12 md:h-12 text-red-600 ml-auto mt-auto"
          >
        </div>

        <div
          class="absolute top-0 left-0 w-full h-full bg-accent rotate-[5deg]
          shadow-[-1px_5px_3px__rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
    <RouterView />
  </DefaultContainer>
</template>

<script setup lang="ts">
import DefaultContainer from '@/layouts/DefaultContainer.vue'
import owlLogo from '@/assets/images/logo-2.svg'
</script>

<style scoped lang="scss">

</style>
