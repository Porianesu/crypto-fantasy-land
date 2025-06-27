const breakPoint = 1280 // Define your breakpoint in pixels
export const GsapMediaQueryCondition = {
  isDesktop: `(min-width: ${breakPoint}px)`,
  isMobile: `(max-width: ${breakPoint - 1}px)`,
  reduceMotion: '(prefers-reduced-motion: reduce)',
}

export type GsapMediaQueryConditionType = {
  isDesktop: boolean
  isMobile: boolean
  reduceMotion: boolean
}
