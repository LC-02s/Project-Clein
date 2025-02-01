export const extractImageType = (src: string) => {
  const extension = src.match(/\.(\w+)$/)?.[1]

  return extension && `image/${extension}`
}
