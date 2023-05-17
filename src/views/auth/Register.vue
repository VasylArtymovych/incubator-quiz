<template>
  <div class="max-w-[500px] mx-auto">
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
          <el-input v-model="regForm.email" />
        </el-form-item>

        <el-form-item label="User password" prop="password">
          <el-input v-model="regForm.password" type="password" show-password />
        </el-form-item>

        <div class="flex justify-between">
          <el-button native-type="submit" :type="$elComponentType.primary">
            Sign Up
          </el-button>
          <el-button link :type="$elComponentType.primary" @click="$router.push({name: $routeNames.login})">
            Login
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { $routeNames } = useGlobalProperties()

const regFormRef = useElFormRef()

const regForm = useElFormModel({
  email: '',
  password: ''
})

const regFormRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)]
})

const loading = ref(false)

const submit = () => {
  regFormRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true

      authService.register(regForm)
        .then(() => {
          useSuccessNotification('Confirmation link was sent to your email')
          router.push({ name: $routeNames.login })
        })
        .catch(error => {
          useSuccessNotification(error.message)
        })
        .finally(() => (loading.value = false))
    }
  })
}
</script>
