<template>
  <div ref="container" class="h-[100vh] w-[100vw] overflow-y-scroll bg-blue-50">
    <!-- A. 顶部 -->
    <view
      class="fixed left-0 top-0 z-10 flex w-[100vw] flex-col bg-blue-100/90">
      <h3 class="mt-2 w-full text-center text-white">👻日报小助手</h3>
      <div class="flex w-full py-3 text-[var(--u-primary)]">
        <u-button class="mx-2" color="#cae1ff" @click="getTasks">
          <span class="font-bold text-[var(--u-primary)]">从禅道读取任务</span>
        </u-button>
        <u-button class="mx-2" color="#cae1ff" @click="addTask">
          <span class="font-bold text-[var(--u-primary)]">手动添加任务</span>
        </u-button>
      </div>
    </view>
    <div class="h-28"></div>
    <!-- B. 任务列表 -->
    <u-empty
      v-if="!tasks?.length"
      mode="list"
      iconSize="100"
      textSize="30"
      marginTop="400" />
    <div class="mx-6 mb-3" v-for="(task, index) in tasks" :key="index">
      <div
        class="relative flex h-auto rounded-md bg-white px-2 pb-2 pt-8 shadow-lg">
        <!-- 删除图标 -->
        <div
          class="absolute right-1 top-1 flex h-6 w-6 justify-items-center"
          @click.prevent="removeTask(index)">
          <u-icon name="close-circle-fill" color="#A9A9AA" size="40"></u-icon>
        </div>
        <!-- 序号 -->
        <div
          class="flex w-10 items-center justify-center justify-items-center rounded bg-blue-50">
          <span class="text-bolder font-blacks text-xl text-[var(--u-primary)]">
            {{ index + 1 }}
          </span>
        </div>
        <!-- 任务名称 -->
        <div class="flex-1">
          <div
            class="mx-[8px] rounded-lg border-[2px] border-dotted border-blue-100">
            <u-textarea
              style="color: var(--u-primary)"
              v-model="task.name"
              :autoHeight="false"
              :height="60 * task.lineCount + 20"
              maxlength="-1"
              :fixed="true"
              @linechange="onLinechange($event, index)"
              placeholder="请输入任务描述"></u-textarea>
          </div>
          <!-- 任务进度 -->
          <div class="flex items-center justify-between px-[8px]">
            <div>
              <text class="text-gray-400">{{ '进度：' }}</text>
              <text class="font-bold text-[var(--u-primary)]">
                {{ task.process }}%
              </text>
            </div>
            <div class="flex-1 overflow-hidden">
              <u-slider
                v-model="task.process"
                activeColor="var(--u-primary)"
                min="0"
                max="100"
                blockSize="24"
                step="5"></u-slider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-56"></div>
    <!-- C. 任务列表 -->
    <div
      class="fixed bottom-0 z-[999] flex w-full items-center justify-center bg-blue-100/90 pt-3"
      style="padding-bottom: calc(env(safe-area-inset-bottom) + 12px)">
      <u-button class="mx-6" type="primary" @click="copy">
        复制到剪贴板
      </u-button>
      <u-button v-if="false" class="mx-2" type="error" @click="sendEmail">
        邮件触发快捷指令
      </u-button>
    </div>
    <!-- D. 成功弹窗 -->
    <u-popup
      closeOnClickOverlay
      mode="center"
      :round="10"
      @close="onClose"
      :show="showPopup">
      <view class="w-[80vw] p-4">
        <view class="mb-1 mt-2 text-center">
          <text class="font-bold text-base text-green-500">✅复制成功</text>
        </view>
        <view class="mb-4 text-center">
          <text class="text-base text-gray-400">快去粘贴到群消息中吧</text>
        </view>
        <view
          class="mb-3 max-h-[50vh] overflow-y-scroll rounded-md bg-yellow-50 px-1 py-3">
          <text>{{ message }}</text>
        </view>
        <div class="mx-6 mt-6 flex">
          <u-button type="success" @click="onClose">去粘贴</u-button>
        </div>
      </view>
    </u-popup>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from '@/uni-simple-router'
import { taskApi, emailApi } from '@/api'
import { useCopyText } from '@/hooks/useCopyContext'
const { copyText } = useCopyText()
const route = useRoute()
const container = ref<any>(null)
const showPopup = ref(false)

interface Task {
  id: number
  name: string
  process: number
  lineCount: number
}
const tasks = reactive<Task[]>([])

const decodeHtmlEntities = (text: string) => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}
const message = computed(() => {
  return tasks
    .map((item, index) => {
      return `${index + 1}. ${item.name} (${item.process}%)`
    })
    .join('\n')
})

const onClose = () => {
  showPopup.value = false
  window.close()
}

const scrollToBottom = () => {
  if (container.value) {
    nextTick(() => {
      container.value.scrollTop = container?.value?.scrollHeight
    })
  }
}

const onLinechange = (event: any, index: number) => {
  // event.detail = {height: 0, heightRpx: 0, lineCount: 0}
  tasks[index].lineCount = event.detail.lineCount
}

const removeTask = (index: number) => {
  tasks.splice(index, 1)
}

const addTask = () => {
  tasks.push({
    id: new Date().getTime(),
    name: '',
    process: 0,
    lineCount: 1
  })
  scrollToBottom()
}

const getTasks = async () => {
  uni.showLoading({
    title: '从禅道读取中'
  })
  // 清空数据
  tasks.splice(0, tasks.length)

  let list: NetWorkType.TaskItem[] = []
  try {
    const { data } = await taskApi.query<NetWorkType.TaskItem[]>({
      data: {
        date: route.value.query?.date,
        chandao: route.value.query?.chandao
      }
    })
    list = data
  } catch (error) {
    console.log(error)
    return
  } finally {
    uni.hideLoading()
  }

  if (!list?.length) {
    return
  }

  for (const item of list) {
    tasks.push({
      id: item.id,
      name: decodeHtmlEntities(item.name),
      process: item.progress,
      lineCount: 1
    })
  }
}

const copy = () => {
  if (!tasks?.length) {
    uni.showToast({
      title: '请先添加当日任务',
      icon: 'none'
    })
    return
  }
  copyText(message.value)
  showPopup.value = true
}

const sendEmail = async () => {
  uni.showLoading({
    title: '正在发送邮件...'
  })
  try {
    const { data } = await emailApi.create({
      data: {
        date: route.value.query?.date,
        email: route.value.query?.email,
        content: message.value
      }
    })
    console.log(data)
    copyText(message.value)
    uni.hideLoading()
    uni.showModal({
      title: '邮件发送成功',
      content: '请等待快捷指令触发',
      showCancel: false
    })
  } catch (error) {
    uni.hideLoading()
  }
}

onMounted(() => {
  getTasks()
})

onShow(() => {})
</script>
<style lang="scss">
.small-title {
  font-size: 14px;
  color: #8f9ca2;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
}
::v-deep .uni-textarea-textarea {
  font-size: 16px;
  line-height: 24px;
  color: var(--u-primary);
  font-weight: 500;
}
</style>
