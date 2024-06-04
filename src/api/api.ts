import Axios from 'axios'

import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import { useUser } from '@/hooks/useUser'
import { encode, decode } from 'qss'
import router from '@/router'
import { genSign } from './sign'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000000,
  adapter: createUniAppAxiosAdapter() // 指定适配器
})

axios.interceptors.request.use(
  async (config: any) => {
    // 自定义header，可添加项目token
    // const { getUserInfo } = useUser()
    // console.log(get(CACHE_KEY.USER)?.userInfo?.token)
    const { userInfo } = useUser()
    if (userInfo.value.token && !config.needToken) {
      config.headers.token = userInfo.value.token
    }
    // config.headers["Access-Control-Allow-Origin"] = "*"
    // 添加 timestamp 参数
    let signData = {}
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        timestamp: new Date().getTime()
      }
      signData = { ...config.params }
    } else {
      config.data = {
        ...config.data,
        timestamp: new Date().getTime()
      }
      signData = { ...config.data }
    }
    // 在header中添加签名
    config.headers['X-Signature'] = genSign(signData)
    config.headers.Accept = 'application/json'
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  async function (response) {
    const { updateUserInfo } = useUser()
    if (response.data.code != 200 && response.data.code == 9001) {
      updateUserInfo({ token: '' })
      uni.$u.throttle(() => {
        uni.showModal({
          title: '提示',
          content: '本次操作需要您验证登录',
          success: function (res) {
            if (res.confirm) {
              router
                .push({
                  name: 'login',
                  query: { routerName: router.currentRoute.value.name }
                })
                .then(() => {
                  // uni.showToast({
                  //   title: '登录超时,请重新登录',
                  //   icon: 'none'
                  // })
                })
            }
          }
        })
      }, 4000)
      return Promise.reject(response.data.message)
    } else if (response.data.code != 200) {
      const requestUrl: string = response.config.url || ''
      // 核销失败的api手动处理报错
      if (!requestUrl.includes('/mine/ticket/code')) {
        uni.showToast({
          title: response.data.message,
          icon: 'none'
        })
      }
      return Promise.reject(response.data.message)
    }

    return response
  },
  function (error) {
    if (error.name && error.name == 'AxiosError') {
      uni.showToast({
        title: '服务暂不可用',
        icon: 'none'
      })
    } else {
      uni.showToast({
        title: error.message,
        icon: 'none'
      })
    }

    return Promise.reject(error)
  }
)

interface RequsetOptions {
  data: Record<string, any>
  otherOptions: Record<string, any>
}
/**
 * api
 *
 * @export
 * @class Api
 * 静态方法 get post put delete
 *
 * @url 请求路径
 * @pkId 主键
 * @actions 基于url上扩展的方法
 *
 */
/** 
 * actions 事例
{
    approval: {
        method: 'put', 
        url: 'approval/{id}'
    }
}
*/

type B = GetKey<RequsetOptions>

type Actions = {
  [key: string]: {
    url: string
    method: 'post' | 'get' | 'delete' | 'put'
  }
}

interface ApiOptions {
  url: string
  pkId?: string | undefined
  actions?: Actions
}

type OtherRequest =
  | {
      [key: keyof Actions]: ({
        data,
        otherOptions
      }: Partial<RequsetOptions>) => void
    }
  | undefined

export default class Api<T extends Actions> implements ApiOptions {
  // [key: string]: any;
  url: string
  pkId?: string | undefined
  actions?: T
  content: OtherRequest
  constructor({ url, pkId, actions }: ApiOptions) {
    if (!/\/$/.test(url)) {
      url = url
    }
    this.url = url
    this.pkId = pkId
    this.actions = actions as T
    // 基于baseUrl上扩展的请求
    if (actions) {
      // Object.keys(actions).forEach((key) => {
      //   this[key] = (data: any, otherOptions: any) => {
      //     const url = formatUrl(this.url + this.actions?.[key].url, data);
      //     return send(url, data, otherOptions, this.actions?.[key].method);
      //   };
      // });

      const data = Object.keys(actions).reduce<
        Exclude<OtherRequest, undefined>
      >((result, current) => {
        result[current] = ({
          data = {},
          otherOptions = {}
        }: Partial<RequsetOptions>) => {
          const url = formatUrl(this.url + this.actions?.[current].url, data)
          return send(url, data, otherOptions, this.actions?.[current].method)
        }
        return result
      }, {})
      this.content = data
    }
  }

  /**
   *
   *
   * @param {*} data
   * @param {*} otherOptions
   * @return {*}
   * @memberof Api
   */
  get(data: any, otherOptions: any) {
    let url = `${this.url}{${this.pkId}}`
    url = formatUrl(url, data)
    return send(url, data, otherOptions)
  }

  query<T>({ data = {}, otherOptions = {} }: Partial<RequsetOptions>) {
    return send<T>(this.url, data, otherOptions)
  }

