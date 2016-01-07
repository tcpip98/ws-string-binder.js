/*************************************************************************************************************
 * ws-string-binder.js
 *
 *   Version : 1.1.0
 *   Author : Jake Wonsang Lee. ( mailto://tcpip98@gmail.com )
 *
 *   GitHub : https://github.com/tcpip98/ws-string-binder.js
 *   GitPage : http://tcpip98.github.io/ws-string-binder.js
 *   NPM : https://www.npmjs.com/package/ws-string-binder.js
 *
 *   License :
 *      The MIT License (MIT)
 *
 *      ws-string-binder.js
 *      Copyright (c) 2015 Jake Wonsang Lee( tcpip98@gmail.com )
 *
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 *
 *      The above copyright notice and this permission notice shall be included in all
 *      copies or substantial portions of the Software.
 *
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *      SOFTWARE.
 *
 *************************************************************************************************************/
(function(){var a={$prefix:"-ws-string-bind-",$debugEnabled:false,$regxTemplate:/(\{)(\s*)([\w-]*)(\s*)(\})/g,log:function(d,c){try{if(this.$debugEnabled){console.log(this.normalizeString(d).concat(" : "));console.log(c)}}catch(b){alert(c)}return c},bind:function(c,h){var d=null,b=null,f=null,e=null;this.log("Migrated binding object",b=this.migrateBindings(h));this.log("Template string",f=this.generateTemplate(c));for(var g in b){if(b.hasOwnProperty(g)){regx=new RegExp("\\{"+g+"\\}","g");f=this.log("Binding sequence",f.replace(regx,b[g]))}}f=f.replace(this.$prefix,"");return this.log("Bind result",f)},generateTemplate:function(b){return b.replace(this.$regxTemplate,"$1"+this.$prefix+"$3$5")},normalizeString:function(b){return(b===undefined||b===null)?"":b},migrateBindings:function(e){var b={};if(e instanceof Array){for(var d=0;d<e.length;d++){b[this.$prefix.concat(d)]=e[d]}}else{if(e instanceof Object){for(var c in e){if(e.hasOwnProperty(c)){b[this.$prefix.concat(c)]=e[c]}}}else{b[this.$prefix]=e}}return b},append:function(b,c){return b.concat(this.normalizeString(c))},prepend:function(b,c){return this.normalizeString(c).concat(b)}};String.prototype.$append=function(b){return a.append(this,b)};String.prototype.$prepend=function(b){return a.prepend(this,b)};String.prototype.$bind=function(b){return a.bind(this,b)}})();