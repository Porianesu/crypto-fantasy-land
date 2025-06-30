const homePageImages = import.meta.glob('../assets/images/home_page/**/*.png', {
  eager: true,
  import: 'default',
})

export default [
  ...Object.keys(homePageImages)
    .filter((key) => !key.includes('_mobile.png'))
    .map((key) => ({
      src: homePageImages[key],
    })),
]
