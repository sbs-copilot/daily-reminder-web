export const useCommonHooks = () => {
  const validImageUrl = computed(() => {
    return (url: string | undefined | null, defaultUrl: string) => {
      return url && url.startsWith('http') ? url : defaultUrl
    }
  })
  return {
    validImageUrl
  }
}
