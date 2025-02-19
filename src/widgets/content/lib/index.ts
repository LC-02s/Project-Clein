export interface CommonHTMLComponentParseData<TagName extends keyof React.JSX.IntrinsicElements> {
  tagName: TagName
  displayName: string
  component: React.FC<React.JSX.IntrinsicElements[TagName]>
}

export const parseHTMLContent = <K extends keyof React.JSX.IntrinsicElements>(
  content: string,
  targetComponents: Pick<CommonHTMLComponentParseData<K>, 'tagName' | 'displayName'>[],
) => {
  return targetComponents.reduce((parsed, { tagName, displayName }) => {
    return parsed
      .replaceAll(`<${tagName}`, `<${displayName}`)
      .replaceAll(`</${tagName}>`, `</${displayName}>`)
  }, content)
}

export const getHTMLParseInterface =
  <K extends keyof React.JSX.IntrinsicElements>(key: K) =>
  (component: CommonHTMLComponentParseData<K>['component']): CommonHTMLComponentParseData<K> => ({
    tagName: key,
    displayName: `${key.charAt(0).toUpperCase() + key.slice(1)}Component`,
    component,
  })
