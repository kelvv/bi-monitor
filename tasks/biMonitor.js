const webHandler = require('../utils/webHandler')
const lodash = require('lodash')

class DefaultTask {
  constructor () {
    // Cron Syntax String : */5 * * * * * (pre 5 seconds)
    this.cycleStr = '*/30 * * * * *'
  }

  async job () {
    let map = [
      {
        name: 'eth',
        exName: 'eth',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=ETHCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'zec',
        exName: 'zec',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=ZECCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'ltc',
        exName: 'ltc',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=LTCCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'bcc',
        exName: 'bcc',
        priceMath: async () => {
          return parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=BCCCNY')).data.ticker.last)
        },
        path: '微比特 -> b网 -> 微比特'
      },
      {
        name: 'bts',
        exName: 'bts',
        priceMath: async () => {
          return (await webHandler.Get('https://www.jubi.com/api/v1/ticker?coin=bts')).last
        },
        path: '聚币 -> b网 -> 微比特'
      },
      {
        name: 'xrp',
        exName: 'XRP',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=xrp&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'dog',
        exName: 'DOGE',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=dog&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'xlm',
        exName: 'XLM',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=xlm&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'nxt',
        exName: 'NXT',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=nxt&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'ardr',
        exName: 'ARDR',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=ardr&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'blk',
        exName: 'BLK',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=blk&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'xem',
        exName: 'XEM',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=xem&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'dash',
        exName: 'DASH',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=dash&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'xzc',
        exName: 'XZC',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=xzc&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'sys',
        exName: 'SYS',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=sys&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      },
      {
        name: 'ppc',
        exName: 'PPC',
        priceMath: async () => {
          return (await webHandler.Get('http://api.btc38.com/v1/ticker.php?c=ppc&mk_type=cny')).ticker.last
        },
        path: '比特时代 -> b网 -> 微比特'
      }
    ]

    console.log('当前时间：' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())

    let result = []

    for (let bi of map) {
      try {
        let btcToeth = (await webHandler.Get(`https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-${bi.exName}`)).result[0].Last
        let ethPrice = await bi.priceMath()
        let btcPrice = parseInt((await webHandler.Get('https://api.viabtc.com/v1/market/ticker?market=BTCCNY')).data.ticker.last)

        result.push({
          msg: `${bi.name}搬砖利润:` + ((((2000 / ethPrice) * 0.99 * btcToeth - 0.001) * btcPrice - 2000) / 2000 * 100).toFixed(2) + '%' + '      路径：' + bi.path,
          price: ((((2000 / ethPrice) * 0.99 * btcToeth - 0.001) * btcPrice - 2000) / 2000 * 100).toFixed(2)
        })
      } catch (err) {
        console.log(err)
      }
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
