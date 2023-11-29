function t(t,e,s,i){var o,l=arguments.length,r=l<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(l<3?o(r):l>3?o(e,s,r):o(e,s))||r);return l>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;class l{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new l(s,t,i)},n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",v=c.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},m=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},u="finalized";class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(u))return!1;this[u]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{s?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((s=>{const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=g){var i;const o=this.constructor._$Ep(t,s);if(void 0!==o&&!0===s.reflect){const l=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:p).toAttribute(e,s.type);this._$El=t,null==l?this.removeAttribute(o):this.setAttribute(o,l),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=i.getPropertyOptions(o),l="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:p;this._$El=o,this[o]=l.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||m)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var x;_[u]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==v||v({ReactiveElement:_}),(null!==(a=c.reactiveElementVersions)&&void 0!==a?a:c.reactiveElementVersions=[]).push("1.6.3");const y=window,f=y.trustedTypes,$=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,b="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,N="?"+w,k=`<${N}>`,A=document,S=()=>A.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,D="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,O=/>/g,L=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,P=/"/g,U=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),T=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),B=new WeakMap,I=A.createTreeWalker(A,129,null,!1);function V(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==$?$.createHTML(e):e}const F=(t,e)=>{const s=t.length-1,i=[];let o,l=2===e?"<svg>":"",r=M;for(let e=0;e<s;e++){const s=t[e];let n,a,c=-1,d=0;for(;d<s.length&&(r.lastIndex=d,a=r.exec(s),null!==a);)d=r.lastIndex,r===M?"!--"===a[1]?r=z:void 0!==a[1]?r=O:void 0!==a[2]?(U.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=L):void 0!==a[3]&&(r=L):r===L?">"===a[0]?(r=null!=o?o:M,c=-1):void 0===a[1]?c=-2:(c=r.lastIndex-a[2].length,n=a[1],r=void 0===a[3]?L:'"'===a[3]?P:R):r===P||r===R?r=L:r===z||r===O?r=M:(r=L,o=void 0);const h=r===L&&t[e+1].startsWith("/>")?" ":"";l+=r===M?s+k:c>=0?(i.push(n),s.slice(0,c)+b+s.slice(c)+w+h):s+w+(-2===c?(i.push(void 0),e):h)}return[V(t,l+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,l=0;const r=t.length-1,n=this.parts,[a,c]=F(t,e);if(this.el=G.createElement(a,s),I.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=I.nextNode())&&n.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(b)||e.startsWith(w)){const s=c[l++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+b).split(w),e=/([.?@])?(.*)/.exec(s);n.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?Q:"@"===e[1]?Y:K})}else n.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(U.test(i.tagName)){const t=i.textContent.split(w),e=t.length-1;if(e>0){i.textContent=f?f.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],S()),I.nextNode(),n.push({type:2,index:++o});i.append(t[e],S())}}}else if(8===i.nodeType)if(i.data===N)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(w,t+1));)n.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function q(t,e,s=t,i){var o,l,r,n;if(e===T)return e;let a=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const c=C(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==c&&(null===(l=null==a?void 0:a._$AO)||void 0===l||l.call(a,!1),void 0===c?a=void 0:(a=new c(t),a._$AT(t,s,i)),void 0!==i?(null!==(r=(n=s)._$Co)&&void 0!==r?r:n._$Co=[])[i]=a:s._$Cl=a),void 0!==a&&(e=q(t,a._$AS(t,e.values),a,i)),e}class W{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:A).importNode(s,!0);I.currentNode=o;let l=I.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(l,l.nextSibling,this,t):1===a.type?e=new a.ctor(l,a.name,a.strings,this,t):6===a.type&&(e=new tt(l,this,t)),this._$AV.push(e),a=i[++n]}r!==(null==a?void 0:a.index)&&(l=I.nextNode(),r++)}return I.currentNode=A,o}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{constructor(t,e,s,i){var o;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),C(t)?t===H||null==t||""===t?(this._$AH!==H&&this._$AR(),this._$AH=H):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>E(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==H&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(V(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(s);else{const t=new W(o,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new G(t)),e}T(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.k(S()),this.k(S()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,s,i,o){this.type=1,this._$AH=H,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let l=!1;if(void 0===o)t=q(this,t,e,0),l=!C(t)||t!==this._$AH&&t!==T,l&&(this._$AH=t);else{const i=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=q(this,i[s+r],e,r),n===T&&(n=this._$AH[r]),l||(l=!C(n)||n!==this._$AH[r]),n===H?t=H:t!==H&&(t+=(null!=n?n:"")+o[r+1]),this._$AH[r]=n}l&&!i&&this.j(t)}j(t){t===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===H?void 0:t}}const Z=f?f.emptyScript:"";class Q extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==H?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class Y extends K{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=q(this,t,e,0))&&void 0!==s?s:H)===T)return;const i=this._$AH,o=t===H&&i!==H||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,l=t!==H&&(i===H||o);o&&this.element.removeEventListener(this.name,this,i),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const et=y.litHtmlPolyfillSupport;null==et||et(G,X),(null!==(x=y.litHtmlVersions)&&void 0!==x?x:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var st,it;class ot extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,o;const l=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=l._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=r=new X(e.insertBefore(S(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return T}}ot.finalized=!0,ot._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:ot});const lt=globalThis.litElementPolyfillSupport;null==lt||lt({LitElement:ot}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,nt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function at(t){return(e,s)=>void 0!==s?((t,e,s)=>{e.constructor.createProperty(s,t)})(t,e,s):nt(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var ct;null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;var dt=r`
hr {
    width: 100%;
    border-color: var(--divider-color);
    }

