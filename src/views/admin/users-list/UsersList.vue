<template>
  <div v-loading="loading" class="flex flex-col h-full">
    <el-form
      ref="formRef"
      label-position="top"
      :model="formModel"
      :rules="formRules"
    >
      <el-form-item label="Find user by email" prop="email" class="max-w-[300px]">
        <el-input
          v-model.trim="formModel.email"
          type="email"
          placeholder="Search"
          clearable
          @input="handleClearInputData"
        >
          <template #append>
            <el-button
              :type="$elComponentType.primary"
              @click="handleSearchUser"
            >
              Find
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <AppTable
      v-if="users"
      :dataset="users"
      :headers="headings"
      doNotChangeQuery
      class="h-full"
      @selection-change="(val: number[]) => $emit('selectionChange', val)"
    />

    <el-pagination
      v-if="totalCount"
      id="pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalCount"
      background
      layout="total, prev, pager, next, jumper"
      class="justify-center my-2"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
// import type { ITableHeading } from '@/types'
import { usersListService } from './users-list.service'
interface IProps {
  showCheckbox?: boolean
}

defineProps<IProps>()
defineEmits(['selectionChange'])

const currentPage = ref(1)
const totalCount = ref<number>(0)
const pageSize = ref(3)

// const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
// const limit = computed(() => (skip.value + pageSize.value - 1))

const users = ref<IUserData[] | null>(null)

const loading = ref(false)

const headings: any[] = [
  { label: 'Email', prop: 'email' }
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
    currentPage.value = 1
    getUsers()
  }
}

async function getUserByEmail (email: string) {
  if (!email) return
  try {
    loading.value = true
    const { data, error, count } = await usersListService.getUserByEmail(email)
    if (error) throw new Error(error.message)
    if (data) {
      users.value = data as IUserData[]
    }
    if (count) {
      totalCount.value = count
    } else {
      totalCount.value = 0
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
    const { data, error } = await usersListService.getUsers()
    if (error) throw new Error(error.message)
    if (data.users) {
      users.value = data.users as IUserData[]
    }
    if (data.total) {
      totalCount.value = data.total
    }
  } catch (error: any) {
    return useErrorNotification(error.message)
  } finally {
    loading.value = false
  }
}
getUsers()
</script>
