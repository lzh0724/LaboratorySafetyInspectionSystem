// views/asset/details/details.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsInfo:[],
    receiveBottomIcon:[
      {
        id:0,
        url:"/../../../images/assset/into-inventory.svg",
        title:"入库"
      },
      {
        id:1,
        url:"/../../../images/assset/out-inventory.svg",
        title:"出库"
      },
      {
        id:2,
        url:"/../../../images/assset/receive.svg",
        title:"采购"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    console.log(options.title);
    that.setData({
      key:options.title
    })
    db.collection('article-list').where({
      name:options.title
    }).get().then(res=>{
      console.log(res.data[0]);
      that.setData({
        detailsInfo:res.data[0].detailsInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})