/**
 * Created by wh 2018/8/14
 * 定义返回结果
 */

class ReturnResult {
    
   
    // 成功返回结果
    successData(_data) {
      let data = {
            status: '200',
            msg: '操作成功',
            data:_data,
        };
    return JSON.stringify(data)
    }
    success() {
        let data = {
              status: '200',
              msg: '操作成功',
          };
      return JSON.stringify(data)
      }
    // 失败返回结果
    error() {
      let data = {
             msg: '服务器错误!', 
             status: '403' 
            }
    return JSON.stringify(data)
    }
    errorMsg(_msg) {
        let data = {
               msg: _msg, 
               status: '403' 
              }
      return JSON.stringify(data)
      }
    
}
module.exports = {
    // 通用
    SUCCESS () { 
        return new ReturnResult().success()
    }  , 
    SUCCESSDATA (data) { 
        return new ReturnResult().successData(data)
    }  ,  
    ERROR (){ 
        return  new ReturnResult().error()
    }  , 
    ERRORMSG (msg){ 
        return   new ReturnResult().errorMsg(msg)
    }  ,
    
}