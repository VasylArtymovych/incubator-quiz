<template>
  <header class="flex justify-between items-center p-6 relative bg-slate-200">
    <div>Logo</div>

    <NavBar v-show="isNavShown" :isActive="isActive" />

    <div class="flex">
      <BurgerButton :isActive="isActive" class="md:hidden" @toggleActive="isActive = !isActive" />

      <el-dropdown ref="dropdownRef" trigger="contextmenu">
        <el-button :size="$elComponentSize.large" circle class="ml-8 uppercase" @click="showClick">
          {{ createAbbreviation('Some user') }}
        </el-button>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>LogOut</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { DropdownInstance } from 'element-plus'
const route = useRoute()
const isActive = ref(false)
const dropdownRef = ref<DropdownInstance>()

const isNavShown = computed(() => route.meta.role === 'Admin')

function showClick () {
  if (!dropdownRef.value) return
  dropdownRef.value.handleOpen()
}

const createAbbreviation = (name: string) => {
  const nameAbbr = computed(() => (name.split(' ')
    .reduce((acc, cur) => {
      if (acc.length < 2 && cur) {
        acc = acc.concat(cur[0])
      }
      return acc
    }, '')
  ))

  return nameAbbr.value
}
</script>

<style lang="scss" scoped>

</style>
