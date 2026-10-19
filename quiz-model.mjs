import {plants,quizItems} from './model.mjs';
import {plantPhotos} from './photos.mjs';

// A question is eligible only when its photographed organ has been reviewed.
export const photoQuestions=quizItems.flatMap(([plant,organ])=>{
 const photo=plantPhotos[plants[plant].id].photos.findIndex(item=>item.organs.includes(organ));
 return photo<0?[]:[{plant,organ,photo}];
});
export function shuffled(items,random=Math.random){
 const result=[...items];
 for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
 return result;
}
export function createRound(preferredPlant='',random=Math.random){
 const used=new Set(),questions=[];
 const pool=shuffled(photoQuestions,random);
 const first=pool.find(item=>plants[item.plant].id===preferredPlant);
 for(const item of [...(first?[first]:[]),...pool]){
  if(used.has(item.plant))continue;
  used.add(item.plant);
  const category=plants[item.plant].category;
  const others=shuffled(plants.map((_,i)=>i).filter(i=>i!==item.plant),random);
  const candidates=[...others.filter(i=>plants[i].category===category),...others.filter(i=>plants[i].category!==category)];
  questions.push({...item,choices:shuffled([item.plant,...candidates.slice(0,3)],random)});
  if(questions.length===5)break;
 }
 return questions;
}
