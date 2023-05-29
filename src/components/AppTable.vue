<template>
  <ElTable
    ref="tableRef"
    :data="data"
    :class="[!withBorder && 'rounded-md shadow']"
    class="text-black h-full bg-transparent"
    :border="withBorder"
    :row-key="rowKey"
    :row-class-name="rowClassName"
    @selection-change="(val) => $emit('selectionChange', val)"
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
          {{ checkForDate(heading, row) }}
        </slot>
      </template>
    </el-table-column>
  </ElTable>
</template>

<script setup lang="ts">
import type { ITableHeading } from '@/types'
import { ElTable } from 'element-plus'

const tableRef = ref<InstanceType<typeof ElTable>>()

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

defineEmits(['selectionChange'])

const checkForDate = (heading: ITableHeading, row: any) => {
  if (heading.isDate) {
    return new Intl.DateTimeFormat('en-US').format(row[heading.value])
  } else {
    return row[heading.value]
  }
}
</script>
