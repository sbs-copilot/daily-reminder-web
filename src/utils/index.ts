import moment from 'moment'

export const pagePath = {
  LOGIN: '/pages/login/index',
  INDEX: '/pages/index/index',
  RECORDS: '/records/list/index'
}
export const formatDate = (date: string | Date, format = 'MMM D, YYYY') => {
  const formattedDate = moment(date).format(format)
  return formattedDate
}

export const formatDateFromTimestamp = (timestamp: number) => {
  // 创建一个Date对象
  const date = new Date(timestamp)

  // 获取年份、月份和日期
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  // 返回格式化的日期字符串
  return year + '-' + month + '-' + day
}

export const formatString = (str: string, type = 1) => {
  const match = str.match(/^(.{3}).+(.{3})$/)
  if (!match) return str
  return `${match[1]}…${match[2]}`
}

export const authNavigateTo = async ({
  url,
  showToast = false,
  expried = false
}: {
  url: string
  showToast?: boolean
  expried?: boolean
}) => {
  const userInfo = uni.getStorageSync('userInfo')
    ? uni.getStorageSync('userInfo')
    : {}

  if (expried) {
    const backUrl = getCurrentPageUrlWithArgs()
  } else {
    // guestLogin
    uni.navigateTo({
      url
    })
    // guestLogin
  }
  // if (!userInfo.token) {
  //   console.log("[鉴权成功] 当前未登录, 无权限")
  //   if (showToast) {
  //     uni.showToast({
  //       title: "当前未登录,请先登录",
  //       icon: "none",
  //       duration: 1500
  //     })
  //   }
  //   const backUrl = getCurrentPageUrlWithArgs()
  //   uni.setStorageSync("toUrl", backUrl)
  //   setTimeout(() => {
  //     uni.switchTab({
  //       url: pagePath.HOME
  //     })
  //   }, 1500)
  // } else {
  //   console.log("[鉴权成功] 当前已登录")
  //   uni.navigateTo({
  //     url: url
  //   })
  // }
}
export const authNavBack = (url?: string) => {
  console.log(getCurrentPages())
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    url &&
      uni.redirectTo({
        url
      })
  }
}
export const authRedirectTo = ({
  url,
  showToast = false
}: {
  url: string
  showToast?: boolean
}) => {
  const userInfo = uni.getStorageSync('userInfo')
    ? uni.getStorageSync('userInfo')
    : {}
  uni.redirectTo({
    url
  })
  // if (!userInfo.token) {
  //   console.log("[鉴权成功] 当前未登录, 无权限")
  //   if (showToast) {
  //     uni.showToast({
  //       title: "当前未登录,请先登录",
  //       icon: "none",
  //       duration: 1500
  //     })
  //   }
  //   const backUrl = getCurrentPageUrlWithArgs()
  //   uni.setStorageSync("toUrl", backUrl)
  //   setTimeout(() => {
  //     uni.switchTab({
  //       url: pagePath.HOME
  //     })
  //   }, 1500)
  // } else {
  //   console.log("[鉴权成功] 当前已登录")
  //   uni.navigateTo({
  //     url: url
  //   })
  // }
}
export const getCurrentPageUrlWithArgs = function () {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route // 路径
  const options = (currentPage as any).options // 参数
  let urlWithArgs = `/${url}?`
  for (const key in options) {
    const value = options[key]
    urlWithArgs += `${key}=${value}&`
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return urlWithArgs
}

export const downloadFile = (url: string) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  document.body.appendChild(link)
  link.click()
}

export const getBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  let btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0]
  if ((ua.match(/msie|trident/g) || [])[0]) {
    btypeInfo = 'msie'
  }
  let pc = ''
  let prefix = ''
  let plat = ''
  // 如果没有触摸事件 判定为PC
  const isTocuh =
    'ontouchstart' in window ||
    ua.indexOf('touch') !== -1 ||
    ua.indexOf('mobile') !== -1
  if (isTocuh) {
    if (ua.indexOf('ipad') !== -1) {
      pc = 'pad'
    } else if (ua.indexOf('mobile') !== -1) {
      pc = 'mobile'
    } else if (ua.indexOf('android') !== -1) {
      pc = 'androidPad'
    } else {
      pc = 'pc'
    }
  } else {
    pc = 'pc'
  }
  switch (btypeInfo) {
    case 'chrome':
    case 'safari':
    case 'mobile':
      prefix = 'webkit'
      break
    case 'msie':
      prefix = 'ms'
      break
    case 'firefox':
      prefix = 'Moz'
      break
    case 'opera':
      prefix = 'O'
      break
    default:
      prefix = 'webkit'
      break
  }
  plat =
    ua.indexOf('android') > 0 ? 'android' : navigator.platform.toLowerCase()
  return {
    version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本
    plat, // 系统
    type: btypeInfo, // 浏览器
    pc,
    prefix, // 前缀
    isMobile: pc != 'pc' // 是否是移动端
  }
}
export const formatNumber = (num: number | undefined) => {
  if (!num) {
    return 0
  }
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  })
}
export const getFbPid = () => {
  const fbPid = document.cookie.match(/(^|;) ?_fbp=([^;]*)(;|$)/)
  if (fbPid) {
    return fbPid[2]
  } else {
    return null
  }
}

export const getDatas = (strdate?: any) => {
  if (!strdate) return new Date()
  const arr = strdate.split(/[- : \/]/)
  const date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5])
  return date
}
