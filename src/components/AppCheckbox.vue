<template>
  <label
    class="el-checkbox h-auto w-[14px] cursor-pointer"
    :class="{'is-checked': isChecked, 'is-disabled': disabled }"
  >
    <span
      class="el-checkbox__input"
      :class="{'is-checked': isChecked, 'is-disabled': disabled }"
    >
      <span class="el-checkbox__inner" />
      <input
        v-model="selected"
        :disabled="disabled"
        :value="label"
        type="checkbox"
        class="el-checkbox__original"
        @change="$emit('change', $event.target.checked)"
      >
    </span>
    <span class="el-checkbox__label" :class="{'is-checked': isChecked, 'is-disabled': disabled }">
      <slot>{{ Array.isArray(modelValue) ? '' : label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',

  props: {
    label: { type: String },
    disabled: Boolean,
    modelValue: [Boolean, Array]
  },

  emits: ['update:modelValue', 'change'],

  computed: {
    isChecked () { return Array.isArray(this.modelValue) ? this.modelValue.includes(this.label) : this.modelValue },

    selected: {
      get () { return this.modelValue },
      set (val) { this.$emit('update:modelValue', val) }
    }
  }
}
</script>

<style scoped lang="scss">
  .el-checkbox__input {
    animation: none !important;
    transition: none !important;

    .el-checkbox__inner {
      animation: none !important;
      transition: none !important;

      &:after {
        animation: none !important;
        transition: none !important;
      }
    }
  }
</style>
