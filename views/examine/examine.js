// views/examine/examine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsList:[
      {
        id:0,
        name:"上传巡检报告",
        navUrl:"./create/create"
      },
      {
        id:1,
        name:"修改巡检报告",
        navUrl:"./change/change"
      },
      {
        id:2,
        name:"删除巡检报告",
        navUrl:"./detele/detele"
      },
    ]
  },
  toReportPage(e){
    console.log(e.currentTarget.dataset.url);
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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