  create<T>({ data = {}, otherOptions = {} }: Partial<RequsetOptions>) {
    return send<T>(this.url, data, otherOptions, 'post')
  }

  update(data: any, otherOptions: any) {
    let url = `${this.url}{${this.pkId}}`
    url = formatUrl(url, data)
    return send(url, data, otherOptions, 'put')
  }

  delete(data: any, otherOptions: any) {
    let url = `${this.url}{${this.pkId}}`
    url = formatUrl(url, data)
    return send(url, data, otherOptions, 'delete')
  }

  getNormal(data: any, otherOptions: any) {
    let url = `${this.url}`
    url = formatUrl(url, data)
    return send(url, data, otherOptions)
  }

  static get(url: any, data: any, otherOptions: any) {
    url = formatUrl(url, data)
    return send(url, data, otherOptions)
  }

  static post(url: any, data: any, otherOptions: any) {
    url = formatUrl(url, data)
    return send(url, data, otherOptions, 'post')
  }

  static put(url: any, data: any, otherOptions: any) {
    url = formatUrl(url, data)
    return send(url, data, otherOptions, 'put')
  }

  static delete(url: any, data: any, otherOptions: any) {
    url = formatUrl(url, data)
    return send(url, data, otherOptions, 'delete')
  }
}
function send<T>(
  url: string,
  data: Record<string, any>,
  otherOptions: Record<string, any>,
  method = 'get'
): Promise<BaseResponse<T>> {
  return new Promise((resolve, reject) => {
    let config = {}
    if (method == 'get') {
      config = Object.assign({}, { url, method, params: data }, otherOptions)
    } else {
      if (
        otherOptions &&
        otherOptions.headers &&
        otherOptions.headers['Content-Type'] == 'multipart/form-data'
      ) {
        // fetch(import.meta.env.VITE_BASE_URL + url, {
        //   method: "post",
        //   headers: {
        //     "X-Authorization": get(CACHE_KEY.USER)?.userInfo?.token
        //   },
        //   body: data.data
        // })
        //   .then((res) => res.json())
        //   .then((res) => {
        //     resolve(res)
        //   })
        //   .catch((err) => {
        //     reject(err)
        //   })
        return
      }

      config = Object.assign({}, { url, method, data }, otherOptions)
    }

    axios
      .request(config)
      .then((res) => {
        let data = res.data
        if (data.size) {
          data = Object.assign({}, res.data, res)
        }
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function isFormatUrl(url: string) {
  return url.indexOf('{') !== -1 && url.indexOf('}') !== -1
}

function formatUrl(url: string, dataModel: { [x: string]: any }, options = {}) {
  if (!options.hasOwnProperty('removeFormatModelProp')) {
    // 默认移除datamodel中的已经在url中使用的format属性
    // @ts-ignore
    options.removeFormatModelProp = true
  }
  if (isFormatUrl(url)) {
    if (dataModel) {
      Object.keys(dataModel).forEach(function (key) {
        const varName = '{' + key + '}'
        if (url.indexOf(varName) !== -1) {
          url = url.replace(new RegExp(varName, 'gm'), dataModel[key])
          // 格式化url后是否将datamodel中的对应属性移除
          // @ts-ignore
          if (options.removeFormatModelProp) {
            delete dataModel[key]
          }
        }
      })
    } else {
      url.split('{').forEach(function (item) {
        if (item.indexOf('}') === item.length - 1) {
          url = url.replace('{' + item, '')
        }
      })
    }
    return url
  } else {
    return url
  }
}
const pendingRequest = new Map()

export function generateReqKey(config: any) {
  // 响应的时候，response.config 中的data 是一个JSON字符串，所以需要转换一下
  if (config && config.data && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data)
  }
  if (config.loop) {
    const { method, url, params, data } = config // 请求方式，参数，请求地址，
    return (
      [method, url, encode(params), encode(data)].join('&') +
      new Date().getTime()
    ) // 拼接
  }
  const { method, url, params, data } = config // 请求方式，参数，请求地址，
  // return [method, url].join('&'); // 拼接

  return [method, url, encode(params), encode(data)].join('&') // 拼接
}

export const isJsonStr = (str: any) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

export function addPendingRequest(config: any) {
  // if (config.cancelRequest) {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    config.cancelToken = new Axios.CancelToken((cancel) => {
      // cancel 函数的参数会作为 promise 的 error 被捕获
      cancel(`${config.url} 请求已取消`)
    })
  } else {
    config.cancelToken =
      config.cancelToken ||
      new Axios.CancelToken((cancel) => {
        pendingRequest.set(requestKey, cancel)
      })
  }
  // }
}

export function removePendingRequest(response: any) {
  if (response && response.config) {
    const requestKey = generateReqKey(response.config)
    // 判断是否有这个 key
    if (pendingRequest.has(requestKey)) {
      const cancelToken = pendingRequest.get(requestKey)
      cancelToken(requestKey)
      pendingRequest.delete(requestKey)
    }
  }
}
