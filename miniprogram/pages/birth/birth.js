// miniprogram/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: 1,
    day: 23,
    year: '',
    title: '',
    result: '',
    dateformat: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getEvent()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getAuthSetting(){
    console.log('getAuthSetting')
    wx.getSetting({
      success: res=>{
        console.log(res)
        console.log('getAUthSetting success callback')
        console.log(res.authSetting['scope.userInfo'])
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: ()=>{
              console.log('获取权限成功')
            },
            fail: ()=>{
              console.log('获取权限失败')
            },
            complete: ()=>{
              console.log('getAuthSetting complete!')
              // if(this.data.result.length != 0){
              //   this.gotoEvent()
              // }
            }
          })
        }
        else{
          console.log("用户已授权")
        }
      }
 
    })
  },

  gotoEvent() {
    wx.navigateTo({
      url: '/pages/event/event?result=' + encodeURIComponent(JSON.stringify(this.data.result)) + '&month=' + this.data.month + '&day=' +this.data.day,
    })
  },

  showLoading(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },

  hideLoading(){
    wx.hideLoading()
  },

  formatDate(){
    let monthformat;
    let dayformat;
    if (this.data.month < 10) {
      monthformat = "0" + this.data.month;
    }
    else {
      monthformat = "" + this.data.month;
    }
    if (this.data.day < 10) {
      dayformat = "0" + this.data.day;
    }
    else {
      dayformat = "" + this.data.day;
    }
    this.setData({
      dateformat: monthformat + dayformat
    })
    console.log(this.data.dateformat)
  },

  callGetEvent(){
    //console.log('result长度', this.data.result.length)
    wx.cloud.callFunction({
      name: 'getEvent',
      data: {
        id: this.data.dateformat
      },
      success: res => {
        this.setData({
          result: res.result.data[0].event
        })
        
        console.log('result长度',res.result.data[0].event.length)
        this.hideLoading()
        wx.getSetting({
          success: res=>{
            this.gotoEvent()
            // if (res.authSetting['scope.userInfo'] !== undefined){
            //   this.gotoEvent()
            // }
          }
        })
      },
      fail: err => {
        console.log('call cloud function getEvent failed!')
      }
    })
  },

  onQuery: function() {
    this.getAuthSetting()
    this.showLoading()
    this.formatDate()
    this.callGetEvent()
  },

  judgeDays: function(days){
    if (this.data.day >= 1 && this.data.day <= days) {
      this.onQuery()
    }
    else {
      this.showFormatError('日期不存在')
    }
  },

  showFormatError: function(error){
    wx.showToast({
      title: error,
      icon: 'none'
    })
    // this.setData({
    //   month: 1,
    //   day: 23
    // })
  },

  btnclick: function () {
    // console.log(this.data.month)
    // console.log(this.data.day)
    // console.log(typeof this.data.day)
    this.isNumber()
  },

  isNumber(){
    //判断输入是否为数字
    this.setData({
      month: Number(this.data.month),
      day: Number(this.data.day)
    })
    // console.log(this.data.month)
    // console.log(this.data.day)
    // console.log(typeof this.data.day)
    if (typeof this.data.month === 'number' && !isNaN(this.data.month)) {
      if (typeof this.data.day === 'number' && !isNaN(this.data.day)) {
        this.setData({
          month: parseInt(this.data.month, 10)
        })
        if (this.data.month >= 1 && this.data.month <= 12) {
          this.setData({
            day: parseInt(this.data.day, 10)
          })
          switch (this.data.month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
              this.judgeDays(31)
              break;
            case 2:
              this.judgeDays(29)
              break;
            default:
              this.judgeDays(30)
              break;
          }
        }
        else {
          this.showFormatError('月份不存在')
        }
      }
      else {
        this.showFormatError('日期格式错误')
      }
    }
    else {
      this.showFormatError('月份格式错误')
    }
  },

  monthInput: function(e) {
    this.setData({
      month: e.detail.value
    })
  },

  dayInput: function(e) {
    this.setData({
      day: e.detail.value
    })
  }
})