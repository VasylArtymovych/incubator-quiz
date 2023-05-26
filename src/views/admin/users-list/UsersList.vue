<template>
  <div v-loading="loading">
    <el-form
      ref="formRef"
      label-position="top"
      :model="formModel"
      :rules="formRules"
    >
      <el-form-item label="Find user by email" prop="email" class="max-w-[300px]">
        <el-input
          v-model.trim="formModel.email"
          type="email" placeholder="Search" clearable
          @clear="getUsers()"
          @input="handleClearInputData"
        >
          <template #append>
            <el-button @click="handleSearchUser">
              Find
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <AppTable v-if="users" :data="users" :headings="usersHeadings" class="text-black" />

    <el-pagination
      v-if="totalCount"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalCount"
      background
      layout="total, prev, pager, next, jumper"
      class="justify-center"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { ITableHeading } from '@/types'
import { usersListService } from './users-list.service'

const currentPage = ref(1)
const totalCount = ref<number>(1)
const pageSize = ref(3)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const users = ref<IUserData[] | null>(null)

const loading = ref(false)

const usersHeadings: ITableHeading[] = [
  { label: 'Email', value: 'email' },
  { label: 'Role', value: 'role' }
]

const formRef = useElFormRef()
const formModel = useElFormModel({
  email: ''
})

const formRules = useElFormRules({
  email: [useEmailRule()]
})
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  getUsers()
}

const handleSearchUser = () => {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      getUserByEmail(formModel.email)
    }
  })
}

const handleClearInputData = (val: string) => {
  if (val === '') {
    getUsers()
  }
}

async function getUserByEmail (email: string) {
  try {
    loading.value = true
    const { data, error } = await usersListService.getUserByEmail(email)
    if (error) throw new Error(error.message)
    if (data) {
      users.value = data as IUserData[]
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}

async function getUsers () {
  try {
    loading.value = true
    const { data, error, count } = await usersListService.getUsers(skip.value, limit.value)
    if (error) throw new Error(error.message)
    if (data) {
      users.value = data as IUserData[]
    }
    if (count) {
      totalCount.value = count
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}
getUsers()
</script>
