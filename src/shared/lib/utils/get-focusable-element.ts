export type FocusableElement =
  | HTMLAnchorElement
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLDetailsElement

const focusableElementSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'

export function getFocusableElement<E extends Element>(element: E | null) {
  return element?.querySelector<FocusableElement>(focusableElementSelector)
}

export function getFocusableElementAll<E extends Element>(element: E | null) {
  return element?.querySelectorAll<FocusableElement>(focusableElementSelector)
}
