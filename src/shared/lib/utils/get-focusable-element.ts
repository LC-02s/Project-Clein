export type FocusableElement =
  | HTMLAnchorElement
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLDetailsElement

const focusableElementSelector =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'

export const getFocusableElement = <E extends Element>(element: E | null) =>
  element?.querySelector<FocusableElement>(focusableElementSelector)

export const getFocusableElementAll = <E extends Element>(element: E | null) =>
  element?.querySelectorAll<FocusableElement>(focusableElementSelector)
