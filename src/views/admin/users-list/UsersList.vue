<template>
  <!-- <el-button class="block ml-auto" @click="isDialogVisible = true">
    <template #icon>
      <IconPlus />
    </template>
    ADD
  </el-button>

  <el-dialog v-model="isDialogVisible" title="Add new User">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="formRules"
      label-position="top"
    >
      <el-form-item label="Email" prop="email">
        <el-input v-model.trim="formModel.email" autocomplete="off" type="email" />
      </el-form-item>
      <el-form-item label="Roles" prop="role">
        <el-select v-model="formModel.role">
          <el-option label="User" value="user" />
          <el-option label="Admin" value="admin" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addUser">
          Create
        </el-button>
      </span>
    </template>
  </el-dialog> -->

  <div v-loading="loading">
    <AppTable v-if="users" :data=" users" :headings="usersHeadings" class="text-black">
      <!-- <template #actions="{row}">
        <el-popconfirm
          width="220" title="Are you sure to delete this?"
          confirm-button-text="Yes"
          cancel-button-text="No"
          @confirm="deleteUser(row)"
        >
          <template #reference>
            <el-button size="small" :type="$elComponentType.danger">
              Delete
            </el-button>
          </template>
        </el-popconfirm>
      </template> -->
    </AppTable>

    <el-pagination
      v-if="totalCount"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalCount"
      background
      layout="prev, pager, next, jumper"
      class="justify-center"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { ITableHeading } from '@/types'
import { usersListService } from './users-list.service'

// const isDialogVisible = ref(false)
// const formRef = useElFormRef()
// const formModel = useElFormModel<TAddUserPayload>({
//   email: '',
//   role: 'user'
// })
// const formRules = useElFormRules({
//   email: [useRequiredRule(), useEmailRule()]
// })

const currentPage = ref(1)
const totalCount = ref<number>(1)
const pageSize = ref(3)

const skip = computed(() => ((currentPage.value - 1) * (pageSize.value)))
const limit = computed(() => (skip.value + pageSize.value - 1))

const users = ref<IUserData[] | null>(null)
const loading = ref(false)

const usersHeadings: ITableHeading[] = [
  { label: 'Email', value: 'email' },
  // { label: 'Full name', value: 'full_name' },
  { label: 'Role', value: 'role' }
  // { label: 'Actions', value: 'actions', align: 'right', minWidth: 30 }
]

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  getUsers()
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

// const addUser = () => {
//   formRef.value.validate((isValid) => {
//     if (isValid) {
//       usersListService.addUser(formModel)
//         .then((data) => {
//           console.log(data)
//         })
//     }
//   })
// }

// const deleteUser = (row: IUserData) => {
//   usersListService.deleteUser(row.id)
//     .then(({ error }) => {
//       if (error) {
//         return useErrorNotification(error.message)
//       }
//       useSuccessNotification(`User with email: ${row.email} was deleted`)
//     })
// }

</script>
