//默认头像
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp().globalData
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //确认用户之前是否登录过
    hadUserInfo: false,
    //登录界面的显示
    loginShowTip: false,
    //用户的数据
    userinfo: {
      //用户呢称
      name: "",
      //头像链接
      nickavatarUrl: defaultAvatarUrl
    },
    //用户所选的头像
    nickavatarUrl: defaultAvatarUrl,
    //用户所填写的呢称
    username: "",
    workIcon: [{
        id: 0,
        url: "../../images/mine/Pendingapproval.svg",
        name: "待审批"
      },
      {
        id: 1,
        url: "../../images/mine/Passed.svg",
        name: "已通过"
      },
      {
        id: 2,
        url: "../../images/mine/Refused.svg",
        name: "未通过"
      },
      {
        id: 3,
        url: "../../images/mine/All.svg",
        name: "全部"
      },
    ],
    otherworkIcon: [{
      id: 0,
      url: "/../../images/mine/repair.svg",
      navurl: "./repair/repair",
      name: "我的报修"
    }, {
      id: 1,
      url: "/../../images/mine/help.svg",
      navurl: "./help/help",
      name: "帮助"
    }, {
      id: 2,
      url: "/../../images/mine/manage.svg",
      navurl: "./manage/manage",
      name: "用户管理"
    }, {
      id: 3,
      url: "/../../images/mine/person.svg",
      navurl: "./person/person",
      name: "个人资料"
    }, ]
  },
  //查询用户信息是否存在
  queryUserInfo() {
    let that = this
    db.collection('userinfo').where({
      _openid: app.openId // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      if (res.data.length === 0) {
        that.setData({
          hadUserInfo: false
        })
      } else {
        that.setData({
          hadUserInfo: true
        })
      }
      console.log(that.data.hadUserInfo);
    })
  },
  //检查用户是否登录
  checkIsLogin() {
    let that = this
    if (app.isLogin) {
      that.setData({
        loginShowTip: false
      })
      return true
    } else {
      that.setData({
        loginShowTip: true
      })
      return false
    }
  },
  //登录界面修改呢称触发
  input_name(e) {
    let that = this
    console.log(e.detail.value);
    that.setData({
      username: e.detail.value
    })
    // console.log(that.data.hadUserInfo);

  },
  //更新数据
  updataUserinfo() {
    let that = this
    //调用更新云函数
    wx.cloud.callFunction({
      name: 'updataUserInfo',
      data: {
        username: that.data.userinfo.name,
        openid: app.openId,
        nickavatarUrl: that.data.userinfo.nickavatarUrl
      },
      complete: res => {
        console.log(res, "调用更新函数");
      },
      success: res => {
        console.log(res.result.isCreate);
        //更新完成后，设置已登录
        if (res.result.isCreate === 1) {
          app.isLogin = true
        }
      }
    })
  },
  //添加数据
  addUserinfo() {
    let that = this
    wx.cloud.callFunction({
      name: 'createUserInfo',
      data: {
        username: that.data.userinfo.name,
        openid: app.openId,
        nickavatarUrl: that.data.userinfo.nickavatarUrl
      },
      complete: res => {
        console.log(res, "调用添加云函数");
      },
      //添加完成后，设置已登录
      success: res => {
        console.log(res);
        app.isLogin = true

      }
    })
  },
  //登录页面登录按钮触发
  login(e) {
    let that = this
    that.setData({
      userinfo: {
        name: that.data.username,
        nickavatarUrl: that.data.nickavatarUrl
      },
    })
    if (that.data.hadUserInfo === true) {
      that.updataUserinfo()
    } else {
      that.addUserinfo()
    }
    that.setData({
      loginShowTip: false
    })
  },
  //取消登录
  cancelLogin(e) {
    let that = this
    //隐藏登录界面
    that.setData({
      nickavatarUrl: defaultAvatarUrl,
      username: "",
      loginShowTip: false
    })
  },
  //修改用户头像触发
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      nickavatarUrl: avatarUrl
    })
  },
  //进入业务界面
  toWorkPage(e) {
    let that = this
    //登录后才能进入
    if (that.checkIsLogin()) {
      //传递点击的业务
      let key = e.currentTarget.dataset['from']
      wx.navigateTo({
        url: `./work/work?title=${key}`,
        events: e,
        routeType: 'routeType',
        success: (result) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    that.queryUserInfo()

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