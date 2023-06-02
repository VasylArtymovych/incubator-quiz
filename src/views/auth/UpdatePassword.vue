<template>
  <div class="min-w-[300px] md:min-w-[500px] m-auto mt-12">
    <el-card v-loading="loading" class="auth-card md:py-5 text-black">
      <template #header>
        <p class="font-semibold text-xl">Update password</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="updateForm"
        class="form"
        @submit.prevent="submit"
      >
        <el-form-item label="Password" prop="password">
          <el-input v-model.trim="updateForm.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="Confirm password" prop="confirmPassword">
          <el-input v-model.trim="updateForm.confirmPassword" type="password" show-password />
        </el-form-item>

        <el-button native-type="submit" :type="$elComponentType.primary" class="block ml-auto w-[30%]">
          Update
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const { $routeNames } = useGlobalProperties()

const formRef = useElFormRef()

const updateForm = useElFormModel({
  password: '',
  confirmPassword: ''
})
const loading = ref(false)

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()],
  password: [useRequiredRule(), useMinLenRule(6)],
  confirmPassword: [useRequiredRule(), useMinLenRule(6)]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      if (updateForm.password !== updateForm.confirmPassword) {
        return useErrorNotification('Confirm password does not match the password')
      }
      loading.value = true
      authService.updatePassword({ password: updateForm.password })
        .then(({ data, error }) => {
          if (error) throw new Error(error.message)
          data.user && router.push({ name: $routeNames.login, replace: true })
        })
        .catch(error => (useErrorNotification(error.message)))
        .finally(() => (loading.value = false))
    }
  })
}
</script>
