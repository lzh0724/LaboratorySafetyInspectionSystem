// views/examine/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    createReportList: [{
        key: "time",
        title: "时间",
        value: ""
      },
      {
        key: "local",
        title: "地点",
        value: ""
      },
      {
        key: "state",
        title: "情况",
        value: ""
      },
      {
        key: "person",
        title: "检查人",
        value: ""
      },
    ],
    reportPhotoList: [],
    fflist:""
  },
  afterRead(event) {
    let that = this
    console.log(event);
    let list = that.data.reportPhotoList
    let file = event.detail.file
    file.deletable = true
    list.push(file)
    that.setData({
      reportPhotoList: list
    })
  },
  deletePhoto(e) {
    let that = this
    console.log(e.detail.index);
    let list = that.data.reportPhotoList
    list.splice(e.detail.index, 1)
    that.setData({
      reportPhotoList: list
    })
  },
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },
  uploadToCloud(list) {
    // wx.cloud.init();
    let fileList = []
    fileList = list
    console.log(list);
    const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
    Promise.all(uploadTasks)
      .then(data => {
        wx.showToast({
          title: '上传成功',
          icon: 'none'
        });
        const newFileList = data.map(item => ({
          url: item.fileID
        }));
        this.setData({
          cloudPath: data,
          reportPhotoList: newFileList
        });
        console.log(this.data.cloudPath[0].fileID,this.data.reportPhotoList);
      })
      .catch(e => {
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        });
        console.log(e);
      });
  },
  addDetailsInfo() {
    let that = this
    that.uploadToCloud(that.data.reportPhotoList)
  },
  //获取上传到
  getUploadFileUrl(){
    let that = this
    let list = []
    list.push(that.data.cloudPath[0].fileID)
    wx.cloud.callFunction({
      name: 'getFileUrl',
      data:{
        fileList:list
      },
      complete: res => {
        console.log(res.result.fileList, "调用云函数");
      },
      success: res => {
      }
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