module.exports = {
  dbBusiness: {
    options: {
      host: 'dev-mongo.chinaeast.cloudapp.chinacloudapi.cn',
      port: 27017,
      user: 'yedian',
      pass: 'wZ6He]k9sZ'
      // ssl: true
    },
    database: 'dev-business'
  },
  dbUserMGT: {
    options: {
      host: 'stagingmysql1.mysqldb.chinacloudapi.cn',
      port: 3306,
      user: 'stagingmysql1%staging',
      pass: 'agargh2IUHiu'
      // ssl: true
    },
    database: 'yedian-origin'
  },
  micro_node: {
    venues_core: 'http://venuescore.dev.ye-dian.com',
    cms_core: 'http://staging-api.chinacloudapp.cn:3008',
    user_mgt: 'http://dev-yedian.chinacloudapp.cn:4000'
  },
  // 短信发送接口地址
  smsYd: 'http://staging-api.chinacloudapp.cn:3001'
}
