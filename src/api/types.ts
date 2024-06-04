interface ActivityUser {
  id: string
  userName: string
  realName: string
  signStatus: string
}

interface ActivityData {
  id: string
  activityName: string
  activityDesc: string
  smallPic: string
  address: string
  beginTimeStr: string
  endTimeStr: string
  baseTime: number
  recruitRule: string
  recruitNum: number
  linkUser: string
  linkPhone: string
  volunteerStart: string
  activityStatus: string
  activityStatusName: string
  activityUserList: ActivityUser[]
}

interface ApiResponse {
  code: string
  message: string
  data: ActivityData
}

export { ActivityUser, ActivityData, ApiResponse }