ha-card {
/* --primary-backgound-color: #111111;
    --secondary-background-color:#282828;
    --primary-text-color:#e1e1e1;
    --card-background-color: #1c1c1c;
    --primary-color: #03a9f4;
    -secondary-text-color: #e1e1e1;
    --divider-color: rgba(225, 225, 225, .12); */

    /* --slider-height: 350px; */
    /* --slider-width: 50px; */
    /* --label-width: calc(var(--slider-width) - 15%); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    /* background-color: var(--card-background-color); */
    /* border: 1px solid rgb(214, 203, 203); */
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    padding: 20px;
}


        ha-icon {
            color: var(--state-icon-color);
        }

        ha-switch {
            cursor: Pointer;
        }

        .main-container {
            display: flex;
            width: 100%;
            flex-direction: column;
            
        }

        .select-options-container, .info-container {
            display: flex;
            flex-direction:row;
            
        }

        .select-options-item{
            width: 100%;
            border: 3px double var(--divider-color);
        }

        .info-item {
            width: 100%;
            border: 3px double var(--divider-color);
        }

        .info-value {
            width: 100%;
            display: flex;
            justify-content: center;
            
        }

        .info-item-title {
            height: 18px;
            font-size: smaller;
            background-color: var(--mdc-select-fill-color);
            display: flex;
            justify-content: center;
        }

        .options-container {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
        }

        .options-left {
            width: 50%;
        }

        .options-right {
            width: 50%;
            /* height: 100px; */
            
        }
        .option-select-title {
            height: 18px;
            padding-left: 1em;
            font-size: smaller;
            background-color: var(--mdc-select-fill-color);
        }

        .options-select {
            padding: 1px 0px 1px 0.6em;
            font-size: 1em;
            outline: none;
            border-top-color: transparent;
            border-right-color: transparent;
            border-left-color: transparent;
            border-bottom: 1px solid var(--mdc-select-fill-color);
            width: 100%;
        }

        .space-between-options-item {
            margin: 15px 0px 15px 15px;
            display:flex; 
            justify-content:space-between;
        }


        .lux-container-top {
            display:flex;
            flex-direction: row;
            margin-top:10px;
            background-color: var(--mdc-select-fill-color);
            border-top: 3px double var(--divider-color);
            border-left: 3px double var(--divider-color);
            border-right: 3px double var(--divider-color);
        }

        .lux-container-bottom {
            display:flex;
            flex-direction: row;
            border-bottom: 3px double var(--divider-color);
            border-left: 3px double var(--divider-color);
            border-right: 3px double var(--divider-color);
        }

        .lux-center-item {
            width:15%;
            display:flex;
            align-items:center;
            justify-content: center;
        }
    
        .reset {
            display: grid;
            grid-template-columns: 50% 50%;
            width:100%;
            gap: 10px 10px;

        }
        .grid-item-reset {
            cursor: pointer;
            width:100%;
            aspect-ratio: 5 / 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            backgound-color: red;
            border: 1px solid var(--divider-color);
            border-radius: 15px;
            background: linear-gradient(135deg, transparent, rgba(0, 0, 0, 0.15));
        }

        .grid-item-content {
            display:flex;
            flex-direction: row;
            width: 60%;
            justify-content: center;
            align-items: center;
        }
    
    .gates-container {
        display:flex;
        flex-direction: row;
        /* width:100%;  */
        justify-content: center;
        /* background-color: burlywood; */
        /* width: var(--card-width2); */
        overflow: hidden;
    }
    .inner-gates-container {
        width:var(--slider-width);
        display:flex;
        flex-direction:column;
        align-items:center;
        /* height:100%; */
        /* margin:auto; */
    }
    /* .gates-container > .inner-gates-container > .cover {
    width: var(--coverdistance);
    display:inline-block;
    } */
    
    .div-input-value{
        height: calc(var(--slider-width) / 4);
        margin-left: calc(var(--slider-width) / 2.5);
        margin-top: 15%;
    }

    h2{
        /* z-index: 1; */
        color: var(--card-background-color);
    border: 1px solid var(--divider-color);
    background-color: var(--primary-color);
    width: calc(var(--slider-width) / 2.4);
    height:calc(var(--slider-width) / 4);
    border-radius: calc(var(--slider-width) /12);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(var(--slider-width) /4.5);
    margin-top:0;

    }
    .distance_sensor_value {
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-backgound-color);
        
        border: 1px solid var(--divider-color);
        width: var(--label-width);
        aspect-ratio: 2 / 1;
        border-radius: 5px;;
        
    color: var(--primary-text-color);
    display: flex;

    margin-bottom: 10px;
    
    font-size: calc(var(--slider-width) /4);
    margin-top:0;
    margin-left: 14px;
    margin-right: 14px;;
    }
    /* .distance_sensor_value:after {
    content: "%";
    padding-left: 1px;
    font-size: 10px;
    } */

    .value-off {
        background-color: var(--disabled-text-color);
        color: var(--card-background-color)
    }

    .g-name{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-backgound-color);
        
        border: 1px solid var(--divider-color);
        width: var(--label-width);
        aspect-ratio: 2 / 1;
        border-radius: 5px;;
        
    color: var(--primary-text-color);
    display: flex;

    margin-bottom: 10px;
    
    font-size: calc(var(--slider-width) / 3.2);
    margin-top:10px;
    margin-left: 14px;
    margin-right: 14px;;
    }

    .g-name-off {

        background-color: var(--disabled-text-color);
        color:var(--card-background-color)

        }

        .slider-off {
        border: 1px solid var(--divider-color);
    height: var(--slider-height);
    width: var(--slider-width);
    color: var(--disabled-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    

    }
    
    
    .range-holder {
    height: var(--slider-height);
    position:relative;
    cursor:pointer;
    /* display: block; */
    
    }
    .range-holder input[type="range"] {
    outline: 0;
    cursor: pointer;
    border: 1px solid var(--divider-color);
    width: var(--slider-height);
    margin: 0;
    transition: box-shadow 0.2s ease-in-out;
    -webkit-transform:rotate(270deg);
    -moz-transform:rotate(270deg);
    -o-transform:rotate(270deg);
    -ms-transform:rotate(270deg);
    transform:rotate(270deg);
    overflow: hidden;
    height: var(--slider-width);
    -webkit-appearance: none;
    background: linear-gradient(to right, rgba(255, 0, 0, 0.4) 96%, rgba(255, 0, 0, 0.4) 4%);
    /* background-size: 30% 100%; */
    background-repeat: no-repeat;
    position: absolute;
    top: calc(50% - (var(--slider-width) / 2));
    right: calc(50% - (var(--slider-height) / 2));
    }
    .range-holder input[type="range"]::-webkit-slider-runnable-track {
    height: var(--slider-width);
    -webkit-appearance: none;
    color: #e0c2c2;
    margin-top: -1px;
    transition: box-shadow 0.2s ease-in-out;
    }
    .range-holder input[type="range"]::-webkit-slider-thumb {
    width: 6px;
    -webkit-appearance: none;
    height: var(--slider-width);
    cursor: ns-resize;
    background: var(--primary-color);
    border-radius: 5px;
    transition: box-shadow 0.2s ease-in-out;
    position: relative;
    }


    .number-of-gates {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 12% 88%;

        

        /* background-color: var(--switch-checked-button-color); */
    }

    .input-number-of-gates {
        appearance: none;
        flex-grow: 1;
        background-color:  transparent;
        border: 1px solid var(--divider-color);
        border-radius: 0px 10px 10px 0px;
        margin-left:10.1%;
        outline: none;
        overflow: hidden;


        /* padding-right: 10px; */
    }

    .input-number-of-gates::-webkit-slider-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 3px solid var(--primary-color);
        box-shadow: calc((var(--card-width) + 7px) * -1 ) 0 0 400px #27a0ff;
    }

    .ruler-meter-div {
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
        border-radius: 0px 0px 9px 9px;
    }
    .ruler-meter-div-meter {
        background-color: rgba(255, 0, 0, 0.6);
        
        height: 100%;
        border-radius: 0px 9px 9px 9px;
    } 

    .select-ld-device {
    padding: 0.6rem;
    border-color: transparent;
    background-color: transparent;
    outline: none;
    font-size: large;
    cursor: pointer;
    }

    .div-timeout {

    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    background-color: transparent;
    }

    /* buttons */

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        width:  fit-content;
        

        }

        .cta {
        position: relative;
        /* padding: 5px 10px; */
        transition: all 0.2s ease;
        height: 30px;
        cursor: pointer;
        /* width: 350px; */
        }
        .cta:before {
        content: "";
        position: absolute;
        /* top: 0;
        left: 0; */
        display: block;
        border-radius: 28px;
        background: var(--primary-color);
        aspect-ratio: 1 / 1;
        height: 100%;
        transition: all 0.3s ease;
        }
        .cta span {
        position: relative;
        font-size: 8px;
        line-height: 18px;
        font-weight: 900;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        vertical-align: middle;
        margin: 0px 10px 0px 10px;
        
        
        }

        .cta:hover,
        .cta:hover > span {
            color: var(--card-background-color);
        }

        .cta:hover:before {
            width: 100%;
            background: var(--primary-color);
            color: var(--card-background-color);
        }

        .cta:active, .grid-item-reset:active {
        transform: scale(0.96);
        border-color: var(--primary-color);
        }

        .cta-active {
            width: 100%;
            background: var(--primary-color);
            color: var(--card-background-color);
            border-radius: 15px;
            width:  fit-content;
        }

        .man-meter {
            cursor: pointer;
            --mdc-icon-size: 50px;
            transform: scaleX(-1);
            -moz-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            -ms-transform: scaleX(-1);
            margin-top:30px
        }
