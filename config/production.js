module.exports = {
  dbBusiness: {
    options: {
      host: '10.0.0.7:27017,10.0.0.8:27017,10.0.0.9:27017',
      user: 'yedian',
      pass: 'yeDianFuWuman123TiAnxia'
    },
    database: 'production-business'
  },
  micro_node: {
    venues_core: 'http://10.0.0.11:3007',
    cms_core: 'http://10.0.0.11:3008',
    user_mgt: 'http://10.0.0.6:4000'
  },
  // 短信发送接口地址
  smsYd: 'http://10.0.0.11:3001'
}
