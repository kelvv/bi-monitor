const webHandler = require('../utils/webHandler')
const lodash = require('lodash')

class DefaultTask {
  constructor () {
    // Cron Syntax String : */5 * * * * * (pre 5 seconds)
    this.cycleStr = '*/10 * * * * *'
  }

  async job () {
    let map = [
      {
        name: 'eth',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=ETHCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'zec',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=ZECCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'ltc',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=LTCCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'bcc',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=BCCCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'bts',
        priceMath: async () => {
          console.log((await webHandler.Get('https://www.jubi.com/api/v1/ticker?coin=bts')).last)
          return (await webHandler.Get('https://www.jubi.com/api/v1/ticker?coin=bts')).last
        },
        path: '聚币 -> b网 -> 微比特'
      }
    ]

    console.log('当前时间：' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())

    let result = []

    for (let bi of map) {
      let btcToeth = (await webHandler.Get(`https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-${bi.name}`)).result[0].Last
      let ethPrice = await bi.priceMath()
      let btcPrice = parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=BTCCNY')).data.ticker.last)
      result.push({
        msg: `${bi.name}搬砖利润:` + ((((btcToeth * btcPrice) - ethPrice) / ethPrice) * 100).toFixed(2) + '%' + '      路径：' + bi.path,
        price: ((((btcToeth * btcPrice) - ethPrice) / ethPrice) * 100).toFixed(2)
      })
    }
    result = lodash.sortBy(result, 'price').reverse()

    for (let r of result) {
      console.log(r.msg)
    }

    console.log(`
    
    `)
  }
}

module.exports = DefaultTask
