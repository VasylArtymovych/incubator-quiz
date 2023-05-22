export interface ITableHeading {
  label: string
  value: string
  sortable?: boolean
  width?: number
  align?: 'left' | 'right' | 'center'
  headerAlign?: string
  fixed?: boolean | string
  minWidth?: number
  className?: string
  isDate?: boolean
  showOverflowTooltip?: boolean
  headingClasses?: string
}
