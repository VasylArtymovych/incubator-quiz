export interface ITableHeading {
  label: string
  value: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  headerAlign?: string
  fixed?: boolean | string
  width?: number
  minWidth?: number
  className?: string
  isDate?: boolean
  showOverflowTooltip?: boolean
  headingClasses?: string
}

export type TIndexedObject<T = any> = { [key: string | number]: T }
