const themeDir = __dirname + '/../../';

const cssnano = require('cssnano')({
    preset: 'default',
});

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [themeDir]
    }),
    require('@tailwindcss/postcss'),
    require('autoprefixer')({
      path: [themeDir]
    }),
    ...(process.env.HUGO_ENVIRONMENT === 'production' ? [cssnano] : [])
  ]
}
