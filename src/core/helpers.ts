import type { TIndexedObject } from '@/types'

import cloneDeep from 'lodash.clonedeep'

export const copyTextToClipboard = (val: string) => { navigator.clipboard.writeText(val) }

export const stringifyParams = (obj: TIndexedObject = {}, removeEmpty = true) => {
  const val = cloneDeep(obj)

  for (const key of Object.keys(val)) {
    if (removeEmpty && ((!val[key] && !Number.isInteger(val[key])) || val[key].length === 0)) delete val[key]
    else if (Array.isArray(val[key])) val[key] = cloneDeep(val[key])
    else val[key] = String(val[key])
  }

  return val
}

export const falsyFilter = (item: any) => {
  return (item !== '' && item !== null && typeof item !== 'undefined')
}

export const getNestedProp = (obj: TIndexedObject, key: string) => {
  const arr = key.split('.')

  while (arr.length && obj) {
    const shift = arr.shift() as any
    obj = obj[shift]
  }
  return obj
}