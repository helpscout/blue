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
  if (!string) {
    return ''
  }

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

// Taken from the React escapeTextForBrowser internal utility
const escapeHtmlRegExp = /["'&<>]/

/**
 * Escape HTML special characters in the string for output in the browser.
 *
 * @param {string} string
 * @returns {string}
 */
export const escapeHTML = (string: string): string => {
  if (!string) {
    return ''
  }

  const match = escapeHtmlRegExp.exec(string)

  if (!match) {
    return string
  }

  let escape
  let html = ''
  let index
  let lastIndex = 0

  for (index = match.index; index < string.length; index++) {
    switch (string.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;'
        break
      case 38: // &
        escape = '&amp;'
        break
      case 39: // '
        escape = '&#x27;'
        break
      case 60: // <
        escape = '&lt;'
        break
      case 62: // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += string.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + string.substring(lastIndex, index) : html
}

/**
 * The string form of a regular expression that would match all of the
 * letters, combining marks, and decimal number chars in the unicode character
 * set within a URL.
 */
const alphaNumericAndMarksChars = 'a-z0-9\\-+&@#/%=~_'

/**
 * Partial regex pattern to match the TLD of a domain.
 *
 * Maximum length for a TLD is currently 24 characters.
 * See: as shown in http://data.iana.org/TLD/tlds-alpha-by-domain.txt
 */
const tldPattern = '[a-z]{2,24}'

/**
 * Partial regex pattern to match the domain part of a URL without the subdomain.
 */
const domainPattern = '[a-z0-9-]+\\.' + tldPattern

/**
 * Partial regex pattern to match the path of a URL.
 */
const pathPattern =
  '(?:[/?#](?:[' +
  alphaNumericAndMarksChars +
  "\\(\\)|'$*\\[\\]?!:,.;]*[" +
  alphaNumericAndMarksChars +
  "|'$*\\[\\]])?)?)"

/**
 * Regex pattern to match a complete URL.
 */
const urlPattern =
  '(?:(?:(?:https?:\\/\\/(?:[a-z0-9-]+\\.)*)|(?:[a-z0-9-]+\\.)+)?' +
  domainPattern +
  pathPattern

/**
 * Regex pattern to match an email address.
 */
const emailPattern = "(?:\\b[a-z0-9._'%+-]+@[a-z0-9.-]+\\." + tldPattern + ')'

/**
 * @param {string} string
 *
 * @returns {string}
 */
export const convertLinksToHTML = (string: string): string => {
  if (!string) {
    return ''
  }

  return string
    .split(new RegExp(`(${urlPattern}|${emailPattern})`, 'gi'))
    .reduce((accumulator: string, value: string, index: number): string => {
      if (index % 2) {
        if (value.match(new RegExp(`^${emailPattern}$`, 'i'))) {
          // Matched an email
          return (
            accumulator +
            `<a href="mailto:${escapeHTML(value)}">${escapeHTML(value)}</a>`
          )
        }

        // Matched a URL
        let url = value

        if (url.match(new RegExp(`^${domainPattern}$`, 'i'))) {
          // Only matched a domain name (without subdomain)
          // Skip this as it could be the end/start of a sentence without whitespace.
          // For example with "Hello Tom.how are you?" we should not match "Tom.how"
          return accumulator + url
        }

        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          // Add http as the default scheme
          url = `http://${url}`
        }

        // Adding target blank and rel noopener for external links
        // See: https://developers.google.com/web/tools/lighthouse/audits/noopener
        return (
          accumulator +
          `<a href="${escapeHTML(
            url
          )}" target="_blank" rel="noopener">${escapeHTML(value)}</a>`
        )
      }

      return accumulator + escapeHTML(value)
    }, '')
}
