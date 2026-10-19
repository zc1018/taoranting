(()=>{
 const {plants,organs}=MODEL,q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
 const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 let round=[],index=0,results=[];
 function start(preferred=''){
  round=QUIZ.createRound(preferred);index=0;results=[];
  q('[data-quiz-session]').hidden=false;q('[data-round-summary]').hidden=true;render();
 }
 function render(){
  const item=round[index],plant=plants[item.plant],record=PHOTO_CATALOG[plant.id],photo=record.photos[item.photo];
  q('[data-quiz-number]').textContent=`第 ${index+1} / ${round.length} 题`;
  q('[data-quiz-progress]').value=index;q('[data-quiz-score]').textContent=`已答对 ${results.filter(r=>r.correct).length} 题`;
  const image=q('[data-question-photo]');image.src=photo.src;image.alt='待辨认植物实拍，请观察'+organs.find(o=>o.id===item.organ).name+'的形态';
  q('[data-question-organ]').textContent='观察 '+organs.find(o=>o.id===item.organ).name;
  q('[data-question-credit]').textContent=`摄影：${photo.author} · ${photo.license}`;
  q('[data-question-license]').href=photo.licenseUrl;
  q('[data-quiz-hint]').textContent=plant.clues[item.organ].replaceAll(plant.name,'这种植物');
  q('[data-question-context]').textContent=record.representative?'类群代表照片 · 判断到类群即可':'同种植物实拍 · 非园内当季实况';
  qa('[data-answer]').forEach((button,i)=>{button.textContent=plants[item.choices[i]].name;button.dataset.answer=item.choices[i];button.disabled=false;button.removeAttribute('data-result');});
  q('[data-answer-review]').hidden=true;q('[data-question-prompt]').textContent='照片里是哪种植物？';
  q('.question-hint').open=false;
  q('[data-question-source]').hidden=true;
  q('[data-next-question]').disabled=true;q('[data-next-question]').textContent=index===round.length-1?'查看本轮结果':'下一题 →';
 }
 function answer(selected){
  if(results.length>index)return;
  const item=round[index],plant=plants[item.plant],record=PHOTO_CATALOG[plant.id],correct=selected===item.plant;
  results.push({...item,selected,correct});
  qa('[data-answer]').forEach(button=>{button.disabled=true;const value=Number(button.dataset.answer);if(value===item.plant)button.dataset.result='yes';else if(value===selected)button.dataset.result='no';});
  q('[data-question-prompt]').textContent=plant.name;
  q('[data-feedback-title]').textContent=correct?'认对了，是'+plant.name:'这张照片是'+plant.name;
  q('[data-answer-review]').dataset.correct=String(correct);
  q('[data-feedback-copy]').textContent=(correct?'':'你选的是'+plants[selected].name+'。')+plant.part[item.organ][1];
  const season=item.organ==='flower'?(plant.bloom[0]??2):2;
  q('[data-answer-diagram]').innerHTML=BOTANY.organSvg(item.plant,item.organ,season);
  q('[data-answer-photo]').src=record.photos[item.photo].src;q('[data-answer-photo]').alt=plant.name+'实拍对照';
  q('[data-answer-tag]').textContent=plant.part[item.organ][2];
  q('[data-answer-scope]').textContent='照片对象：'+record.subject+'。'+(record.representative?'这是类群代表；园内具体种与品种需核对树牌。':'实拍用于形态对照，不表示园内当前状态。');
  q('[data-learn-plant]').href=`plant.html?plant=${plant.id}&organ=${item.organ}&season=${season}`;
  q('[data-question-source]').href=record.photos[item.photo].source;q('[data-question-source]').hidden=false;
  q('[data-answer-review]').hidden=false;q('[data-next-question]').disabled=false;
  q('[data-quiz-progress]').value=results.length;q('[data-quiz-score]').textContent=`已答对 ${results.filter(r=>r.correct).length} 题`;
  q('[data-feedback-title]').focus({preventScroll:true});
 }
 function finish(){
  q('[data-quiz-session]').hidden=true;q('[data-round-summary]').hidden=false;
  const correct=results.filter(item=>item.correct).length;
  q('[data-round-score]').textContent=`${correct} / ${round.length}`;
  q('[data-round-message]').textContent=correct===round.length?'这 5 种，你都认出来了。':'把还不熟悉的植物再对照一遍。';
  q('[data-round-list]').innerHTML=results.map(item=>{const p=plants[item.plant],photo=PHOTO_CATALOG[p.id].photos[item.photo];return `<a class="review-row" href="plant.html?plant=${p.id}&organ=${item.organ}"><img src="${photo.src}" alt="" width="80" height="80"><div><strong>${esc(p.name)}</strong><span>${item.correct?'已认出':'待巩固 · 你选了'+esc(plants[item.selected].name)}</span><p>${esc(p.part[item.organ][2])}</p></div><span aria-hidden="true">↗</span></a>`;}).join('');
  q('[data-summary-title]').focus({preventScroll:true});
 }
 qa('[data-answer]').forEach(button=>button.addEventListener('click',()=>answer(Number(button.dataset.answer))));
 q('[data-next-question]').addEventListener('click',()=>{if(results.length<=index)return;if(index===round.length-1){finish();return;}index++;render();q('[data-question-prompt]').focus({preventScroll:true});});
 q('[data-restart-round]').addEventListener('click',()=>{start();q('[data-question-prompt]').focus({preventScroll:true});});
 const dialog=q('#photo-dialog');
 q('[data-question-zoom]').addEventListener('click',()=>{
  const item=round[index],plant=plants[item.plant],photo=PHOTO_CATALOG[plant.id].photos[item.photo],answered=results.length>index;
  q('#photo-dialog-title').textContent=answered?plant.name+' · 实拍对照':'植物实拍 · 看清形态细节';
  q('[data-photo-full]').src=photo.src;q('[data-photo-full]').alt=answered?plant.name+'实拍':'待辨认植物实拍';
  q('[data-photo-caption]').textContent=`摄影：${photo.author} · ${photo.license}。照片用于形态对照，非园内当季实况。`;
  q('[data-photo-source]').href=photo.source;q('[data-photo-source]').hidden=!answered;
  dialog.showModal();document.body.classList.add('photo-modal-open');
 });
 dialog.querySelector('.photo-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{document.body.classList.remove('photo-modal-open');q('[data-question-zoom]').focus({preventScroll:true});});
 start(new URLSearchParams(location.search).get('plant')||'');
})();
