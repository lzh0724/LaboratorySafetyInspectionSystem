const cloud = require('wx-server-sdk');

cloud.init({
  env: "cslg-sys-4gwkot7s23b09200"
});
const db=cloud.database();

// 获取轮播图列表云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();
  let swiperList = []
  //获取前十个轮播图数据
  swiperList = db.collection("swiper-img-list").limit(10).get()
  console.log(swiperList,"swiperListswiperList");
  return swiperList ;
};

