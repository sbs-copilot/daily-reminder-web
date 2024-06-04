<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
// import { pagePath } from '@/utils'
// import { useRoute, useRouter } from './uni-simple-router'
const { updateUserInfo } = useUser()
onLaunch(() => {
  console.log('App Launch')
  updateUserInfo({ tabIndex: 0 })
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@mixin light {
  --u-primary: #3975c6;
  --u-bg-gray: #f7f7f7;
}
@mixin dark {
  --u-primary: #3975c6;
  --u-bg-gray: #f7f7f7;
}
@media (prefers-color-scheme: light) {
  :root,
  page {
    @include light;
  }
}
@media (prefers-color-scheme: dark) {
  :root,
  page {
    @include light;
  }
}

page {
  @apply bg-white;
}
/* .uni-page-head .uni-page-head__title {
  font-size: 100rpx !important;
} */
</style>
