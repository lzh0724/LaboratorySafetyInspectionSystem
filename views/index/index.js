// views/index/index.js
const db = wx.cloud.database();
const app = getApp().globalData
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsList: [
      {
        id: 0,
        url: "../../images/index/asset.svg",
        name: "物资",
        Taburl: "../asset/asset"
      },
      {
        id: 1,
        url: "../../images/index/notice.svg",
        name: "公告",
        Taburl: "../notice/notice"
      },
      {
        id: 2,
        url: "../../images/index/person.svg",
        name: "通讯录",
        Taburl: "../person/person"
      },
      {
        id: 3,
        url: "../../images/index/datehistory.svg",
        name: "校历",
        Taburl: "../datehistory/datehistory"
      },
      {
        id: 4,
        url: "../../images/index/examine.svg",
        name: "审批",
        Taburl: "../examine/examine"
      },
      {
        id: 5,
        url: "../../images/index/repair.svg",
        name: "报修",
        Taburl: "../repair/repair"
      },
      {
        id: 6,
        url: "../../images/index/help.svg",
        name: "帮助",
        Taburl: "../help/help"
      },
      {
        id: 7,
        url: "../../images/index/about.svg",
        name: "关于",
        Taburl: "../about/about"
      },
    ]
  },
  //切换页面
  ShiftTab(e) {
    //e.currentTarget.dataset['taburl']为传来的url地址
    console.log(e.currentTarget.dataset['taburl']);
    let url = e.currentTarget.dataset['taburl']
    wx.navigateTo({
      url: url
    })
  },
  getswiper() {
    let that = this
    console.log(this.data.swiperList);
  },
  //从数据库获取轮播图列表
  getSwiperImagesList() {
    let that = this
    wx.cloud.callFunction({
      name: 'GetSwiperImagesList',
      complete: res => {
        console.log(res.result.data, "调用云函数");
      },
      success: res => {
        let swiperList = [...res.result.data]
        that.setData({
          swiperList: swiperList
        })
      }
    })
  },
  //获取用户openid
  getOpenId() {
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log(res.result.userInfo.openId, "调用云函数");
      },
      success: res => {
        app.openId = res.result.userInfo.openId
        console.log(app.openId);
      }
    })
  },
  //时间更新
  updataTime() {
    let that = this
    setInterval(() => {
      var DATE = util.formatTime(new Date());
      that.setData({
        mytime: DATE
      })
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    let swiperList = []
    //调用获取轮播图列表云函数
    that.getSwiperImagesList()
    //调用获取用户openid云函数
    that.getOpenId()
    //定时器，每一定时间更新数据
    that.updataTime()
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
    console.log(this.data.swiperList);
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