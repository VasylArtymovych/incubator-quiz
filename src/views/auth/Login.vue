<template>
  <div class="min-w-[300px] md:min-w-[500px] m-auto">
    <el-card v-loading="loading" class="card md:pb-5 text-titleText bg-secondBgr border border-primary">
      <template #header>
        <div class="flex justify-center items-center">
          <p class="font-semibold text-xl">
            Login
          </p>
          <el-divider direction="vertical" />
          <p
            class="text-xl cursor-pointer"
            @click="$router.push({name: $routeNames.register})"
          >
            Register
          </p>
        </div>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="loginForm"
        class="form md:px-10"
        @submit.prevent="submit"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model.trim="loginForm.email" type="email" />
        </el-form-item>

        <el-form-item label="Password" prop="password" class="mb-1">
          <el-input v-model.trim="loginForm.password" type="password" show-password />
        </el-form-item>

        <el-button
          :type="$elComponentType.primary" link class="block ml-auto mb-4 text-xs"
          @click="$router.push({name: $routeNames.recovery})"
        >
          Forgot password?
        </el-button>

        <el-button native-type="submit" :type="$elComponentType.primary" class="recovery w-full">
          LogIn
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { navigateToAdminOrUserPage } from '@/views/auth/auth.helpers'

const formRef = useElFormRef()

const loginForm = useElFormModel({
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
      authService.login(loginForm)
        .then(data => {
          console.log(data)
          return data
        })
        .then(({ data, error }) => {
          if (error) throw new Error(error.message)
          if (data.user) {
            setUserData(data.user)
            navigateToAdminOrUserPage(data.user)
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
