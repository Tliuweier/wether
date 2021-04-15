const app = getApp()
const QQMapWX = require('./qqmap-wx-jssdk.min')
const getRequest = function(url,params){

  let promise = new Promise(function(resolve,reject){
    wx.request({
      url: `${app.data.url}${url}`,
      method:'GET',
      data:{
        language:'zh-Hans',
        key:app.data.privateKey,
        ...params
      },
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  }).then(function(data){
    return data;
  }).catch(function(data){
    return data;
  })
  return promise;
}
const getRequest1 = function(params){

  let promise = new Promise(function(resolve,reject){
    wx.request({
      url: `${app.data.url1}/v2.5/${app.data.key}/${params}/minutely.json`,
      method:'GET',
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  }).then(function(data){
    return data;
  }).catch(function(data){
    return data;
  })
  return promise;
}
const getLocation = async function(){
  let qqmapsdk = new QQMapWX({
    key: app.data.mapKey // 必填
  });
  let promise = await new Promise(function(resolve, reject) {
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
        
      }
    })
  })
  let promise1 = new Promise(function(resolve,reject){
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: promise.latitude,
        longitude: promise.longitude
      },
      success: function(addressRes) {
        resolve(addressRes)
      },
      fail: function(res) {
        resolve(res)
      }
    })
  })
  return promise1;
}
const getImgUrl = function(code){
  var text = ''
  if(code == '0'){
    text = '../../images/black/0@2x.png  '
  }else if(code == '1'){
    text = '../../images/black/1@2x.png  '
  }else if(code == '2'){
    text = '../../images/black/2@2x.png  '
  }else if(code == '3'){
    text = '../../images/black/3@2x.png  '
  }else if(code == '4'){
    text = '../../images/black/4@2x.png  '
  }else if(code == '5'){
    text = '../../images/black/5@2x.png  '
  }else if(code == '6'){
    text = '../../images/black/6@2x.png  '
  }else if(code == '7'){
    text = '../../images/black/7@2x.png  '
  }else if(code == '8'){
    text = '../../images/black/8@2x.png  '
  }else if(code == '9'){
    text = '../../images/black/9@2x.png  '
  }else if(code == '10'){
    text = '../../images/black/10@2x.png  '
  }else if(code == '11'){
    text = '../../images/black/11@2x.png  '
  }else if(code == '12'){
    text = '../../images/black/12@2x.png  '
  }else if(code == '13'){
    text = '../../images/black/13@2x.png  '
  }else if(code == '14'){
    text = '../../images/black/14@2x.png  '
  }else if(code == '15'){
    text = '../../images/black/15@2x.png  '
  }else if(code == '16'){
    text = '../../images/black/16@2x.png  '
  }else if(code == '17'){
    text = '../../images/black/17@2x.png  '
  }else if(code == '18'){
    text = '../../images/black/18@2x.png  '
  }else if(code == '19'){
    text = '../../images/black/19@2x.png  '
  }else if(code == '20'){
    text = '../../images/black/20@2x.png  '
  }else if(code == '21'){
    text = '../../images/black/21@2x.png  '
  }else if(code == '22'){
    text = '../../images/black/22@2x.png  '
  }else if(code == '23'){
    text = '../../images/black/23@2x.png  '
  }else if(code == '24'){
    text = '../../images/black/24@2x.png  '
  }else if(code == '25'){
    text = '../../images/black/25@2x.png  '
  }else if(code == '26'){
    text = '../../images/black/26@2x.png  '
  }else if(code == '27'){
    text = '../../images/black/27@2x.png  '
  }else if(code == '28'){
    text = '../../images/black/28@2x.png  '
  }else if(code == '29'){
    text = '../../images/black/29@2x.png  '
  }else if(code == '30'){
    text = '../../images/black/30@2x.png  '
  }else if(code == '31'){
    text = '../../images/black/31@2x.png  '
  }else if(code == '32'){
    text = '../../images/black/32@2x.png  '
  }else if(code == '33'){
    text = '../../images/black/33@2x.png  '
  }else if(code == '34'){
    text = '../../images/black/34@2x.png  '
  }else if(code == '35'){
    text = '../../images/black/35@2x.png  '
  }else if(code == '36'){
    text = '../../images/black/36@2x.png  '
  }else if(code == '37'){
    text = '../../images/black/37@2x.png  '
  }else if(code == '38'){
    text = '../../images/black/38@2x.png  '
  }else if(code == '99'){
    text = '../../images/black/99@2x.png  '
  }
  return text;
}
module.exports = {
  getRequest:getRequest,
  getRequest1:getRequest1,
  getLocation:getLocation,
  getImgUrl:getImgUrl
}