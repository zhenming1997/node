/**
 * 
 * 过滤特殊字符 
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 
 * 验证密码 6至20位的字母+数字
 */
export function strPassword(str) {
    let pattern = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
    return pattern.test(str) ? true:false;
 }

/**
 * 
 * 验证邮箱
 */
export function strEmail(str) {
   let pattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
   return pattern.test(str) ? true:false;
}

/**
 * 
 * 验证码格式验证
 */
export function strCode(str) {
    let pattern =  /^[a-z0-9]{6}$/;
    return pattern.test(str) ? true:false;
}