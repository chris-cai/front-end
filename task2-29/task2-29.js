/**
 * Created by Chris Cai on 2017/1/20.
 */

window.onload = function(){
    
    var value = 'abcd你好中国abcd'
    var cn = /[\u4E00-\u9FA5\uF900-\uFA2D]/g;

    console.log(value.replace(cn,'--').length);

}