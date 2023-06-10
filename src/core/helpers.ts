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

export const addLeadingZero = (value: number, pad: number) => {
  return String(value).padStart(pad, '0')
}

export const convertSeconds = (sec: number) => {
  const min = 60
  const hour = min * 60

  const hours = Math.floor(sec / hour)
  const mins = Math.floor((sec % hour) / min)
  const secs = Math.floor(((sec % hour) % min))

  return { hours, mins, secs }
}
