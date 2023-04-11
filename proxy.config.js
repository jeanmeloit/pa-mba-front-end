const proxy = [
  {
    context: '/api',
    target: 'https://api-dev.ops.equiplano.com.br',
    pathRewrite: { '^/api': '' },
  },
]
module.exports = proxy
