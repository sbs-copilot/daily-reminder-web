import { store } from '../index'
import { defineStore } from 'pinia'

export interface UserInfo {
  user: NetWorkType.User
  token: string
  tabIndex: number
}

export interface UserState {
  userInfo: UserInfo
}

const defaultSetting = (): UserState => {
  const userInfo = {
    userInfo: {
      token: '',
      user: {} as NetWorkType.User,
      tabIndex: 0
    }
  }
  // set(CACHE_KEY.USER, { ...userInfo })
  return {
    ...userInfo
  }
}

function getLocalState(): UserState {
  return { ...defaultSetting() }
}

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  getters: {
    getUserInfo(state) {
      return () => {
        return state
      }
    }
  },
  actions: {
    init() {
      this.userInfo = { ...this.userInfo, tabIndex: 0 }
    },
    async wxLogin(showTip: boolean) {
      return new Promise((resovle, reject) => {
        const that = this
        uni.showLoading({
          title: 'loading...'
        })
        try {
          // uni.login({
          //   provider: 'weixin',
          //   success: async function (loginRes) {
          //     try {
          //       const { data } = await loginApi.create<NetWorkType.LoginRes>({ data: { wx_code: loginRes.code } })
          //       that.updateUserInfo({ token: data.token, account: data.account, reg_type: data.user_type, userId: data.user_id })
          //       if (showTip) {
          //         uni.showToast({
          //           icon: 'none',
          //           title: '登录成功'
          //         })
          //       }else{
          //         uni.hideLoading()
          //       }
          //       resovle(void 0)
          //     } catch (error) {
          //       uni.hideLoading()
          //       reject(void 0)
          //     }
          //   },
          //   fail: function () {
          //     uni.hideLoading()
          //     reject(void 0)
          //   }
          // });
        } catch (error) {}
      })
    },
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
    async getNotice() {},
    async updateNoticeStatus() {
      try {
      } catch (error) {}
    }
  },
  persist: {
    // 默认值，就是使用localStorage
    // storage: localStorage
    // 重写存取方法，转调给UniApp
    storage: {
      getItem(key) {
        return uni.getStorageSync(key)
      },
      setItem(key, val) {
        uni.setStorageSync(key, val)
      }
    }
  }
})

export const useUseUserStoreWithOut = () => {
  return useUserStore(store)
}
