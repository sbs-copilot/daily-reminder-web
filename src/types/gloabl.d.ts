export { }
declare global {
  type LocaleType = "zh-CN" | "en"

  type ProblemResolveType = "DEFAULT" | "UP" | "DOWN"
  interface BaseResponse<T> {
    success?: boolean
    data: T
    code: number
    message?: string
    msg?: string
    result?:T
  }
    // 把除了指定字段外其他的变成可选
  type RequiredAllAndOptionalRest<T, K extends keyof T> = {
    [P in K]: T[P];
  } & Partial<Omit<T, K>>;
  // 把指定字段变成可选
  type Options<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
  // 获取对象的字段组合成一个类型
  type GetKey<T> = {
    [K in keyof T]: K
  }[keyof T]
  type GtagType = "download" | "conversion"
  type PLANTFORM =
    | "APP-PLUS"
    | "APP-PLUS-NVUE"
    | "H5"
    | "MP-WEIXIN"
    | "MP-ALIPAY"
    | "MP-BAIDU"
    | "MP-TOUTIAO"
    | "MP-QQ"
    | "MP-360"
  interface Window {
    gtag: (event: string, type: GtagType, option: any) => void
    location: Location
    android:{
      jumpToOut:(arg:string)=>{}
    }
  }
  type EventTagEmue  = "EVENT_H5_PAGE_VIEW_GAME_DETAIL" | "EVENT_H5_START_DOWNLOAD"
}
