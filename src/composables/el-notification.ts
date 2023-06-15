import { ElNotification } from 'element-plus'

export const useSuccessNotification = (message: string) => (
  ElNotification({
    title: 'Success',
    message,
    type: 'success'
  })
)
export const useWarningNotification = (message: string) => (
  ElNotification({
    title: 'Warning',
    message,
    type: 'warning'
  })
)

export const useErrorNotification = (message = 'Error occurred') => (
  ElNotification({
    title: 'Error',
    message,
    type: 'error'
  })
)
