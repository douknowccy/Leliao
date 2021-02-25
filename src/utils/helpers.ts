export const isIOS = () => {
 var u = navigator.userAgent;
 var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
 return isiOS
}