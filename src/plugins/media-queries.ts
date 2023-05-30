import type { Plugin } from 'vue'
import { useBreakpoints } from '@vueuse/core'
// import tailwindConfig from 'tailwind-config'

export const MQPlugin: Plugin = {
  install: (app) => {
    // console.log('tailwindConfig: ', tailwindConfig)
    // const mq = useBreakpoints(tailwindConfig.theme.screens)
    const mq = useBreakpoints({
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    })

    app.config.globalProperties.$mq = mq
    app.provide('breakpoints', mq)
  }
}
