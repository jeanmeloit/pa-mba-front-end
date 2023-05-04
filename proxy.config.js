const proxy = [
  {
    context: '/api',
    target: 'https://api-dev.ops.panther-ds.com.br',
    pathRewrite: { '^/api': '' },
  },
]
module.exports = proxy
