if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let i={};const r=e=>n(e,a),o={module:{uri:a},exports:i,require:r};s[a]=Promise.all(c.map((e=>o[e]||r(e)))).then((e=>(t(...e),i)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"81095245b248ae594031319cc53c154e"},{url:"/_next/static/-KOzh6O6yeAZ8ulc7gP0n/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/-KOzh6O6yeAZ8ulc7gP0n/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/225-0d4b2a0743631406.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/553-06110844cb1cddad.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/687-139dbbee5267679b.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/69-73d29ac12259f8a0.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/850-a9e80c8b5b4e2fd7.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/873-f04751807702608a.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/app/_not-found-836f75a279535882.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/app/badges/page-bde5193d70ff7726.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/app/generatePassword/page-a8d56da813b628e9.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/app/layout-d14664a3efbc794e.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/app/page-edd0def34e934bb4.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/app/settings/page-c534879fdf6c0c70.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/fd9d1056-1cca5f564b454fa7.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/main-06ba81c601915912.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/main-app-99169ec307d66186.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-781be4cf19e442c0.js",revision:"-KOzh6O6yeAZ8ulc7gP0n"},{url:"/_next/static/css/3cbd70ff48da2307.css",revision:"3cbd70ff48da2307"},{url:"/_next/static/css/91e56f6cafb78270.css",revision:"91e56f6cafb78270"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/icons/android-chrome-192x192.png",revision:"d0ca5f96b54a3f504631936bea995a2e"},{url:"/icons/android-chrome-384x384.png",revision:"239dc6b695528f918f2cb4515814e4b9"},{url:"/icons/icon-512x512.png",revision:"cf8d44ffdd1c46c8b0a169bca5f967a1"},{url:"/manifest.json",revision:"83e8513f198a28cb1e0d2f6e91260815"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
