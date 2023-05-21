<template>
  <div v-loading="loading">
    <pre>
    {{ users }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { usersListService } from './users-list.service'

const users = ref<IUserData[] | null>(null)
const loading = ref(true)

usersListService.getUsers()
  .then(data => {
    if (data.error) {
      return useErrorNotification(data.error.message)
    }
    users.value = data.data as IUserData[]
    loading.value = false
  })
</script>
