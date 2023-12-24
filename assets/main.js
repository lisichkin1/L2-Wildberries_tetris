import{buildField,checkBorder,createTetramino,drawTetramino,tetraminoLeft,tetraminoRight,tetraminoRotate}from"./tetris.js";import{PLAYING_FIELD_COLUMN,PLAYING_FIELD_ROW,positionIndex}from"./utils.js";import"../assets/styles/style.css";const newGame=document.querySelector(".new_game");function startGame(){let e,t=!1,o=0,r=0,n=buildField();const i=document.querySelector(".score__point"),s=document.querySelector(".lines__point"),a=document.querySelectorAll(".teris__container > div");let l=createTetramino();const c=()=>{a.forEach((e=>e.removeAttribute("class"))),(()=>{for(let e=0;e<PLAYING_FIELD_ROW;e++)for(let t=0;t<PLAYING_FIELD_COLUMN;t++){if(!n[e][t])continue;const o=n[e][t],r=positionIndex(e,t);a[r].classList.add(o)}})(),drawTetramino(l,a)},m=()=>{t||(L(l,n),c(),clearTimeout(e),e=setTimeout((()=>m()),500))},d=e=>l.row+e<0,f=(e,t)=>{i.innerText=e,s.innerText=t},L=(e,t)=>(e.row+=1,checkBorder(e,t)&&(e.row-=1,u(e),console.log(t)),e),u=e=>{const{form:i,row:s,column:a}=e;for(let o=0;o<i.length;o++)for(let r=0;r<i[o].length;r++)if(1===i[o][r]){const i=s+o,l=a+r;if(d(o))return console.log("конец"),void(t=!0);n[i][l]=e.name}const m=(()=>{const e=n.filter((e=>!e.every((e=>Boolean(e))))),t=PLAYING_FIELD_ROW-e.length;return n=[...Array(PLAYING_FIELD_ROW-e.length).fill(new Array(PLAYING_FIELD_COLUMN).fill(0)),...e],console.log(t),t})();(e=>{switch(e){case 1:o+=40,r+=1,f(o,r);break;case 2:o+=100,r+=2,f(o,r);break;case 3:o+=300,r+=3,f(o,r);break;case 4:o+=1200,r+=4,f(o,r)}})(m),l=createTetramino(),c()};m(),document.addEventListener("keydown",(e=>{if(!t)if("s"==e.key||"ы"==e.key)m();else if("a"==e.key||"ф"==e.key)tetraminoLeft(l,n),c(),console.log("нажатие");else if("d"==e.key||"в"==e.key)tetraminoRight(l,n),c();else{if(" "!=e.key)return;tetraminoRotate(l,n),c()}}))}newGame.addEventListener("click",(()=>{startGame()})),startGame();