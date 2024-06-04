import Api from './api'

// 查询任务
export const taskApi = new Api({ url: '/api/task/list' })
// 发送邮件
export const emailApi = new Api({ url: '/api/email' })
