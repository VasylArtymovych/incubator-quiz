<template>
  <header class="flex justify-between items-center p-6 relative bg-slate-200">
    <div>Logo</div>
    <BurgerButton :isActive="isActive" class="md:hidden" @toggleActive="isActive = !isActive" />
    <NavBar :isActive="isActive" />
  </header>
</template>

<script setup lang="ts">
const isActive = ref(false)
</script>

<style lang="scss" scoped>

</style>
