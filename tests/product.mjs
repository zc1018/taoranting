import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {plants} from '../model.mjs';
import {plantPhotos} from '../photos.mjs';
import {createRound,photoQuestions} from '../quiz-model.mjs';

for(const question of photoQuestions){
 const p=plants[question.plant],photo=plantPhotos[p.id].photos[question.photo];
 assert.ok(photo.organs.includes(question.organ),'A quiz must show the organ it asks about');
 assert.notEqual(p.draw?.[question.organ],'unknown','Unknown structures cannot form a quiz');
}
let seed=1;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/2**32);
for(const p of plants){
 const round=createRound(p.id,random);
 assert.equal(round.length,5);assert.equal(new Set(round.map(q=>q.plant)).size,5,'Each round should teach five distinct plants');
 if(photoQuestions.some(q=>q.plant===plants.indexOf(p)))assert.equal(round[0].plant,plants.indexOf(p),'A detail-page practice link should start with that plant when supported');
 for(const question of round){assert.equal(new Set(question.choices).size,4);assert.ok(question.choices.includes(question.plant));}
}
for(const name of ['index','index-dark','plant','plant-dark','recognise','recognise-dark']){
 const html=readFileSync(new URL('../public/'+name+'.html',import.meta.url),'utf8');
 assert.ok(!html.includes('id="notebook"')&&!html.includes('id="note-form"'),'The removed notebook must not remain in a product route');
 const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match=>match[1]);
 scripts.forEach(script=>new vm.Script(script,{filename:name+'.html'}));
 if(name.startsWith('index')){assert.ok(!html.includes('class="iso-stage"'));assert.ok(!html.includes('data-quiz-session'));assert.ok(html.includes('href="plant.html?plant=ginkgo"'));}
 if(name.startsWith('recognise')){assert.ok(html.includes('data-question-photo'));assert.ok(html.includes('data-answer-photo'));assert.ok(html.includes('data-answer-diagram'));assert.ok(!html.includes('id="plants"'));}
}
console.log(`Product routes passed: six pages, ${photoQuestions.length} photo-supported questions, 58 seeded rounds.`);
