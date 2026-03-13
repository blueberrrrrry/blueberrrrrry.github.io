const DEFAULT_OFFSET = 0

export const scrollToSectionWithOffset = (selector: string, extraOffset = DEFAULT_OFFSET) => {
  const element = document.querySelector(selector)
  if (!element) return false

  const header = document.querySelector('header')
  const headerHeight = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0

  const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: 'smooth'
  })

  return true
}
