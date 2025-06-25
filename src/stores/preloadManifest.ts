const homePageImages = import.meta.glob('../assets/images/home_page/**/*.png', {
  eager: true,
  import: 'default',
})

export default [
  ...Object.keys(homePageImages).map((key) => ({
    src: homePageImages[key],
  })),
]
