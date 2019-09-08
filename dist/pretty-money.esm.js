/**
 * pretty-money
 * A tiny currency formatting library for JavaScript
 * 
 * @version 1.0.1
 * @license MIT
 */

var e=function(){return(e=Object.assign||function(e){for(var i,r=1,a=arguments.length;r<a;r++)for(var c in i=arguments[r])Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);return e}).apply(this,arguments)},i={currency:"",position:"after",spaced:!0,decimals:"minmax",minDecimal:0,maxDecimal:2,decimalDelimiter:".",thousandsDelimiter:""};export default function(r,a){void 0===r&&(r={});var c=e(e({},i),r);function n(e){if(e=Number(e),isNaN(e))console.warn("The number input could not be interpreted"),e="NaN";else{var i=Math.pow(10,c.maxDecimal),r=(e=Math.floor(e*i).toString()).length-c.maxDecimal,a=e.slice(0,r).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+c.thousandsDelimiter),n=e.slice(r);("fluid"===c.decimals||"minmax"===c.decimals&&n.slice(c.minDecimal).match(/^0*$/))&&(n=n.slice(0,c.minDecimal)+n.slice(c.minDecimal).replace(/0*$/,"")),e=a+(""===n?"":c.decimalDelimiter)+n}return("before"===c.position?c.currency:"")+("before"===c.position&&c.spaced&&""!==c.currency?" ":"")+e+("after"===c.position&&c.spaced&&""!==c.currency?" ":"")+("after"===c.position?c.currency:"")}return void 0===a?n:n(a)}
