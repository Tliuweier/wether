// pages/poster/poster.js
const poetryAPI = require('../../util/jinrishici.js')
const {getImgUrl} = require('../../util/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poetry:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 每日一句
    poetryAPI.load(result=>{
      // console.log(result)
      this.setData({poetry: result.data.content})
    })
    // 今天日期
    // 地理位置
    let location = options.location
    let temperature = options.temperature
    let code = options.code
    let text = options.text
    let date = new Date().getTime()
    let that =  this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowW: res.windowWidth,
          windowH: res.windowHeight
        })
      },
    })
    this.setData({
      date:date,
      location:location,
      temperature:temperature,
      code:code,
      text:text
    })
    this.createNewImg();
    
  },
  getMonthDay : function(date){
    var month = new Date(date).getMonth()+1;
    var dates = new Date(date).getDate()
    if(month<10){
      month = '0'+month
    }else{
      month = month
    }
    if(dates<10){
      dates = '0'+dates
    }else{
      dates = dates
    }
    return month+'月'+dates+'日';
  },
  
  createNewImg:async function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    //获取图片
    let proter = await this.getFilePath('https://api.xygeng.cn/Bing/')
    let qrcode = await this.getFilePath('https://lovetalkservice-4gzhpcul1a50833f-1305027853.tcloudbaseapp.com/image/qrcode.png?sign=c0e1f0bf25420584295a8922ca5a89ec&t=1617461871')
    let codeImg = getImgUrl(this.data.code)

    // 文字
    let location = this.data.location
    let text = this.data.text
    let temperature = this.data.temperature
    let poetry = this.data.poetry
    let date = this.getMonthDay(this.data.date)
    let windowsWidth = this.data.windowW
    let windowsHeight = 421
    context.fillStyle="#FFFFFF";
    context.fillRect(20, 100, windowsWidth-40, windowsHeight)
    // this.roundRect(context,20,100, windowsWidth-40, windowsHeight)
    
    context.drawImage(proter, (windowsWidth - 290) / 2, (windowsHeight -420) / 2+20+100, 290, 225)

    context.setFontSize(22)
    context.setFillStyle("#ffffff")
    context.fillText(temperature+'°',220+20,(windowsHeight -420) / 2+60+100)

    context.drawImage(codeImg,255+20,(windowsHeight -420)/2+45+100,20,18)


    context.setFontSize(10)
    context.setFillStyle("#ffffff")
    context.fillText(text,280+20,(windowsHeight -420) / 2+60+100)

    // 诗词文字
    var row = that.newLine(poetry, context)
    var a = 24//定义行高25
    for (var i = 0; i < row.length; i++) {
      context.setFontSize(10)
      context.setFillStyle("#000000")
      context.fillText(row[i], (windowsWidth - 290) / 2, (windowsHeight -420)/2 + a * i+265+100)
    }
    // 地理位置
    context.setFontSize(10)
    context.setFillStyle("#959595")
    context.setTextAlign("left")
    context.fillText(location,230,(windowsHeight -420)/2 + a * 0+265+100,100);

    context.setFontSize(10)
    context.setFillStyle("#959595")
    context.setTextAlign("left")
    context.fillText(date,260,(windowsHeight -420)/2 + a *1+265+100,100);


    context.drawImage(qrcode, (windowsWidth -290) / 2, (windowsHeight - 420) / 2+305+100, 290,100)
    context.save()
    context.draw()
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        fileType: 'jpg',
        quality: 1,
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      })
    },1000)
  },
  newLine(txt, context) {
    var txtArr = txt.split('')
    var temp = ''
    var row = []
    for (var i = 0; i < txtArr.length; i++) {
      if (context.measureText(temp).width < 180) {
        temp += txtArr[i]
      } else {
        i--
        row.push(temp)
        temp = ''
      }
    }
    row.push(temp)
 
    //如果数组长度大于3 则截取前三个
    if (row.length > 3) {
      var rowCut = row.slice(0, 3);
      var rowPart = rowCut[2];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (context.measureText(test).width < 180) {
          test += rowPart[a];
        } else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..." //这里只显示三行，超出的用...表示
      rowCut.splice(2, 1, group);
      row = rowCut;
    }
    return row
  },
  
  saveImage: function () {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        console.log(res)
        wx.showToast({
          title: '保存图片成功',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getFilePath: function (url) {
    let promise = new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        success: res => {
          resolve(res.tempFilePath)
        },
        fail: err => {
          reject(err)
        }
      })
    })
    return promise
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getCanvas()
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

  }
})