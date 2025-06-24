const images = import.meta.glob('../assets/images/home_page/*.png', {
  eager: true,
  import: 'default',
})

export default [
  ...Object.keys(images).map((key) => ({
    src: images[key],
  })),
]
