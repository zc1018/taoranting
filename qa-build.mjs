import {readFileSync,writeFileSync} from 'node:fs';
import {plants} from './model.mjs';
import {organSvg,branchInk} from './botany.mjs';
const css=readFileSync('kit/iso.css','utf8')+readFileSync('style.css','utf8');
for(const theme of ['light','dark']){
 let pages='';for(let start=0;start<plants.length;start+=8){const rows=plants.slice(start,start+8).map((p,j)=>{const i=start+j;return `<section class="qa-row"><div><b>${i+1}. ${p.name}</b><small>${p.latin}</small></div>${['leaf','twig','flower','fruit'].map(o=>`<div>${organSvg(i,o,o==='flower'?(p.bloom[0]??2):2)}</div>`).join('')}${[0,1,2,3].map(s=>`<div><svg viewBox="0 0 180 180">${branchInk(i,s)}</svg></div>`).join('')}</section>`;}).join('');pages+=`<article data-gallery-page="${start/8}" class="qa-page"><header>植物形态对照 ${start+1}–${Math.min(start+8,plants.length)} / ${theme} <span>叶 ｜ 枝茎 ｜ 花 ｜ 果种 ｜ 春 ｜ 夏 ｜ 秋 ｜ 冬</span></header>${rows}</article>`;}
 writeFileSync(`qa-gallery-${theme}.html`,`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>植物图版 QA</title><style>${css}.qa-page{width:1500px;background:var(--bg);padding:20px;margin-bottom:20px}.qa-page header{display:flex;justify-content:space-between;font-size:16px;padding:10px 0 15px}.qa-page header span{font-size:11px}.qa-row{display:grid;grid-template-columns:160px repeat(8,minmax(0,1fr));border-top:1px solid var(--line);align-items:center;min-height:150px}.qa-row b{font-size:13px}.qa-row small{display:block;font-size:9px;margin-top:8px;color:var(--muted)}.qa-row svg{display:block;width:145px;height:145px}.qa-row>div{min-width:0}body{margin:0}</style><body class="iso" data-theme="${theme}">${pages}</body></html>`);
}

