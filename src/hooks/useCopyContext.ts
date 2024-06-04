// import {useI18n} from "@/hooks/useI18n"

interface CopyText {
  copyText: (text: string, onSucceed?: (s: string) => void) => void
}

export function useCopyText(): CopyText {
  // const {t} = useI18n()

  const copyText = (text: string, onSucceed?: (s: string) => void): void => {
    // #ifdef H5
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.readOnly = true
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, text.length)
    // uni.showToast({
    //   title: 'Copied!!',
    //   icon: 'success'
    // })
    document.execCommand('copy')
    textarea.remove()
    // #endif
    // #ifndef H5
    uni.setClipboardData({
      data: text,
      success: () => {
        if (onSucceed) {
          onSucceed(text)
        }
        // uni.showToast({
        //   title: '复制成功',
        //   icon: 'success'
        // })
      }
    })
    // #endif
  }

  return {
    copyText
  }
}
