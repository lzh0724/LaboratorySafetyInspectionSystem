// views/asset/assetmanages/assetmanages.js
const app = getApp().globalData
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    successTipText: "",
    DeleteSearchvalue: "",
    // successShow: false,
    articleList: [],
    tabbariconList: [{
        id: 0,
        title: "添加",
        iconUrl: "../../../images/manage/add.svg",
        iconUrlActive: "../../../images/manage/add-active.svg"
      },
      {
        id: 1,
        title: "修改",
        iconUrl: "../../../images/manage/change.svg",
        iconUrlActive: "../../../images/manage/change-active.svg"
      },
      {
        id: 2,
        title: "删除",
        iconUrl: "../../../images/manage/delete.svg",
        iconUrlActive: "../../../images/manage/delete-active.svg"
      },
    ],
    adddetailsInfoList: [{
        key: "id",
        title: "编号",
        value: ""
      },
      {
        key: "date",
        title: "采购日期",
        value: ""
      },
      {
        key: "department",
        title: "部门",
        value: ""
      },
      {
        key: "delivery-man",
        title: "入库送货人",
        value: ""
      },
      {
        key: "name",
        title: "名称",
        value: ""
      },
      {
        key: "specifications",
        title: "规格",
        value: ""
      },
      {
        key: "number",
        title: "数量",
        value: ""
      },
      {
        key: "local",
        title: "存放位置",
        value: ""
      },
      {
        key: "note-number",
        title: "货运单号",
        value: ""
      },
      {
        key: "class",
        title: "分类",
        value: ""
      },
      {
        key: "invoice",
        title: "发票",
        value: ""
      },
      {
        key: "link",
        title: "采购链接",
        value: ""
      },
      {
        key: "host",
        title: "归属",
        value: ""
      }
    ]
  },
  //点击返回
  onClickLeft() {
    wx.reLaunch({
      url: '../asset',
    })
  },
  //监测删除功能的搜索框的值的变化
  onBindDeleteSearch(e) {
    let that = this
    let list = []
    that.setData({
      DeleteSearchvalue: e.detail
    })
    if (that.data.DeleteSearchvalue.length !== 0) {
      that.data.articleList.forEach(item => {
        if (item.name.indexOf(that.data.DeleteSearchvalue) !== -1) {
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
  //删除指定货物
  async DeleteArticle(articlename, articleclass) {
    let that = this
    await wx.cloud.callFunction({
      name: 'DeleteArticle',
      data: {
        name: articlename,
        class: articleclass
      },
      complete: res => {
        console.log(res, "调用删除云函数");
      },
      success: res => {
        console.log(res);
      }
    })
  },
  //点击删除货物按钮
   onBindDeleteArticle(e) {
    let that = this;
    wx.showToast({
      title: '数据删除中',
      icon: 'loading',
      duration: 3000
    });
    // console.log(e.currentTarget.dataset);
    that.DeleteArticle(e.currentTarget.dataset.name, e.currentTarget.dataset.class)
    setTimeout(() => {
      wx.showToast({
        title: '删除已完成',
        icon: 'success',
        duration: 2000
      });
    }, 0);
    //等待一秒更新数据
    setTimeout(() => {
      that.getArticleInfo()
      
    }, 1000);
  },
  //点击添加按钮
  async addDetailsInfo() {
    let that = this;
    wx.showToast({
      title: '数据添加中',
      icon: 'loading',
      duration: 3000
    });
    console.log(that.data.adddetailsInfoList);
    let list = that.data.adddetailsInfoList;
    //等待添加完成后再继续执行代码
    await that.createArticleInfo(list)
    list.forEach(element => {
      element.value = "";
    });
    that.setData({
      adddetailsInfoList: list,
    })
    console.log(that.data.adddetailsInfoList);
    //等待一秒关闭提示框
    setTimeout(() => {
      that.getArticleInfo()
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      });
    }, 1000);
  },
  //监测添加功能的输入框变化
  ondetailsInfoListChange(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let value = e.detail;
    let list = [...that.data.adddetailsInfoList];
    list[index].value = value;
    // console.log(e);
    // console.log(list);
    // console.log(that.data.adddetailsInfoList);
  },
  //监测导航栏下标变化
  onTabbarChange(event) {
    let that = this;
    that.setData({
      active: event.detail
    });
    console.log(that.data.active);
  },
  //添加货物信息
  async createArticleInfo(ArticleList) {
    let that = this;

   await wx.cloud.callFunction({
      name: 'createArticle',
      data: {
        list: ArticleList,
        openid: app.openId
      },
      complete: res => {
        console.log(res, "调用添加云函数");
      },
      //添加完成后，设置已登录
      success: res => {
        console.log(res);
      }
    })
  },
  //查询货物信息
  async getArticleInfo() {
    let that = this
    await db.collection('article-list').get().then(res => {
      console.log(res.data);
      that.setData({
        articleList: res.data,
        standbyArticleList: res.data
      })
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
    that.getArticleInfo()
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
    let that = this
    that.getArticleInfo()
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