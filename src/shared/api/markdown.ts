import { Exception } from './exception'

export const getMarkdownContent = async (path: string) => {
  const reference = new URL(`/docs/${path}/content.md`, process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!)
  const response = await fetch(reference)

  if (!response.ok) {
    throw new Exception('요청하신 글을 찾을 수 없어요')
  }

  return await response.text()
}
