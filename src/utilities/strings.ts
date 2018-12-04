import { isString } from './is'

export const nameToInitials = (name: string = ''): string => {
  // Returning early if undefined to avoid casting undefined to "undefined"
  if (!name) {
    return ''
  }

  // Trim trailing whitespace
  name = (name + '').trim()
  if (!name.length) {
    return ''
  }

  const words = name
    .split(' ')
    .filter(w => w !== '')
    .map(w => w[0])
    .map(w => w.toUpperCase())

  return words.length === 1 ? words[0] : words[0] + words[words.length - 1]
}

export const isWordString = (word: string | any): boolean => {
  return !!(isString(word) && word.length)
}

export const isWord = (word: string | any): boolean => {
  return typeof word === 'number' || isWordString(word)
}

export const wordHasSpaces = (word: string | any): boolean => {
  return !!(isWordString(word) && word.trim().indexOf(' ') > 0)
}

// Source
// https://github.com/kahwee/truncate-middle
export const truncateMiddle = (
  word: string | any,
  startLen: number,
  endLen: number,
  ellip: string | any
): string => {
  if (!isWordString(word)) {
    return ''
  }
  const wordLen = word.length
  // Setting default values
  const frontLen = ~~startLen // will cast to integer
  const backLen = ~~endLen
  const truncateStr = ellip !== undefined ? ellip : '…'

  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= wordLen ||
    backLen >= wordLen ||
    frontLen + backLen >= wordLen
  ) {
    return word
  } else if (backLen === 0) {
    return word.slice(0, frontLen) + truncateStr
  } else {
    return word.slice(0, frontLen) + truncateStr + word.slice(wordLen - backLen)
  }
}

export const stripUrlPrefix = (url: string): string => {
  if (!isString(url)) return url
  return url.replace(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/g,
    ''
  )
}

export const newlineToHTML = (string: string): string => {
  return string.trim().replace(/\r?\n/g, '<br>')
}

/**
 * Fast way to repeat a string character.
 * @param   {string} pattern
 * @param   {number} count
 * @returns {string}
 */
export const repeat = (pattern: string, count: number): string => {
  if (count < 1) return ''
  let result = ''
  while (count > 1) {
    if (count & 1) {
      result += pattern
    }
    count >>= 1
    /* istanbul ignore next */
    if (count <= 0) break
    pattern += pattern
  }

  return result + pattern
}

/**
 * Camelcases a specified string.
 *
 * @param   {string} string The string.
 * @returns {string} The camelCased string.
 */
export const camelCase = (string: string): string => {
  return string
    .replace(/-/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    })
}
