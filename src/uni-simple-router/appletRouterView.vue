<template>
  <view :class="defClass" :style="defStyle" v-if="routerViewIsRender">
    __dynamicImportComponent__
  </view>
</template>

<script>
import { defineComponent, computed, unref, watch } from 'vue'

import {
  routerAbstractRouteskey,
  viewDepthKey,
  instanceFindParentId,
  checkParentInstance
} from './index.mjs'

export default defineComponent({
  name: 'uniSimpleRouterView',
  components: {},
  props: {
    name: {
      default: 'default',
      type: String
    },
    defClass: {
      type: String,
      default: ``
    },
    defStyle: {
      type: [String, Object],
      default: ``
    }
  },
  inject: {
    injectedRoutes: {
      from: routerAbstractRouteskey
    },
    injectedDepth: {
      from: viewDepthKey,
      default: 1
    }
  },
  provide() {
    return {
      [viewDepthKey]: computed(() => this.depth + 1)
    }
  },
  data() {
    return {
      // 节点是否渲染
      routerViewIsRender: false
    }
  },
  computed: {
    currentRoute() {
      const router = this.$Router
      const instance = this.$
      const _parentId = instanceFindParentId(router, instance)
      return unref(this.injectedRoutes)[_parentId]
    },
    depth() {
      const initialDepth = unref(this.injectedDepth)
      return initialDepth
    },
    includeCom() {
      if (this.currentRoute) {
        return this.currentRoute.matched
          .map((it) => {
            return it.record.components[this.name].componentName
          })
          .reverse()
      }
      return []
    }
  },
  created() {
    /**
     * 不写在setup中 因为在小程序下很多属性uni-app没有构建完成
     * 这绝对是开发人员的问题 痛心的
     */
    const route = this.$Route

    watch(route, () => this.renderRouterView())

    this.renderRouterView()
  },
  methods: {
    renderRouterView() {
      const router = this.$Router
      const instance = this.$

      if (this.currentRoute) {
        const unrefCurrentRoute = this.currentRoute
        const reverseLength = unrefCurrentRoute.matched.length - 1 - this.depth
        const { record, parentMatcher } =
          unrefCurrentRoute.matched[reverseLength] || {}
        if (record) {
          const isRender = checkParentInstance(
            router,
            unrefCurrentRoute,
            instance
          )
          // 顶级页面由uni-app去渲染 二级页面才由插件渲染
          if (parentMatcher != null && isRender) {
            this.routerViewIsRender = true
            return true
          }
        }
      }
      this.routerViewIsRender = false
    },
    // 更新子组件实例引用
    updateComponentInstances(vInstance, componentName) {
      const router = this.$Router
      const viewName = this.name
      const matcherList = this.currentRoute.matched.filter((it) => {
        return it.record.components[viewName].componentName === componentName
      })
      if (matcherList.length === 0) {
        return
      }
      const {
        record: { _selfId }
      } = matcherList[0]
      vInstance
        ? router.utils.setComponentInstances(router, _selfId, {
            [viewName]: vInstance
          })
        : router.utils.removeComponentInstances(router, _selfId, viewName)
    }
  }
})
</script>