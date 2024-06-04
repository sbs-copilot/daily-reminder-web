import { md5 } from 'js-md5'

/**
 * 签名算法
 * @param data
 * @returns {string}
 */
export function genSign(data: any) {
  const keysSorted = Object.keys(data).sort()
  let str = ''
  for (let i = 0; i < keysSorted.length; i++) {
    str +=
      keysSorted[i] +
      '=' +
      (data[keysSorted[i]] != null ? data[keysSorted[i]] : '')
  }
  return md5(str).toUpperCase()
}
