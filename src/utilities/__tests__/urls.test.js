import { normalizeUrl } from '../urls'

describe('normalizeUrl', () => {
  test('returns an empty string if nothing is provided', () => {
    expect(normalizeUrl()).toEqual('')
  })
  test('Adds the "http://" scheme if necessary', () => {
    const urls = [
      ['www.example.com', 'http://www.example.com'],
      ['http://www.example.com', 'http://www.example.com'],
      ['https://www.example.com', 'https://www.example.com'],
    ]

    urls.forEach(fixture => {
      expect(normalizeUrl(fixture[0])).toEqual(fixture[1])
    })
  })
})
