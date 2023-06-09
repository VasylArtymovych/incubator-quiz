<template>
  <div v-loading="loading" class="users flex flex-col h-full">
    <div class="flex justify-between my-3 bg-transparent">
      <el-form
        ref="formRef"
        label-position="top"
        :model="formModel"
        :rules="formRules"
        :size="type === 'sm' ? 'small' : 'default'"
        class="users-form"
      >
        <el-form-item
          label="Find User"
          prop="email"
          class="w-52 md:w-[300px]"
        >
          <el-input
            v-model.trim="formModel.email"
            type="email"
            placeholder="User email"
            clearable
            @input="handleClearInputData"
          >
            <template #append>
              <el-button
                :type="$elComponentType.primary"
                @click="handleSearchUser"
              >
                <IconSearch />
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <el-tag v-if="users && selectedRows" class="self-end">
        Selected: {{ selectedRows.length }} of {{ totalCount }}
      </el-tag>
    </div>

    <AppTable
      v-if="users"
      :selected="selectedRows"
      :dataset="users"
      :headers="headings"
      doNotChangeQuery
      tableScrollPadding="2px"
      class="h-full"
      @update:selected="(val: string[]) => $emit('selectionChange', val)"
    />

    <el-pagination
      v-if="users && totalCount"
      id="pagination"
      v-model:current-page="currentPage"
      :total="totalCount"
      background
      :small="type==='sm'"
      :layout="`total, prev, pager, next, ${type==='sm' ? '': 'jumper'}`"
      class="justify-center my-2"
    />
  </div>
</template>

<script setup lang="ts">
// import type { ITableHeading } from '@/types'
import { usersListService } from './users-list.service'
interface IProps {
  selectedRows?: any[]
}

const { type } = useWindowWidth()

defineProps<IProps>()
defineEmits(['selectionChange'])

const currentPage = ref(1)
const totalCount = ref<number>(0)
const pageSize = ref(10)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))
const loading = ref(false)

const users = ref<IUserData[] | null>(null)

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
