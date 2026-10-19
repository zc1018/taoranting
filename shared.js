(()=>{
 const button=document.querySelector('#theme');
 try{const theme=localStorage.getItem('taoranting-theme');if(['light','dark'].includes(theme))document.body.dataset.theme=theme;}catch{}
 function sync(){const dark=document.body.dataset.theme==='dark';button.textContent=dark?'☀':'☾';button.setAttribute('aria-label',`切换${dark?'浅':'深'}色主题`);}
 button.addEventListener('click',()=>{document.body.dataset.theme=document.body.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('taoranting-theme',document.body.dataset.theme);}catch{}sync();});
 sync();
 // Keep old shared links useful after the single page became separate tools.
 if(document.body.dataset.page==='catalog'){
  if(location.hash==='#recognise')location.replace('recognise.html');
  if(location.hash==='#observe')location.replace('plant.html?plant=ginkgo');
 }
})();
