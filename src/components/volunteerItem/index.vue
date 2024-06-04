<template>
  <view
    @click="navDetail"
    class="flex w-full border-[#CECCCA] pb-2 pt-4 rem:border-b-[2px]">
    <view
      class="relative overflow-hidden rounded-lg rem:h-[180px] rem:w-[180px]">
      <!-- 招募结束判断依据：当前时间大于招募结束时间 || 招募人数到达上限 -->
      <view
        v-if="isOver || item.activityUserNum >= item.recruitNum"
        class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-70 text-center text-white">
        <text class="font-bold text-sm tracking-wider text-white">
          招募结束
        </text>
      </view>
      <image
        class="h-full w-full"
        :src="validProjectImageUrl(item?.smallPic)"
        mode="aspectFill"
        lazy-load="false"></image>
    </view>
    <view class="flex flex-1 flex-col justify-between overflow-hidden px-2">
      <!-- <p class="line-clamp-2 text-base font-[500]">这里是项目的标题</p> -->
      <p class="line-clamp-2 text-sm font-[500] text-black">
        {{ item.activityName }}
      </p>
      <view class="w-full text-sm font-light text-gray-600">
        <view>
          <text>招募进展：</text>
          <text class="font-normal text-[var(--u-primary)]">
            {{ item.activityUserNum }}
          </text>
          <text>/{{ item.recruitNum }}</text>
        </view>
        <view>
          <text>招募截止时间：</text>
          <text>{{ item.endTimeStr }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { imageUrls } from '@/utils/constants'
import { useRoute, useRouter, onBeforeRouteLeave } from '@/uni-simple-router'
import { getDatas } from '@/utils'
import { useCommonHooks } from '@/hooks/useCommonHooks'
const { validProjectImageUrl } = useCommonHooks()
interface Props {
  item: NetWorkType.ProjectItem
}
const props = defineProps<Props>()

const router = useRouter()

const navDetail = () => {
  router.push({ name: 'volunteerDetail', query: { id: props.item.id } })
}
const isOver = computed(() => {
  const time =
    getDatas(props.item.endTimeStr + ' 23:59:59').getTime() -
      new Date().getTime() <
    0
  return time
})
</script>
