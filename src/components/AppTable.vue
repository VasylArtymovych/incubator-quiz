<template>
  <div
    class="app-table"
    :style="{'--row-height': rowHeight,
            '--table-padding-left': $mq.smaller('md').value ? '16px' : tablePaddingLeft}"
  >
    <div
      v-if="allOnPageSelected && !$mq.smaller('md').value && selected.length < total"
      class="sticky left-0 w-full text-center bg-selago border-none mb-[5px] rounded-[10px] p-[15px]"
    >
      <span v-if="hasSelectedAllQuery" v-html="`All <b>${total}</b> items selected`" />
      <span
        v-else
        class="link"
        v-html="`Select all <b>${total}</b> items`"
      />
    </div>

    <div class="pb-[20px] h-full" :style="`padding-right: ${tableScrollPadding}`">
      <table class="min-w-full">
        <thead>
          <tr>
            <!-- checkbox to select all -->
            <th v-if="selected" class="!z-[11] left-0 shadow-fixed-column min-w-[40px] w-[40px]">
              <div class="cell flex justify-center">
                <span
                  v-if="hasSelectedAllQuery && !allOnPageSelected || ($mq.smaller('md').value
                    && selected.length === total) && dataset.length"
                  v-html="`All <b>${dataset.length}</b> items selected`"
                />
                <span
                  v-if="!hasSelectedAllQuery && !allOnPageSelected && $mq.smaller('md').value && dataset.length"
                  class="link"
                  @click="toggleAllOnPageSelection($event)"
                  v-html="`Select all <b>${dataset.length}</b> items`"
                />

                <AppCheckbox
                  v-if="!$mq.smaller('md').value"
                  :modelValue="allOnPageSelected"
                  class="md:w-[14px] w-auto"
                  @update:modelValue="toggleAllOnPageSelection($event)"
                />

                <div v-if="allOnPageSelected && $mq.smaller('md').value && selected.length < total">
                  <span v-if="hasSelectedAllQuery" v-html="`Select all <b>${total}</b> items`" />
                  <span
                    v-else
                    class="link"
                    v-html="`All <b>${total}</b> items selected`"
                  />
                </div>
              </div>
            </th>

            <template v-for="(header, index) in visibleColumns" :key="header.prop">
              <!-- TODO: remove shadow when block is fully visible -->
              <th
                v-if="!$mq.smaller('md').value"
                :class="{ 'right-0 shadow-fixed-column': fixedLast && visibleColumns.length - 1 === index }"
                :style="`min-width: ${header.minWidth}px; width: ${header.width}px;`"
              >
                <div
                  class="cell"
                  :style="`width: ${header.width}px;`"
                  :class="{ 'cursor-pointer': header.sortable }"
                  @click="header.sortable && setSorting(header.prop)"
                >
                  <slot :name="`header_${header.prop}`" :header="header">
                    {{ header.label || '' }}
                  </slot>
                  <template v-if="header.sortable">
                    <div class="flex flex-col ml-[10px] relative w-[10px] h-[10px] text-silver">
                      <span
                        class="text-xs4 absolute left-0 top-[-4px]"
                        :class="{ 'text-primary': sortBy === header.prop && sortDirection === -1 }"
                      >▲</span>
                      <span
                        class="text-xs4 absolute left-0 top-[4px]"
                        :class="{ 'text-primary': sortBy === header.prop && sortDirection === 1 }"
                      >▼</span>
                    </div>
                  </template>
                </div>
              </th>
            </template>
          </tr>
        </thead>

        <tbody>
          <template v-for="(row, i) in dataset" :key="i">
            <tr
              :id="row[unique]"
              :class="[rowClassChecker(row), rowClass,
                      { 'cursor-pointer': clickable },
                      { 'mb-[15px] border border-snuff p-[15px] shadow-card2 block': $mq.smaller('md').value }]"
              @click="$emit('rowClick', row)"
            >
              <td v-if="selected" class="md:inline min-w-[40px] w-[40px]">
                <div
                  :class="{'cell text-center sticky left-0 shadow-fixed-column': !$mq.smaller('md').value}"
                  @click.stop
                >
                  <AppCheckbox :modelValue="selected.includes(row.id)" @update:modelValue="toggleSelection(row)" />
                </div>
              </td>

              <td
                v-if="$mq.smaller('md').value && fixedLast"
                class="w-screen text-right"
                :class="{ 'flex justify-end': !selected }"
              >
                <Computed #default="{ lastColumn }" :lastColumn="visibleColumns[visibleColumns.length - 1]">
                  <slot :name="lastColumn.prop" :row="row" :rowIndex="i">
                    <TruncatedTooltip
                      :contentProp="generateValue(row, lastColumn.prop)"
                      :style="`max-width: ${lastColumn.minWidth}px`"
                    />
                  </slot>
                </Computed>
              </td>

              <template v-for="(h, hIndex) in visibleColumns" :key="h.prop">
                <td
                  :class="[
                    { 'inline': fixedLast && visibleColumns.length - 1 === hIndex && !$mq.smaller('md').value },
                    {'table-truncate': !!h.minWidth && !$mq.smaller('md').value},
                    {'flex flex-col': $mq.smaller('md').value},

                    h.cellClasses && !$mq.smaller('md').value
                  ]"
                >
                  <!-- TODO: remove shadow when block is fully visible -->
                  <div
                    :class="[
                      fixedLast && visibleColumns.length - 1 === hIndex && !$mq.smaller('md').value
                        ? 'sticky right-0 shadow-fixed-column'
                        : '',
                      { 'cell--tr-default': detailsIndex === i && !$mq.smaller('md').value },
                      { 'flex justify-between mb-[10px] items-center': $mq.smaller('md').value },
                      {'cell truncate': !$mq.smaller('md').value}
                    ]"
                  >
                    <slot v-if="$mq.smaller('md').value" :name="`header_${h.prop}`" :header="h">
                      <p class="text-kimberly uppercase font-semibold">{{ h.label || '' }}</p>
                    </slot>

                    <span :style="`max-width: ${h.minWidth}px`">
                      <slot
                        v-if="!($mq.smaller('md').value && (fixedLast && hIndex === visibleColumns.length - 1))"
                        :name="h.prop"
                        :row="row"
                        :rowIndex="i"
                      >
                        <span v-if="h.isDate">
                          {{ falsyFilter(row[h.prop]) ? $filters.dateFilter(row[h.prop]) : '-' }}
                        </span>
                        <TruncatedTooltip v-else :copyAvailable="h.copy" :contentProp="generateValue(row, h.prop)" />
                      </slot>
                    </span>
                  </div>
                </td>
              </template>
            </tr>

            <tr v-if="!isNaN(detailsIndex)">
              <td :colspan="visibleColumns.length" class="details">
                <slot name="details" :row="row" :rowIndex="i" />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="!dataset.length" class="flex items-center justify-center py-[50px] text-scorpion">
        No data
      </div>
    </div>
  </div>
