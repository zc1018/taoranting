// Shared by the static build and client; every photograph stays with its observer.
const esc=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const partNames={whole:'株形',leaf:'叶',twig:'枝 / 茎',flower:'花 / 花序',fruit:'果 / 种'};
export function preferredPhotoIndex(record,organ,current=0){
 if(record.photos[current]?.organs.includes(organ))return current;
 const match=record.photos.findIndex(photo=>photo.organs.includes(organ));
 return match<0?current:match;
}
export function photoFigureHtml(plant,record,index){
 const photo=record.photos[index];
 return `<figure class="reference-photo"><button type="button" class="photo-open" data-photo-plant="${esc(plant.id)}" data-photo-index="${index}" aria-label="放大${esc(plant.name)}照片 ${index+1}：${esc(photo.caption)}"><img src="${esc(photo.src)}" width="${photo.width}" height="${photo.height}" alt="${esc(record.subject)}实拍：${esc(photo.caption)}" decoding="async"><span class="photo-enlarge">放大看 ↗</span></button><figcaption><strong>${esc(photo.caption)}</strong><details class="photo-details"><summary>摄影与来源</summary><p>照片对象：${esc(record.subject)}</p><p>摄影：${esc(photo.author)} · <a href="${esc(photo.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(photo.license)}</a></p><a class="photo-original" href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">原图与拍摄信息 ↗</a></details></figcaption></figure>`;
}
export function photoCardsHtml(plant,record,index=preferredPhotoIndex(record,'leaf')){
 return `<div data-photo-current>${photoFigureHtml(plant,record,index)}</div><div class="photo-filmstrip" role="group" aria-label="选择${esc(plant.name)}的对照照片">${record.photos.map((photo,i)=>`<button type="button" class="photo-thumb" data-photo-select="${i}" aria-pressed="${i===index}" aria-label="对照照片 ${i+1}：${esc(photo.caption)}"><img src="${esc(photo.src)}" width="${photo.width}" height="${photo.height}" alt="" loading="lazy" decoding="async"><span>${esc(photo.organs.map(part=>partNames[part]).join(' · '))}</span></button>`).join('')}</div>`;
}
export function photoSectionHtml(plant,record){
 return `<section class="photo-section" id="photos" aria-labelledby="photo-title"><div class="comparison-photo-heading"><h3 id="photo-title">实拍 · <span data-photo-name>${esc(plant.name)}</span></h3><span class="micro" data-photo-position>${preferredPhotoIndex(record,'leaf')+1} / ${record.photos.length}</span></div><div class="photo-content" data-photo-content>${photoCardsHtml(plant,record)}</div><div class="photo-observation"><span class="part-tag" data-photo-focus>对照 · 叶</span><p data-photo-status></p></div><p class="photo-boundary"><span data-photo-scope>${record.representative?'类群代表照片；具体种、品种见来源。':'同种植物实拍。'}</span> 外地或不同季节拍摄，非园内当季实况。</p><span class="visually-hidden" data-photo-subject>照片对象：${esc(record.subject)}</span></section>`;
}
export function photoDialogHtml(){
 return `<dialog class="photo-dialog" id="photo-dialog" aria-labelledby="photo-dialog-title"><div class="photo-dialog-bar"><h2 id="photo-dialog-title"></h2><button type="button" class="photo-close" aria-label="关闭大图">关闭 ×</button></div><img data-photo-full alt=""><div class="photo-dialog-caption"><p data-photo-caption></p><a data-photo-source target="_blank" rel="noopener noreferrer">原图与拍摄信息 ↗</a></div></dialog>`;
}
