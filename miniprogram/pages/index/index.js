var util = require('../../utils/util.js')

const ListMap = {
  history: 0,
  func: 1,
  ads: 2
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    month: null,
    day: null,
    result: null,
    showList: null,
    upperDesc: '',
    greetings: 'Hi, there!',
    funcList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    this.showLoading()
    let date = new Date()
    console.log(this)
    this.setData({
      month: date.getMonth() + 1,
      day: date.getDate()
    })
    let dateformat = util.formatDate(this.data.month,this.data.day)
    this.callGetEvent(dateformat,this)
  },

  showLoading() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },

  hideLoading() {
    wx.hideLoading()
  },

  onTapBirth(){
    wx.navigateTo({
      url: '/pages/birth/birth'
    })
  },

  initList:(result,list,that)=>{
    let tempfunc = []
    tempfunc.push('查询生日那天发生了什么？')
    let tempList = []
    for(let i = 0; i < result.length; i++){
      if(i == 0){
        tempList.push({
          type: ListMap.func,
          history: result[i]
        })
      }
      // else if(i == 8){
      //   //ads
      // }
      else{
        tempList.push({
          type: ListMap.history,
          history: result[i]
        })
      }
    }
    that.setData({
      funcList: tempfunc,
      showList: tempList,
      greetings: that.data.month + '.' + that.data.day,
      upperDesc: '历史上的今天发生了',
    })
    // that.delayShow(that)
  },

  delayShow(that){
    setTimeout(() => {
      that.setData({
        // upperDesc: '历史上的今天发生了',
        greetings: that.data.month + '.' + that.data.day
      }), 5000
    })
    setTimeout(() => {
      that.setData({
        upperDesc: '历史上的今天发生了',
        // greetings: that.data.month + '.' + that.data.day
      }), 1000
    })
  },

  callGetEvent:(dateformat, that, callback) =>{
    wx.cloud.callFunction({
      name: 'getEvent',
      data: {
        id: dateformat
      },
      success: res => {
        console.log('callgetevent')
        console.log('callGetEvent', res)
        let event = res.result.data[0].event
        console.log(that)
        that.setData({
          result: event
        })
        that.hideLoading()
        that.initList(that.data.result, that.data.showList,that)
        console.log(that.data.month, that.data.day, that.data.result)
        console.log('result长度', res.result.data[0].event.length)
      },
      fail: err => {
        console.log('call cloud function getEvent failed!')
      }
    })
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

  toggle: ()=>{

  }
})