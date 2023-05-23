<template>
  <div class="max-w-[500px] mx-auto mt-12">
    <el-card v-loading="loading">
      <template #header>
        <p class="font-semibold text-xl">Registration</p>
      </template>

      <el-form
        ref="regFormRef"
        :model="regForm"
        :rules="regFormRules"
        label-position="top"
        @submit.prevent="submit"
      >
        <el-form-item label="User email" prop="email">
          <el-input v-model.trim="regForm.email" type="email" />
        </el-form-item>

        <el-form-item label="User password" prop="password">
          <el-input v-model.trim="regForm.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="Confirm password" prop="confirmPassword">
          <el-input v-model.trim="regForm.confirmPassword" type="password" show-password />
        </el-form-item>

        <div class="flex justify-between">
          <el-button native-type="submit" :type="$elComponentType.primary">
            SignUp
          </el-button>
          <el-button link :type="$elComponentType.primary" @click="$router.push({name: $routeNames.login})">
            LogIn
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { navigateToAdminOrUserPage } from '@/views/auth/auth.helpers'

const regFormRef = useElFormRef()

const regForm = useElFormModel({
  email: '',
  password: '',
  confirmPassword: ''
})

const regFormRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)],
  confirmPassword: [useRequiredRule(), useMinLenRule(6)]
})

const loading = ref(false)
const { setUserData } = useAuthStore()

const submit = () => {
  regFormRef.value?.validate((valid) => {
    if (valid) {
      if (regForm.password !== regForm.confirmPassword) {
        return useErrorNotification('Confirm password does not match the password')
      }

      loading.value = true

      authService.register({
        email: regForm.email,
        password: regForm.password
      })
        .then(({ data, error }) => {
          if (error) throw new Error(error.message)

          if (data.user) {
            setUserData(data.user)
            navigateToAdminOrUserPage(data.user.email)
          }
        })
        .catch(error => (useErrorNotification(error.message)))
        .finally(() => (loading.value = false))
    }
  })
}
</script>
