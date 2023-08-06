// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cslg-sys-4gwkot7s23b09200"
}) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let username = event.username
  let openid = event.openid
  let nickavatarUrl = event.nickavatarUrl
  //添加数据到数据库
    await db.collection('userinfo').add({
      data: {
        name: username,
        nickavatarUrl: nickavatarUrl,
        _openid:openid
      }
    })
  return {
    event,
    openid: wxContext.OPENID
  }
}