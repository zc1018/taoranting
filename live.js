(()=>{
 const {plants,seasons,organs,organContext,plantSources}=MODEL,q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
 const stage=q('.iso-stage'),svg=stage.querySelector('svg'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),P=window.TAORAN_PROJECTION;
 const state={plant:0,season:2,organ:'leaf',playing:false,visible:false,hover:false,frame:0,last:0,clock:0,angle:Math.PI,targetAngle:Math.PI,photo:0};
 let plates=qa('[data-botanical-plate]').map(el=>({el,key:el.dataset.botanicalPlate,alpha:1}));
 const plateTemplate=plates[0].el.cloneNode(true),plateParent=plates[0].el.parentNode;
 function ensurePlate(){const key=state.plant+'-'+state.season;if(plates.some(p=>p.key===key))return;const el=plateTemplate.cloneNode(true);el.dataset.botanicalPlate=key;el.setAttribute('opacity','0');el.querySelector('.botanical').outerHTML=BOTANY.branchInk(state.plant,state.season);plateParent.append(el);plates.push({el,key,alpha:0});}
 const dial=q('[data-dial-marks]'),lens=q('[data-lens-ink]');let manual=false;
 let lensKey='0-2-leaf',lensLayers=[{el:lens.firstElementChild,key:lensKey,alpha:1}];
 const key=()=>`${state.plant}-${state.season}`;
 function syncPlay(){q('#tour').setAttribute('aria-pressed',String(state.playing));q('[data-tour-label]').textContent=state.playing?'暂停轮播':'四季轮播';q('#tour span:first-child').textContent=state.playing?'Ⅱ':'▷';}
 function stopTour(){state.playing=false;state.clock=0;syncPlay();}
 let photoPlant=null,photoOrgan=null,photoFigureKey=null;
 function syncPhotos(){
  const p=plants[state.plant],record=PHOTO_CATALOG[p.id],organName=organs.find(o=>o.id===state.organ).name;
  if(photoPlant!==p.id){
   state.photo=PHOTO_VIEW.preferredPhotoIndex(record,state.organ);photoPlant=p.id;photoOrgan=state.organ;
   q('[data-photo-name]').textContent=p.name;
   q('[data-photo-subject]').textContent='照片对象：'+record.subject;
   q('[data-photo-scope]').textContent=record.representative?'类群代表照片；具体种、品种见来源。':'同种植物实拍。';
   q('[data-photo-content]').innerHTML=PHOTO_VIEW.photoCardsHtml(p,record,state.photo);
   photoFigureKey=p.id+'-'+state.photo;
  }else if(photoOrgan!==state.organ){
   state.photo=PHOTO_VIEW.preferredPhotoIndex(record,state.organ,state.photo);photoOrgan=state.organ;
  }
  const photo=record.photos[state.photo],figureKey=p.id+'-'+state.photo;
  if(photoFigureKey!==figureKey){q('[data-photo-current]').innerHTML=PHOTO_VIEW.photoFigureHtml(p,record,state.photo);photoFigureKey=figureKey;}
  qa('[data-photo-select]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.photoSelect)===state.photo)));
  q('[data-photo-position]').textContent=(state.photo+1)+' / '+record.photos.length;
  const matches=photo.organs.includes(state.organ),available=record.photos.some(p=>p.organs.includes(state.organ));
  q('[data-photo-focus]').textContent=(matches?'图版 × 实拍 · ':'图版观察 · ')+organName;
  q('[data-photo-status]').textContent=matches?'在这张实拍里对照'+organName+'的实际形态，再结合图版和辨认线索核对。':available?'这张照片未清晰展示'+organName+'；点另一张照片可对照当前部位。':'现有两张实拍未覆盖'+organName+'的清晰细节，当前照片保留作形态参考。';
  q('.photo-observation').dataset.matched=String(matches);
 }
 function describe(){
  const p=plants[state.plant],part=p.part[state.organ];
  syncPhotos();
  ensurePlate();q('#plant-picker').value=String(state.plant);
  const source=plantSources[p.source];q('[data-source-link]').textContent=source.title;q('[data-source-link]').href=source.url;q('[data-evidence]').textContent=p.status||'公园资料';
  q('[data-plant-position]').textContent=String(state.plant+1).padStart(2,'0')+' / '+plants.length;
  for(const selector of ['[data-season]','[data-year]'])qa(selector).forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.season??b.dataset.year)===state.season)));
  qa('[data-organ]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.organ===state.organ)));
  q('[data-plant-name]').textContent=p.name;q('[data-family]').textContent=p.family;q('[data-latin]').textContent=p.latin;q('[data-identity]').textContent=p.identity||'';q('[data-identity]').hidden=!p.identity;
  q('[data-part-art]').innerHTML=BOTANY.organSvg(state.plant,state.organ,state.season);
  const nextLens=`${state.plant}-${state.season}-${state.organ}`;
  if(nextLens!==lensKey){lensKey=nextLens;if(!lensLayers.some(layer=>layer.key===lensKey)){const layer=document.createElementNS('http://www.w3.org/2000/svg','g');layer.innerHTML=BOTANY.organInk(state.plant,state.organ,state.season);layer.setAttribute('opacity','0');lens.append(layer);lensLayers.push({el:layer,key:lensKey,alpha:0});}}
  q('[data-part-tag]').textContent=part[2];q('[data-organ-context]').textContent=organContext(state.plant,state.season,state.organ);
  q('[data-part-title]').textContent=part[0];q('[data-part-body]').textContent=part[1];q('[data-season-label]').textContent=`此刻翻到 · ${seasons[state.season].name}`;q('[data-season-text]').textContent=p.seasonText[state.season];
  q('[data-location]').textContent=p.location;
  qa('[data-year-art]').forEach(el=>el.innerHTML=BOTANY.branchInk(state.plant,Number(el.dataset.yearArt)));
  qa('[data-year-text]').forEach(el=>el.textContent=p.seasonText[Number(el.dataset.yearText)]);qa('[data-year]').forEach(el=>{const s=Number(el.dataset.year);el.querySelector('strong').textContent=seasons[s].name+' · '+(s===3&&p.potted?'设施内结构对照':s===3&&['草本','水生'].includes(p.category)?'残茎与休眠':s===3&&p.evergreen?'常绿枝叶':seasons[s].verb);});
  const label=`${p.name} / ${seasons[state.season].name} / ${organs.find(o=>o.id===state.organ).name}`;
  stage.setAttribute('aria-label',`${label}。左右方向键切换季节，上下方向键切换植物，空格键暂停或播放。`);
  if(manual)q('[data-announcement]').textContent=label;syncPlay();
 }
 function cancel(){if(state.frame)cancelAnimationFrame(state.frame);state.frame=0;state.last=0;}
 function draw(dt=0){
  const wanted=key();let moving=false;
  for(const p of plates){const target=p.key===wanted?1:0;p.alpha=reduced.matches?target:p.alpha+(target-p.alpha)*(1-Math.exp(-dt/.17));if(Math.abs(p.alpha-target)<.001)p.alpha=target;else moving=true;p.el.setAttribute('opacity',p.alpha.toFixed(4));p.el.style.visibility=p.alpha>.001?'visible':'hidden';}
  plates=plates.filter(p=>{if(p.alpha===0&&p.key!==wanted){p.el.remove();return false;}return true;});
  lensLayers=lensLayers.filter(layer=>{const target=layer.key===lensKey?1:0;layer.alpha=reduced.matches?target:layer.alpha+(target-layer.alpha)*(1-Math.exp(-dt/.14));if(Math.abs(layer.alpha-target)<.001)layer.alpha=target;else moving=true;layer.el.setAttribute('opacity',layer.alpha.toFixed(4));if(layer.alpha===0&&!target){layer.el.remove();return false;}return true;});
  state.angle=reduced.matches?state.targetAngle:state.angle+(state.targetAngle-state.angle)*(1-Math.exp(-dt/.24));if(Math.abs(state.angle-state.targetAngle)<.001)state.angle=state.targetAngle;else moving=true;
  const d=window.TAORAN_DIAL,origin=BOTANY_DIAL_CENTER;
  // Only the printed marks rotate in the top plane; the round carrier has invariant geometry.
  dial.setAttribute('transform',`translate(${origin[0]} ${origin[1]}) matrix(${DIAL_BASIS.join(' ')}) rotate(${-state.angle*180/Math.PI}) matrix(${DIAL_INVERSE.join(' ')}) translate(${-origin[0]} ${-origin[1]})`);
  q('[data-readout]').textContent=`${plants[state.plant].name} / ${seasons[state.season].name} / ${moving?'换页中…':organs.find(o=>o.id===state.organ).name}`;
  return moving;
 }
 function tick(now){state.frame=0;const dt=state.last?Math.min((now-state.last)/1000,1/30):1/60;state.last=now;
  if(state.playing&&!state.hover){state.clock+=dt;if(state.clock>=8.2){state.clock=0;choose({season:(state.season+1)%4},false);return;}}
  const moving=draw(dt);if((moving||(state.playing&&!state.hover))&&state.visible&&!document.hidden&&!reduced.matches)state.frame=requestAnimationFrame(tick);
 }
 function run(){if(!state.frame&&state.visible&&!document.hidden&&!reduced.matches){state.last=0;state.frame=requestAnimationFrame(tick);}}
 function choose(next,user=true){
  if(user){manual=true;stopTour();}
  if(next.plant!==undefined)state.plant=(Number(next.plant)+plants.length)%plants.length;
  if(next.organ!==undefined&&organs.some(o=>o.id===next.organ))state.organ=next.organ;
  if(next.season!==undefined){state.season=(Number(next.season)+4)%4;const desired=state.season*Math.PI/2;let delta=(desired-state.targetAngle)%(Math.PI*2);if(delta>Math.PI)delta-=Math.PI*2;if(delta<-Math.PI)delta+=Math.PI*2;state.targetAngle+=delta;}
  describe();syncUrl();draw();run();
 }
 // An affine basis maps planar rotation into the same isometric camera as the printed disc.
 const {center:BOTANY_DIAL_CENTER,basis:DIAL_BASIS,inverse:DIAL_INVERSE}=window.TAORAN_DIAL_VIEW;
 q('#plant-picker').addEventListener('change',e=>choose({plant:Number(e.target.value)}));
 q('#plant-prev').addEventListener('click',()=>choose({plant:state.plant-1}));q('#plant-next').addEventListener('click',()=>choose({plant:state.plant+1}));
 qa('[data-season],[data-year]').forEach(b=>b.addEventListener('click',()=>choose({season:Number(b.dataset.season??b.dataset.year??b.dataset.recordSeason)})));
 qa('[data-organ]').forEach(b=>b.addEventListener('click',()=>choose({organ:b.dataset.organ})));
 q('#tour').addEventListener('click',()=>{state.playing=!state.playing&&!reduced.matches;state.clock=0;syncPlay();run();});
 stage.addEventListener('pointerenter',()=>{state.hover=true;});stage.addEventListener('pointerleave',()=>{state.hover=document.activeElement===stage;run();});
 stage.addEventListener('focus',()=>{state.hover=true;});stage.addEventListener('blur',()=>{state.hover=false;run();});
 stage.addEventListener('keydown',e=>{const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End',' '];if(!keys.includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft')choose({season:(state.season+3)%4});else if(e.key==='ArrowRight')choose({season:(state.season+1)%4});else if(e.key==='ArrowUp')choose({plant:(state.plant+plants.length-1)%plants.length});else if(e.key==='ArrowDown')choose({plant:(state.plant+1)%plants.length});else if(e.key==='Home')choose({season:0});else if(e.key==='End')choose({season:3});else q('#tour').click();});
 new IntersectionObserver(entries=>{state.visible=entries.at(-1).isIntersecting;if(state.visible)run();else cancel();},{threshold:.08}).observe(stage);
 document.addEventListener('visibilitychange',()=>{cancel();if(!document.hidden)run();});
 reduced.addEventListener('change',()=>{q('#tour').disabled=reduced.matches;if(reduced.matches){stopTour();cancel();draw();}else run();});
 q('#tour').disabled=reduced.matches;
 function syncUrl(){
  const url=new URL(location.href);url.searchParams.set('plant',plants[state.plant].id);url.searchParams.set('organ',state.organ);url.searchParams.set('season',state.season);
  history.replaceState(null,'',url);document.title=plants[state.plant].name+' · 陶然亭植物指南';
  q('[data-practice-link]').href='recognise.html?plant='+plants[state.plant].id;
 }
 function readUrl(){
  const params=new URLSearchParams(location.search),plant=plants.findIndex(p=>p.id===params.get('plant')),organ=params.get('organ'),season=Number(params.get('season')??2);
  choose({plant:plant<0?0:plant,organ:organs.some(o=>o.id===organ)?organ:'leaf',season:Number.isInteger(season)&&season>=0&&season<4?season:2},false);
 }
 window.addEventListener('popstate',readUrl);
 const photoDialog=q('#photo-dialog');let photoOpener=null;
 q('[data-photo-content]').addEventListener('click',event=>{
  const thumbnail=event.target.closest('[data-photo-select]');
  if(thumbnail){stopTour();state.photo=Number(thumbnail.dataset.photoSelect);syncPhotos();return;}
  const opener=event.target.closest('[data-photo-index]');if(!opener)return;
  const plant=plants[state.plant],record=PHOTO_CATALOG[plant.id],photo=record.photos[Number(opener.dataset.photoIndex)];
  stopTour();photoOpener=opener;
  q('#photo-dialog-title').textContent=plant.name+' · '+photo.caption;
  q('[data-photo-full]').src=photo.src;q('[data-photo-full]').alt=record.subject+'实拍：'+photo.caption;
  q('[data-photo-caption]').textContent='照片对象：'+record.subject+'。摄影：'+photo.author+' · '+photo.license+'。'+(record.representative?'类群代表照片，园内具体种与品种请核对树牌。':'非陶然亭现场实拍。');
  q('[data-photo-source]').href=photo.source;photoDialog.showModal();document.body.classList.add('photo-modal-open');
 });
 photoDialog.querySelector('.photo-close').addEventListener('click',()=>photoDialog.close());
 photoDialog.addEventListener('click',event=>{if(event.target===photoDialog){const r=photoDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)photoDialog.close();}});
 photoDialog.addEventListener('close',()=>{document.body.classList.remove('photo-modal-open');if(photoOpener?.isConnected)photoOpener.focus({preventScroll:true});});
 readUrl();draw();run();
})();
