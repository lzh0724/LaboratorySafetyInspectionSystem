// views/asset/asset.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tabbariconList: [{
        id: 0,
        title: "库存",
        iconUrl: "../../images/assset/inventory.svg",
        iconUrlActive: "../../images/assset/inventory-active.svg"
      },
      {
        id: 1,
        title: "申领",
        iconUrl: "../../images/assset/receive.svg",
        iconUrlActive: "../../images/assset/receive-active.svg"
      },
      {
        id: 2,
        title: "管理",
        iconUrl: "../../images/assset/manage.svg",
        iconUrlActive: "../../images/assset/manage-active.svg",
        Navurl: "./assetmanages/assetmanages"
      },
    ],
    articleList: [],
    inventoryItemIconList: [{
        id: 0,
        url: "../../images/assset/into-inventory.svg",
        name: "入库"
      },
      {
        id: 1,
        url: "../../images/assset/out-inventory.svg",
        name: "出库"
      },
      {
        id: 2,
        url: "../../images/assset/receive-in-inventory.svg",
        name: "申领"
      },
    ],
    searchvalue: ""
  },
  onBindSearch(e) {
    let that = this
    let list = []
    that.setData({
      searchvalue: e.detail
    })
    if (that.data.searchvalue.length !== 0) {
      that.data.articleList.forEach(item => {
        if (item.name.indexOf(that.data.searchvalue) !== -1) {
          list.push(item)
        }
      })
      that.setData({
        articleList:list
      })
    }
    else{
      that.setData({
        articleList:that.data.standbyArticleList
      })
    }
    console.log(e.detail.length);
  },
  onCancelSearch(e) {
    console.log(e);
  },
  onTabbarChange(event) {
    let that = this
    that.setData({
      active: event.detail
    });
    console.log(that.data.active);
  },
  toDetailsPage(e) {
    let key = e.currentTarget.dataset['from']
    wx.navigateTo({
      url: `./details/details?title=${key}`,
      events: e,
      routeType: 'routeType',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
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
    let that = this
    db.collection('article-list').get().then(res => {
      console.log(res.data);
      that.setData({
        articleList: res.data,
        standbyArticleList: res.data,
        searchvalue:""
      })
    })
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