<template>
  <Header />

  <div class="min-w-[300px] md:min-w-[500px] m-auto">
    <el-card v-loading="loading" class="auth-card md:pb-5 text-black">
      <template #header>
        <div class="flex justify-center items-center">
          <p class="font-semibold text-xl">
            Register
          </p>
        </div>
      </template>

      <el-form
        ref="regFormRef"
        :model="regForm"
        :rules="regFormRules"
        label-position="top"
        class="form md:px-10"
        @submit.prevent="submit"
      >
        <el-form-item
          label="Email"
          prop="email"
        >
          <el-input
            v-model.trim="regForm.email"
            type="email"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input
            v-model.trim="regForm.password"
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item
          label="Confirm password"
          prop="confirmPassword"
        >
          <el-input
            v-model.trim="regForm.confirmPassword"
            type="password"
            show-password
          />
        </el-form-item>

        <el-button
          native-type="submit"
          :type="$elComponentType.primary"
          class="w-full mt-3"
        >
          SignUp
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
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
            authService.navigateToAdminOrUserPage()
          }
        })
        .catch(error => (useErrorNotification(error.message)))
        .finally(() => (loading.value = false))
    }
  })
}
</script>
