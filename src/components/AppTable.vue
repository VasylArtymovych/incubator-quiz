<template>
  <el-table
    :data="data"
    :class="[!withBorder && 'rounded-md shadow']"
    :border="withBorder"
    :row-key="rowKey"
    :row-class-name="rowClassName"
  >
    <el-table-column
      v-if="showCheckbox"
      type="selection"
      width="55"
      header-align="center"
      align="center"
    />

    <el-table-column
      v-for="(heading, idx) in headings" :key="heading.value + idx"
      :label="heading.label"
      :prop="heading.value"
      :sortable="heading.sortable"
      :fixed="heading.fixed"
      :header-align="heading.headerAlign"
      :align="heading.align"
      :width="heading.width"
      :min-width="heading.minWidth"
      :show-overflow-tooltip="heading.showOverflowTooltip"
      :label-class-name="(heading.headingClasses || 'text-gray-500 text-xs font-semibold')
        + ' !break-normal uppercase '"
      :class-name="heading.className + ' ' + heading.align"
    >
      <template #header>
        <slot :name="heading.label">
          {{ heading.label }}
        </slot>
      </template>

      <template #default="{row, column, $index}">
        <slot
          :name="heading.value"
          :row="row"
          :column="column"
          :index="$index"
        >
          {{ heading.isDate ? new Intl.DateTimeFormat('en-US').format(row[heading.value]) : row[heading.value] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { ITableHeading } from '@/types'

withDefaults(defineProps<{
  data: any[]
  headings: ITableHeading[]
  withBorder?: boolean
  showCheckbox?: boolean
  showHeader?: boolean
  rowKey?: string
  customTableWidth?: string
  rowClassName?: () => any
}>(), {
  data: () => ([]),
  withBorder: true,
  rowKey: 'id',
  showHeader: true
})

</script>

<style lang="scss" scoped>
  .el-table {
  &__body-wrapper, &__header-wrapper {
    @apply overflow-visible #{!important}
  }
  @apply overflow-auto #{!important}
}
</style>
