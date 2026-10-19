import {plants} from './model.mjs';
import {atlasLeaf,atlasFlower,atlasFruit,atlasTwig,atlasBranch,atlasOrgan} from './atlas-ink.mjs';
// Original botanical drawings. Coordinates describe ink on a plate, not rigid plant bodies.
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;');
const path=(d,cls,extra='')=>`<path class="${cls}" d="${d}" ${extra}/>`;
const group=(body,x=0,y=0,scale=1,angle=0)=>`<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})">${body}</g>`;
const line=d=>path(d,'plant-line');
const twig=d=>path(d,'plant-twig');
const dot=(x,y,r,cls='plant-bud')=>`<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
const cubic=(p,t)=>{const u=1-t;return [0,1].map(i=>u*u*u*p[0][i]+3*u*u*t*p[1][i]+3*u*t*t*p[2][i]+t*t*t*p[3][i]);};

export function leafInk(plant){
  if(plant>=4)return atlasLeaf(plant);
  if(plant===0){
    let veins='';
    const tips=[[-34,-35],[-29.5,-39.5],[-24,-41],[-16.25,-42.5],[-9,-39],[-2,-29],[2,-29],[9,-39],[16.25,-42.5],[24,-41],[29.5,-39.5],[34,-35]];
    for(let i=0;i<tips.length;i+=2){
      const a=tips[i],b=tips[i+1],node=[(a[0]+b[0])*.27,(a[1]+b[1])*.27];
      veins+=`M0 0Q${node[0]*.4} ${node[1]*.5} ${node[0]} ${node[1]}`;
      for(const [x,y] of [a,b])veins+=`M${node[0]} ${node[1]}Q${(node[0]+x)*.5} ${(node[1]+y)*.5} ${x} ${y}`;
    }
    return path('M0 0C-10-5-27-20-34-35Q-30-41-24-41Q-16-45-9-39L-2-29Q0-26 2-29L9-39Q16-45 24-41Q30-41 34-35C27-20 10-5 0 0Z','plant-leaf')+path(veins,'plant-vein');
  }
  if(plant===1){
    return path('M-12 0-25-12-20-21-34-28-18-30-23-46-10-39-11-53 0-64 11-53 10-39 23-46 18-30 34-28 20-21 25-12 12 0Z','plant-leaf')+path('M0 0V-64M0 0-23-46M0 0-34-28M0 0 23-46M0 0 34-28','plant-vein');
  }
  if(plant===3){
    // Broad, entire lobes and a cordate base, rather than a serrated plane-tree leaf.
    return path('M0 0C-9 10-22 6-27-6Q-30-13-40-20Q-34-27-28-28Q-22-28-25-43Q-14-43-10-36Q-8-50 0-61Q8-50 10-36Q14-43 25-43Q22-28 28-28Q34-27 40-20Q30-13 27-6C22 6 9 10 0 0Z','plant-leaf')+path('M0 0V-61M0 0Q-5-22-25-43M0 0Q5-22 25-43M0 0Q-17-10-40-20M0 0Q17-10 40-20M0-22-11-31M0-36 7-44M-12-23-23-24M12-23 23-24M-18-11-24-5M18-11 24-5','plant-vein');
  }
  let veins='M0 0V-57';
  for(const t of [.22,.41,.60,.79])for(const sign of [-1,1]){const p=cubic([[0,0],[22*sign,-9],[24*sign,-37],[0,-57]],t);veins+=`M0 ${-57*t+7}Q${p[0]*.5} ${p[1]+5} ${p[0]} ${p[1]}`;}
  return path('M0 0C-22-9-24-37 0-57C24-37 22-9 0 0Z','plant-leaf')+path(veins,'plant-vein');
}
function bud(x,y,angle=0,scale=1){return group(path('M0 4C-5 0-4-7 0-11C4-7 5 0 0 4Z','plant-bud')+path('M-2-4 2 0M-2 0 2-4','plant-vein'),x,y,scale,angle);}
function scars(x,y){return [0,1,2,3].map(i=>`<ellipse class="plant-scar" cx="${x}" cy="${y+i*2}" rx="3.4" ry=".7"/>`).join('');}

export function fruitInk(plant,green=false){
  if(plant>=4)return atlasFruit(plant);
  if(plant===0)return line('M0-28C0-13-10-6-10 7M0-28C0-14 12-4 12 10')+`<g class="${green?'unripe':'ripe'}"><ellipse class="ginkgo-seed" cx="-10" cy="13" rx="8.5" ry="11"/><ellipse class="ginkgo-seed" cx="12" cy="17" rx="8" ry="10"/>${path('M-13 6Q-17 11-14 17M9 10Q5 16 8 21','seed-shine')}</g>`;
  if(plant===1)return line('M0-25V-3')+`<g class="${green?'unripe':'ripe'}">`+path('M-2 0C-5-13-20-28-29-25Q-34-19-24-13L-9 4Q-3 7-2 0ZM2 0C5-13 20-28 29-25Q34-19 24-13L9 4Q3 7 2 0Z','maple-wing')+path('M-6 1-27-22M6 1 27-22','plant-vein')+`<ellipse class="maple-nut" cx="-5" cy="1" rx="5" ry="6"/><ellipse class="maple-nut" cx="5" cy="1" rx="5" ry="6"/></g>`;
  if(plant===3){
    // Five opened carpels, each a papery boat; seeds are attached to its margins.
    let boats='';
    for(const [angle,scale] of [[-76,.84],[69,.85],[-39,1],[36,1],[0,1.08]]){
      let boat=path('M0 0C-7-9-9-31 0-49C9-31 7-9 0 0Z','firmiana-follicle')+path('M0 0Q-3-24 0-49M0-12-5-21M0-24-5-32M0-13 5-22M0-25 5-33','firmiana-fold');
      for(const [x,y] of [[-5.5,-16],[-5.7,-30],[5.8,-22]])boat+=dot(x,y,2.5,'firmiana-seed')+path(`M${x-.7} ${y-1.2}l-.4 1.3`,'seed-shine');
      boats+=group(boat,0,7,scale,angle);
    }
    return line('M0 29V7')+`<g class="ripe">${boats}</g>`;
  }
  return line('M0-18V-2M0-2-7 5M0-2 7 5')+`<g class="${green?'unripe':'ripe'}">`+dot(-6.8,8,7.3,'honey-berry')+dot(6.8,8,7.3,'honey-berry')+path('M-10 3Q-13 6-11 9M3 3Q0 6 2 9','berry-shine')+dot(-6.8,13,.8,'plant-scar')+dot(6.8,13,.8,'plant-scar')+'</g>';
}
function honeyFlower(color,angle){
  const shape=path('M-2 0C-2-8 2-12 3-18C-1-22-5-26-3-28Q0-29 3-24Q2-33 5-33Q8-31 7-25Q11-33 13-30Q14-27 10-22Q17-25 18-21Q17-18 9-17C12-13 16-12 16-9Q13-7 9-12L5-17C3-10 1-3 2 0Z',color)+path('M5-19Q8-24 13-30M5-19Q10-23 17-27','plant-stamen')+dot(13,-30,1,'pollen')+dot(17,-27,1,'pollen');
  return group(shape,0,0,1,angle);
}
export function flowerInk(plant){
  if(plant>=4)return atlasFlower(plant);
  if(plant===0)return line('M0 7V-8M0-8Q-8-15-13-23M0-8Q8-15 13-23')+dot(-13,-24,4.6,'ginkgo-ovule')+dot(13,-24,4.6,'ginkgo-ovule');
  if(plant===2)return line('M0 10V0')+honeyFlower('honey-flower-white',-24)+honeyFlower('honey-flower-yellow',27);
  if(plant===3){
    let out=line('M0 22V-45M0 5-24-9M0-10 23-23M0-24-15-36M0-35 13-45');
    for(const [x,y,a] of [[-24,-9,-35],[-16,-4,20],[23,-23,22],[15,-17,-15],[-15,-36,-20],[-8,-30,30],[13,-45,30],[0,-47,-5]]){
      let calyx='';for(let i=0;i<5;i++)calyx+=group(path('M0 0C-1-3-3-7-2-9Q0-10 1-8Q0-5 1-2Z','firmiana-calyx'),0,0,1,i*72);
      out+=group(calyx+path('M0 0Q1-5 5-8','plant-stamen')+dot(5,-8,1.5,'pollen'),x,y,.85,a);
    }return out;
  }
  let out=line('M0 12V-12M0-12-18-25M0-12 18-25M0-12 0-35');
  for(const [x,y] of [[-18,-25],[18,-25],[0,-35]]){
    let petals='';for(let i=0;i<5;i++)petals+=`<ellipse class="maple-flower" cx="0" cy="-4" rx="2.4" ry="4.6" transform="rotate(${i*72})"/>`;
    out+=group(petals+dot(0,0,1.7,'pollen'),x,y);
  }return out;
}
export function twigInk(plant){
  if(plant>=4)return atlasTwig(plant);
  let out=twig('M83 155Q91 111 85 72Q80 47 91 16');
  if(plant===3){
    for(const [x,y,sign] of [[87,124,-1],[87,96,1],[84,68,-1],[86,41,1]]){
      out+=`<ellipse class="firmiana-scar" cx="${x}" cy="${y}" rx="3.5" ry="2.7" transform="rotate(${sign*22} ${x} ${y})"/>`+group(dot(0,0,3.2,'firmiana-bud')+path('M-1-2 1 2M1-2-1 2','plant-bark'),x+sign*3,y-7);
    }
    out+=dot(91,14,5.1,'firmiana-bud')+path('M89 11 93 16M93 11 89 16','plant-bark');
    return out;
  }
  if(plant===0){
    for(const [x,y,sign] of [[88,123,-1],[87,91,1],[84,59,-1],[88,31,1]]){out+=twig(`M${x} ${y}l${sign*11} -5`)+scars(x+sign*11,y-8)+bud(x+sign*11,y-10,sign*20,.6);}out+=bud(91,16,0,.9);
  }else{
    for(const [x,y] of [[86,119],[87,82],[85,47]])for(const sign of [-1,1]){
      out+=twig(`M${x} ${y}l${sign*18} -14`)+bud(x+sign*6,y-5,sign*44,.65)+bud(x+sign*18,y-17,sign*37,.6);
    }out+=bud(91,16,0,.9);
  }
  out+=path('M83 148 84 140M88 111 88 102M85 68 84 61','plant-bark');
  return out;
}
export function branchInk(plant,season){
  if(plant>=4)return atlasBranch(plant,season);
  let wood=twigInk(plant),leaves='',flowers='',fruits='';
  if(plant===3){
    if(season!==3){
      for(const [x,y,a,scale,rx,ry] of [[65,115,-52,.66,87,124],[116,87,48,.65,87,96],[58,59,-40,.58,84,68],[112,35,36,.52,86,41]])leaves+=line(`M${rx} ${ry}Q${x} ${y+10} ${x} ${y}`)+group(leafInk(plant),x,y,scale*(season===0?.68:1),a);
      if(season===1)flowers=line('M91 16Q90 29 100 44.9')+group(flowerInk(plant),100,35,.45);
      if(season===2)fruits=line('M91 16Q110 13 118 43.63')+group(fruitInk(plant),118,30,.47);
    }
    return `<g class="botanical species-${plant} season-${season}" transform="translate(9 9) scale(.9)"><g data-ink-organ="twig">${wood}</g><g data-ink-organ="leaf">${leaves}</g><g data-ink-organ="flower">${flowers}</g><g data-ink-organ="fruit">${fruits}</g></g>`;
  }
  if(season!==3){
    const positions=plant===0?[[77,118,-43,.67],[77,118,17,.73],[98,86,41,.70],[98,86,-19,.73],[73,54,-42,.60],[73,54,9,.62],[99,26,36,.54]]:
      [[68,105,-50,.68],[110,105,50,.68],[65,69,-45,.62],[111,69,45,.62],[73,32,-35,.54],[108,32,35,.54]];
    for(const [x,y,a,s] of positions){
      const root=plant===0?(y>100?[88,123]:y>70?[87,91]:y>40?[84,59]:[88,31]):[y>90?86:y>50?87:85,y>90?119:y>50?82:47];
      const springScale=season===0?.78:1;
      leaves+=line(`M${root[0]} ${root[1]}Q${x} ${y+8} ${x} ${y}`)+group(leafInk(plant),x,y,s*springScale,a);
    }
    if(season===0){for(const [x,y] of plant===0?[[98,86],[73,54]]:plant===1?[[92,23],[67,62]]:[[70,95],[108,59]])flowers+=group(flowerInk(plant),x,y,.63);}
    if(season===1||season===2){for(const [x,y] of plant===0?[[87,91],[84,59]]:plant===1?[[85,47],[86,119]]:[[87,82],[86,119],[85,47]])fruits+=group(fruitInk(plant,season===1),x+(plant===1?14:6),y+9,.65);}
  }
  return `<g class="botanical species-${plant} season-${season}" transform="translate(9 9) scale(.9)"><g data-ink-organ="twig">${wood}</g><g data-ink-organ="leaf">${leaves}</g><g data-ink-organ="flower">${flowers}</g><g data-ink-organ="fruit">${fruits}</g></g>`;
}
export function organInk(plant,organ,season=2){
  if(plant>=4)return atlasOrgan(plant,organ,season);
  let body='';
  if(organ==='leaf')body=group(line('M0 16V0')+leafInk(plant),90,139,plant===3?1.55:1.65);
  else if(organ==='fruit')body=group(fruitInk(plant,season===1),90,92,plant===3?1.52:1.9);
  else if(organ==='flower')body=group(flowerInk(plant),90,111,plant===3?1.6:2);
  else body=twigInk(plant);
  return `<g class="botanical species-${plant} season-${season}">${body}</g>`;
}
export function organSvg(plant,organ,season=2){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="${esc(plants[plant].name)}${esc({leaf:'叶形',twig:plant>=4&&['草本','水生'].includes(plants[plant].category)?'茎与基部':'枝与芽',flower:plant===0?'胚珠':plants[plant].naked?'球花结构':'花形',fruit:plant===0?'种子':plants[plant].naked?'球果与种子':'果实'}[organ])}对照插画">${organInk(plant,organ,season)}</svg>`;}
