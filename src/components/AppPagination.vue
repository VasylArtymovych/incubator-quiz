<template>
  <el-pagination
    :page-size="pageSize"
    :page-sizes="pageSizes"
    :total="total"
    :layout="layout"
    :small="small"
    :disabled="disabled"
    :background="background"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  pageSize?: number
  pageSizes?: number[]
  total: number
  layout?: string
  background?: boolean
  small?: boolean
  disabled?: boolean

}>(), {
  pageSize: 5,
  pageSizes: () => [],
  layout: 'prev, pager, next',
  background: false

})

const emit = defineEmits(['changeCurrent', 'changeSize'])

// const currentPage = ref(1)
// const pageSize = ref<number>(props.pageSize)

const handleCurrentChange = (page: number) => {
  // currentPage.value = page
  emit('changeCurrent', page)
}
const handleSizeChange = (size: number) => {
  // pageSize.value = size
  emit('changeSize', size)
}

// defineExpose({
//   currentPage,
//   pageSize
// })
</script>

<style scoped>

</style>
