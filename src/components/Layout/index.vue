<template>
  <view class="rem:pb-[calc(env(safe-area-inset-bottom)+160px)]">
    <slot />
    <view class="tab-bar">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="tab-bar-item"
        @click="switchTab(item, index)">
        <image
          class="tab_img"
          mode="heightFix"
          :src="
            userInfo.tabIndex === index ? item.selectedIconPath : item.iconPath
          "></image>
        <view
          class="tab_text"
          :style="{
            color: userInfo.tabIndex === index ? selectedColor : color,
            fontWeight: userInfo.tabIndex === index ? 'bold' : 'normal'
          }">
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { pagePath } from '@/utils'
import { useUser } from '@/hooks/useUser'
import tab1 from '@/static/tabbar/tab1.png'
import tab2 from '@/static/tabbar/tab2.png'
import tab3 from '@/static/tabbar/tab3.png'
import tab4 from '@/static/tabbar/tab4.png'
import tab1Active from '@/static/tabbar/tab1_active.png'
import tab2Active from '@/static/tabbar/tab2_active.png'
import tab3Active from '@/static/tabbar/tab3_active.png'
import tab4Active from '@/static/tabbar/tab4_active.png'

import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate
} from '@/uni-simple-router'
const router = useRouter()
const route = useRoute()
const { updateUserInfo, userInfo } = useUser()
const color = ref('#666666')
const selectedColor = ref('#333333')
const list = ref([
  {
    pagePath: pagePath.INDEX,
    text: '首页',
    iconPath: tab1,
    selectedIconPath: tab1Active
  },
  {
    pagePath: pagePath.PROJECT_LIST,
    text: '我的项目',
    iconPath: tab2,
    selectedIconPath: tab2Active
  },
  {
    pagePath: pagePath.BOUNS_LIST,
    text: '貊币兑换',
    iconPath: tab3,
    selectedIconPath: tab3Active
  },
  {
    pagePath: pagePath.MINE,
    text: '我的',
    iconPath: tab4,
    selectedIconPath: tab4Active
  }
])
const switchTab = (item: any, index: number) => {
  if (item.pagePath !== route.value.fullPath) {
    updateUserInfo({ tabIndex: index })
    router.pushTab({ path: item.pagePath })
  }
}
// const index = computed(() =>
//   list.value.findIndex((item) => item.pagePath == route.value.fullPath)
// )
onMounted(() => {
  // if (route.value.fullPath != list.value[userInfo.value.tabIndex].pagePath) {
  //   switchTab(list.value[userInfo.value.tabIndex], userInfo.value.tabIndex)
  // }
})

watch(
  () => route.value.path,
  (n: string) => {
    const item = list.value.find((item) => item.pagePath == n)
    if (item) {
      const index = list.value.findIndex((item) => item.pagePath == n)
      updateUserInfo({ tabIndex: index })
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom); // 适配iphoneX的底部
  @apply bg-[#fafafb] rem:h-[calc(env(safe-area-inset-bottom)+140px)];
  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .tab_img {
      @apply rem:h-[48px] rem:w-[48px];
    }

    .tab_text {
      font-size: 22rpx;
      margin-top: 9rpx;
    }
  }
}
</style>
