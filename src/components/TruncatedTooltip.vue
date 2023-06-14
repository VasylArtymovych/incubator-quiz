<template>
  <template v-if="multiline > 1">
    <el-popover
      :disabled="!showTooltip"
      :showAfter="300"
      :placement="placement"
      :popperClass="`pointer-events-none ${maxWidthClass}`"
      trigger="hover"
    >
      <template #reference>
        <div
          ref="root"
          class="multi-truncate"
          v-bind="$attrs"
          :style="`--mt-lines: ${multiline}`"
          @mouseenter="checkVisibility"
        >
          <slot>{{ contentProp }}</slot>
        </div>
      </template>

      <slot>{{ contentProp }}</slot>
    </el-popover>
  </template>

  <template v-else>
    <div :class="'truncate'">
      <el-tooltip
        v-if="showTooltip"
        :content="content"
        :placement="placement"
        :showAfter="300"
        :popperClass="`pointer-events-none ${maxWidthClass}`"
      >
        <div ref="root" class="truncate" v-bind="$attrs" @mouseenter="checkVisibility">
          <slot>{{ contentProp }}</slot>
        </div>
      </el-tooltip>

      <div v-else ref="root" class="truncate" v-bind="$attrs" @mouseenter="checkVisibility">
        <slot>{{ contentProp }}</slot>
      </div>
    </div>
  </template>
</template>

<script>

export default {
  name: 'TruncatedTooltip',
  inheritAttrs: false,

  props: {
    multiline: {
      type: Number,
      default: 1
    },
    placement: {
      type: String,
      default: 'top-start'
    },
    maxWidthClass: {
      type: String,
      default: 'max-w-350'
    },
    contentProp: {
      type: [String, Number]
    }
  },

  data () {
    return {
      showTooltip: false,
      content: ''
    }
  },

  methods: {
    checkVisibility () {
      const el = this.$refs.root
      if (!el) return

      if (this.multiline === 1) {
        this.showTooltip = el.scrollWidth > el.clientWidth
      } else {
        this.showTooltip = el.scrollHeight > el.clientHeight
      }

      this.content = el.innerText
    }
  }
}
</script>
