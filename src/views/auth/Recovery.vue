<template>
  <div class="min-w-[300px] md:min-w-[500px] m-auto mt-12">
    <el-card v-loading="loading" class="card md:py-5 text-titleText bg-secondBgr border border-primary">
      <template #header>
        <p class="font-semibold text-xl">Reset password</p>
      </template>

      <el-form
        ref="formRef"
        label-position="top"
        :rules="formRules"
        :model="recoveryForm"
        class="form"
        @submit.prevent="submit"
      >
        <el-form-item label="Email" prop="email">
          <el-input v-model.trim="recoveryForm.email" type="email" />
        </el-form-item>

        <el-button native-type="submit" :type="$elComponentType.primary" class="block ml-auto w-[30%]">
          Send
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const formRef = useElFormRef()

const recoveryForm = useElFormModel({
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
      authService.recovery(recoveryForm.email)
        .then(() => {
          useSuccessNotification(`Recovery link was sent to ${recoveryForm.email}`)
          loading.value = false
          formRef.value.resetFields()
        })
    }
  })
}
</script>
