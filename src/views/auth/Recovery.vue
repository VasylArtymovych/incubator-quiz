<template>
  <div class="max-w-[500px] m-auto">
    <el-card v-loading="loading">
      <template #header>
        <p class="font-semibold text-xl">Recover password</p>
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

        <div class="flex justify-between">
          <el-button native-type="submit" :type="$elComponentType.primary">
            Send
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const formRef = useElFormRef()

const formModel = useElFormModel({
  email: ''
})
const loading = ref(false)

const formRules = useElFormRules({
  email: [useRequiredRule(), useEmailRule()]
})

function submit () {
  formRef.value?.validate(isValid => {
    if (isValid) {
      loading.value = true
      authService.recovery(formModel.email)
        .then(() => {
          useSuccessNotification(`Recovery link sent to ${formModel.email}`)
          loading.value = false
          formRef.value.resetFields()
        })
    }
  })
}
</script>
