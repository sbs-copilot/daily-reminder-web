/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string
  readonly VITE_BASE_URL: string
  readonly VITE_HOST: string
  readonly VITE_DISCORD: string
  readonly VITE_SHOW_VCONSOL: boolean
  readonly VITE_META_KEYWORDS: string
  readonly VITE_META_DESCRIPTION: string
  readonly VITE_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "uview-plus"

declare module "uview-plus" {
  global {
    interface Uni {
      $u: any
    }
  }
}


declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
