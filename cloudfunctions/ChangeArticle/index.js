// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cslg-sys-4gwkot7s23b09200"
}) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let _id = event.id
  let list = event.list
  let openid = event.openid
  let articleclass
  let local
  let name
  let number
  for (let index = 0; index < list.length; index++) {
    switch (list[index].key) {
      case "class":
        articleclass = list[index].value;
        break;
      case "local":
        local = list[index].value;
        break;
      case "name":
        name = list[index].value;       
        break;
      case "number":
        number = list[index].value;   
        break;
      default:
        break;
    }
    
  }
  //添加数据到数据库
    await db.collection('article-list').where({
      _id:_id
    }).update({
      data: {
        class:articleclass,
        name:name,
        local:local,
        number:number,
        detailsInfo:list,
        _openid:openid
      }
    })
  return {
    event,
    openid: wxContext.OPENID
  }
}