const withImages = require('next-images')
const path = require('path')

module.exports = withImages({
  sassOptions: {
      includePaths: [path.join(__dirname, 'assets/styles')],
  },
  images: {
    loader: 'imgix',
    path: '/',
    disableStaticImages: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
})