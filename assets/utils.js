export const PLAYING_FIELD_ROW=20;export const PLAYING_FIELD_COLUMN=10;export const TETRAMINO_NAMES=["S","Z","T","O","I","J","L"];export const TETRAMINO_FORMS={S:[[0,1,1],[1,1,0],[0,0,0]],Z:[[1,1,0],[0,1,1],[0,0,0]],T:[[0,1,0],[1,1,1],[0,0,0]],O:[[1,1],[1,1]],I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],J:[[1,0,0],[1,1,1],[0,0,0]],L:[[0,0,1],[1,1,1],[0,0,0]]};export const getRandomTetramino=t=>t[Math.floor(Math.random()*t.length)];export const positionIndex=(t,o)=>10*t+o;export const rotateForm=t=>{const o=t.form,r=o.length,e=o[0].length,n=Array.from({length:e},(()=>Array(r).fill(0)));for(let t=0;t<r;t++)for(let l=0;l<e;l++)n[l][r-1-t]=o[t][l];return n};