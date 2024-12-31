export function scrollToSection(hash: string) {
  const sectionEl = document.querySelector<HTMLElement>(decodeURI(hash))

  if (!sectionEl) return

  if (window.location.hash !== hash) {
    window.history.pushState({ top: sectionEl.offsetTop }, hash, hash)
  }

  window.scrollTo({ top: sectionEl.offsetTop, behavior: 'smooth' })
}

export function scrollToSectionFactor(
  href: string,
  handler?: React.MouseEventHandler<HTMLAnchorElement>,
) {
  const isHash = !!href && href.startsWith('#')

  return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isHash) {
      event.preventDefault()
      scrollToSection(href)
    }

    handler?.(event)
  }
}
