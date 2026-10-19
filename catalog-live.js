(()=>{
 const {plants,plantCategories}=MODEL,q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
 const cards=qa('[data-catalog-card]'),params=new URLSearchParams(location.search);
 let category=plantCategories.includes(params.get('type'))?params.get('type'):'all',expanded=params.get('all')==='1';
 q('#plant-search').value=params.get('q')||'';
 function filter(updateUrl=true){
  const term=q('#plant-search').value.trim().toLocaleLowerCase();
  const matches=cards.filter(card=>{
   const p=plants[Number(card.dataset.catalogCard)];
   const hay=[p.name,p.latin,p.identity,p.category,...Object.values(p.part).flat()].join(' ').toLocaleLowerCase();
   return (category==='all'||p.category===category)&&(!term||hay.includes(term));
  });
  cards.forEach(card=>card.hidden=true);
  matches.slice(0,expanded?matches.length:12).forEach(card=>card.hidden=false);
  qa('[data-category]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.category===category)));
  q('#catalog-results').textContent=(term?'“'+q('#plant-search').value.trim()+'”':category==='all'?'全部植物':category)+' · '+matches.length+' 项';
  q('.catalog-empty').hidden=matches.length>0;q('#catalog-more').hidden=expanded||matches.length<=12;
  q('#catalog-more').textContent='查看其余 '+(matches.length-12)+' 项 ↓';q('#clear-search').hidden=!term;
  if(updateUrl){const url=new URL(location.href);url.search='';if(term)url.searchParams.set('q',q('#plant-search').value.trim());if(category!=='all')url.searchParams.set('type',category);if(expanded)url.searchParams.set('all','1');history.replaceState(null,'',url);}
 }
 q('#plant-search').addEventListener('input',()=>{expanded=false;filter();});
 q('#clear-search').addEventListener('click',()=>{q('#plant-search').value='';expanded=false;filter();q('#plant-search').focus();});
 q('#reset-catalog').addEventListener('click',()=>{q('#plant-search').value='';category='all';expanded=false;filter();q('#plant-search').focus();});
 qa('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;expanded=false;filter();}));
 qa('[data-search-term]').forEach(button=>button.addEventListener('click',()=>{q('#plant-search').value=button.dataset.searchTerm;category='all';expanded=false;filter();}));
 q('#catalog-more').addEventListener('click',()=>{expanded=true;filter();});
 filter(false);
})();
