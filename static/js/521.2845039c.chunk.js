"use strict";(self.webpackChunkreact_typescript_test_project=self.webpackChunkreact_typescript_test_project||[]).push([[521],{521:(e,n,t)=>{t.r(n),t.d(n,{default:()=>A});var s,r,a,i,c,o=t(5043),d=t(3216),l=t(5475),x=t(2681),p=t(5910),h=t(7528),m=t(5903);const g=m.A.div(s||(s=(0,h.A)(["\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 0;\n  color: black;\n  text-decoration: none;\n  font-weight: 500;\n  text-transform: uppercase;\n\n  :hover {\n    color: orangered;\n  }\n"]))),j=m.A.div(r||(r=(0,h.A)(["\n  display: flex;\n  @media screen and (max-width: 768px) {\n    flex-wrap: wrap;\n  }\n  gap: 20px;\n  padding-bottom: 16px;\n  margin-bottom: 16px;\n  border-bottom: 1px solid black;\n"]))),f=m.A.div(a||(a=(0,h.A)(["\n  display: flex;\n  flex-direction: column;\n"]))),u=m.A.div(i||(i=(0,h.A)(["\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n"]))),v=m.A.div(c||(c=(0,h.A)(["\n  display: flex;\n  gap: 5px;\n"])));var w=t(579);const A=()=>{const[e,n]=(0,o.useState)(""),[t,s]=(0,o.useState)(""),[r,a]=(0,o.useState)([]),[i,c]=(0,o.useState)(null),[h,m]=(0,o.useState)(null),[A,_]=(0,o.useState)("/movies"),{id:y}=(0,d.g)(),b=(0,d.zy)();return(0,o.useEffect)((()=>{b.state&&b.state.from&&(b.state.from.search.indexOf("query")>=0&&_("/movies"+b.state.from.search),"/"===b.state.from.pathname&&_("/"))}),[b.state]),(0,o.useEffect)((()=>{!async function(){if(!y)return;p.Loading.circle("Loading...");const e=await(0,x.LF)(y);n(e.title),s(e.overview),a(e.genres),c(e.poster_path),m(e.vote_average),p.Loading.remove()}()}),[y]),(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(g,{children:(0,w.jsx)(l.N_,{to:A,children:"Back to movies"})}),(0,w.jsxs)(j,{children:[(0,w.jsxs)(w.Fragment,{children:[" ",i&&(0,w.jsx)("img",{src:"https://image.tmdb.org/t/p/w300".concat(i),alt:e})]}),(0,w.jsxs)(f,{children:[(0,w.jsx)(w.Fragment,{children:(0,w.jsx)("h1",{children:e})}),h&&(0,w.jsxs)(w.Fragment,{children:["User Score: ",Math.round(10*h),"%"]}),t&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("h2",{children:"Overview"})," ",(0,w.jsx)(w.Fragment,{children:t})]}),r&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(w.Fragment,{children:(0,w.jsx)("h3",{children:"Genres"})}),(0,w.jsx)(v,{children:r.map((e=>(0,w.jsxs)("span",{children:[e.name," "]},e.id)))})]})]})]}),(0,w.jsx)(j,{children:(0,w.jsxs)(f,{children:[(0,w.jsx)("h3",{children:"Additional information"}),(0,w.jsxs)(u,{children:[(0,w.jsx)(l.N_,{to:"/movies/".concat(y,"/cast"),children:"Cast"}),(0,w.jsx)(l.N_,{to:"/movies/".concat(y,"/reviews"),children:"Reviews "})]})]})}),(0,w.jsx)(d.sv,{})]})}}}]);
//# sourceMappingURL=521.2845039c.chunk.js.map