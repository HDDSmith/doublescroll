// pages/index/index.js
var top = 0

var window_height = 0
var isTouch = false
var that=this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTop: true,
    currentTop: 0,
    scrollTop: '0px',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    that.getAllHeight()
  },
  //获取各个高度
  getAllHeight: function () {
    //创建节点选择器
    var query = wx.createSelectorQuery();

    query.select('.top').boundingClientRect(
      function (rect) {
        top = rect.height * 750 / rect.width
      }
    ).exec()

   
    wx.getSystemInfo({
      success: function (res) {

        window_height = res.windowHeight * 750 / res.windowWidth
      },
    })
  },

  scrollListener: function (e) {
    console.log(222222222222222)
    this.setData({
      currentTop: e.detail.scrollTop * 750 / e.detail.scrollWidth
    })


    if (!isTouch) {
  
      this.scrollOrientation()
    }
  },

  scrollOrientation: function () {
    var pch_wh = top - window_height
    console.log(pch_wh)
    var currentTop = this.data.currentTop
    console.log(currentTop)
    if (currentTop > pch_wh && currentTop <= (pch_wh + window_height / 2) && this.data.isTop) {
      this.setData({
        scrollTop: pch_wh + 'rpx',
        currentTop: pch_wh,
        isTop: true
      })
      console.log(1)

    } else if (currentTop > (pch_wh + window_height / 2) && currentTop <= top && this.data.isTop) {

      this.setData({
        scrollTop: top + 'rpx',
        currentTop: top,
        isTop: false
      })
      console.log(2)

    } else if (currentTop < top && currentTop >= (top - window_height / 2) && !this.data.isTop) {

      this.setData({
        scrollTop: top + 'rpx',
        currentTop: top,
        isTop: false

      })
      console.log(3)

    } else if (currentTop <= (top - window_height / 2) && currentTop > pch_wh && !this.data.isTop) {
      this.setData({
        scrollTop: pch_wh + 'rpx',
        currentTop: pch_wh,
        isTop: true
      })
      console.log(4)
    } else {
      console.log(5)
    }
  },

  scrollTouchEnd: function (e) {

    isTouch = false
    this.scrollOrientation()

  },

  scrollTouchStart: function (e) {
    console.log(12341231)
    isTouch = true
  }
})