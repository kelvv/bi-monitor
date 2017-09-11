
class DefaultTask {
  constructor () {
    // Cron Syntax String : */5 * * * * * (pre 5 seconds)
    this.cycleStr = '*/5 * * * * *'
  }

  job () {
    console.log('HeartBeat')
    console.log(process.env.NODE_ENV)
  }
}

module.exports = DefaultTask
