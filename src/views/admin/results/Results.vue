<template>
  <div>
    results
    <AppTable
      v-if="results"
      :dataset="results"
      :headers="headers"
      rowHeight="50px"
      fixedLast
      doNotChangeQuery
      tableScrollPadding="2px"
      class="h-full overflow-hidden"
    />
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const results = ref<IResult[] | null>(null)

const headers: any[] = [
  { label: 'Email', prop: 'user_row[email]', minWidth: 240, contentClass: 'font-semibold xl:!text-lg' }
  // { label: 'Options', prop: 'options', minWidth: 160 },
  // { label: 'Tags', prop: 'tags', minWidth: 130, maxWidth: 200 },
  // { label: 'Timer', prop: 'timer', sortable: true, width: 100 }
]

const getAllResults = async () => {
  try {
    loading.value = true
    const { data, error } = await resultsService.getAllResults()
    console.log(data)
    if (error) throw new Error(error.message)
    if (data) {
      results.value = data as IResult[]
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

getAllResults()
</script>

<style scoped>

</style>
