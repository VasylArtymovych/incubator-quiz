export const useWindowWidth = () => {
  const windowWidth = ref(window.innerWidth)

  const handleWindowResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleWindowResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)
  })

  const type = computed(() => {
    if (windowWidth.value < 640) {
      return 'xs'
    } else if (windowWidth.value >= 640 && windowWidth.value < 768) {
      return 'sm'
    } else if (windowWidth.value >= 768 && windowWidth.value < 1024) {
      return 'md'
    } else if (windowWidth.value >= 1024 && windowWidth.value < 1280) {
      return 'lg'
    } else {
      return 'xl'
    }
  })

  return {
    windowWidth,
    type
  }
}
