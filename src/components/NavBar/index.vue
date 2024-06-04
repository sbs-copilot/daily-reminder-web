<template>
  <view class="nav_bar_box" id="nav">
    <u-navbar
      title=""
      :rightIcon="''"
      :leftIcon="''"
      :bgColor="bgColor"
      safeAreaInsetTop
      :autoBack="false"
      :fixed="fixed"
      :height="onlyStatusBar ? 0 : '44px'"
      :placeholder="placeholder">
      <template #left>
        <view
          class="flex items-center justify-end font-medium text-[#000000] rem:text-[36px]"
          v-if="!showBack">
          {{ leftTitle }}
        </view>
        <image
          src="@/static/back.png"
          class="rem:h-[60px] rem:w-[60px]"
          mode="scaleToFill"
          @click="back"
          lazy-load="false"
          v-else></image>
      </template>
      <template #center>
        <view class="flex items-center justify-end font-medium rem:text-[36px]">
          <text :class="titleClass">{{ title }}</text>
        </view>
      </template>
    </u-navbar>

    <u-overlay :show="show" @click="closeOverlay"></u-overlay>
  </view>
</template>
<script lang="ts"></script>
<script setup lang="ts">
import { toRefs, ref, computed, watch, getCurrentInstance } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from '@/uni-simple-router'

const appInstance = getCurrentInstance()?.proxy

// export default {
//   options: {
//     styleIsolation: 'shared' //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
//   }
// }

const router = useRouter()

const route = useRoute()

function getData<T>(a: T extends Date ? never : T) {}
getData('')

interface Emits {
  (e: 'update:navBarHeight', value: number): void
}

interface Props {
  placeholder: boolean
  bgColor: string
  showBack: boolean
  fixed?: boolean
  onlyStatusBar?: boolean
  title?: string
  titleClass?: string
  leftTitle?: string
  navBarHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  bgColor: '#000000',
  showBack: false,
  fixed: true
})
const { placeholder } = toRefs(props)

const emit = defineEmits<Emits>()

const lastRoute = ref({ path: '', navType: '' })

const navHeight = computed({
  get: () => {
    return props.navBarHeight
  },
  set: (val) => {
    emit('update:navBarHeight', val)
  }
})

const show = ref<boolean>(false)

onMounted(() => {
  nextTick(() => {
    getNavHeight()
  })
})

const back = () => {
  const pages = getCurrentPages()
  if (pages.length == 1) {
    // console.log('lastRoute.value==', lastRoute.value)
    if (lastRoute.value.navType == 'pushTab' && lastRoute.value.path) {
      router.pushTab({ path: lastRoute.value.path })
    } else {
      router.pushTab({ path: '/pages/index/index' })
    }
  } else {
    router.back(-1)
  }
}
watch(
  () => route.value.path,
  (n, o) => {
    if (route.value.navType == 'pushTab') {
      lastRoute.value = { path: o, navType: 'pushTab' }
    } else {
      lastRoute.value = { path: '', navType: route.value.navType }
    }
  }
)

const closeOverlay = () => {
  show.value = false
}

const customIndex = computed(() => (show.value ? '10000000' : '11'))

const getNavHeight = () => {
  const query = uni.createSelectorQuery().in(appInstance)
  query
    .select('#nav')
    .boundingClientRect((data) => {
      // 获取子组件的boundingClientRect信息
      navHeight.value = data.height * 3
    })
    .exec()
}
</script>
<style lang="scss" scoped>
.rotation_custom {
  @apply rotate-[180];
}

::v-deep .u-navbar--fixed {
  /* z-index: v-bind(customIndex) !important; */
  @apply z-[v-bind(customIndex)] md:flex md:flex-col md:items-center;
}

::v-deep .u-navbar__content {
  @apply md:rem:w-[750px];
}
</style>
