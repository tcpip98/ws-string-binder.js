/*************************************************************************************************************
 * ws-string-binder.js
 *
 *   Version : 1.0.0
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
 
if(!!!wsStringBinder){var wsStringBinder={$prefix:"-ws-string-bind-",$debugEnabled:false,$regxTemplate:/(\{)(\s*)([\w-]*)(\s*)(\})/g,log:function(c,b){try{if(this.$debugEnabled){console.log(this.normalizeString(c).concat(" : "));console.log(b)}}catch(a){alert(b)}return b},bind:function(b,g){var c=null,a=null,e=null,d=null;this.log("Migrated binding object",a=this.migrateBindings(g));this.log("Template string",e=this.generateTemplate(b));for(var f in a){if(a.hasOwnProperty(f)){regx=new RegExp("\\{"+f+"\\}","g");e=this.log("Binding sequence",e.replace(regx,a[f]))}}e=e.replace(this.$prefix,"");return this.log("Bind result",e)},generateTemplate:function(a){return a.replace(this.$regxTemplate,"$1"+this.$prefix+"$3$5")},normalizeString:function(a){return(a===undefined||a===null)?"":a},migrateBindings:function(d){var a={};if(d instanceof Array){for(var c=0;c<d.length;c++){a[this.$prefix.concat(c)]=d[c]}}else{if(d instanceof Object){for(var b in d){if(d.hasOwnProperty(b)){a[this.$prefix.concat(b)]=d[b]}}}else{a[this.$prefix]=d}}return a},append:function(a,b){return a.concat(this.normalizeString(b))},prepend:function(a,b){return this.normalizeString(b).concat(a)}}}String.prototype.$append=function(a){return wsStringBinder.append(this,a)};String.prototype.$prepend=function(a){return wsStringBinder.prepend(this,a)};String.prototype.$bind=function(a){return wsStringBinder.bind(this,a)};