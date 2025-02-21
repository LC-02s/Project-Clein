export interface CommonHTMLComponentParseData<TagName extends keyof React.JSX.IntrinsicElements> {
  tagName: TagName
  displayName: string
  component: React.FC<React.JSX.IntrinsicElements[TagName]>
}

export interface ContentMapper {
  [key: string]: string
}

export const parseHTMLContent = <K extends keyof React.JSX.IntrinsicElements>(
  content: string,
  targetComponents: Pick<CommonHTMLComponentParseData<K>, 'tagName' | 'displayName'>[],
  mapper?: ContentMapper,
) => {
  const mappedContent = mapper
    ? Object.entries(mapper).reduce((mapped, [key, value]) => {
        return mapped.replaceAll(`[{${key}}]`, value)
      }, content)
    : content

  return targetComponents.reduce((parsed, { tagName, displayName }) => {
    return parsed
      .replaceAll(`<${tagName}`, `<${displayName}`)
      .replaceAll(`</${tagName}>`, `</${displayName}>`)
  }, mappedContent)
}

export const getHTMLParseInterface =
  <K extends keyof React.JSX.IntrinsicElements>(key: K) =>
  (component: CommonHTMLComponentParseData<K>['component']): CommonHTMLComponentParseData<K> => ({
    tagName: key,
    displayName: key.charAt(0).toUpperCase() + key.slice(1),
    component,
  })
