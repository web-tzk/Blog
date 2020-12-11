
/* Capture resource error   捕获资源加载错误    
*like img,script,css,jsonp 
*/   
window.addEventListener('error', function (e) {
    console.log(e)
}, true);

/* Capture javascript syntax error  捕获语法错误
*/ 
window.onerror = function (msg, url, line, col, error) {
    console.log(error)
};


/* Capture params
* 被 reject 且没有 reject 处理器的时候
*/
window.addEventListener('unhandledrejection', function (e) {
    console.log(e)
})