</template>

<!-- TODO: rebuild this for Composition API with TS support -->
<script>
import { falsyFilter, getNestedProp } from '@/core/helpers'
import { replaceRouterQuery } from '@/router'

export default {
  name: 'AppTable',

  props: {
    headers: {
      type: Array
    },
    dataset: {
      type: Array
    },
    rowHeight: {
      type: String,
      default: '40px'
    },
    tablePaddingLeft: {
      type: String,
      default: '10px'
    },
    tableScrollPadding: {
      type: String,
      default: '0px'
    },
    selected: {
      type: Array
    },
    total: Number,
    detailsIndex: {
      type: Number
    },
    rowClass: String,
    cellClass: String,
    unique: {
      type: String,
      default: 'id'
    },
    clickable: {
      type: Boolean,
      default: false
    },
    sort: String,
    doNotChangeQuery: {
      type: Boolean,
      default: false
    },
    fixedLast: {
      type: Boolean,
      default: false
    },
    rowClassChecker: {
      type: Function,
      default: () => ''
    }
  },

  emits: ['rowClick', 'sortBy', 'update:selected'],

  data () {
    return {
      sortBy: null,
      // TODO: refactor this one to get rid of number value
      sortDirection: 0
    }
  },

  computed: {
    visibleColumns () {
      return this.headers.filter(r => !r.hide)
    },

    allOnPageSelected () {
      return !!this.dataset?.length && this.selected && this.dataset.every(({ id }) => this.selected.includes(id))
    },

    hasSelectedAllQuery () {
      return !!this.$route.query.isSelectedAll
    }
  },

  watch: {
    sort: {
      immediate: true,
      handler (sort) {
        if (sort) {
          const [key, value] = sort.split(',')
          this.sortBy = key
          this.sortDirection = value === 'DESC' ? -1 : value === 'ASC' ? 1 : 0
        }
        if (!this.doNotChangeQuery) replaceRouterQuery({ sort })
      }
    },
    selected: {
      immediate: true,
      handler (selected) {
        if (selected && !this.doNotChangeQuery) {
          replaceRouterQuery({ selected: this.selected, isSelectedAll: null })
        }
      }
    }
  },

  created () {
    this.parseRouteQuery()
  },

  methods: {
    replaceRouterQuery,

    falsyFilter,

    toggleAllOnPageSelection (selectAll) {
      const changedArray = selectAll
        ? [...new Set([...this.selected, ...this.dataset.map(e => e.id)])]
        : this.selected.filter(e => !this.dataset.map(e => e.id).includes(e))

      this.$emit('update:selected', changedArray)
    },

    toggleSelection (e) {
      const index = this.selected.indexOf(e.id)

      const changedArray = index >= 0 ? this.selected.filter(s => s !== e.id) : [...this.selected, e.id]

      this.$emit('update:selected', changedArray)
    },

    parseRouteQuery () {
      if (this.$route.query.isSelectedAll) this.toggleAllOnPageSelection(true)
    },

    generateValue (obj, key) {
      const value = getNestedProp(obj, key)
      if (Array.isArray(value)) {
        return value.join(', ')
      }
      return falsyFilter(value) ? value : '-'
    },

    setSorting (sortBy) {
      if (this.sortBy === sortBy) {
        this.sortDirection++
        switch (this.sortDirection) {
        case 0 : this.sortBy = null; break
        case 2 : this.sortDirection = -1; break
        }
      } else {
        this.sortBy = sortBy
        this.sortDirection = 1
      }

      let order = null
      if (this.sortDirection === 1 || (this.sortDirection === 0 && this.sortBy)) {
        order = 'ASC'
      } else if (this.sortDirection === -1) {
        order = 'DESC'
      }

      const sort = this.sortBy ? `${[this.sortBy]},${order}` : ''

      this.$emit('sortBy', sort)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-table {
  @apply flex flex-col relative;

  &:after {
    content: '';
    height: 6px;
    top: -1px;
    @apply absolute block w-full z-10;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  .table-truncate {
    max-width: 1px;
    @apply truncate;
  }

  th, td {
    @apply text-sm text-gray-dark p-0;
  }

  td.details {
    @apply max-w-0 pt-0 #{!important};
  }

  th {
    @apply md:h-[50px] h-[40px] sticky top-0 text-lavender-purple
    font-normal bg-selago md:border-b border-snuff #{!important};
    @apply z-[10];
  }

  th:first-child > .cell {
    padding-left: var(--table-padding-left) !important;
  }

  td:first-child {
    > .cell {
      padding-left: var(--table-padding-left) !important;
    }
  }

  .cell {
    padding: 0 7.5px !important;
    transition: 0.2s easy;
    transition-property: background-color, border;
  }

  td > .cell {
    height: var(--row-height);
    line-height: var(--row-height);
    white-space: unset;
    @apply border-b border-snuff bg-white text-sm;
  }

  th > .cell {
    word-break: break-word;
    @apply flex items-center leading-snug text-left text-kimberly uppercase font-bold #{!important};
  }

  tbody {
    tr {
      &:hover {
        z-index: 1;
        transform: translateZ(1px);
        .cell {
          @apply bg-catskill-white #{!important};;
        }
      }
    }
  }
}
</style>
