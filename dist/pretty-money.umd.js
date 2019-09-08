/**
 * pretty-money
 * A tiny currency formatting library for JavaScript
 * 
 * @version 1.0.1
 * @license MIT
 */

!function(e,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):(e=e||self).prettyMoney=i()}(this,function(){"use strict";var e=function(){return(e=Object.assign||function(e){for(var i,n=1,t=arguments.length;n<t;n++)for(var r in i=arguments[n])Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);return e}).apply(this,arguments)},i={currency:"",position:"after",spaced:!0,decimals:"minmax",minDecimal:0,maxDecimal:2,decimalDelimiter:".",thousandsDelimiter:""};return function(n,t){void 0===n&&(n={});var r=e(e({},i),n);function c(e){if(e=Number(e),isNaN(e))console.warn("The number input could not be interpreted"),e="NaN";else{var i=Math.pow(10,r.maxDecimal),n=(e=Math.floor(e*i).toString()).length-r.maxDecimal,t=e.slice(0,n).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+r.thousandsDelimiter),c=e.slice(n);("fluid"===r.decimals||"minmax"===r.decimals&&c.slice(r.minDecimal).match(/^0*$/))&&(c=c.slice(0,r.minDecimal)+c.slice(r.minDecimal).replace(/0*$/,"")),e=t+(""===c?"":r.decimalDelimiter)+c}return("before"===r.position?r.currency:"")+("before"===r.position&&r.spaced&&""!==r.currency?" ":"")+e+("after"===r.position&&r.spaced&&""!==r.currency?" ":"")+("after"===r.position?r.currency:"")}return void 0===t?c:c(t)}});
