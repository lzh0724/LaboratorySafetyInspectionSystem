// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cslg-sys-4gwkot7s23b09200"
}) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let name = event.name
  let articleclass = event.class
  let deleted = ""
  //添加数据到数据库
    await db.collection('article-list').where({
      name: name,
      class:articleclass
    }).remove().then(res=>{
      deleted = "已删除了" +res.stats.removed.toString()+"条相关数据"
    })
  return {
    event,
    openid: wxContext.OPENID,
    deleted
  }
}