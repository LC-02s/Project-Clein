export interface ShareParams {
  title: string
  description: string
}

export const share = async ({ title, description }: ShareParams) => {
  try {
    await navigator.share({
      title,
      text: description,
      url: `${window.location.origin}${window.location.pathname}`,
    })

    return true
  } catch {
    return false
  }
}
