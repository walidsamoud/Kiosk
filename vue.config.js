module.exports = {
  publicPath: '/',
  devServer: {
    proxy: 'http://api-staging.liberrex.com/',
  }
}