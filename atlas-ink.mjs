import {plants} from './model.mjs';
const path=(d,cls='a-vein',extra='')=>`<path class="${cls}" d="${d}" ${extra}/>`;
const g=(body,x=0,y=0,s=1,a=0)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">${body}</g>`;
const dot=(x,y,r=2,cls='a-seed')=>`<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
const line=d=>path(d,'a-line');
const stem=d=>path(d,'a-stem');
const el=(x,y,rx,ry,cls='plant-leaf')=>`<ellipse class="${cls}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`;
function oval(w=17,h=55,serrate=false){
 let edge='M0 0';for(const sign of [-1,1]){const pts=[];for(let i=0;i<=20;i++){const t=i/20,yy=sign<0?-h*t:-h*(1-t),tt=sign<0?t:1-t,xx=sign*(w*Math.sin(Math.PI*tt)+(serrate&&i%2===1?1.7:0));pts.push([xx,yy]);}edge+=(sign<0?'L':'L')+pts.map(p=>p.join(' ')).join('L');}edge+='Z';
 let veins='M0 0V-'+h;for(const t of [.25,.43,.61,.78])for(const sign of [-1,1])veins+=`M0 ${-h*t+6}Q${sign*w*.4} ${-h*t+2} ${sign*w*Math.sin(Math.PI*t)*.88} ${-h*t}`;
 return path(edge,'plant-leaf')+path(veins,'plant-vein');
}
function compound(n=7,cut=false,toothed=false){let out=line('M0 0V-64');for(let i=0;i<(n-1)/2;i++){const y=-12-i*13;for(const sign of [-1,1])out+=g(oval(cut?5:10,cut?24:26,cut||toothed),sign*2,y,.8,sign*60);}return out+g(oval(cut?6:11,26,cut),0,-46,.8);}
function spear(){return path('M0 0Q-8-29 0-64Q8-29 0 0Z','plant-leaf')+path('M0 0V-63','plant-vein');}
function needles(n){let out='';for(let i=0;i<n;i++){const a=n===1?0:(i/(n-1)-.5)*42;out+=g(path('M0 1Q-2-30 0-63','a-needle'),0,0,1,a);}return out+path('M-2 4V-5H2V4','a-sheath');}
function scaleSpray(juniper=false){let out=stem('M0 0V-56');for(let i=0;i<5;i++)for(const sign of [-1,1]){const y=-8-i*10;out+=stem(`M0 ${y}Q${sign*9} ${y-3} ${sign*19} ${y-17}`);for(let j=1;j<5;j++){const x=sign*j*4,yy=y-j*3;out+=path(`M${x} ${yy+2}l${-sign*2} -5 ${sign*4} -2Z`,'a-scale');}}if(juniper)for(let i=0;i<7;i++)out+=g(path('M0 0Q-1-10 0-18','a-needle'),0,-i*7,.9,i%2?-68:68);return out;}
export function atlasLeaf(p){
 const d=plants[p].draw,k=d.leaf;
 if(k==='needle')return needles(d.n);
 if(k==='cedar'){let out='';for(let i=0;i<23;i++)out+=g(path('M0 0Q-2-20 0-43','a-needle'),0,0,.8+(i%4)*.08,-79+i*7.2);return out+dot(0,0,2,'a-bud');}
 if(k==='scale'||k==='juniper')return scaleSpray(k==='juniper');
 if(k==='spruce'||k==='flat-needle'){let out=stem('M0 0V-58');for(let y=-6;y>-57;y-=6)for(const sign of [-1,1])out+=g(k==='flat-needle'?spear():path('M0 0L0-20','a-needle'),0,y,k==='flat-needle'?.30:1,sign*(k==='flat-needle'?74:52));return out;}
 if(['pinnate','pinnate-cut','pinnate-serrate'].includes(k))return compound(d.n||9,k==='pinnate-cut',k==='pinnate-serrate');
 if(k==='palm'){let out=line('M0 5Q-5-35 1-65');for(let i=0;i<10;i++)for(const sign of [-1,1])out+=g(spear(),sign*1,-5-i*5.7,.38+(9-i)*.014,sign*57);return out;}
 if(k==='palmate'){let out='';for(let i=0;i<7;i++)out+=g(oval(8,42),0,-4,.95,-82+i*27);return out+line('M0 13V-4');}
 if(k==='trifoliate')return line('M0 0V-21')+g(oval(10,31),0,-21)+g(oval(10,29),-1,-12,.9,-55)+g(oval(10,29),1,-12,.9,55);
 if(k==='divided'){let out=line('M0 0V-22');for(const [x,y,a] of [[0,-23,0],[-2,-13,-50],[2,-13,50]])out+=g(path('M0 0C-15-7-19-18-18-25L-9-23-9-37 0-46 9-37 9-23 18-25C19-18 15-7 0 0Z','plant-leaf')+path('M0 0V-45M0-7-17-25M0-7 17-25','plant-vein'),x,y,.75,a);return out;}
 if(k==='truncate')return path('M0 0Q-24-6-26-21L-15-25-24-45-10-41H10L24-45 15-25 26-21Q24-6 0 0Z','plant-leaf')+path('M0 0V-41M0-6-24-21M0-6 24-21M0-16-23-44M0-16 23-44','plant-vein');
 if(k==='heart')return path('M0 0C-18 12-36-6-25-28Q-16-43 0-57Q16-43 25-28C36-6 18 12 0 0Z','plant-leaf')+path('M0 0V-56M0-9-20-27M0-9 20-27','plant-vein');
 if(k==='lotus'){let out=el(0,-27,32,31);for(let i=0;i<12;i++){const a=i*Math.PI/6;out+=path(`M0-27L${Math.cos(a)*30} ${-27+Math.sin(a)*29}`,'plant-vein');}return out+line('M0 18Q-4-5 0-27')+dot(0,-27,1.5,'a-node');}
 if(k==='waterlily'){let out=path('M0-25L-13 2C-42-6-39-42-16-54Q0-62 16-54C39-42 42-6 13 2Z','plant-leaf');for(let i=0;i<10;i++){const a=Math.PI*.2+i*Math.PI*.16;out+=path(`M0-25L${Math.cos(a)*28} ${-27+Math.sin(a)*26}`,'plant-vein');}return out+line('M0 18V-25');}
 if(k==='strap')return path('M0 0Q-7-42 10-67Q3-38 0 0Z','plant-leaf')+path('M0 0Q-2-39 10-66','plant-vein');
 if(k==='sword')return path('M-5 0Q-6-33 0-67Q6-33 5 0Z','a-variegated')+path('M-2 0Q-3-31 0-63Q3-31 2 0Z','plant-leaf');
 if(k==='bamboo'){let out=line('M0 0Q-8-26 0-56');for(const [x,y,a] of [[-3,-12,-59],[-5,-26,52],[-2,-39,-49],[0,-53,25]])out+=g(spear(),x,y,.49,a);return out;}
 if(k==='chrysanthemum'||k==='trilobed'){const shape=k==='chrysanthemum'?'M0 0-14-7-11-16-22-22-15-27-22-35-10-34-13-46-5-42 0-57 5-42 13-46 10-34 22-35 15-27 22-22 11-16 14-7Z':'M0 0Q-26-4-25-23L-18-25-21-40-8-35 0-54 8-35 21-40 18-25 25-23Q26-4 0 0Z';return path(shape,'plant-leaf')+path('M0 0V-54M0-9-19-32M0-9 19-32M0-9-23-21M0-9 23-21','plant-vein');}
 if(k==='triplinerved')return oval(18,48,true)+path('M-2-2Q-18-26 0-48M2-2Q18-26 0-48','plant-vein');
 if(k==='lanceolate')return oval(8,62,true);
 if(k==='obovate')return path('M0 0C-12-12-31-33-20-49Q0-68 20-49C31-33 12-12 0 0Z','plant-leaf')+path('M0 0V-57M0-13-21-35M0-13 21-35M0-30-17-48M0-30 17-48','plant-vein');
 return oval(k==='small-serrate'?12:18,k==='small-serrate'?39:54,k.includes('serrate'));
}
function flower(n=5,double=false,size=14){let out='';const rings=double?[1,.71,.43]:[1];for(const [ri,scale] of rings.entries())for(let i=0;i<n;i++)out+=g(el(0,-size*.53,size*.38,size*.65,'a-petal'),0,0,scale,i*360/n+ri*27);return out+dot(0,0,3.2,'a-pollen');}
function pea(){return path('M0 0C-11-4-15-15-7-19Q0-21 7-19C15-15 11-4 0 0Z','a-petal')+path('M0 0Q-15 0-11-8Q-4-8 0 0Q4-8 11-8Q15 0 0 0Z','a-petal')+line('M0 0V4');}
function cone(long=false,upright=false){let out=path(`M0 ${upright?-45:8}C-21-26-18-55 0-59C18-55 21-26 0 ${upright?-45:8}Z`,'a-cone');if(upright)out=path('M-14 0V-31Q-12-45 0-46Q12-45 14-31V0Z','a-cone');for(let y=upright?-35:-48;y<(upright?0:0);y+=8)for(const x of [-8,0,8])out+=path(`M${x-5} ${y}q5 7 10 0`,'a-cone-line');return g(out,0,0,long?1.1:1);}
export function atlasFlower(p){
 const d=plants[p].draw,k=d.flower;
 if(k==='unknown')return '';
 if(k.startsWith('pollen')){let out=line('M0 15V-9');const positions=k==='pollen-long'?[[0,-23]]:k==='pollen-small'?[[0,-8],[-8,-3],[8,-3]]:[[-12,-10],[0,-20],[12,-10]];for(const [x,y] of positions){out+=g(el(0,0,k==='pollen-long'?6:5,k==='pollen-long'?24:11,'a-pollen-cone'),x,y);for(let j=-7;j<=7;j+=3)out+=line(`M${x-4} ${y+j}h8`);}return out;}
 if(k==='plume'){let out=line('M0 20V-51');for(let y=-4;y>-51;y-=7)for(const sign of [-1,1]){const x=sign*(25+(y/2));out+=line(`M0 ${y+8}L${x} ${y-4}`);for(let i=0;i<4;i++)out+=path(`M${x*.6} ${y+1}l${sign*7} -8`,'a-plume');}return out;}
 if(k==='cattail')return line('M0 27V-58')+path('M-5 3V-32Q0-38 5-32V3Q0 9-5 3Z','a-cone')+path('M-2-40V-56Q0-60 2-56V-40Z','a-pollen-cone');
 if(k==='catkin')return line('M0 15V-15')+g(el(0,0,7,24,'a-pollen-cone'),0,-23)+Array.from({length:9},(_,i)=>dot(i%2?4:-4,-4-i*4,1.5,'a-pollen')).join('');
 if(k==='honeysuckle'){let out=line('M0 18V0');for(const a of [-30,30])out+=g(path('M-2 0Q-2-14 4-22Q-10-27-7-31Q-1-33 3-26Q1-39 6-38Q10-36 8-27Q17-35 20-30Q19-25 10-23Q20-19 18-14Q13-12 7-22Q2-12 2 0Z','a-petal')+path('M6-24Q16-29 23-31','a-line')+dot(23,-31,1.5,'a-pollen'),0,0,1,a);return out;}
 if(k==='tulip'){let out=line('M0 22V0');for(const a of [-45,0,45])out+=g(path('M0 0Q-22-13-13-43Q1-47 12-43Q20-13 0 0Z','a-petal')+path('M-13-14Q0-4 13-14','a-fruit-shine'),0,0,.8,a);return out;}
 if(k==='magnolia'){let out=line('M0 15V0');for(const [a,s] of [[-55,1],[55,1],[-28,1],[28,1],[0,.9]])out+=g(path('M0 0C-20-11-20-31-6-46Q9-45 11-27C12-12 4-3 0 0Z','a-petal'),0,0,s,a);return out;}
 if(k==='bracts'){let out=line('M0 19V0');for(let i=0;i<3;i++)out+=g(path('M0 0Q-25-8-17-36Q9-37 12-15Z','a-petal'),0,0,1,i*120);for(const x of [-5,0,5])out+=line(`M${x} 0v-15`)+g(flower(5,false,3),x,-15);return out;}
 if(k==='lotus'||k==='waterlily'){let out=line('M0 22V0');for(const [ri,n] of [[0,9],[1,7],[2,5]])for(let i=0;i<n;i++)out+=g(path('M0 0C-15-12-16-27 0-42C16-27 15-12 0 0Z','a-petal'),0,0,1-ri*.17,-75+i*150/(n-1));return out+el(0,-7,7,4,'a-pollen');}
 if(k==='wisteria'||k==='pea-raceme'){let out=line('M0-54Q-8-20 0 16');for(let i=0;i<9;i++)for(const sign of [-1,1])out+=line('M0 '+(-36+i*5.6)+'L'+sign*(14-i*.8)+' '+(-39+i*5.6))+g(pea(),sign*(14-i*.8),-39+i*5.6,.48-i*.025,sign*29);return out;}
 if(k==='lilac'||k==='fringe'||k==='pea-cluster'||k==='small-cluster'||k==='umbel'){
  let out=line('M0 20V-45');for(const [x,y] of [[-20,-9],[20,-9],[-15,-24],[15,-24],[0,-42],[-5,-10],[7,-28]]){out+=line(`M0 ${y+13}L${x} ${y}`);if(k==='fringe'){let fl='';for(let a=0;a<4;a++)fl+=g(el(0,-9,1.5,10,'a-petal'),0,0,1,a*90);out+=g(fl+dot(0,0,1.3,'a-pollen'),x,y,.55);}else out+=g(k==='pea-cluster'?pea():flower(k==='lilac'?4:5,false,7),x,y,.8);}return out;
 }
 if(k==='bells'||k==='trumpets'){let out=line('M0 20V-43');for(const [x,y,a] of [[-18,-18,-20],[17,-31,20],[0,-45,0]]){out+=line(`M0 ${y+12}L${x} ${y}`);out+=g(path('M-3 0Q-4-15-12-21Q0-13 12-21Q4-15 3 0Z','a-petal')+path('M-12-21Q-6-27 0-21Q6-27 12-21','a-petal'),x,y,1,a+(k==='bells'?180:0));}return out;}
 if(k==='crape'){let out='';for(let i=0;i<6;i++)out+=g(path('M0 0V-10Q-14-9-12-16L-16-20-9-23-11-28-4-29 0-33 4-29 11-28 9-23 16-20 12-16Q14-9 0-10','a-petal'),0,-8,.68,i*60);return out+dot(0,-8,4,'a-pollen')+line('M0 20V-8');}
 const cluster=['crabapple-up','crabapple-down','rose-cluster','quince'].includes(k);
 if(cluster){let out='';for(const [x,y] of [[-18,-20],[17,-25],[0,-42]]){out+=line(k==='crabapple-down'?`M0 16Q${x} -50 ${x} ${y}`:`M0 16L${x} ${y}`);out+=g(flower(5,k==='rose-cluster',11),x,y);}return out;}
 let f=flower(k==='four-yellow'?4:k==='six-yellow'?6:['small-star','five','cherry'].includes(k)?5:8,['rose','double-pink','peony','daisy-double'].includes(k),k==='small-star'?8:19);
 if(k==='cherry')f=flower(5,false,19)+Array.from({length:5},(_,i)=>g(path('M-2-23 0-19 2-23','a-petal-notch'),0,0,1,i*72)).join('');
 return line('M0 22V-8')+g(f,0,-8);
}
export function atlasFruit(p){
 const d=plants[p].draw,k=d.fruit;
 if(k==='unknown')return '';
 if(k.startsWith('cone'))return line(k==='cone-upright'?'M0 21V0':'M0-60V-70')+cone(k==='cone-long',k==='cone-upright');
 if(k==='cypress-cone')return line('M0 23V13')+path('M0 15C-24 6-24-26 0-39C24-26 24 6 0 15Z','a-cone')+path('M0 13Q-3-9 0-31M-15-25Q0-12 15-25M-17-7Q0 5 17-7','a-cone-line')+path('M-15-25-23-32-19-20M15-25 23-32 19-20M-17-7-24-13-20-3M17-7 24-13 20-3','a-cone');
 if(k==='juniper-cone'||k==='fleshy-seed'){let out=line('M0-38V-9M0-9-13 0M0-9 13 3');for(const [x,y] of [[-13,5],[13,8]])out+=el(x,y,k==='fleshy-seed'?10:10,k==='fleshy-seed'?15:10,'a-fleshy-seed')+path(`M${x-5} ${y-4}q-3 3-2 7`,'a-bloom');return out;}
 if(k==='beaded-pod'||k==='long-pod'){let out=line('M0-48V-34');if(k==='long-pod')return out+path('M0-34Q-19-6-8 25Q6 30 10 8Q15-17 0-34Z','a-pod')+path('M0-32Q-8-7-2 24','a-cone-line');let shape='M0-35';for(let i=0;i<5;i++)shape+=`q-12 8 0 13`;shape+='M0-35';for(let i=0;i<5;i++)shape+='q12 8 0 13';return out+path(shape+'Z','a-pod');}
 if(k==='follicles'){let out=line('M0 24V8');for(let a=-50;a<=50;a+=25){let body=path('M0 9Q-19-4-6-31Q8-35 10-17Q11-1 0 9Z','a-pod')+path('M0 8Q-4-8-6-30','a-cone-line');for(let y=-18;y<1;y+=8)body+=dot(1,y,2.7);out+=g(body,0,0,1,a);}return out;}
 if(k==='lotus-pod'){let out=line('M0 27V0')+path('M-28-17L-13 9Q0 17 13 9L28-17Z','a-lotus-pod')+el(0,-18,28,10,'a-lotus-top');for(const [x,y] of [[-17,-19],[-7,-23],[7,-23],[18,-19],[-7,-15],[7,-15]])out+=el(x,y,3.3,2.5,'a-seed');return out;}
 if(k==='fused-berries')return line('M0-35V-6')+path('M0 12C-25 5-23-16-9-16Q-2-16 0-9Q2-16 9-16C23-16 25 5 0 12Z','a-red-fruit')+path('M-12-9Q-18-6-13 0','a-fruit-shine');
 if(k==='waterlily-fruit')return line('M0 24Q-8 3 0-18')+el(0,-18,19,21,'a-pod')+path('M-13-4Q0 3 13-4M-11-35Q0-43 11-35','a-cone-line');
 if(k==='plume'||k==='cattail')return atlasFlower(p);
 if(k==='fluff'){let out=line('M0-40Q-8-10 0 22');for(let i=0;i<6;i++){const x=i%2?-14:15,y=-30+i*9;out+=el(x,y,4,6,'a-pod');for(let j=0;j<5;j++)out+=path(`M${x} ${y}l${(j-2)*4} -12`,'a-fluff');}return out;}
 if(k==='achenes'){let out='';for(let i=0;i<7;i++)out+=g(path('M-1 8-2-14 1-18 3 8Z','a-achene')+path('M-1-14-6-25M0-17V-29M1-17 6-26','a-fluff'),-22+i*7,0,1,-15+i*5);return out;}
 if(k==='ash-samara'){let out='';for(const [x,y,a] of [[-14,-5,-20],[2,7,0],[15,-8,22]])out+=line('M0-39L'+x+' '+(y-25))+g(path('M0-26Q-10-4-4 21Q4 27 6 15Q11-5 0-26Z','a-wing')+el(0,15,3,7,'a-seed'),x,y,.9,a);return out;}
 if(k==='aggregate-samara'){let out=line('M0 25V0');for(let y=-40;y<=0;y+=10)for(const x of [-8,0,8])out+=g(path('M0 7Q-8-5-4-16Q6-15 7-6Z','a-wing'),x,y,.9,(y+x)%2?-10:10);return out;}
 if(k==='flat-pod')return line('M0-43V-28')+path('M-4-28Q-17-5-10 27Q2 33 8 16Q15-10 4-28Z','a-pod')+path('M-1-23Q-6 0-3 23','a-cone-line');
 if(k==='lantern')return line('M0-44V-29')+path('M0-31Q-25-21-25 6L0 27 25 6Q25-21 0-31Z','a-pod')+path('M0-31V27M-25 6 0-8 25 6','a-cone-line');
 if(k==='samara')return line('M0-28V-13')+el(0,0,23,17,'a-wing')+el(0,0,5,6,'a-seed')+path('M-20 0H-6M6 0H20','plant-vein');
 if(k.startsWith('capsule')){let out=line('M0-47V-27')+el(0,-6,k==='capsule-long'?6:14,k==='capsule-long'?30:21,'a-pod');return out+path('M0-27Q-5-6 0 15M0-27Q5-6 0 15','a-cone-line');}
 if(k==='aggregate-red'){let out=line('M0 25V8')+el(0,-15,13,30,'a-pod');for(let i=0;i<6;i++)out+=dot(i%2?9:-9,-37+i*9,3.5,'a-red-seed');return out;}
 const cluster=['pome-small','drupe-cluster'].includes(k),positions=cluster?[[-15,-8],[14,-3],[2,14]]:[[0,0]];
 let out='';for(const [x,y] of positions){out+=line(`M0-42Q${x-3} -29 ${x} ${y-12}`);let shape='';if(k==='pome-long')shape=el(x,y,17,27,'a-pome');else if(k==='pome-large')shape=el(x,y,25,23,'a-pome');else if(k==='rosehip')shape=el(x,y,12,15,'a-hip')+path(`M${x-6} ${y-13}l4-6 2 6 3-6 3 6`,'a-calyx');else shape=el(x,y,cluster?10:16,cluster?11:17,k==='drupe-blue'?'a-blue-fruit':k==='drupe-red'?'a-red-fruit':k==='pome-small'?'a-pome':'a-drupe');out+=shape+path(`M${x-7} ${y-8}q-4 4-2 9`,'a-fruit-shine');}
 return out;
}
function nodes(p){const k=plants[p].draw.branch;if(k==='twining')return [[76,134,-1],[95,108,1],[65,70,-1],[65,45,1]];if(['opposite','green-opposite'].includes(k))return [[86,118,-1],[86,118,1],[88,82,-1],[88,82,1],[88,47,-1],[88,47,1]];return [[86,121,-1],[89,91,1],[87,61,-1],[91,43,1]];}
export function atlasTwig(p){
 const d=plants[p],k=d.draw.branch;
 if(k==='bamboo'||k==='cane'||k==='jointed'){let out=path('M83 157Q87 89 87 20','a-cane');for(const y of [38,67,96,125,154])out+=line(`M82 ${y}h9`);if(k==='bamboo')for(const [x,y,sign] of nodes(p))out+=stem(`M87 ${y}q${sign*14} -3 ${sign*24} -14`);return out;}
 if(k==='creeping'){let out=stem('M24 144Q89 149 154 105');for(const [x,base,tip] of [[50,145,140],[84,139,133],[116,127,119],[145,111,109]])out+=stem('M'+x+' '+base+'V'+tip)+el(x,tip,1.6,2.7,'a-bud');return out;}
 if(['aquatic','herb','rosette'].includes(k)){let out=stem('M90 153Q87 95 90 34');out+=path('M90 152Q75 158 65 155M90 152Q107 157 119 152M87 153 76 166M94 153 105 164','a-root');if(k==='herb')for(const [x,y,sign] of nodes(p))out+=stem(`M88 ${y}l${sign*16} -12`);return out;}
 if(k==='twining')return stem('M86 157C48 129 122 110 87 88S50 52 91 20')+path('M92 155C56 127 129 108 94 86S57 50 98 18','a-secondary');
 let out=stem(k==='creeping'?'M24 144Q89 149 154 105':k==='weeping'?'M92 156Q81 73 93 18Q144 14 143 147':'M83 156Q91 105 87 73Q85 42 93 19');
 for(const [x,y,sign] of nodes(p)){out+=stem(`M${x} ${y}l${sign*15} -11`);if(!d.evergreen)out+=g(el(0,0,k==='magnolia'?4:2.5,k==='magnolia'?6:4.3,'a-bud'),x+sign*5,y-5,1,sign*40);if(['thorn','prickly'].includes(k))out+=path(`M${x+1} ${y+5}l7 3-6-9Z`,'a-thorn');}
 if(k==='stipule-thorn')for(const [x,y] of nodes(p))out+=path('M'+(x-1)+' '+(y+3)+'l-6 4 5-9M'+(x+1)+' '+(y+3)+'l6 4-5-9','a-thorn');
 if(k==='magnolia'){out+=path('M84 112h6M85 75h5M86 40h5','a-cone-line');for(let i=0;i<12;i++){const a=i*Math.PI/6;out+=line('M'+(93+Math.cos(a)*5)+' '+(17+Math.sin(a)*8)+'l'+Math.cos(a)*2+' '+Math.sin(a)*2);}return out+el(93,17,5,8,'a-bud');}
 return out+el(93,17,3.4,5.4,'a-bud');
}
export function atlasBranch(p,s){
 const d=plants[p],k=d.draw.branch;let leaves='',flowers='',fruits='',wood=atlasTwig(p);
 const leafDelay=s===0&&['yulan','flowering-quince','flowering-almond','mountain-peach','ornamental-peach','winter-jasmine','winter-honeysuckle'].includes(d.id);
 if((s!==3||d.evergreen)&&!leafDelay){
  if(d.draw.leaf==='needle'){for(const [x,y,sign] of nodes(p))for(const turn of [-28,0,28])leaves+=g(atlasLeaf(p),x+sign*15,y-11,.40,sign*43+turn);
  }else if(k==='rosette'){for(let i=0;i<13;i++)leaves+=g(atlasLeaf(p),90,150,.9,-79+i*158/12);
  }else if(d.draw.leaf==='palm'){wood='';for(const [x,y] of [[63,78],[90,58],[116,73]]){wood+=path('M'+(x+3)+' 155Q'+(x-4)+' 111 '+x+' '+y,'a-cane');for(let i=0;i<3;i++)leaves+=g(atlasLeaf(p),x,y,.73,-55+i*55);}
  }else if(k==='jointed'){for(const [y,sign] of [[125,-1],[96,1],[67,-1],[38,1]])leaves+=g(atlasLeaf(p),87,y,.76,sign*62);
  }else if(['aquatic'].includes(k)){
   for(const [x,y,a,sc] of [[74,130,-30,.72],[103,119,26,.73],[92,88,0,.64]])leaves+=line(`M90 153Q${x} ${y+15} ${x} ${y}`)+g(atlasLeaf(p),x,y,sc*(s===0?.65:1),a);
  }else if(k==='creeping'){for(const [x,y] of [[50,140],[84,133],[116,119],[145,109]])leaves+=line('M'+x+' '+(y+6)+'V'+y)+g(atlasLeaf(p),x,y,.63,-15);}
  else for(const [x,y,sign] of nodes(p))leaves+=(k==='twining'?line('M'+x+' '+y+'l'+sign*15+' -11'):'')+g(atlasLeaf(p),x+sign*15,y-11,(['palmate','cedar','bamboo'].includes(d.draw.leaf)? .43:.50)*(s===0&&!d.evergreen?.65:1),sign*43);
 }
 if(d.bloom.includes(s)&&d.draw.flower!=='unknown'){
  if(['lotus','waterlily','cattail','reed'].includes(d.id))flowers=line('M90 150Q128 100 119 55')+g(atlasFlower(p),119,55,.57);
  else if(leafDelay)for(const [x,y,sign] of nodes(p).slice(0,3))flowers+=g(atlasFlower(p),x+sign*15,y-11,.44);
  else flowers=line('M87 61Q109 60 115 64')+g(atlasFlower(p),115,64,.54);
 }
 if((d.fruitSeasons||[2]).includes(s)&&d.draw.fruit!=='unknown'&&!['reed','cattail'].includes(d.id))fruits=line('M89 91Q113 91 121 99')+g(atlasFruit(p),121,99,.52);
 if(s===3&&!d.evergreen&&['草本','水生'].includes(d.category)&&d.id!=='reed')wood=path('M90 153Q74 159 62 155M90 153Q108 158 121 152M87 154 77 166M94 154 105 165','a-root')+path('M86 154Q81 142 79 129M93 154Q102 143 104 136M90 154V135','a-root');
 if(s===3&&d.id==='reed')wood='<g class="winter-cane">'+wood+'</g>';

 return `<g class="botanical species-${p} season-${s} atlas-ink ${d.draw.branch==='green-opposite'?'green-stem ':''}${['herb','aquatic'].includes(d.draw.branch)?'herbaceous ':''}${d.evergreen?'evergreen ':''}${d.draw.purple?'purple-leaf ':''}${d.potted&&s===3?'protected-plant':''}" style="--flower:${d.draw.color||'#c7b6a0'}"><g data-ink-organ="twig">${wood}</g><g data-ink-organ="leaf">${leaves}</g><g data-ink-organ="flower">${flowers}</g><g data-ink-organ="fruit">${fruits}</g></g>`;
}
export function atlasOrgan(p,o,s){
 const d=plants[p];let ink='';
 if(d.draw[o]==='unknown')ink='<text class="a-note" x="90" y="84" text-anchor="middle">未细定到种</text><text class="a-note" x="90" y="102" text-anchor="middle">留待现场补认</text>';
 else if(o==='leaf')ink=g(atlasLeaf(p),90,140,d.draw.leaf==='palmate'?1.15:1.45);
 else if(o==='flower')ink=g(atlasFlower(p),90,110,d.draw.flower==='magnolia'?1.1:1.4);
 else if(o==='fruit')ink=g(atlasFruit(p),90,95,1.3);
 else ink=atlasTwig(p);
 return `<g class="botanical species-${p} season-${s} atlas-ink ${d.draw.branch==='green-opposite'?'green-stem ':''}${['herb','aquatic'].includes(d.draw.branch)?'herbaceous ':''}${d.evergreen?'evergreen ':''}${d.draw.purple?'purple-leaf':''}" style="--flower:${d.draw.color||'#c7b6a0'}">${ink}</g>`;
}

