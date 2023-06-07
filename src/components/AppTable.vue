<template>
  <div
    class="app-table"
    :style="{'--row-height': rowHeight,
             '--table-padding-left': $mq.smaller('md').value ? '16px' : tablePaddingLeft}"
  >
    <div class=" h-full overflow-auto" :style="`padding-right: ${tableScrollPadding}`">
      <table
        class="min-w-full"
        :class="{'block w-full': $mq.smaller('md').value}"
      >
        <thead>
          <tr>
            <!-- checkbox to select all -->
            <th
              v-if="selected && !$mq.smaller('md').value"
              class="!z-[11] left-0 shadow-fixed-column min-w-[40px] w-[40px]"
            >
              <div class="cell flex justify-center">
                <AppCheckbox
                  v-if="!$mq.smaller('md').value"
                  :modelValue="allOnPageSelected"
                  class="md:w-[14px] w-auto"
                  @update:modelValue="toggleAllOnPageSelection($event)"
                />
              </div>
            </th>

            <template v-for="(header, index) in visibleColumns" :key="header.prop">
              <!-- TODO: remove shadow when block is fully visible -->
              <th
                v-if="!$mq.smaller('md').value"
                :class="{ 'right-0 shadow-fixed-column': fixedLast && visibleColumns.length - 1 === index }"
                :style="`min-width: ${header.minWidth}px; width: ${header.width}px; max-width: ${header.maxWidth}px;`"
                class=""
              >
                <div
                  class="cell"
                  :style="`width: ${header.width}px;`"
                  :class="[{ 'cursor-pointer': header.sortable }, {'justify-center': header.contentCenter}]"
                  @click="header.sortable && setSorting(header.prop)"
                >
                  <slot :name="`header_${header.prop}`" :header="header">
                    {{ header.label || '' }}
                  </slot>
                  <template v-if="header.sortable">
                    <div class="flex flex-col ml-[10px] relative w-[10px] h-[10px] text-silver">
                      <span
                        class="text-xs4 absolute left-0 top-[-10px]"
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

        <tbody :class="{'block w-full': $mq.smaller('md').value}">
          <template v-for="(row, i) in dataset" :key="i">
            <tr
              :id="row[unique]"
              :class="[rowClassChecker(row), rowClass, { 'cursor-pointer': clickable },
                       { 'mb-[15px] border border-accentLight2 p-[15px] block w-full rounded-md card-tr':
                         $mq.smaller('md').value }]"
              @click="$emit('rowClick', row)"
            >
              <td v-if="selected" class="md:inline-block w-[40px] sticky left-0">
                <div
                  :class="[{'cell text-center': !$mq.smaller('md').value},
                           {'bg-accentLight3 pt-[2px] rounded-full': $mq.smaller('md').value}]"
                  class="flex items-center justify-center"
                  @click.stop
                >
                  <AppCheckbox :modelValue="selected.includes(row.id)" @update:modelValue="toggleSelection(row)" />
                </div>
              </td>

              <td
                v-if="$mq.smaller('md').value && fixedLast"
                class="text-right flex justify-end mb-3 relative actions-td "
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
                    {'hidden': ($mq.smaller('md').value && h.prop === 'actions')},
                    h.cellClasses && !$mq.smaller('md').value
                  ]"
                >
                  <!-- TODO: remove shadow when block is fully visible -->
                  <div
                    class="flex items-center"
                    :class="[
                      fixedLast && visibleColumns.length - 1 === hIndex && !$mq.smaller('md').value
                        ? 'sticky right-0'
                        : '',
                      { 'cell--tr-default': detailsIndex === i && !$mq.smaller('md').value },
                      { 'flex justify-between items-center': $mq.smaller('md').value },
                      {'cell truncate': !$mq.smaller('md').value},
                      h.contentClass
                    ]"
                  >
                    <slot v-if="$mq.smaller('md').value" :name="`header_${h.prop}`" :header="h">
                      <p class="text-white uppercase font-semibold mr-3" :class="{'mr-9': h.prop !== 'options'}">
                        {{ h.label || '' }}:
                      </p>
                    </slot>

                    <span
                      class="w-full py-1 max-h-full"
                      :class="[{'text-center': h.contentCenter}, {'overflow-hidden': $mq.smaller('md').value}]"
                    >
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
    @apply md:h-[50px] h-[40px] sticky top-0 text-white border border-snuff
    bg-gray #{!important};
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
    @apply border border-snuff bg-white text-sm;
    // @apply border-b border-snuff bg-white text-sm;
  }

  th > .cell {
    word-break: break-word;
    @apply flex items-center leading-snug text-left uppercase font-bold #{!important};
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

.card-tr {
  background: linear-gradient(130deg, #515660 10%, white 53%,  transparent 55%, white 60%);
}

.actions-td {
  z-index: 0;
}
.actions-td::after {
  content: '';
  width: 120px;
  height: 34px;
  position: absolute;
  top: -5px;
  right: -4px;
  z-index: -1;
  border-radius: 50px 0 0 50px;
  background-color: #6b7280;

}
</style>
