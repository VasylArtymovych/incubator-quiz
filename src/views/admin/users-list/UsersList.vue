<template>
  <div v-loading="loading" class="users flex flex-col h-full">
    <div class="flex gap-4 my-3 bg-transparent">
      <div v-if="users && selectedRows">
        <p class="pl-1 mb-1 text-accent text-sm font-semibold">Selected</p>
        <el-tag
          :size="$mq.smaller('md').value ? $elComponentSize.default : $elComponentSize.large"
          class="self-end text-sm"
        >
          {{ selectedRows.length }} of {{ totalCount }}
        </el-tag>
      </div>

      <el-form
        ref="formRef"
        label-position="top"
        :model="formModel"
        :rules="formRules"
        :size="$mq.smaller('md').value ? 'small' : 'default'"
        class="users-form"
        @submit.prevent
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
      v-model:page-size="pageSize"
      :page-sizes="[ 5, 10, 15, 20]"
      :total="totalCount"
      background
      :small="$mq.smaller('md').value"
      :layout="`total, ${$mq.smaller('md').value ? '': 'sizes'},
      prev, pager, next, ${$mq.smaller('md').value ? '': 'jumper'}`"
      class="justify-center my-2"
      @current-change="handleChangeCurrentPage"
      @size-change="handleChangeSize"
    />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  selectedRows?: any[]
}

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

const handleChangeCurrentPage = (page: number) => {
  currentPage.value = page
  getUsers()
}
const handleChangeSize = (size: number) => {
  currentPage.value = 1
  pageSize.value = size
  getUsers()
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
