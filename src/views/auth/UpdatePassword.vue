<template>
  <div class="max-w-[500px] m-auto">
    <el-card v-loading="loading">
      <template #header>
        <p class="font-semibold text-xl">Update password</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="updateForm"
        @submit.prevent="submit"
      >
        <el-form-item label="Password" prop="password">
          <el-input v-model="updateForm.password" type="password" show-password />
        </el-form-item>

        <el-form-item label="Confirm password" prop="confirmPassword">
          <el-input v-model="updateForm.confirmPassword" type="password" show-password />
        </el-form-item>

        <el-button native-type="submit" :type="$elComponentType.primary">
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
  password: [useRequiredRule(), useMinLenRule(6)]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      supabase.auth.updateUser(formModel)
        .then((data) => {
          console.log(data)
        })
    }
  })
}
</script>
