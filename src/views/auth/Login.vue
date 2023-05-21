<template>
  <div class="max-w-[500px] m-auto mt-12">
    <el-card v-loading="loading">
      <template #header>
        <p class="font-semibold text-xl">Login</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="formModel"
        @submit.prevent="submit"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model="formModel.email" type="email" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="formModel.password" type="password" show-password />
        </el-form-item>

        <div class="flex justify-between">
          <div class="flex flex-col items-start">
            <el-button native-type="submit" :type="$elComponentType.primary">
              Login
            </el-button>
            <el-button
              :type="$elComponentType.primary" link class="recovery"
              @click="$router.push({name: $routeNames.recovery})"
            >
              Reset password
            </el-button>
          </div>
          <el-button
            link :type="$elComponentType.primary"
            @click="$router.push({name: $routeNames.register})"
          >
            Sign Up
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { navigateToAdminOrUserPage } from '@/views/auth/auth.helpers'

const formRef = useElFormRef()

const formModel = useElFormModel({
  email: '',
  password: ''
})
const loading = ref(false)
const { setUserData } = useAuthStore()

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      authService.login(formModel)
        .then(({ data, error }) => {
          if (error) throw new Error(error.message)

          if (data.user) {
            setUserData(data.user)
            navigateToAdminOrUserPage(data.user.email)
          }
        })
        .catch(error => {
          useErrorNotification(error.message)
        })
        .finally(() => (loading.value = false))
    }
  })
}
</script>

<style scoped lang="scss">
  .el-button.recovery {
    margin-left: 0;
  }
</style>
