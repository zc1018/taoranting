import {catalogHtml} from './catalog-view.mjs';
import {observationHtml,sourcesHtml} from './observation-view.mjs';
import {quizHtml} from './quiz-view.mjs';
import {plantPhotos} from './photos.mjs';
import {photoDialogHtml} from './photo-view.mjs';
import {readFileSync,writeFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {observationCase} from './geometry.mjs';
import {plants,plantSources} from './model.mjs';
import * as A from './kit/audit.mjs';
import * as k from './kit/iso-kit.mjs';
const dir=dirname(fileURLToPath(import.meta.url));
const {P,R,art,parts,dial}=observationCase();
const C=k.cameraOf(P),basis=[C.sinA,C.cosA*C.sinE,-C.cosA,C.sinA*C.sinE],det=basis[0]*basis[3]-basis[1]*basis[2];
const dialView={center:k.iso([dial.x,dial.y,dial.z],P),basis:[...basis,0,0],inverse:[basis[3]/det,-basis[1]/det,-basis[2]/det,basis[0]/det,0,0]};
const css=['kit/iso.css','style.css','product.css'].map(file=>readFileSync(join(dir,file),'utf8')).join('\n');
function bundle(file){
 const raw=readFileSync(join(dir,file),'utf8').replace(/^import .*?;\n/gm,'');
 const names=[...raw.matchAll(/export (?:const|function) (\w+)/g)].map(x=>x[1]);
 const context=file==='model.mjs'?'const {entries,sources,categories}=CATALOG;':file==='quiz-model.mjs'?'const {plants,quizItems}=MODEL;const plantPhotos=PHOTO_CATALOG;':file==='atlas-ink.mjs'?'const {plants}=MODEL;':file==='botany.mjs'?'const {plants}=MODEL;const {atlasLeaf,atlasFlower,atlasFruit,atlasTwig,atlasBranch,atlasOrgan}=ATLASINK;':'';
 return `(()=>{${context}${raw.replace(/\bexport /g,'')}return {${names.join(',')}};})()`;
}
const baseRuntime=`const CATALOG=${bundle('catalog.mjs')};const MODEL=${bundle('model.mjs')};`;
const photoRuntime=`const PHOTO_CATALOG=${JSON.stringify(plantPhotos)};const ATLASINK=${bundle('atlas-ink.mjs')};const BOTANY=${bundle('botany.mjs')};`;
const observationRuntime=`${photoRuntime}const PHOTO_VIEW=${bundle('photo-view.mjs')};window.TAORAN_PROJECTION=${JSON.stringify(P)};window.TAORAN_DIAL=${JSON.stringify(dial)};window.TAORAN_DIAL_VIEW=${JSON.stringify(dialView)};`;
const leafIcon='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 28v-8M16 21C8 18 3 11 3 8Q8 3 12 5L16 13 20 5Q25 3 29 8C29 11 24 18 16 21ZM16 21 7 7M16 21 25 7M16 21 12 5M16 21 20 5"/></svg>';
const shared=readFileSync(join(dir,'shared.js'),'utf8');
const pages=[
 {name:'index',kind:'catalog',title:'查找植物',runtime:'',script:'catalog-live.js',html:`<section class="find-heading"><div><span class="eyebrow">陶然亭植物指南</span><h1>认出眼前的植物</h1><p>从名字、叶形或花果特征开始找，先看形态图解，再用真实照片核对。</p></div><a class="practice-entry" href="recognise.html"><span>已经认识一些了？</span><strong>看图解，认 5 种植物 <b aria-hidden="true">↗</b></strong></a></section>${catalogHtml()}`},
 {name:'plant',kind:'plant',title:'观察与对照',runtime:observationRuntime,script:'live.js',html:observationHtml(art)},
 {name:'recognise',kind:'practice',title:'图解认植物',runtime:photoRuntime+`const QUIZ=${bundle('quiz-model.mjs')};`,script:'quiz-live.js',html:quizHtml()}
];
for(const theme of ['light','dark']){
 for(const page of pages){
  const navigation=`<a href="index.html" ${page.kind==='catalog'?'aria-current="page"':''}>查植物</a><a href="recognise.html" ${page.kind==='practice'?'aria-current="page"':''}>认一认</a>`;
  const runtime=(baseRuntime+page.runtime+shared+readFileSync(join(dir,page.script),'utf8')).replace(/<\/script/gi,'<\\/script');
  const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="${theme}"><meta name="description" content="陶然亭植物科普指南：按名字和特征查找植物，以形态图解学习，用实拍辅助对照，再通过独立实拍练习认植物。"><title>${page.title} · 陶然亭植物指南</title><style>${css}</style></head><body class="iso product" data-theme="${theme}" data-page="${page.kind}"><main class="page"><header class="masthead"><a class="brand" href="index.html">${leafIcon}<span>陶然亭 <small>植物指南</small></span></a><div class="mast-right"><nav class="nav" aria-label="页面导航">${navigation}</nav><button class="theme" id="theme" aria-label="切换主题">☾</button></div></header>${page.html}${sourcesHtml()}<footer class="footer"><span>陶然亭 · 四时识木</span><a href="photos/CREDITS.md">照片来源与许可</a><a href="taoranting-plant-catalog.csv" download>下载植物名录 ↗</a></footer><div class="visually-hidden" role="status" aria-live="polite" data-announcement></div></main>${page.kind!=='catalog'?photoDialogHtml():''}<script>${runtime}</script></body></html>`;
  writeFileSync(join(dir,page.name+(theme==='dark'?'-dark':'')+'.html'),html);
 }
 writeFileSync(join(dir,`taoranting-${theme}.svg`),art.replace('<svg ',`<svg class="iso" data-theme="${theme}" `).replace('class="iso-svg"','').replace('>',`><style><![CDATA[${css}]]></style>`));
}
console.log(`${parts.length} physical parts / ${R.solids.length} recorded solids`);A.auditOrExit(R);

const csvCell=value=>'"'+String(value??'').replaceAll('"','""')+'"';
const catalogRows=[['编号','名称','学名或类群','浏览分组','科属','记录类型','记录年份','园内来源','来源链接','叶','枝茎','花','果种'],...plants.map((p,i)=>[i+1,p.name,p.latin,p.category,p.family,p.status||'公园资料',plantSources[p.source].year,plantSources[p.source].title,plantSources[p.source].url,p.part.leaf[1],p.part.twig[1],p.part.flower[1],p.part.fruit[1]])];
writeFileSync(join(dir,'taoranting-plant-catalog.csv'),'\uFEFF'+catalogRows.map(row=>row.map(csvCell).join(',')).join('\r\n'));
const photoCredits=['# 实拍照片来源与许可','',
 '检索日期：2026-10-19。照片用于植物形态对照，非陶然亭现场实拍。类群代表照片不证明园内具体种或品种。',
 '使用 Wikimedia Commons 提供的缩略图或原图。名录预览适配裁切；实拍区和放大图保留完整比例。照片分别依下列文件许可使用，植物图版的许可不覆盖这些照片。','',
 ...plants.flatMap(plant=>['## '+plant.name,'', '照片对象：'+plantPhotos[plant.id].subject,'',
  ...plantPhotos[plant.id].photos.flatMap(photo=>['- '+photo.src+' — '+photo.caption,'  - 摄影：'+photo.author,
   '  - 许可：['+photo.license+']('+photo.licenseUrl+')','  - [原图与拍摄信息]('+photo.source+')',''])])];
writeFileSync(join(dir,'photos/CREDITS.md'),photoCredits.join('\n'));
