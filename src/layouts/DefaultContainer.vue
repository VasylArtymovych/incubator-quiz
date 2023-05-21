<template>
  <div class="w-full px-3 md:px-5 lg:px-8">
    <slot />
  </div>
</template>

<style>
  .minHeightVh {
    min-height: calc(100vh - 64px);
  }
</style>
