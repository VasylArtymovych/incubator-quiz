<template>
  <el-button class="block ml-auto" @click="isDialogVisible = true">
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
  </el-dialog>

  <div v-loading="loading">
    <AppTable v-if="users" :data=" users" :headings="usersHeadings" class="text-black">
      <template #actions="{row}">
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
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
import type { ITableHeading } from '@/types'
import { usersListService } from './users-list.service'

const isDialogVisible = ref(false)
const formRef = useElFormRef()
const formModel = useElFormModel<TAddUserPayload>({
  email: '',
  role: 'user'
})
const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()]
})

const users = ref<IUserData[] | null>(null)
const loading = ref(true)

const usersHeadings: ITableHeading[] = [
  { label: 'Email', value: 'email' },
  // { label: 'Full name', value: 'full_name' },
  { label: 'Role', value: 'role' },
  { label: 'Actions', value: 'actions', align: 'right', minWidth: 30 }
]

const addUser = () => {
  formRef.value.validate((isValid) => {
    if (isValid) {
      usersListService.addUser(formModel)
        .then((data) => {
          console.log(data)
        })
    }
  })
}

const deleteUser = (row: IUserData) => {
  usersListService.deleteUser(row.id)
    .then(({ error }) => {
      if (error) {
        return useErrorNotification(error.message)
      }
      useSuccessNotification(`User with email: ${row.email} was deleted`)
    })
}

usersListService.getUsers()
  .then(data => {
    if (data.error) {
      return useErrorNotification(data.error.message)
    }
    users.value = data.data as IUserData[]
    loading.value = false
  })
</script>
