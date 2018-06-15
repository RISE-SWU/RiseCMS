/**
 * 消息提示方法封装
 * @param {String} type 
 * @param {String} message 
 * @param {Object} self 
 */
export function sendMessage(type, message, self) {
    self.$message({
        type: type,
        message: message
    })
}


/**
 * 判断用户是否登录，通过sessionStorage
 */
export function session() {
    if(sessionStorage.getItem('status')) {
        return {
            status: sessionStorage.getItem('status'),
            user: sessionStorage.getItem('userName')
        }
    } else {
        return false;
    }
}

/**
 * 日期处理函数，返回当前的日期，类型xxxx-xx-xx
 */

function padLeftZero(str) {
    return ('00'+str).substr(str.length);
}

export function formatDate() {
    let fmt = 'yyyy-MM-dd';
    let date = new Date();
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
    }
    let o = {
        'M+':date.getMonth() + 1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
    };
    
    // 遍历这个对象
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            // console.log(`${k}`)
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
            }
    }
    return fmt
 }