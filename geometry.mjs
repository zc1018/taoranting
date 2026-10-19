import * as k from './kit/iso-kit.mjs';
import * as G from './kit/lathe.mjs';
import * as A from './kit/audit.mjs';
import {branchInk,organInk} from './botany.mjs';
import {plants} from './model.mjs';

export function observationCase(){
 const W=900,H=630,deck={x:-150,y:-105,w:300,d:210,r:8};
 const P=k.fitProjection([...k.boxCorners(deck,-35,8)],W,H,{pad:63,azimuth:39,elevation:48});
 const R=A.recorder(P,{ground:shape=>/^feet\.pad\d$/.test(shape.name)}),at=p=>k.iso(p,P),S=k.solidSvg,L=k.lineSvg,parts=[];
 const dots=(pts,size=.5)=>k.dotsSvg(pts.map(at),{size,tone:'lo'});
 const seam=(p,z)=>L(k.planOutline(k.insetPlan(p,2.5),z,P,7),{tone:'faint'});
 function put(name,svg,shapes,point){const list=[shapes].flat();list.forEach(s=>R.solid(s));R.put({name,at:point,shapes:list,svg:`<g data-object="${name}">${svg}</g>`});parts.push(name);}
 function slab(name,p,z,h,tone='mid',detail=''){put(name,S(k.slabOf(p,z,h,P,7,Math.min(.7,h*.25)),{tone,inner:detail}),A.slab(p,z,h,{name,owner:name.split('.')[0]},7),[p.x+p.w/2,p.y+p.d/2,z+h/2]);}
 function cyl(name,x,y,r,z,h,tone='mid',detail=''){put(name,S(k.cylinder(x,y,r,z,h,P,64,Math.min(.3,h*.2)),{tone,inner:detail}),A.cylinder(x,y,r,z,h,{name,owner:name.split('.')[0]}),[x,y,z+h/2]);}
 const matrix=(x,y,z,scale,ink)=>`<g transform="${k.topMatrix([x,y],z,P)}"><g transform="scale(${scale})">${ink}</g></g>`;
 for(const [i,[x,y]] of k.corners(deck,22).entries()){
  cyl(`feet.pad${i}`,x,y,8,-35,3,'lo');cyl(`feet.stem${i}`,x,y,6,-32,7,'lo');
 }
 slab('case.bottom',deck,-25,4,'lo',seam(deck,-21));
 slab('case.core',deck,-21,18,'mid');
 slab('case.deck',deck,-3,3,'mid',seam(deck,0));
 const tray={x:-137,y:-91,w:183,d:171,r:3};
 slab('folio.tray',tray,0,1.6,'lo',seam(tray,1.6));
 for(let i=0;i<3;i++)slab(`folio.sheet${i}`,{x:-134+i*.55,y:-87+i*.55,w:176,d:163,r:1},1.6+i*.4,.4,'hi');
 const paper={x:-132.35,y:-85.35,w:176,d:163,r:1};
 const plates=`<g data-botanical-plate="0-2" opacity="1">${matrix(-123,-79,3.2,.82,`<g transform="translate(90 85) rotate(-17) scale(1.15) translate(-90 -85)">${branchInk(0,2)}</g>`)}</g>`;
 const paperInk=`<defs><clipPath id="folio-clip"><path d="${k.planOutline(k.insetPlan(paper,2),3.2,P,7)}"/></clipPath></defs><g clip-path="url(#folio-clip)">${plates}</g>`;
 slab('folio.printed-page',paper,2.8,.4,'hi',paperInk);
 for(const [i,y] of [-59,33].entries()){
  slab(`clips.base${i}`,{x:-137,y,w:3,d:19,r:.5},1.6,2.6,'mid');
  slab(`clips.toe${i}`,{x:-129,y:y+3,w:2.5,d:13,r:.4},3.2,1,'mid');
  slab(`clips.bridge${i}`,{x:-137,y,w:10.5,d:19,r:.6},4.2,1.3,'mid');
  cyl(`clips.rivet${i}`,-135.5,y+9.5,.9,5.5,.4,'lo');
 }
 const cx=94,cy=-12;
 const lensInk=matrix(cx-30.6,cy-30.6,1.6,.34,`<g data-lens-ink="">${organInk(0,'leaf',2)}</g>`);
 cyl('lens.paper',cx,cy,33,0,1.6,'hi',lensInk);
 for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2;cyl(`lens.foot${i}`,cx+Math.cos(a)*36,cy+Math.sin(a)*36,2,0,4,'lo');}
 const F=G.frameOf([cx,cy,0],[0,0,1],[1,0,0],[0,1,0]);
 const profile=[[4,33.7],[4,38],[6.3,38],[6.3,34.3],[5.5,34.3],[5.5,33.7],[4,33.7]];
 const ringPaths=G.lathe(profile,F,P,{steps:128,smooth:false,hole:[6.3,34.3]});
 const glass=S(k.cylinder(cx,cy,34.3,5.5,.3,P,128),{tone:'hi'});
 const ringDetail=L(k.ring(cx,cy,36.5,6.3,P,128),{tone:'lo'})+dots([[-1,-1],[1,-1],[-1,1],[1,1]].map(([a,b])=>[cx+a*25.5,cy+b*25.5,6.3]),.45);
 const rimClip=`<defs><clipPath id="lens-rim-clip"><path d="${ringPaths.fill}" clip-rule="evenodd"/></clipPath></defs>`;
 const rimPaint=`${rimClip}<g clip-path="url(#lens-rim-clip)" fill-rule="evenodd">${S({...ringPaths,outline:''},{tone:'hi',inner:ringDetail})}</g>${L(ringPaths.outline,{tone:'hi'})}`;
 put('lens.optics',`<g class="lens-glass">${glass}</g>${rimPaint}`,[A.lathe(F,profile,{name:'lens.rim',owner:'lens'}),A.cylinder(cx,cy,34.3,5.5,.3,{name:'lens.glass',owner:'lens'})],[cx,cy,5]);
 cyl('lens.adjustBase',137,cy,4,0,2,'lo');
 cyl('lens.adjust',137,cy,3.5,2,3,'mid',L(k.knurl(137,cy,3.5,2,5,24,P),{tone:'lo'}));
 // The circular four-season plate turns about its own axis, so its occupied solid never changes.
 const dx=94,dy=65;
 cyl('dial.base',dx,dy,22,0,1,'lo');cyl('dial.axle',dx,dy,3,1,1,'mid');
 const ticks=k.radialTicks(dx,dy,17,32,8,5,[1,2.8],P);
 let marks='';
 for(let i=0;i<4;i++){const a=i*Math.PI/2;marks+=k.dotsSvg([at([dx+Math.sin(a)*12,dy-Math.cos(a)*12,5])],{size:i===2?1.4:.65,tone:i===2?'hi':'lo'});}
 const dialCentre=at([dx,dy,5]);
 const dialFace=L(k.ring(dx,dy,17,5,P,64),{tone:'lo'})+L(ticks.minor,{tone:'lo'})+L(ticks.major,{tone:'mid'})+`<g data-dial-marks="" transform="rotate(180 ${dialCentre[0]} ${dialCentre[1]})">${marks}</g>`;
 cyl('dial.disc',dx,dy,18,2,3,'mid',dialFace);cyl('dial.cap',dx,dy,3,5,.6,'hi');
 slab('dial.pointerMount',{x:dx-3,y:dy-25,w:6,d:4,r:.7},0,1,'mid');
 const pointer=[[dx-2,dy-21],[dx+2,dy-21],[dx,dy-18.5]];
 put('dial.pointer',S(k.extrude(pointer,1,.3,P),{tone:'hi'}),A.extruded(pointer,1,.3,{name:'dial.pointer',owner:'dial'}),[dx,dy-20,1.15]);
 for(const [i,[x,y]] of [[-150,-105],[134,-105],[-150,97],[134,97]].entries()){
  slab(`corners.x${i}`,{x:x===-150?-151.5:150,y,w:1.5,d:8,r:.3},-23,19,'lo');
  slab(`corners.y${i}`,{x,y:y===-105?-106.5:105,w:16,d:1.5,r:.3},-23,19,'lo');
 }
 for(const [i,x] of [-112,109].entries()){
  slab(`locks.plate${i}`,{x:x-7,y:105,w:14,d:2,r:.8},-18,9,'mid');
  slab(`locks.catch${i}`,{x:x-4,y:107,w:8,d:1.5,r:.5},-15,4,'hi');
 }
 for(const [i,x] of [-25,25].entries())slab(`handle.mount${i}`,{x:x-3,y:105,w:6,d:8,r:1},-17,5,'mid');
 slab('handle.bar',{x:-28,y:113,w:56,d:4,r:1.5},-17,5,'mid');
 for(const [i,x] of [-83,83].entries()){
  slab(`hinges.base${i}`,{x:x-9,y:-108,w:18,d:3,r:.6},-13,10,'lo');
  slab(`hinges.cap${i}`,{x:x-7,y:-109.5,w:14,d:1.5,r:.4},-11,6,'mid');
 }
 const ruler={x:-132,y:87,w:166,d:7,r:.6};
 const rt=k.topTicks(-127,29,4,5,87.3,.8,[2,4],P);
 slab('tools.ruler',ruler,0,.8,'lo',L(rt.minor,{tone:'lo'})+L(rt.major,{tone:'mid'}));
 for(const [i,x] of [-130,32].entries())cyl(`tools.rulerRivet${i}`,x,90.5,.6,.8,.3,'mid');
 slab('tools.pencil',{x:58,y:94,w:71,d:2.5,r:.4},0,2.5,'mid');
 const tip=[[129,94],[136,95.25],[129,96.5]];
 put('tools.pencilTip',S(k.extrude(tip,0,2.5,P),{tone:'hi'}),A.extruded(tip,0,2.5,{name:'tools.pencilTip',owner:'tools'}),[132,95.25,1.25]);
 slab('tools.pencilCap',{x:54,y:94,w:4,d:2.5,r:.4},0,2.5,'lo');
 const maker={x:-146,y:97,w:26,d:6,r:.6};
 slab('case.maker',maker,0,.5,'lo',k.faceTextSvg(k.topMatrix([-133,101.3],.5,P),'TRT',{size:2.4,tone:'lo',anchor:'middle'}));
 for(const [i,x] of [-144,-122].entries())cyl(`case.makerRivet${i}`,x,100,.45,.5,.3,'mid');
 A.settle(R,P);R.items.sort((a,b)=>a.key-b.key);
 const halo=`<path class="iso-halo" d="${k.haloOf(deck,-35,8,P)}"/>`;
 const art=k.figureSvg({width:W,height:H,label:'等轴植物观察匣：左侧为四季整枝图版，右侧放大镜查看局部，下方四季拨盘转动。植物为纸面形态示意。',body:[halo,...R.items.map(i=>i.svg)]});
 return {P,R,art,parts,dial:{x:dx,y:dy,z:5}};
}
