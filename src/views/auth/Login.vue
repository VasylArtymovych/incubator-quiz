<template>
  <Header />
  <div class="min-w-[300px] md:min-w-[500px] m-auto">
    <el-card
      v-loading="loading"
      class="auth-card md:pb-5 text-black"
    >
      <template #header>
        <div class="flex justify-center items-center">
          <p class="font-semibold text-xl">
            Login
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
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input
            v-model.trim="loginForm.email"
            type="email"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="Password"
          prop="password"
          class="mb-1"
        >
          <el-input
            v-model.trim="loginForm.password"
            type="password"
            show-password
          />
        </el-form-item>

        <el-button
          :type="$elComponentType.primary"
          link
          class="block ml-auto mb-4 text-xs"
          @click="$router.push({name: $routeNames.recovery})"
        >
          Forgot password?
        </el-button>

        <div>
          <el-button
            native-type="submit"
            :type="$elComponentType.primary"
            class="login-btn w-full"
          >
            LogIn
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
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
        .then(({ data, error }) => {
          if (error) throw new Error(error.message)
          if (data.user) {
            setUserData(data.user)
            authService.navigateToAdminOrUserPage()
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
