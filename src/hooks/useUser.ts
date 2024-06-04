import { useUseUserStoreWithOut, type UserInfo } from '@/stores/modules/user'
import { storeToRefs } from 'pinia'

export function useUser() {
  const userStore = useUseUserStoreWithOut()
  const { userInfo } = storeToRefs(userStore)

  const updateUserInfo = (userInfo: Partial<UserInfo>) => {
    return userStore.updateUserInfo(userInfo)
  }
  const init = () => {
    return userStore.init()
  }
  const getNotice = () => {
    return userStore.getNotice()
  }
  const updateNoticeStatus = () => {
    return userStore.updateNoticeStatus()
  }
  const wxLogin = (showTip = false): Promise<any> => {
    return userStore.wxLogin(showTip)
  }

  return {
    updateUserInfo,
    userInfo,
    init,
    getNotice,
    updateNoticeStatus,
    wxLogin
  }
}