`;const ht="ld2410-control-card",vt="ld2410-control-editor";function pt(t,e,s){let i=Object.keys(t.entities).filter((s=>t.entities[s].platform===e)).filter((t=>t.includes(s)));const o=/sensor/;return i.filter((t=>o.test(t)))}let mt=class extends ot{static get properties(){return{hass:{},_config:{}}}setConfig(t){this._config=t}configChanged(t){const e=Object.assign({},this._config);e[t.target.name.toString()]=t.target.value,this._config=e;const s=new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0});this.dispatchEvent(s)}configChangedBool(t){const e=t.target.name,s="true"===t.target.value,i=Object.assign({},this._config);i[e]=s,this._config=i;const o=new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0});this.dispatchEvent(o)}colorsConfigChanged(t){var e;const s=Object.assign({},this._config);s.devices_name=Object.assign({},null!==(e=s.devices_name)&&void 0!==e?e:{}),s.devices_name[t.target.name.toString()]=t.target.value,this._config=s;const i=new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0});this.dispatchEvent(i)}getLD2410DeviceNameDropdown(t){let e=pt(this.hass,"esphome","ld2410_device_name"),s=j``;return""==this._config.device_name&&(s=j`<option value="" selected> - - - - </option> `),j`
            ${"device name selector"}:<br>
            <select name="device_name" id="device_name" class="select-item" .value="${t}"
                    @focusout=${this.configChanged}
                    @change=${this.configChanged} >
                ${s}
                ${e.map((t=>t!=this._config.device_name?j`<option value="${this.hass.states[t].state}">${this.hass.states[t].state||t}</option> `:j`<option value="${this.hass.states[t].state}" selected>${this.hass.states[t].state||t}</option> `))}
            </select>
            <br>
            <br>`}selectColors(t){let e=pt(this.hass,"esphome","ld2410_device_name"),s=j``;return t&&t.devices_name||(t={devices_name:{}}),this._config.device_name,j`
        <div class="heading">${"device name selector"}:</div>
        <select name="ld_device" id="ld_device" class="select-item" .value="${t}"
                @focusout=${this.colorsConfigChanged}
                @change=${this.colorsConfigChanged}>
            ${s}
            ${e.map((t=>j`<option value="${t}">${this.hass.states[t].state||t}</option> `))}
        </select>
    </div>
    `}render(){return j`
    <
            <!-- ${this.getLD2410DeviceNameDropdown(this._config.devices_name)} -->
            <!-- ${this.selectColors(this._config.devices_name)} -->


            Other functionalities must be configured manually in YAML editor
        `}static get styles(){return r`
 
        .color-selector {
            display: grid;
            grid-template-columns: auto 8ch 3ch;
            width: 40ch;
        }
 
        .color-item {
            padding: .6em;
            font-size: 1em;
        }
 
        .heading {
            font-weight: bold;
        }
 
        .select-item {
            background-color: var(--label-badge-text-color);
            width: 40ch;
            padding: .6em; 
            font-size: 1em;
        }
 
        `}};mt=t([rt(vt)],mt);console.groupCollapsed("%c LD 2410 CARD %c v0.1 installed ","color: orange; font-weight: bold; background: black","color: green; font-weight: bold;"),console.log("Readme:","https://github.com/madmicio"),console.groupEnd();console.info("%c  LG 2410 Control Card \n%c  version: v@LD2410_CONTROL_CARD@  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");const gt=window;gt.customCards=gt.customCards||[],gt.customCards.push({type:ht,name:"LD2410 Control Card pippo",preview:!0,description:"Control card for LD2410 Device"});let ut=class extends ot{static getConfigElement(){return document.createElement(vt)}static get properties(){return{hass:{},config:{},MovingDistanceNumber:{type:Number,reflect:!0},StillDistanceNumber:{type:Number,reflect:!0},ld2410Name:{},_parametroDistanza:{},_show_main:{},_show_options:{},_show_gmove:{},_show_still:{}}}constructor(){super(),this.ld2410Name="",this.ld2410Name="",this.handleSelectChange=this.handleSelectChange.bind(this),this._parametroDistanza=!0,this._show_options=!1,this._show_main=!0,this._show_gmove=!0,this._show_gstill=!1}setConfig(t){this.config=t}getCardSize(){return this.config.entities.length+1}render(){var t,e,s,i,o,l,r,n,a,c,d,h,v,p,m,g,u,_,x,y,f,$,b,w,N,k,A,S,C,E,D,M,z,O,L,R,P,U,T,H;this.getBrowserName();const B=this.getBoundingClientRect().width,I=(B-52)/8,V=B/1.4,F=B-52,G={[this.ld2410Name]:{engineering_mode:`switch.${this.ld2410Name}_engineering_mode`,precence_sensor:`binary_sensor.${this.ld2410Name}_presence`,DetectionDistance:`sensor.${this.ld2410Name}_detection_distance`,DistanceMoveDistance:`sensor.${this.ld2410Name}_moving_distance`,DistanceStillDistance:`sensor.${this.ld2410Name}_still_distance`,externalLightSensor:`sensor.${this.ld2410Name}_light_sensor`,move_distance_n_gates:`number.${this.ld2410Name}_max_move_distance_gate`,StillDistanceSensor:`sensor.${this.ld2410Name}_still_distance`,still_distance_n_gates:`number.${this.ld2410Name}_max_still_distance_gate`,distanceResolution:`select.${this.ld2410Name}_distance_resolution`,baudRate:`select.${this.ld2410Name}_baud_rate`,lightFunction:`select.${this.ld2410Name}_light_function`,lightTreshold:`number.${this.ld2410Name}_light_threshold`,lightSensor:`sensor.${this.ld2410Name}_light`,outPinLevel:`select.${this.ld2410Name}_out_pin_level`,outPinStatus:`binary_sensor.${this.ld2410Name}_out_pin_presence_status`,presenceLed:`switch.${this.ld2410Name}_deactivate_presence_led`,timeOut:`number.${this.ld2410Name}_timeout`,greenStatuLed:`light.${this.ld2410Name}_green_led_status`,bluetooth:`switch.${this.ld2410Name}_control_bluetooth`,rebootEsp:`button.${this.ld2410Name}_esp_reboot`,firmwareUpgrade:`update.${this.ld2410Name}_firmware`,firmwareVersion:`sensor.${this.ld2410Name}_firmware_version`,factoryRest:`button.${this.ld2410Name}_factory_reset`,macAddress:`sensor.${this.ld2410Name}_mac_address`,queryParams:`button.${this.ld2410Name}_query_params`,restart:`button.${this.ld2410Name}_restart`,gates:{g1:{gmove:`number.${this.ld2410Name}_g0_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g0_move_energy`,gstill:`number.${this.ld2410Name}_g0_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g0_still_energy`},g2:{gmove:`number.${this.ld2410Name}_g1_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g1_move_energy`,gstill:`number.${this.ld2410Name}_g1_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g1_still_energy`},g3:{gmove:`number.${this.ld2410Name}_g2_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g2_move_energy`,gstill:`number.${this.ld2410Name}_g2_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g2_still_energy`},g4:{gmove:`number.${this.ld2410Name}_g3_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g3_move_energy`,gstill:`number.${this.ld2410Name}_g3_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g3_still_energy`},g5:{gmove:`number.${this.ld2410Name}_g4_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g4_move_energy`,gstill:`number.${this.ld2410Name}_g4_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g4_still_energy`},g6:{gmove:`number.${this.ld2410Name}_g5_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g5_move_energy`,gstill:`number.${this.ld2410Name}_g5_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g5_still_energy`},g7:{gmove:`number.${this.ld2410Name}_g6_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g6_move_energy`,gstill:`number.${this.ld2410Name}_g6_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g6_still_energy`},g8:{gmove:`number.${this.ld2410Name}_g7_move_threshold`,gmoveenergie:`sensor.${this.ld2410Name}_g7_move_energy`,gstill:`number.${this.ld2410Name}_g7_still_threshold`,gstillenergie:`sensor.${this.ld2410Name}_g7_still_energy`}}}};G[this.ld2410Name].gates.g3.gmove;const q=G[this.ld2410Name].gates,W=null===(t=this.hass.states[G[this.ld2410Name].precence_sensor])||void 0===t?void 0:t.state;G[this.ld2410Name].precence_sensor;const X=null===(e=this.hass.states[G[this.ld2410Name].engineering_mode])||void 0===e?void 0:e.state,K=Number(null===(s=this.hass.states[G[this.ld2410Name].DetectionDistance])||void 0===s?void 0:s.state),J=Number(null===(i=this.hass.states[G[this.ld2410Name].DetectionDistance])||void 0===i?void 0:i.state),Z=Number(null===(o=this.hass.states[G[this.ld2410Name].StillDistanceSensor])||void 0===o?void 0:o.state);let Q,Y,tt,et;this.MovingDistanceNumber=null===(l=this.hass.states[G[this.ld2410Name].move_distance_n_gates])||void 0===l?void 0:l.state,this.StillDistanceNumber=null===(r=this.hass.states[G[this.ld2410Name].still_distance_n_gates])||void 0===r?void 0:r.state,"0.75m"===(null===(n=this.hass.states[G[this.ld2410Name].distanceResolution])||void 0===n?void 0:n.state)?(Q=["0,75m","1,50m","2,25m","3,00m","3,75m","4,50m","5,25m","6,00m"],Y=J/600*88,tt=Z/600*88,et=K/600*88):(Q=["0.20m","0.40m","0.60m","0.80m","1.00m","1.20m","1.40m","1.60m"],Y=J/160*88,tt=J/160*88,et=K/160*88);const st=Number(Y>88?88:Y),it=Number(tt>88?88:tt),ot=Number(et>88?88:et);return j`
            <ha-card style="--card-width: ${F}px;--slider-width: ${I}px; --slider-height: ${V}px;">
          
            <svg version="1.1"  id="scg  header" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 402 60" style="enable-background:new 0 0 402 60;" xml:space="preserve">
            path
            <style type="text/css">
                .button_color{stroke:var(--fc-button-border-color);stroke-width:1;stroke-miterlimit:10;}
                .presence{fill:url(#presence);}
                .no_presence{fill:url(#no_presence);}
                .hilink_button_overlay{opacity:0.59;fill:url(#SVGID_1_);}
                .shilink_tecxt_color{fill:#045CAA;}
                .hilink_red_color{fill:#D90D1D;}
                .hilink_shape_color{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                .hilink_precence_font_family{font-family:'arial';}
                .hilink_precence_font_size{font-size:12px; fill: var(--primary-text-color);}
            </style>
            <g  >
                <linearGradient id="no_presence" gradientUnits="userSpaceOnUse" x1="308.0827" y1="-2.2635" x2="371.9173" y2="61.571">
                    <stop  offset="0" style="stop-color:#00A000"/>
                    <stop  offset="0.7201" style="stop-color:#006200"/>
                </linearGradient>
                <linearGradient id="presence" gradientUnits="userSpaceOnUse" x1="308.0827" y1="-2.2635" x2="371.9173" y2="61.571">
                    <stop  offset="0" style="stop-color:#FF0000"/>
                    <stop  offset="0.7201" style="stop-color:#AB0000"/>
                </linearGradient>
                <path class="button_color ${"on"===W?"presence":"no_presence"}" d="M380.5,46.15h-81c-9.11,0-16.5-7.39-16.5-16.5v0c0-9.11,7.39-16.5,16.5-16.5h81c9.11,0,16.5,7.39,16.5,16.5v0
                    C397,38.77,389.61,46.15,380.5,46.15z"/>
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="339.9585" y1="15.8067" x2="339.9585" y2="35.4195">
                        <stop  offset="0" style="stop-color:#FFFFFF"/>
                        <stop  offset="0.8026" style="stop-color:;stop-opacity:0"/>
                    </linearGradient>
                <path class="hilink_button_overlay" d="M380.96,15.81h-82c-5.42,0-9.81,4.39-9.81,9.81v0c0,5.42,4.39,9.81,9.81,9.81h82c5.42,0,9.81-4.39,9.81-9.81v0
                    C390.77,20.2,386.38,15.81,380.96,15.81z"/>
                <path @click=${()=>this._moreinfo(G[this.ld2410Name].precence_sensor)} style="fill:transparent; cursor:pointer" d="M380.5,46.15h-81c-9.11,0-16.5-7.39-16.5-16.5v0c0-9.11,7.39-16.5,16.5-16.5h81c9.11,0,16.5,7.39,16.5,16.5v0
                    C397,38.77,389.61,46.15,380.5,46.15z"/>
            </g>
            <g>
                <g>
                    <path class="shilink_tecxt_color" d="M26.46,45.3c-2.05,0-4.07,0-6.22,0c0.49-4.12,0.98-8.19,1.49-12.46c-1.59,0.79-2.88,1.69-4.16,2.6
                        c-1.59,1.12-3.05,2.39-4.4,3.78c-0.34,0.35-0.57,0.7-0.62,1.21c-0.16,1.58-0.37,3.16-0.58,4.82c-2.05,0-4.1,0-6.24,0
                        c-0.2-1.19-0.26-2.45,0.13-3.63c0.7-2.1,0.76-4.29,1.06-6.45c0.4-2.91,0.74-5.83,1.06-8.75c0.07-0.61,0.27-0.79,0.87-0.78
                        c1.8,0.03,3.61,0.01,5.52,0.01c-0.23,1.96-0.46,3.81-0.67,5.6c19.29-12.15,40.47-16.12,62.94-14.68
                        c-1.78,1.18-3.79,1.84-5.75,2.58c0.03,0.37,0.41,0.36,0.58,0.62c-0.13,0.03-0.25,0.08-0.36,0.08c-8.94,0.5-17.76,1.82-26.44,4.02
                        c-5.24,1.33-10.38,2.99-15.37,5.11c-0.63,0.27-0.87,0.62-0.95,1.3c-0.55,4.85-1.14,9.69-1.73,14.53
                        C26.58,44.99,26.51,45.13,26.46,45.3z"/>
                    <path class="shilink_tecxt_color" d="M113.17,20.06c-0.54,4.52-1.06,8.89-1.57,13.25c0.07,0.03,0.15,0.07,0.22,0.1c0.89-0.94,1.78-1.87,2.66-2.82
                        c1.21-1.3,2.42-2.61,3.63-3.91c0.25-0.27,0.49-0.57,0.93-0.57c2.3,0.01,4.61,0,7.14,0c-1.1,1.17-2.05,2.18-3.01,3.18
                        c-1.73,1.8-3.46,3.61-5.23,5.38c-0.47,0.47-0.52,0.76-0.12,1.32c2.17,3.05,4.3,6.12,6.55,9.34c-2,0-3.87-0.1-5.71,0.03
                        c-1.37,0.1-2.23-0.32-2.98-1.49c-1.2-1.86-2.59-3.6-3.9-5.39c-0.18-0.24-0.29-0.56-0.73-0.66c-0.31,2.48-0.61,4.95-0.93,7.45
                        c-2.18,0-4.3,0-6.5,0c0.25-2.13,0.5-4.23,0.75-6.33c0.73-6.02,1.47-12.04,2.18-18.06c0.07-0.61,0.23-0.87,0.9-0.86
                        C109.31,20.08,111.19,20.06,113.17,20.06z"/>
                    <path class="shilink_tecxt_color" d="M88.7,30.68c-0.61,4.95-1.21,9.77-1.81,14.62c-2.1,0-4.12,0-6.27,0c0.77-6.3,1.54-12.54,2.31-18.87
                        c0.95,0,1.82,0,2.69,0c3.94,0,7.88,0,11.82,0c3.49,0,5.88,2.46,5.56,5.94c-0.31,3.42-0.8,6.83-1.21,10.24
                        c-0.1,0.87-0.21,1.73-0.33,2.67c-2.09,0-4.16,0-6.28,0c0.49-4,0.98-7.96,1.44-11.93c0.24-2.08-0.31-2.67-2.39-2.67
                        C92.44,30.67,90.63,30.68,88.7,30.68z"/>
                    <path class="shilink_tecxt_color" d="M61.61,22.48c-0.31,2.54-0.6,4.95-0.89,7.37c-0.37,3.04-0.75,6.07-1.1,9.11c-0.16,1.4,0.57,2.2,2,2.21
                        c2.37,0.01,4.75,0,7.12,0c0.3,0,0.61,0,0.99,0c-0.18,1.44-0.34,2.76-0.51,4.17c-1.46,0-2.89,0-4.32,0c-2.12,0-4.25,0.01-6.37,0
                        c-3.18-0.01-5.59-2.64-5.24-5.85c0.48-4.41,1.04-8.81,1.59-13.21c0.12-0.98-0.14-2.28,0.54-2.84c0.66-0.55,1.89-0.44,2.88-0.58
                        C59.35,22.71,60.4,22.61,61.61,22.48z"/>
                    <path class="shilink_tecxt_color" d="M78.08,45.29c-2.16,0-4.18,0-6.27,0c0.31-2.6,0.61-5.13,0.92-7.67c0.41-3.41,0.83-6.82,1.21-10.23
                        c0.07-0.67,0.23-1,1-0.97c1.77,0.06,3.54,0.02,5.42,0.02C79.59,32.78,78.84,39.01,78.08,45.29z"/>
                    <path class="shilink_tecxt_color" d="M38.19,27.29c-0.78,6.09-1.53,12.02-2.29,18c-2.1,0-4.15,0-6.27,0c0.27-2.19,0.53-4.32,0.8-6.44
                        c0.36-2.82,0.73-5.63,1.08-8.45c0.05-0.43,0.14-0.76,0.6-0.94C34.04,28.69,35.99,27.94,38.19,27.29z"/>
                    <path class="shilink_tecxt_color" d="M51.03,37.01c-3.72,0-7.37,0-11.16,0c0.16-1.3,0.31-2.59,0.46-3.88c0.04-0.33,0.29-0.36,0.56-0.36
                        c3.49,0,6.99,0,10.63,0C51.36,34.23,51.2,35.6,51.03,37.01z"/>
                    <path class="shilink_tecxt_color" d="M101.73,23.51c-5.15-2.02-10.52-2.81-15.8-3.51c-0.18-0.45,0.16-0.5,0.19-0.74
                        c-0.65-0.41-1.32-0.76-2.09-0.97c-0.76-0.21-1.54-0.42-2.15-1.02C86.1,16.71,101.23,21.38,101.73,23.51z"/>
                    <path class="hilink_red_color" d="M73.31,19.18c1.36-0.84,2.77-0.96,3.85-1.73c1.11-0.79,1.13-2.37,2.2-3.57c0.14,2.76,1.19,4.56,4.07,5.04
                        c-1.22,1.04-2.75,0.99-3.6,2.13c-0.79,1.05-1.15,2.32-1.98,3.49c-0.37-1.27-0.12-2.64-0.89-3.69
                        C76.16,19.75,74.76,19.72,73.31,19.18z"/>
                    <path class="hilink_red_color" d="M15.02,20.06c-0.18,1.52-0.34,2.87-0.5,4.27c-2.09,0-4.11,0-6.28,0c0.16-1.32,0.31-2.61,0.47-3.89
                        c0.03-0.26,0.19-0.38,0.45-0.38C11.06,20.06,12.96,20.06,15.02,20.06z"/>
                    <path class="hilink_red_color" d="M23.29,20.06c2.11,0,4.13,0,6.15,0c0.22,1.75,0.07,1.98-1.43,2.59c-1.7,0.69-3.38,1.42-5.27,2.21
                        C22.93,23.21,23.1,21.69,23.29,20.06z"/>
                </g>
                <path class="hilink_shape_color" d="M1,50.98l379.5,0.16c11.88,0.01,21.5-9.62,21.5-21.5v0c0-11.87-9.62-21.5-21.5-21.5h-80.92
                    c-11.92,0-21.59,9.66-21.59,21.59v0c0,5.1-4.14,9.24-9.24,9.23l-128.85-0.15c-5.09-0.01-9.22-4.14-9.22-9.23V18.56
                    c0-5.84-4.74-10.58-10.58-10.58H1"/>
            </g>
            <text transform="matrix(1 0 0 1 152 32.7738)" class="hilink_precence_font_family hilink_precence_font_size">presence detection</text>
            </svg>

        <!-- #############################################################   fine header  ############################################################# -->
        <!-- #############################################################     options    ############################################################# -->

            <div class="main-container">
                <div style="display:flex;flex-direction:row;justify-content: center;align-items: center;font-size: large;"  >setup device:
                ${this.getLD2410DeviceNameDropdown(this.config.devices_name)}
                <div style="flex-grow:1"></div>
                 <ha-icon class="option" style="cursor: pointer;" icon="${!1===this._show_options?"mdi:cog-outline":"mdi:arrow-left-circle"}" @click="${()=>{this._show_options=!this._show_options,this._show_main=!this._show_main}}"></ha-icon>
                </div>
                <hr>
                ${this._show_options?j`
                <div class="select-options-container">
                    <div class="select-options-item">
                        <div class="option-select-title">Baud Rate</div>
                        ${this.select_box(G[this.ld2410Name].baudRate,null===(a=this.hass.states[G[this.ld2410Name].baudRate])||void 0===a?void 0:a.attributes.options,null===(c=this.hass.states[G[this.ld2410Name].baudRate])||void 0===c?void 0:c.state)}
                    </div>

                    <div class="select-options-item">
                        <div class="option-select-title">Out Pin Level</div>
                        ${this.select_box(G[this.ld2410Name].outPinLevel,null===(d=this.hass.states[G[this.ld2410Name].outPinLevel])||void 0===d?void 0:d.attributes.options,null===(h=this.hass.states[G[this.ld2410Name].outPinLevel])||void 0===h?void 0:h.state)}
                    </div>
                </div>
                <div class="select-options-container">
                    <div class="select-options-item">
                        <div class="option-select-title">Light Function</div>
                        ${this.select_box(G[this.ld2410Name].lightFunction,null===(v=this.hass.states[G[this.ld2410Name].lightFunction])||void 0===v?void 0:v.attributes.options,null===(p=this.hass.states[G[this.ld2410Name].lightFunction])||void 0===p?void 0:p.state)}
                    </div>
                    <div class="select-options-item">
                        <div class="option-select-title">Distance Resolution</div>
                        ${this.select_box(G[this.ld2410Name].distanceResolution,null===(m=this.hass.states[G[this.ld2410Name].distanceResolution])||void 0===m?void 0:m.attributes.options,null===(g=this.hass.states[G[this.ld2410Name].distanceResolution])||void 0===g?void 0:g.state)}
                    </div>
                </div>
                    ${"off"!=(null===(u=this.hass.states[G[this.ld2410Name].lightFunction])||void 0===u?void 0:u.state)?j` 
                    <div class="lux-container-top">
                        <div style="flex-grow: 1;padding-left: 1em;">lux treshold</div>
                        <div class="lux-center-item">sensor:</div>
                    </div>
                    <div class="lux-container-bottom">
                    <input 
                            style="flex-grow: 1;" 
                            type="range" 
                            id="lux_treshold" 
                            min="0" 
                            max="255" 
                            .value="${null===(_=this.hass.states[G[this.ld2410Name].lightTreshold])||void 0===_?void 0:_.state}"  
                            @input=${this.onRangeInputMove} 
                            @change=${t=>this._setNumber_direct(G[this.ld2410Name].lightTreshold,t.target.value)}> 
                        <div class="lux-center-item">${null===(x=this.hass.states[G[this.ld2410Name].lightTreshold])||void 0===x?void 0:x.state}</div>
                        <div class="lux-center-item">${"on"===X?null===(y=this.hass.states[G[this.ld2410Name].lightSensor])||void 0===y?void 0:y.state:"eng off"}</div>
                    </div>
                    `:j`
                    `}
                <div class="options-container">
                    <div class="options-left">
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].firmwareUpgrade)}>Firmware:</div>
                            <div>${"on"===(null===(f=this.hass.states[G[this.ld2410Name].firmwareUpgrade])||void 0===f?void 0:f.state)?"update available":"updated"}</div>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].firmwareVersion)}>Firmware ver.:</div>
                            <div>${null===($=this.hass.states[G[this.ld2410Name].firmwareVersion])||void 0===$?void 0:$.state}</div>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].macAddress)}>Mac address:</div>
                            <div>${null===(b=this.hass.states[G[this.ld2410Name].macAddress])||void 0===b?void 0:b.state}</div>
                        </div>
                    </div>
                    <div class="options-right">
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].presenceLed)}>${null===(w=this.hass.states[G[this.ld2410Name].presenceLed])||void 0===w?void 0:w.attributes.friendly_name}</div>
                            <ha-switch 
                            .checked="${"on"===(null===(N=this.hass.states[G[this.ld2410Name].presenceLed])||void 0===N?void 0:N.state)}"
                                @click="${()=>this._callservice(G[this.ld2410Name].presenceLed,"switch","toggle")}"
                            ></ha-switch>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].greenStatuLed)}>${null===(k=this.hass.states[G[this.ld2410Name].greenStatuLed])||void 0===k?void 0:k.attributes.friendly_name}</div>
                            <ha-switch 
                            .checked="${"on"===(null===(A=this.hass.states[G[this.ld2410Name].greenStatuLed])||void 0===A?void 0:A.state)}"
                                @click="${()=>this._callservice(G[this.ld2410Name].greenStatuLed,"light","toggle")}"
                            ></ha-switch>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].bluetooth)}>${null===(S=this.hass.states[G[this.ld2410Name].bluetooth])||void 0===S?void 0:S.attributes.friendly_name}</div>
                            <ha-switch 
                            .checked="${"on"===(null===(C=this.hass.states[G[this.ld2410Name].bluetooth])||void 0===C?void 0:C.state)}"
                                @click="${()=>this._callservice(G[this.ld2410Name].bluetooth,"switch","toggle")}"
                            ></ha-switch>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="reset">
                    <div class="grid-item-reset" @click="${()=>this._callservice(G[this.ld2410Name].rebootEsp,"button","press")}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:power-cycle" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">ESP reboot</div>
                        </div>
                    </div>
                    <div class="grid-item-reset" @click="${()=>this._callservice(G[this.ld2410Name].restart,"button","press")}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:restart" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">LD Restart</div>
                        </div>
                    </div>
                    <div class="grid-item-reset" @click="${()=>this._callservice(G[this.ld2410Name].factoryRest,"button","press")}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:restart-alert" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">Factory reset</div>
                        </div>
                    </div>
                    <div class="grid-item-reset" @click="${()=>this._callservice(G[this.ld2410Name].queryParams,"button","press")}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:database" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">Query params</div>
                        </div>
                    </div>
                </div>
                <hr>

                `:j`



            </div>


        <!-- #############################################################  fine options  ############################################################# -->

        <div class="info-container">
                    <div class="info-item">
                        <div class="info-item-title">Timeout</div>
                        <input class="div-timeout"  type="number" id="timeout" name="timeout" min="${null===(E=this.hass.states[G[this.ld2410Name].timeOut])||void 0===E?void 0:E.attributes.min}" max="${null===(D=this.hass.states[G[this.ld2410Name].timeOut])||void 0===D?void 0:D.attributes.max}" .value="${null===(M=this.hass.states[G[this.ld2410Name].timeOut])||void 0===M?void 0:M.state}"  @change=${t=>this._setNumber_direct(G[this.ld2410Name].timeOut,t.target.value)}>
                    </div>

                    <div class="info-item" style="cursor:pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].outPinStatus)}>
                        <div class="info-item-title">Out Pin </div>
                        <div class="info-value">${null===(z=this.hass.states[G[this.ld2410Name].outPinStatus])||void 0===z?void 0:z.state}</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].DetectionDistance)}>
                        <div class="info-item-title">Distance</div>
                        <div class="info-value">${null===(O=this.hass.states[G[this.ld2410Name].DetectionDistance])||void 0===O?void 0:O.state}</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].DistanceMoveDistance)}>
                        <div class="info-item-title">Move</div>
                        <div class="info-value">${null===(L=this.hass.states[G[this.ld2410Name].DistanceMoveDistance])||void 0===L?void 0:L.state}</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].DistanceStillDistance)}>
                        <div class="info-item-title">Still</div>
                        <div class="info-value">${null===(R=this.hass.states[G[this.ld2410Name].DistanceStillDistance])||void 0===R?void 0:R.state}</div>
                    </div>
                    ${G[this.ld2410Name].externalLightSensor?j`
                    <div class="info-item" style="cursor:pointer;" @click=${()=>this._moreinfo(G[this.ld2410Name].externalLightSensor)}>
                        <div class="info-item-title">Lux</div>
                        <div class="info-value" >${null===(P=this.hass.states[G[this.ld2410Name].externalLightSensor])||void 0===P?void 0:P.state}</div>
                    </div>
                    `:j` `}
                </div>

                <svg version="1.1" id="ld_signal_simbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 7.33 7.33" style="enable-background:new 0 0 7.33 7.33;width:3%;fill:var(--primary-color);margin-top:35px;" xml:space="preserve">
                <path d="M7.33,0L6,0c0,3.31-2.69,6-6,6l0,1.33l0,0C4.05,7.33,7.33,4.05,7.33,0 M4.67,0L3.33,0c0,1.84-1.49,3.33-3.33,3.33l0,1.34
                    C2.58,4.67,4.67,2.58,4.67,0 M2,0L0,0l0,2C1.1,2,2,1.1,2,0"/>
                </svg>

                <div style=" display:flex;">
                    <div style="width:5%;background-color: transparent;"></div>
                    <div style="width:${ot}%;background-color: transparent;"></div>

                    
                    <svg version="1.1" id="ld_man_arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 14.53 22" style="enable-background:new 0 0 14.53 22;width: 7%; fill:var(--primary-color); cursor:pointer;" xml:space="preserve">
                    <style type="text/css">
                        .punta_greccia{fill:#D90D1D;}
                        .asta_freccia{fill:#D90D1D;;stroke:#D90D1D;stroke-miterlimit:10;}
                    </style>
                    <path d="M6.53,0.2c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8S8.33,3,8.33,2S7.53,0.2,6.53,0.2 M7.15,4.87l-2,3.33H1.53V10h4.88
                        l1.08-1.82l0.73,2.87l-2.49,4.54V22h1.8v-5l2.33-3.11L12.73,22h1.8L10.62,6.67l2.11,0.66V11h1.8V5.8L9.11,4.11
                        c-0.16-0.05-0.33-0.08-0.5-0.08C7.99,4.03,7.45,4.37,7.15,4.87z"/>
                    <g>
                        <polygon class="punta_greccia" points="2.1,22 4.14,16.07 0.07,16.07 	"/>
                        <line class="asta_freccia" x1="2.1" y1="10" x2="2.1" y2="16.07"/>
                    </g>
                    </svg>

                </div>
                
                <svg version="1.1" id="meter_principale" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 450 18.13" style="enable-background:new 0 0 450 18.13;" xml:space="preserve">
                <style type="text/css">
                    .meter-principale-rettangolo{fill:var(--mdc-select-fill-color);}
                    .meter-principale-testo{fill:var(--primary-text-color);font-family:'Arial-BoldMT';font-size:10px;}
                    .meter-principale-shepe{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                </style>
                <rect id="rettangolo_x5F_ruler" x="-0.56" y="0.18" class="meter-principale-rettangolo" width="450.56" height="17.95"/>
                <g id="misure">
                    
                        <text id="gate-1-text_00000016071961384992556670000012793053045481635972_" transform="matrix(1.0488 0 0 1 9.1775 13.1239)" class="meter-principale-testo">0</text>
                    <path class="meter-principale-shepe" d="M15.56,8.73h1.78c3.68,0,6.65-2.98,6.65-6.65V0.32"/>
                    <text id="gate-1-text" transform="matrix(1.0488 0 0 1 35.2171 13.1242)" class="meter-principale-testo">${Q[0]}</text>
                    <path class="meter-principale-shepe" d="M66.56,9.16h1.78C72.02,9.16,75,6.18,75,2.5V0.74"/>
                    
                        <text id="gate-1-text_00000172403478865654996700000009434690586403883428_" transform="matrix(1.0488 0 0 1 85.2161 13.1242)" class="meter-principale-testo">${Q[1]}</text>
                    <path class="meter-principale-shepe" d="M116.56,9.16h1.78c3.68,0,6.65-2.98,6.65-6.65V0.74"/>
                    
                        <text id="gate-1-text_00000174604340524944137280000015794942522531559070_" transform="matrix(1.0488 0 0 1 135.2152 13.1242)" class="meter-principale-testo">${Q[2]}</text>
                    <path class="meter-principale-shepe" d="M166.56,9.16h1.78c3.68,0,6.65-2.98,6.65-6.65V0.74"/>
                    
                        <text id="gate-1-text_00000099625697548038854210000013000206721289728953_" transform="matrix(1.0488 0 0 1 185.2162 13.1242)" class="meter-principale-testo">${Q[3]}</text>
                    <path class="meter-principale-shepe" d="M216.56,9.16h1.78c3.68,0,6.65-2.98,6.65-6.65V0.74"/>
                    
                        <text id="gate-1-text_00000070815017703564489300000010520145297064408724_" transform="matrix(1.0488 0 0 1 235.2162 13.1242)" class="meter-principale-testo">${Q[4]}</text>
                    <path class="meter-principale-shepe" d="M266.56,9.16h1.78c3.68,0,6.65-2.98,6.65-6.65V0.74"/>
                    
                        <text id="gate-1-text_00000005964308175057680080000014454426573449790897_" transform="matrix(1.0488 0 0 1 285.2171 13.1242)" class="meter-principale-testo">${Q[5]}</text>
                    <path class="meter-principale-shepe" d="M316.56,9.16h1.78c3.68,0,6.65-2.98,6.65-6.65V0.74"/>
                    
                        <text id="gate-1-text_00000085951868237978151280000003226438313236816520_" transform="matrix(1.0488 0 0 1 335.2152 13.1242)" class="meter-principale-testo">${Q[6]}</text>
                    <path class="meter-principale-shepe" d="M366.56,9.16h1.78c3.68,0,6.65-2.98,6.65-6.65V0.74"/>
                    
                        <text id="gate-1-text_00000053520815625960183270000016495147803014316929_" transform="matrix(1.0488 0 0 1 385.2142 13.7092)" class="meter-principale-testo">${Q[7]}</text>
                    <path class="meter-principale-shepe" d="M416.56,9.74h1.78c3.68,0,6.65-2.98,6.65-6.65V1.33"/>
                </g>
                </svg>


                `}

            <hr>

            <a  class="cta ${"on"===(null===(U=this.hass.states[G[this.ld2410Name].engineering_mode])||void 0===U?void 0:U.state)?"cta-active":" "}"  @click="${()=>this._callservice(G[this.ld2410Name].engineering_mode,"switch","toggle")}">
            <ha-icon icon="mdi:power-cycle" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>Engineering mode ${null===(T=this.hass.states[G[this.ld2410Name].engineering_mode])||void 0===T?void 0:T.state}</span>
            </a>

            ${"on"===(null===(H=this.hass.states[G[this.ld2410Name].engineering_mode])||void 0===H?void 0:H.state)?j`
            <div style="display: flex;justify-content:space-between;margin-top: 10px;" >
            <a  class="cta ${1==this._show_gmove&&0==this._show_gstill?"cta-active":" "}" @click=${()=>{this._show_gmove=!0,this._show_gstill=!1}}>
                <ha-icon icon="mdi:motion-sensor" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>Move</span>
                </a>
                <a  class="cta ${0==this._show_gmove&&1==this._show_gstill?"cta-active":" "}" @click=${()=>{this._show_gmove=!1,this._show_gstill=!0}}>
                <ha-icon icon="mdi:motion-sensor" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>still</span>
                </a>
                <a  class="cta ${1==this._show_gmove&&1==this._show_gstill?"cta-active":" "}" @click=${()=>{this._show_gmove=!0,this._show_gstill=!0}}>
                <ha-icon icon="mdi:account-multiple" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>move & still</span>
                </a>
            </div>
            

            
            <hr>

        <!-- ###########################################################    move_gates_section    ########################################################### -->
        ${1==this._show_gmove?j`
        <div class="gates-container">
            ${Object.keys(q).map(((t,e)=>{const s=q[t],i=s.gmove,o=this.hass.states[s.gmove],l=parseInt(null==o?void 0:o.state)||0,r=this.hass.states[s.gmoveenergie],n=parseInt(null==r?void 0:r.state)||0;return i?j`
            <div class="inner-gates-container">
                ${this.MovingDistanceNumber>=e+1?j`
                <div class="div-input-value">
                    <h2 style="${n>=l?"background-color: red; color: white;":""}">
                        ${l}
                    </h2>
                </div>
                <div class="distance_sensor_value">
                    ${n}
                    <span style="font-size: smaller;">%</span>
                </div>
                <div class="range-holder" style="${this.MovingDistanceNumber>=e+1?"":"display: none;"}">
                    <input
                    type="range"
                    min="0"
                    max="100"
                    .value="${l}"
                    style="background-size: ${n}% 100%;"
                    @change=${t=>this._setNumber(o,t.target.value)}>
                </div>
                `:j`
                <div class="div-input-value"></div>
                <div class="distance_sensor_value value-off">off</div>
                <div class="slider-off">off</div>
                `}
                <div class="g-name ${this.MovingDistanceNumber>=e+1?"":"g-name-off"}" >G${e+1}</div>
            </div>
            `:j`
            `}))}
            </div>
            <input 
            type="range" 
            id="n_move" 
            min="0" 
            max="8" 
            .value="${this.MovingDistanceNumber}"  
            @input=${this.onRangeInputMove} 
            @change=${t=>this._setNumber_direct(G[this.ld2410Name].move_distance_n_gates,t.target.value)}> 

            
            
            
            
            
            <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 400 32" style="enable-background:new 0 0 400 32;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:var(--divider-color)}
                .st1{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                .st2{fill:var(--primary-text-color);}
                .st3{font-family:'Arial-BoldMT';}
                .st4{font-size:10px;}
                .st5{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
            </style>
            <g id="gruppo-ruler">
                <foreignobject transform="matrix(1 0 0 1 -1 13.75)"    width="402" height="18">
                    <div class="ruler-meter-div">
                        <div class="ruler-meter-div-meter" style="width: ${st}%">
                        </div>
                    </div>
                </foreignobject>
                <g id="ruler">
                    <line class="st1" x1="0" y1="13.57" x2="0" y2="0.3"/>
                    <line class="st1" x1="400" y1="13.57" x2="400" y2="0.3"/>
                    <line class="st1" x1="100" y1="13.57" x2="100" y2="0.3"/>
                    <line class="st1" x1="50" y1="13.57" x2="50" y2="0.3"/>
                    <line class="st1" x1="150" y1="13.57" x2="150" y2="0.3"/>
                    <line class="st1" x1="200" y1="13.57" x2="200" y2="0.3"/>
                    <line class="st1" x1="300" y1="13.57" x2="300" y2="0.3"/>
                    <line class="st1" x1="250" y1="13.57" x2="250" y2="0.3"/>
                    <line class="st1" x1="350" y1="13.57" x2="350" y2="0.3"/>
                    <line class="st1" x1="10" y1="13.57" x2="10" y2="7.06"/>
                    <line class="st1" x1="20" y1="13.57" x2="20" y2="7.06"/>
                    <line class="st1" x1="30" y1="13.57" x2="30" y2="7.06"/>
                    <line class="st1" x1="40" y1="13.57" x2="40" y2="7.06"/>
                    <line class="st1" x1="60" y1="13.57" x2="60" y2="7.06"/>
                    <line class="st1" x1="70" y1="13.57" x2="70" y2="7.06"/>
                    <line class="st1" x1="80" y1="13.57" x2="80" y2="7.06"/>
                    <line class="st1" x1="90" y1="13.57" x2="90" y2="7.06"/>
                    <line class="st1" x1="110" y1="13.57" x2="110" y2="7.06"/>
                    <line class="st1" x1="120" y1="13.57" x2="120" y2="7.06"/>
                    <line class="st1" x1="130" y1="13.57" x2="130" y2="7.06"/>
                    <line class="st1" x1="140" y1="13.57" x2="140" y2="7.06"/>
                    <line class="st1" x1="160" y1="13.57" x2="160" y2="7.06"/>
                    <line class="st1" x1="170" y1="13.57" x2="170" y2="7.06"/>
                    <line class="st1" x1="180" y1="13.57" x2="180" y2="7.06"/>
                    <line class="st1" x1="190" y1="13.57" x2="190" y2="7.06"/>
                    <line class="st1" x1="210" y1="13.57" x2="210" y2="7.06"/>
                    <line class="st1" x1="220" y1="13.57" x2="220" y2="7.06"/>
                    <line class="st1" x1="230" y1="13.57" x2="230" y2="7.06"/>
                    <line class="st1" x1="240" y1="13.57" x2="240" y2="7.06"/>
                    <line class="st1" x1="260" y1="13.57" x2="260" y2="7.06"/>
                    <line class="st1" x1="270" y1="13.57" x2="270" y2="7.06"/>
                    <line class="st1" x1="280" y1="13.57" x2="280" y2="7.06"/>
                    <line class="st1" x1="290" y1="13.57" x2="290" y2="7.06"/>
                    <line class="st1" x1="310" y1="13.57" x2="310" y2="7.06"/>
                    <line class="st1" x1="320" y1="13.57" x2="320" y2="7.06"/>
                    <line class="st1" x1="330" y1="13.57" x2="330" y2="7.06"/>
                    <line class="st1" x1="340" y1="13.57" x2="340" y2="7.06"/>
                    <line class="st1" x1="360" y1="13.57" x2="360" y2="7.06"/>
                    <line class="st1" x1="370" y1="13.57" x2="370" y2="7.06"/>
                    <line class="st1" x1="380" y1="13.57" x2="380" y2="7.06"/>
                    <line class="st1" x1="390" y1="13.57" x2="390" y2="7.06"/>
                </g>
                <g id="misure">
                    <text id="gate-1-text" transform="matrix(1.0488 0 0 1 10.2171 26.6973)" class="st2 st3 st4">${Q[0]}</text>
                    <path class="st5" d="M41.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000172403478865654996700000009434690586403883428_" transform="matrix(1.0488 0 0 1 60.2162 26.6973)" class="st2 st3 st4">${Q[1]}</text>
                    <path class="st5" d="M91.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000174604340524944137280000015794942522531559070_" transform="matrix(1.0488 0 0 1 110.2152 26.6973)" class="st2 st3 st4">${Q[2]}</text>
                    <path class="st5" d="M141.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000099625697548038854210000013000206721289728953_" transform="matrix(1.0488 0 0 1 160.2162 26.6973)" class="st2 st3 st4">${Q[3]}</text>
                    <path class="st5" d="M191.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000070815017703564489300000010520145297064408724_" transform="matrix(1.0488 0 0 1 210.2162 26.6973)" class="st2 st3 st4">${Q[4]}</text>
                    <path class="st5" d="M241.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000005964308175057680080000014454426573449790897_" transform="matrix(1.0488 0 0 1 260.2171 26.6973)" class="st2 st3 st4">${Q[5]}</text>
                    <path class="st5" d="M291.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000085951868237978151280000003226438313236816520_" transform="matrix(1.0488 0 0 1 310.2152 26.6973)" class="st2 st3 st4">${Q[6]}</text>
                    <path class="st5" d="M341.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000053520815625960183270000016495147803014316929_" transform="matrix(1.0488 0 0 1 360.2142 27.2822)" class="st2 st3 st4">${Q[7]}</text>
                    <path class="st5" d="M391.56,24.31h1.78c3.68,0,6.65-2.98,6.65-6.65V15.9"/>
                </g>
            </g>
            <line class="st1" x1="1" y1="13.8" x2="399.49" y2="13.8"/>
            </svg>
        <!-- ###########################################################    end move_gates_section    ########################################################### -->

            `:j` `}

        <!-- ###########################################################    still_gates_section    ########################################################### -->
            ${1==this._show_gstill?j`
                <div class="gates-container">
            ${Object.keys(q).map(((t,e)=>{const s=q[t],i=s.gstill,o=this.hass.states[s.gstill],l=parseInt(null==o?void 0:o.state)||0,r=this.hass.states[s.gstillenergie],n=parseInt(null==r?void 0:r.state)||0;return i?j`
            <div class="inner-gates-container">
                ${this.StillDistanceNumber>=e+1?j`
                <div class="div-input-value">
                    <h2 style="${n>=l?"background-color: red; color: white;":""}">
                        ${l}
                    </h2>
                </div>
                <div class="distance_sensor_value">
                    ${n}
                    <span style="font-size: smaller;">%</span>
                </div>
                <div class="range-holder" style="${this.StillDistanceNumber>=e+1?"":"display: none;"}">
                    <input
                    type="range"
                    min="0"
                    max="100"
                    .value="${l}"
                    style="background-size: ${n}% 100%;"
                    @change=${t=>this._setNumber(o,t.target.value)}>
                </div>
                `:j`
                <div class="div-input-value"></div>
                <div class="distance_sensor_value value-off">off</div>
                <div class="slider-off">off</div>
                `}
                <div class="g-name ${this.StillDistanceNumber>=e+1?"":"g-name-off"}" >G${e+1}</div>
            </div>
            `:j`
            `}))}
            </div>
            <input 
            type="range" 
            id="n_still" 
            min="0" 
            max="8" 
            .value="${this.StillDistanceNumber}"  
            @input=${this.onRangeInputStill} 
            @change=${t=>this._setNumber_direct(G[this.ld2410Name].still_distance_n_gates,t.target.value)}> 

            
            
            
           
            
            <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 400 32" style="enable-background:new 0 0 400 32;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:var(--divider-color)}
                .st1{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                .st2{fill:var(--primary-text-color);}
                .st3{font-family:'Arial-BoldMT';}
                .st4{font-size:10px;}
                .st5{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
            </style>
            <g id="gruppo-ruler">
                <foreignobject transform="matrix(1 0 0 1 -1 13.75)"    width="402" height="18">
                    <div class="ruler-meter-div">
                        <div class="ruler-meter-div-meter" style="width: ${it}%;">
                        </div>
                    </div>
                </foreignobject>
                <g id="ruler">
                    <line class="st1" x1="0" y1="13.57" x2="0" y2="0.3"/>
                    <line class="st1" x1="400" y1="13.57" x2="400" y2="0.3"/>
                    <line class="st1" x1="100" y1="13.57" x2="100" y2="0.3"/>
                    <line class="st1" x1="50" y1="13.57" x2="50" y2="0.3"/>
                    <line class="st1" x1="150" y1="13.57" x2="150" y2="0.3"/>
                    <line class="st1" x1="200" y1="13.57" x2="200" y2="0.3"/>
                    <line class="st1" x1="300" y1="13.57" x2="300" y2="0.3"/>
                    <line class="st1" x1="250" y1="13.57" x2="250" y2="0.3"/>
                    <line class="st1" x1="350" y1="13.57" x2="350" y2="0.3"/>
                    <line class="st1" x1="10" y1="13.57" x2="10" y2="7.06"/>
                    <line class="st1" x1="20" y1="13.57" x2="20" y2="7.06"/>
                    <line class="st1" x1="30" y1="13.57" x2="30" y2="7.06"/>
                    <line class="st1" x1="40" y1="13.57" x2="40" y2="7.06"/>
                    <line class="st1" x1="60" y1="13.57" x2="60" y2="7.06"/>
                    <line class="st1" x1="70" y1="13.57" x2="70" y2="7.06"/>
                    <line class="st1" x1="80" y1="13.57" x2="80" y2="7.06"/>
                    <line class="st1" x1="90" y1="13.57" x2="90" y2="7.06"/>
                    <line class="st1" x1="110" y1="13.57" x2="110" y2="7.06"/>
                    <line class="st1" x1="120" y1="13.57" x2="120" y2="7.06"/>
                    <line class="st1" x1="130" y1="13.57" x2="130" y2="7.06"/>
                    <line class="st1" x1="140" y1="13.57" x2="140" y2="7.06"/>
                    <line class="st1" x1="160" y1="13.57" x2="160" y2="7.06"/>
                    <line class="st1" x1="170" y1="13.57" x2="170" y2="7.06"/>
                    <line class="st1" x1="180" y1="13.57" x2="180" y2="7.06"/>
                    <line class="st1" x1="190" y1="13.57" x2="190" y2="7.06"/>
                    <line class="st1" x1="210" y1="13.57" x2="210" y2="7.06"/>
                    <line class="st1" x1="220" y1="13.57" x2="220" y2="7.06"/>
                    <line class="st1" x1="230" y1="13.57" x2="230" y2="7.06"/>
                    <line class="st1" x1="240" y1="13.57" x2="240" y2="7.06"/>
                    <line class="st1" x1="260" y1="13.57" x2="260" y2="7.06"/>
                    <line class="st1" x1="270" y1="13.57" x2="270" y2="7.06"/>
                    <line class="st1" x1="280" y1="13.57" x2="280" y2="7.06"/>
                    <line class="st1" x1="290" y1="13.57" x2="290" y2="7.06"/>
                    <line class="st1" x1="310" y1="13.57" x2="310" y2="7.06"/>
                    <line class="st1" x1="320" y1="13.57" x2="320" y2="7.06"/>
                    <line class="st1" x1="330" y1="13.57" x2="330" y2="7.06"/>
                    <line class="st1" x1="340" y1="13.57" x2="340" y2="7.06"/>
                    <line class="st1" x1="360" y1="13.57" x2="360" y2="7.06"/>
                    <line class="st1" x1="370" y1="13.57" x2="370" y2="7.06"/>
                    <line class="st1" x1="380" y1="13.57" x2="380" y2="7.06"/>
                    <line class="st1" x1="390" y1="13.57" x2="390" y2="7.06"/>
                </g>
                <g id="misure">
                    <text id="gate-1-text" transform="matrix(1.0488 0 0 1 10.2171 26.6973)" class="st2 st3 st4">${Q[0]}</text>
                    <path class="st5" d="M41.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000172403478865654996700000009434690586403883428_" transform="matrix(1.0488 0 0 1 60.2162 26.6973)" class="st2 st3 st4">${Q[1]}</text>
                    <path class="st5" d="M91.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000174604340524944137280000015794942522531559070_" transform="matrix(1.0488 0 0 1 110.2152 26.6973)" class="st2 st3 st4">${Q[2]}</text>
                    <path class="st5" d="M141.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000099625697548038854210000013000206721289728953_" transform="matrix(1.0488 0 0 1 160.2162 26.6973)" class="st2 st3 st4">${Q[3]}</text>
                    <path class="st5" d="M191.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000070815017703564489300000010520145297064408724_" transform="matrix(1.0488 0 0 1 210.2162 26.6973)" class="st2 st3 st4">${Q[4]}</text>
                    <path class="st5" d="M241.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000005964308175057680080000014454426573449790897_" transform="matrix(1.0488 0 0 1 260.2171 26.6973)" class="st2 st3 st4">${Q[5]}</text>
                    <path class="st5" d="M291.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000085951868237978151280000003226438313236816520_" transform="matrix(1.0488 0 0 1 310.2152 26.6973)" class="st2 st3 st4">${Q[6]}</text>
                    <path class="st5" d="M341.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000053520815625960183270000016495147803014316929_" transform="matrix(1.0488 0 0 1 360.2142 27.2822)" class="st2 st3 st4">${Q[7]}</text>
                    <path class="st5" d="M391.56,24.31h1.78c3.68,0,6.65-2.98,6.65-6.65V15.9"/>
                </g>
            </g>
            <line class="st1" x1="1" y1="13.8" x2="399.49" y2="13.8"/>
            </svg>
        <!-- ###########################################################    end still_gates_section    ########################################################### -->
        `:j` `}

        `:j` `} 
        <!-- fine blocco engineering mode -->
          
            </ha-card>
`}getBrowserName(){let t="N/A";if(navigator&&navigator.userAgent){const e=navigator.userAgent;-1!==e.indexOf("Firefox")?t="Firefox":-1!==e.indexOf("Chrome")?t="Chrome":-1!==e.indexOf("Safari")?t="Safari":-1!==e.indexOf("Edge")?t="Edge":-1===e.indexOf("Opera")&&-1===e.indexOf("OPR")||(t="Opera")}return t}_callservice(t,e,s){this.hass.callService(e,s,{entity_id:t}),console.log(t)}_callserviceSelect(t,e,s,i){this.hass.callService(e,s,{entity_id:t,option:i}),console.log(t)}_setNumber(t,e){this.hass.callService("number","set_value",{entity_id:t.entity_id,value:e})}_setNumber_direct(t,e){this.hass.callService("number","set_value",{entity_id:t,value:e}),setTimeout((()=>{this.hass.callService("switch","turn_on",{entity_id:this.config.enginering_mode})}),2e3)}firstUpdated(){const t=this.shadowRoot.getElementById("device_name");this.ld2410Name=t.value;const e=this.shadowRoot.getElementById("n_move");e.addEventListener("input",(()=>{parseInt(e.value)<2&&(e.value="2")}));const s=this.shadowRoot.getElementById("n_still");s.addEventListener("input",(()=>{parseInt(s.value)<2&&(s.value="2")}))}onRangeInputMove(t){const e=t.target;this.MovingDistanceNumber=parseInt(e.value),console.log(e.value)}onRangeInputStill(t){const e=t.target;this.StillDistanceNumber=parseInt(e.value)}select_box(t,e,s){return j`
          <select class="options-select" name="entity" id="entity"  .value="${s}"
          @focusout=${e=>this._callserviceSelect(t,"select","select_option",e.target.value)}
            @change=${e=>this._callserviceSelect(t,"select","select_option",e.target.value)}>
            ${e?e.map((t=>j`
                <option value="${t}" ?selected="${t===s}">${t}</option>
              `)):""}
          </select>
        `}_moreinfo(t){const e=new Event("hass-more-info",{bubbles:!0,cancelable:!1,composed:!0});e.detail={entityId:t},this.ownerDocument.querySelector("home-assistant").dispatchEvent(e)}getLD2410DeviceNameDropdown(t){return j`
            <select name="device_name" id="device_name" class="select-ld-device" @change=${this.handleSelectChange}>
                ${this.config.devices_name.map(((t,e)=>{const s=t.ld_device;return j`<option value="${s}" ${0===e?"selected":""}>${s}</option>`}))}
            </select>
`}handleSelectChange(t){const e=t.target.value;this.ld2410Name=e}static get styles(){return dt}};t([at({attribute:!1})],ut.prototype,"hass",void 0),t([at({attribute:!1})],ut.prototype,"config",void 0),t([at({type:Number})],ut.prototype,"MovingDistanceNumber",void 0),t([at({type:Number})],ut.prototype,"StillDistanceNumber",void 0),t([at({type:String})],ut.prototype,"ld2410Name",void 0),ut=t([rt(ht)],ut);export{ut as Ld2410CustomCard};
