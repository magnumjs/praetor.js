var m=function e(t,n){function r(e){T=e.document,A=e.location,D=e.cancelAnimationFrame||e.clearTimeout,R=e.requestAnimationFrame||e.setTimeout}function o(){var e,t=[].slice.call(arguments),n=!(null==t[1]||$.call(t[1])!==J||"tag"in t[1]||"view"in t[1]||"subtree"in t[1]),r=n?t[1]:{},o="class"in r?"class":"className",a={tag:"div",attrs:{}},i=[];if($.call(t[0])!=M)throw new Error("selector in m(selector, attrs, children) should be a string");for(;e=L.exec(t[0]);)if(""===e[1]&&e[2])a.tag=e[2];else if("#"===e[1])a.attrs.id=e[2];else if("."===e[1])i.push(e[2]);else if("["===e[3][0]){var l=B.exec(e[3]);a.attrs[l[1]]=l[3]||(l[2]?"":!0)}i.length>0&&(a.attrs[o]=i.join(" "));var s=n?t.slice(2):t.slice(1);a.children=1===s.length&&$.call(s[0])===q?s[0]:s;for(var u in r)u===o?""!==r[u]&&(a.attrs[u]=(a.attrs[u]||"")+" "+r[u]):a.attrs[u]=r[u];return a}function a(e,t,r,u,d,f,h,p,g,m,v){try{(null==d||null==d.toString())&&(d="")}catch(y){d=""}if("retain"===d.subtree)return f;var w=$.call(f),x=$.call(d);if(null==f||w!==x){if(null!=f)if(r&&r.nodes){var N=p-u,C=N+(x===q?d:f.nodes).length;s(r.nodes.slice(N,C),r.slice(N,C))}else f.nodes&&s(f.nodes,f);f=new d.constructor,f.tag&&(f={}),f.nodes=[]}if(x===q){for(var b=0,E=d.length;E>b;b++)$.call(d[b])===q&&(d=d.concat.apply([],d),b--,E=d.length);for(var S=[],O=f.length===d.length,j=0,k=1,A=2,R=3,D={},L=[],B=!1,b=0;b<f.length;b++)f[b]&&f[b].attrs&&null!=f[b].attrs.key&&(B=!0,D[f[b].attrs.key]={action:k,index:b});if(B){d.indexOf(null)>-1&&(d=d.filter(function(e){return null!=e}));var U=!1;if(d.length!=f.length)U=!0;else for(var z,H,b=0;z=f[b],H=d[b];b++)if(z.attrs&&H.attrs&&z.attrs.key!=H.attrs.key){U=!0;break}if(U){for(var b=0,E=d.length;E>b;b++)if(d[b]&&d[b].attrs)if(null!=d[b].attrs.key){var K=d[b].attrs.key;D[K]=D[K]?{action:R,index:b,from:D[K].index,element:f.nodes[D[K].index]||T.createElement("div")}:{action:A,index:b}}else L.push({index:b,element:e.childNodes[b]||T.createElement("div")});var Q=[];for(var F in D)Q.push(D[F]);for(var G,V=Q.sort(i),_=new Array(f.length),b=0;G=V[b];b++){if(G.action===k&&(s(f[G.index].nodes,f[G.index]),_.splice(G.index,1)),G.action===A){var Y=T.createElement("div");Y.key=d[G.index].attrs.key,e.insertBefore(Y,e.childNodes[G.index]||null),_.splice(G.index,0,{attrs:{key:d[G.index].attrs.key},nodes:[Y]})}G.action===R&&(e.childNodes[G.index]!==G.element&&null!==G.element&&e.insertBefore(G.element,e.childNodes[G.index]||null),_[G.index]=f[G.from])}for(var b=0,E=L.length;E>b;b++){var G=L[b];e.insertBefore(G.element,e.childNodes[G.index]||null),_[G.index]=f[G.index]}f=_,f.nodes=new Array(e.childNodes.length);for(var W,b=0;W=e.childNodes[b];b++)f.nodes[b]=W}}for(var b=0,Z=0,E=d.length;E>b;b++){var et=a(e,t,f,p,d[b],f[Z],h,p+j||j,g,m,v);et!==n&&(et.nodes.intact||(O=!1),j+=et.$trusted?(et.match(/<[^\/]|\>\s*[^<]|&/g)||[]).length:$.call(et)===q?et.length:1,f[Z++]=et)}if(!O){for(var b=0,E=d.length;E>b;b++)null!=f[b]&&S.push.apply(S,f[b].nodes);for(var tt,b=0;tt=f.nodes[b];b++)null!=tt.parentNode&&S.indexOf(tt)<0&&s([tt],[f[b]]);d.length<f.length&&(f.length=d.length),f.nodes=S}}else if(null!=d&&x===J){if(d.view){var rt,ot=d,at=ot.controller.$original||ot.controller,it=at===f.controllerConstructor?f.controller:new(ot.controller||function(){});if(d=0==nt?ot.view(it):{tag:"placeholder"},it.onunload&&X.push({controller:it,handler:it.onunload}),!d.tag)throw new Error("Component template must return a virtual element, not an array, string, etc.")}d.attrs||(d.attrs={}),f.attrs||(f.attrs={});var lt=Object.keys(d.attrs),st=lt.length>("key"in d.attrs?1:0);if((d.tag!=f.tag||lt.join()!=Object.keys(f.attrs).join()||d.attrs.id!=f.attrs.id||d.attrs.key!=f.attrs.key||"all"==o.redraw.strategy()&&f.configContext&&f.configContext.retain!==!0||"diff"==o.redraw.strategy()&&f.configContext&&f.configContext.retain===!1)&&(f.nodes.length&&s(f.nodes),f.configContext&&typeof f.configContext.onunload===P&&f.configContext.onunload(),f.controller&&typeof f.controller.onunload===P&&f.controller.onunload({preventDefault:function(){}})),$.call(d.tag)!=M)return;var tt,ut=0===f.nodes.length;if(d.attrs.xmlns?m=d.attrs.xmlns:"svg"===d.tag?m="http://www.w3.org/2000/svg":"math"===d.tag&&(m="http://www.w3.org/1998/Math/MathML"),ut){if(tt=d.attrs.is?m===n?T.createElement(d.tag,d.attrs.is):T.createElementNS(m,d.tag,d.attrs.is):m===n?T.createElement(d.tag):T.createElementNS(m,d.tag),f={tag:d.tag,attrs:st?l(tt,d.tag,d.attrs,{},m):d.attrs,children:null!=d.children&&d.children.length>0?a(tt,d.tag,n,n,d.children,f.children,!0,0,d.attrs.contenteditable?tt:g,m,v):d.children,nodes:[tt]},it&&(f.controllerConstructor=at,f.controller=it,it.onunload&&it.onunload.$old&&(it.onunload=it.onunload.$old),nt&&it.onunload)){var rt=it.onunload;it.onunload=function(){},it.onunload.$old=rt}f.children&&!f.children.nodes&&(f.children.nodes=[]),"select"===d.tag&&d.attrs.value&&l(tt,d.tag,{value:d.attrs.value},{},m),e.insertBefore(tt,e.childNodes[p]||null)}else tt=f.nodes[0],st&&l(tt,d.tag,d.attrs,f.attrs,m),f.children=a(tt,d.tag,n,n,d.children,f.children,!1,0,d.attrs.contenteditable?tt:g,m,v),f.nodes.intact=!0,it&&(f.controllerConstructor=at,f.controller=it),h===!0&&null!=tt&&e.insertBefore(tt,e.childNodes[p]||null);if(typeof d.attrs.config===P){var ct=f.configContext=f.configContext||{retain:"diff"==o.redraw.strategy()},dt=function(e,t){return function(){return e.attrs.config.apply(e,t)}};v.push(dt(d,[tt,!ut,ct,f]))}}else if(typeof d!=P){var S;0===f.nodes.length?(d.$trusted?S=c(e,p,d):(S=[T.createTextNode(d)],e.nodeName.match(I)||e.insertBefore(S[0],e.childNodes[p]||null)),f="string number boolean".indexOf(typeof d)>-1?new d.constructor(d):d,f.nodes=S):f.valueOf()!==d.valueOf()||h===!0?(S=f.nodes,g&&g===T.activeElement||(d.$trusted?(s(S,f),S=c(e,p,d)):"textarea"===t?e.value=d:g?g.innerHTML=d:((1===S[0].nodeType||S.length>1)&&(s(f.nodes,f),S=[T.createTextNode(d)]),e.insertBefore(S[0],e.childNodes[p]||null),S[0].nodeValue=d)),f=new d.constructor(d),f.nodes=S):f.nodes.intact=!0}return f}function i(e,t){return e.action-t.action||e.index-t.index}function l(e,t,n,r,o){for(var a in n){var i=n[a],l=r[a];if(a in r&&l===i)"value"===a&&"input"===t&&e.value!=i&&(e.value=i);else{r[a]=i;try{if("config"===a||"key"==a)continue;if(typeof i===P&&0===a.indexOf("on"))e[a]=d(i,e);else if("style"===a&&null!=i&&$.call(i)===J){for(var s in i)(null==l||l[s]!==i[s])&&(e.style[s]=i[s]);for(var s in l)s in i||(e.style[s]="")}else null!=o?"href"===a?e.setAttributeNS("http://www.w3.org/1999/xlink","href",i):"className"===a?e.setAttribute("class",i):e.setAttribute(a,i):a in e&&"list"!==a&&"style"!==a&&"form"!==a&&"type"!==a&&"width"!==a&&"height"!==a?("input"!==t||e[a]!==i)&&(e[a]=i):e.setAttribute(a,i)}catch(u){if(u.message.indexOf("Invalid argument")<0)throw u}}}return r}function s(e,t){for(var n=e.length-1;n>-1;n--)if(e[n]&&e[n].parentNode){try{e[n].parentNode.removeChild(e[n])}catch(r){}t=[].concat(t),t[n]&&u(t[n])}0!=e.length&&(e.length=0)}function u(e){if(e.configContext&&typeof e.configContext.onunload===P&&(e.configContext.onunload(),e.configContext.onunload=null),e.controller&&typeof e.controller.onunload===P&&e.controller.onunload({preventDefault:function(){}}),e.children)if($.call(e.children)===q)for(var t,n=0;t=e.children[n];n++)u(t);else e.children.tag&&u(e.children)}function c(e,t,n){var r=e.childNodes[t];if(r){var o=1!=r.nodeType,a=T.createElement("span");o?(e.insertBefore(a,r||null),a.insertAdjacentHTML("beforebegin",n),e.removeChild(a)):r.insertAdjacentHTML("beforebegin",n)}else e.insertAdjacentHTML("beforeend",n);for(var i=[];e.childNodes[t]!==r;)i.push(e.childNodes[t]),t++;return i}function d(e,t){return function(n){n=n||event,o.redraw.strategy("diff"),o.startComputation();try{return e.call(t,n)}finally{rt()}}}function f(e){var t=H.indexOf(e);return 0>t?H.push(e)-1:t}function h(e){var t=function(){return arguments.length&&(e=arguments[0]),e};return t.toJSON=function(){return e},t}function p(e,t){var n=function(){return(e.controller||function(){}).apply(this,t)||this},r=function(n){arguments.length>1&&(t=t.concat([].slice.call(arguments,1)));var r=e.view.apply(e,t?[n].concat(t):[n]);return t[0]&&null!=t[0].key&&(r.attrs.key=t[0].key),r};n.$original=e.controller;var o={controller:n,view:r};return t[0]&&null!=t[0].key&&(o.attrs={key:t[0].key}),o}function g(){for(var e,t=0;e=F[t];t++)if(V[t]){var n=G[t].controller&&G[t].controller.$$args?[V[t]].concat(G[t].controller.$$args):[V[t]];o.render(e,G[t].view?G[t].view(V[t],n):tt())}W&&(W(),W=null),_=null,Y=new Date,o.redraw.strategy("diff")}function m(e){return e.slice(it[o.route.mode].length)}function v(e,t,n){ot={};var r=n.indexOf("?");-1!==r&&(ot=N(n.substr(r+1,n.length)),n=n.substr(0,r));var a=Object.keys(t),i=a.indexOf(n);if(-1!==i)return o.module(e,t[a[i]]),!0;for(var l in t){if(l===n)return o.module(e,t[l]),!0;var s=new RegExp("^"+l.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$");if(s.test(n))return n.replace(s,function(){for(var n=l.match(/:[^\/]+/g)||[],r=[].slice.call(arguments,1,-2),a=0,i=n.length;i>a;a++)ot[n[a].replace(/:|\./g,"")]=decodeURIComponent(r[a]);o.module(e,t[l])}),!0}}function y(e){if(e=e||event,!e.ctrlKey&&!e.metaKey&&2!==e.which){e.preventDefault?e.preventDefault():e.returnValue=!1;for(var t=e.currentTarget||e.srcElement,n="pathname"===o.route.mode&&t.search?N(t.search.slice(1)):{};t&&"A"!=t.nodeName.toUpperCase();)t=t.parentNode;o.route(t[o.route.mode].slice(it[o.route.mode].length),n)}}function w(){"hash"!=o.route.mode&&A.hash?A.hash=A.hash:t.scrollTo(0,0)}function x(e,t){var n=[];for(var r in e){var o=t?t+"["+r+"]":r,a=e[r],i=$.call(a),l=null!=a&&i===J?x(a,o):i===q?a.map(function(e){return encodeURIComponent(o+"[]")+"="+encodeURIComponent(e)}).join("&"):encodeURIComponent(o)+"="+encodeURIComponent(a);n.push(l)}return n.join("&")}function N(e){for(var t=e.split("&"),n={},r=0,o=t.length;o>r;r++){var a=t[r].split("=");n[decodeURIComponent(a[0])]=a[1]?decodeURIComponent(a[1]):""}return n}function C(e){var t=f(e);s(e.childNodes,K[t]),K[t]=n}function b(e){var t=o.prop();return e.then(t),t.then=function(n,r){return e=e.then(n,r).then(t),t},t}function E(e,t){function n(e){d=e||u,h.map(function(e){d===s&&e.resolve(f)||e.reject(f)})}function r(e,t,n,r){if((null!=f&&$.call(f)===J||typeof f===P)&&typeof e===P)try{var a=0;e.call(f,function(e){a++||(f=e,t())},function(e){a++||(f=e,n())})}catch(i){o.deferred.onerror(i),f=i,n()}else r()}function a(){var u;try{u=f&&f.then}catch(h){return o.deferred.onerror(h),f=h,d=l,a()}r(u,function(){d=i,a()},function(){d=l,a()},function(){try{d===i&&typeof e===P?f=e(f):d===l&&"function"==typeof t&&(f=t(f),d=i)}catch(a){return o.deferred.onerror(a),f=a,n()}f===c?(f=TypeError(),n()):r(u,function(){n(s)},n,function(){n(d===i&&s)})})}var i=1,l=2,s=3,u=4,c=this,d=0,f=0,h=[];c.promise={},c.resolve=function(e){return d||(f=e,d=i,a()),this},c.reject=function(e){return d||(f=e,d=l,a()),this},c.promise.then=function(e,t){var n=new E(e,t);return d===s?n.resolve(f):d===u?n.reject(f):h.push(n),n.promise}}function S(e){return e}function O(e){if(!e.dataType||"jsonp"!==e.dataType.toLowerCase()){var r=new t.XMLHttpRequest;if(r.open(e.method,e.url,!0,e.user,e.password),r.onreadystatechange=function(){4===r.readyState&&(r.status>=200&&r.status<300?e.onload({type:"load",target:r}):e.onerror({type:"error",target:r}))},e.serialize===JSON.stringify&&e.data&&"GET"!==e.method&&r.setRequestHeader("Content-Type","application/json; charset=utf-8"),e.deserialize===JSON.parse&&r.setRequestHeader("Accept","application/json, text/*"),typeof e.config===P){var o=e.config(r,e);null!=o&&(r=o)}var a="GET"!==e.method&&e.data?e.data:"";if(a&&$.call(a)!=M&&a.constructor!=t.FormData)throw"Request data should be either be a string or FormData. Check the `serialize` option in `m.request`";return r.send(a),r}var i="mithril_callback_"+(new Date).getTime()+"_"+Math.round(1e16*Math.random()).toString(36),l=T.createElement("script");t[i]=function(r){l.parentNode.removeChild(l),e.onload({type:"load",target:{responseText:r}}),t[i]=n},l.onerror=function(){return l.parentNode.removeChild(l),e.onerror({type:"error",target:{status:500,responseText:JSON.stringify({error:"Error making jsonp request"})}}),t[i]=n,!1},l.onload=function(){return!1},l.src=e.url+(e.url.indexOf("?")>0?"&":"?")+(e.callbackKey?e.callbackKey:"callback")+"="+i+"&"+x(e.data||{}),T.body.appendChild(l)}function j(e,t,n){if("GET"===e.method&&"jsonp"!=e.dataType){var r=e.url.indexOf("?")<0?"?":"&",o=x(t);e.url=e.url+(o?r+o:"")}else e.data=n(t);return e}function k(e,t){var n=e.match(/:[a-z]\w+/gi);if(n&&t)for(var r=0;r<n.length;r++){var o=n[r].slice(1);e=e.replace(n[r],t[o]),delete t[o]}return e}var T,A,R,D,J="[object Object]",q="[object Array]",M="[object String]",P="function",$={}.toString,L=/(?:(^|#|\.)([^#\.\[\]]+))|(\[.+?\])/g,B=/\[(.+?)(?:=("|'|)(.*?)\2)?\]/,I=/^(AREA|BASE|BR|COL|COMMAND|EMBED|HR|IMG|INPUT|KEYGEN|LINK|META|PARAM|SOURCE|TRACK|WBR)$/;r(t);var U,z={appendChild:function(e){U===n&&(U=T.createElement("html")),T.documentElement&&T.documentElement!==e?T.replaceChild(e,T.documentElement):T.appendChild(e),this.childNodes=T.childNodes},insertBefore:function(e){this.appendChild(e)},childNodes:[]},H=[],K={};o.render=function(e,t,r){var o=[];if(!e)throw new Error("Please ensure the DOM element exists before rendering a template into it.");var i=f(e),l=e===T,u=l||e===T.documentElement?z:e;l&&"html"!=t.tag&&(t={tag:"html",attrs:{},children:t}),K[i]===n&&s(u.childNodes),r===!0&&C(e),K[i]=a(u,null,n,n,t,K[i],!1,0,null,n,o);for(var c=0,d=o.length;d>c;c++)o[c]()},o.trust=function(e){return e=new String(e),e.$trusted=!0,e},o.prop=function(e){return(null!=e&&$.call(e)===J||typeof e===P)&&typeof e.then===P?b(e):h(e)};var Q,F=[],G=[],V=[],_=null,Y=0,W=null,X=[],Z=16;o.module=function(e,t){if(!e)throw new Error("Please ensure the DOM element exists before rendering a template into it.");if(e.view)return p(e,[].slice.call(arguments,1));var n=F.indexOf(e);0>n&&(n=F.length);for(var r,a=!1,i={preventDefault:function(){a=!0}},l=0;r=X[l];l++)r.handler(i),r.controller.onunload=null;if(a)for(var r,l=0;r=X[l];l++)r.controller.onunload=r.handler;else X=[];if(V[n]&&typeof V[n].onunload===P&&V[n].onunload(i),!a){o.redraw.strategy("all"),o.startComputation(),F[n]=e,arguments.length>2&&(t=p(t,[].slice.call(arguments,2)));var s=Q=t=t||{},u=t.controller||function(){},c=new u;return s===Q&&(V[n]=c,G[n]=t),rt(),V[n]}};var et=!1;o.redraw=function(e){et||(et=!0,_&&e!==!0?(new Date-Y>Z||R===t.requestAnimationFrame)&&(_>0&&D(_),_=R(g,Z)):(g(),_=R(function(){_=null},Z)),et=!1)},o.redraw.strategy=o.prop();var tt=function(){return""},nt=0;o.startComputation=function(){nt++},o.endComputation=function(){nt=Math.max(nt-1,0),0===nt&&o.redraw()};var rt=function(){"none"==o.redraw.strategy()?(nt--,o.redraw.strategy("diff")):o.endComputation()};o.withAttr=function(e,t){return function(n){n=n||event;var r=n.currentTarget||this;t(e in r?r[e]:r.getAttribute(e))}};var ot,at,it={pathname:"",hash:"#",search:"?"},lt=function(){};return o.route=function(){if(0===arguments.length)return at;if(3===arguments.length&&$.call(arguments[1])===M){var e=arguments[0],n=arguments[1],r=arguments[2];lt=function(t){var a=at=m(t);v(e,r,a)||o.route(n,!0)};var a="hash"===o.route.mode?"onhashchange":"onpopstate";t[a]=function(){var e=A[o.route.mode];"pathname"===o.route.mode&&(e+=A.search),at!=m(e)&&lt(e)},W=w,t[a]()}else if(arguments[0].addEventListener||arguments[0].attachEvent){{var i=arguments[0];arguments[1],arguments[2]}i.href=("pathname"!==o.route.mode?A.pathname:"")+it[o.route.mode]+this.attrs.href,i.addEventListener?(i.removeEventListener("click",y),i.addEventListener("click",y)):(i.detachEvent("onclick",y),i.attachEvent("onclick",y))}else if($.call(arguments[0])===M){var l=at;at=arguments[0];var s=arguments[1]||{},u=at.indexOf("?"),c=u>-1?N(at.slice(u+1)):{};for(var d in s)c[d]=s[d];var f=x(c),h=u>-1?at.slice(0,u):at;f&&(at=h+(-1===h.indexOf("?")?"?":"&")+f);var p=(3===arguments.length?arguments[2]:arguments[1])===!0||l===arguments[0];t.history.pushState?(W=function(){t.history[p?"replaceState":"pushState"](null,T.title,it[o.route.mode]+at),w()},lt(it[o.route.mode]+at)):(A[o.route.mode]=at,lt(it[o.route.mode]+at))}},o.route.param=function(e){if(!ot)throw new Error("You must call m.route(element, defaultRoute, routes) before calling m.route.param()");return ot[e]},o.route.mode="search",o.deferred=function(){var e=new E;return e.promise=b(e.promise),e},o.deferred.onerror=function(e){if("[object Error]"===$.call(e)&&!e.constructor.toString().match(/ Error/))throw e},o.sync=function(e){function t(e,t){return function(o){return i[e]=o,t||(n="reject"),0===--a&&(r.promise(i),r[n](i)),o}}var n="resolve",r=o.deferred(),a=e.length,i=new Array(a);if(e.length>0)for(var l=0;l<e.length;l++)e[l].then(t(l,!0),t(l,!1));else r.resolve([]);return r.promise},o.request=function(e){e.background!==!0&&o.startComputation();var t=o.deferred(),n=e.dataType&&"jsonp"===e.dataType.toLowerCase(),r=e.serialize=n?S:e.serialize||JSON.stringify,a=e.deserialize=n?S:e.deserialize||JSON.parse,i=e.extract||function(e){return 0===e.responseText.length&&a===JSON.parse?null:e.responseText};return e.url=k(e.url,e.data),e=j(e,e.data,r),e.onload=e.onerror=function(n){try{n=n||event;var r=("load"===n.type?e.unwrapSuccess:e.unwrapError)||S,l=r(a(i(n.target,e)),n.target);if("load"===n.type)if($.call(l)===q&&e.type)for(var s=0;s<l.length;s++)l[s]=new e.type(l[s]);else e.type&&(l=new e.type(l));t["load"===n.type?"resolve":"reject"](l)}catch(n){o.deferred.onerror(n),t.reject(n)}e.background!==!0&&o.endComputation()},O(e),t.promise(e.initialValue),t.promise},o.deps=function(e){return r(t=e||t),t},o.deps.factory=e,o}("undefined"!=typeof window?window:{});"undefined"!=typeof module&&null!==module&&module.exports?module.exports=m:"function"==typeof define&&define.amd&&define(function(){return m});var p=function(e){"use strict";function t(){if("undefined"==typeof JSONPath)throw new Error("JSONPath is required: ()");return JSONPath}function n(t,r){for(var o in r)if("object"!=typeof t[o])t[o]=t[o]===e?r[o]:t[o];else{if(c.call(t[o])==l){delete t[o];continue}t[o]=n(t[o],r[o])}return t}function r(e){return JSON.parse(JSON.stringify(e))}function o(e,t,n){o.setOptions(n,t);var r=d(o.getState(t),e||{});o.map(t,r)}function a(n,r,o){var a=t().hashCode(JSON.stringify({proc:r,parms:o}));m[a]=m[a]={},m[a].fun||(m[a].fun=Function(r.code)),o=o||{};for(var i in r.parms)o[i]=o[i]===e?r.parms[i]:o[i];var l={results:n,params:o},s=m[a].fun.apply(l);return s?s:l.results}var i="[object Object]",l="[object Null]",s="[object Array]",u="[object String]",c={}.toString,d=function(e,t){for(var n in t)if("object"!=typeof e[n])e[n]=t[n];else if("object"==typeof t[n]){if(c.call(t[n])==l){delete e[n];continue}e[n]=d(e[n],t[n])}return e},f="rootid",h={jsonPathOptions:{}},p={},g={};o.model=function(){return{stores:{},queries:{},procs:{}}},o.setOptions=function(e,t){p=e,o.settings(e,t)},o.getOptions=function(){return p},o.settings=function(e){return g=d(h,e)},o.map=function(e,t){return this.state=this.state||{},e?(this.state[e]=t||this.state[e]||o.model(),this.state[e]):(this.state[f]=t||this.state[f]||o.model(),this.state[f])},o.setState=function(e,t){var r=n(e||{},o.model());o.map(t,r)},o.getState=function(e){return r(o.map(e))},o.setDataStore=function(e,t,n){o.map(n).stores[e]=t},o.getDataStore=function(e,t){return o.map(t).stores[e]},o.removeDataStore=function(e,t){delete o.map(t).stores[e]},o.emptyDataStore=function(e,t){o.map(t).stores[e]={}},o.setJsonQuery=function(e,t,n,r){o.map(r).queries[e]={query:t,store:n}},o.getJsonQuery=function(e,t){return o.map(t).queries[e]},o.getJsonQueryResult=function(e,n,r){var a=o.getJsonQuery(e,r),i=o.getDataStore(a.store,r);for(var l in n)a.query=a.query.split(l).join(n[l]);var s=t()(o.settings().jsonPathOptions,i,a.query);return s},o.setStoredProc=function(e,t,n,r,a){o.map(a).procs[e]={queries:c.call(t)==s?t:t.split(","),code:n,parms:r}},o.getStoredProc=function(e,t){return o.map(t).procs[e]},o.getStoredProcResult=function(e,t,n){var r=o.getStoredProc(e,n),i=[];return i=r.queries.map(function(e){var r={};return r[e]=o.getJsonQueryResult(e,t,n),r}),a(i,r,t)},o.proc=function(e,n,r,l,s,d){if(1==arguments.length&&c.call(e)==i)return o.getStoredProcResult(e.name,e.parms,e.id);if(e)return o.setStoredProc(e,r,l,s,d);c.call(n)==u&&(n=o.getDataStore(n,d));var f=r.map(function(e){if(o.getJsonQuery(e,d))return o.getJsonQueryResult(e,s,d);for(var r in s)e=e.split(r).join(s[r]);return t()(o.settings().jsonPathOptions,n,e)}),h={parms:s,code:l};return a(f,h,s)};var m={};return o}();"undefined"!=typeof module&&null!==module&&module.exports?module.exports=p:"function"==typeof define&&define.amd&&define(function(){return p});