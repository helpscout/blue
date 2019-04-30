/**
 * Removes style tags from the <head> and resets styled StyleSheets.
 */
export const resetStyles = () => {
  document.head.innerHTML = ''
}

/**
 * Gets the styles of an HTML element.
 *
 * @param   {HTMLElement} el
 * @returns {object}
 */
export const getCSS = (el: HTMLElement) => el && window.getComputedStyle(el)

/**
 * Gets a specific CSS property from an element
 *
 * @param   {HTMLElement} el
 * @param   {string} prop
 * @returns {string}
 */
export const getCSSProp = (el: HTMLElement, prop?: string) => {
  return prop ? getCSS(el)[prop] : ''
}
