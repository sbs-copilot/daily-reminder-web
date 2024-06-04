import {
  createRouter,
  // type platformRule,
  __dynamicImportComponent__
} from '@/uni-simple-router'

const router = createRouter({
  platform: 'h5',
  // hotRefresh: {
  //   mode: 'development',
  //   to: `/pages/login/index`,
  //   navType: 'pushTab'
  // },
  routeNotFound(to) {
    return {
      name: `404`
    }
  },
  routes: [
    {
      path: `/`,
      name: 'home',
      component: __dynamicImportComponent__(`@/pages/index/index.vue`, {
        pageType: `top`,
        style: {
          navigationBarTitleText: '👻日报小助手',
          navigationStyle: 'custom',
          enablePullDownRefresh: false
        }
      })
    }
  ]
})

router.beforeEach((to, from) => {
  // console.log('77777777', to)
  // if (to.name == 'home') {
  //   return { path: '/login' }
  // }
  // fetch("/static/version.json?_=" + Math.random())
  //   .then((response) => response.json())
  //   .then((json) => {
  //     const version = document.getElementById("html")?.getAttribute("version")
  //     if (
  //       version &&
  //       json.version != version &&
  //       json.version &&
  //       import.meta.env.VITE_USER_NODE_ENV == "production"
  //     ) {
  //       window.location.reload()
  //     }
  //   })
  //   .catch((err) => console.log(err))
})

export default router
