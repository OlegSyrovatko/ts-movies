"use strict";(self.webpackChunkreact_typescript_test_project=self.webpackChunkreact_typescript_test_project||[]).push([[867],{1867:(t,e,a)=>{a.r(e),a.d(e,{default:()=>v});var c,n,i,o,r=a(5043),s=a(2681),p=a(7528),d=a(5903);const h=d.A.div(c||(c=(0,p.A)(["\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  padding-bottom: 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid black;\n"]))),l=d.A.div(n||(n=(0,p.A)(["\n  display: flex;\n  width: 200px;\n  gap: 5px;\n"]))),m=d.A.div(i||(i=(0,p.A)(["\n  font-size: 14px;\n"]))),x=d.A.div(o||(o=(0,p.A)(["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n"])));var f=a(3216),g=a(5910),w=a(579);const v=()=>{const[t,e]=(0,r.useState)([]),{id:a}=(0,f.g)();return(0,r.useEffect)((()=>{(async()=>{if(a){g.Loading.circle("Loading...");try{const t=await(0,s.dk)(a);e(t.cast)}catch(t){console.error(t)}g.Loading.remove()}})()}),[a]),(0,w.jsx)(h,{children:t.map((t=>{let{id:e,name:a,character:c,profile_path:n}=t;return(0,w.jsx)(l,{children:(0,w.jsxs)(w.Fragment,{children:[n&&(0,w.jsx)("img",{src:"https://image.tmdb.org/t/p/w200".concat(n),alt:a,width:50}),(0,w.jsxs)(x,{children:[a&&(0,w.jsx)(m,{children:a}),c&&(0,w.jsxs)(m,{children:["Character: ",c]})]})]})},e)}))})}},2681:(t,e,a)=>{a.d(e,{LF:()=>i,MO:()=>n,UM:()=>r,dk:()=>o});const c="?api_key=1bee1caa8eeb54a46f7cee2e958da6e1",n=async t=>{const e=await fetch("https://api.themoviedb.org/3/search/movie".concat(c,"&query=").concat(t));return await e.json()},i=async t=>{const e=await fetch("https://api.themoviedb.org/3/movie/".concat(t).concat(c));return await e.json()},o=async t=>{const e=await fetch("https://api.themoviedb.org/3/movie/".concat(t,"/credits").concat(c));return await e.json()},r=async t=>{const e=await fetch("https://api.themoviedb.org/3/movie/".concat(t,"/reviews").concat(c));return await e.json()}}}]);
//# sourceMappingURL=867.79e1c79f.chunk.js.map