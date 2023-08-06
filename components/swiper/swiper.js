// components/swiper/swiper.js
var util = require('../../utils/util');
// setInterval(() => {
//   var DATE = util.formatTime(new Date());
//   console.log(DATE);
// }, 1000);
Component({

  /**
   * 页面的初始数据
   */
  properties: {
    mytime: {
      type: String,
      value: "好好"
    },
    swiperList:{
      type:Array,
      value:[]
    }
  },
  data: {
    // tabId:N
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(tabId);
    console.log(util.formatTime(new Date()));
    setInterval(() => {
      var DATE = util.formatTime(new Date());
      this.setData({
        mytime: DATE
      })
      // console.log(DATE);
    }, 1000);
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