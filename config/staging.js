module.exports = {
  dbBusiness: {
    options: {
      host: '10.0.0.23:27017,10.0.0.26:27017,10.0.0.17:27017',
      user: 'yedian',
      pass: 'yedian'
    },
    database: 'staging-business'
  },
  micro_node: {
    venues_core: 'http://10.0.0.14:3007',
    cms_core: 'http://10.0.0.14:3008',
    user_mgt: 'http://10.0.0.27:4000'
  },
  // 短信发送接口地址
  smsYd: 'http://10.0.0.14:3001'
}
