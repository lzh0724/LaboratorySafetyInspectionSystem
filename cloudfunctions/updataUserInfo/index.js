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
  console.log(event);
  let isCreate = "未赋值"
  //若填写了名称，则进行更新
  if (username != "") {
    await db.collection('userinfo').where({
      _openid: openid
    }).update({
      data: {
        name: username,
        nickavatarUrl: nickavatarUrl
      }
    }).then(res =>{
      console.log(res);
      //将更新结果赋值到变量
      isCreate = res.stats.updated
    })
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    isCreate:isCreate
  }
}