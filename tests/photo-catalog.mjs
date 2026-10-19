import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {plants} from '../model.mjs';
import {plantPhotos} from '../photos.mjs';
import {photoCardsHtml,preferredPhotoIndex} from '../photo-view.mjs';
assert.deepEqual(Object.keys(plantPhotos).sort(),plants.map(p=>p.id).sort(),'Every plant needs its own photo record');
const hashes=new Map();let count=0;
for(const plant of plants){
 const record=plantPhotos[plant.id];
 assert.equal(record.representative,Boolean(plant.group),plant.id+' group boundary');
 assert.ok(record.subject.length>3,plant.id+' exact photographed subject');
 assert.ok(record.photos.length>=2,plant.id+' needs two reference views');
 for(const photo of record.photos){
  assert.ok(photo.organs.length,'Each photograph needs reviewed visible content');
  assert.ok(photo.organs.every(organ=>['whole','leaf','twig','flower','fruit'].includes(organ)));
  assert.match(photo.src,/^photos\/[a-z0-9-]+\.jpg$/);
  assert.ok(photo.width>=300&&photo.height>=300,photo.src+' resolution');
  assert.ok(photo.author.trim()&&photo.caption.trim());
  assert.match(photo.source,/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
  assert.match(photo.license,/^(CC BY|CC0|Public domain)/);
  assert.match(photo.licenseUrl,/^https?:\/\//);
  const data=readFileSync(new URL('../'+photo.src,import.meta.url));
  assert.ok(data.length>5000,photo.src+' must be a real downloaded asset');
  assert.equal(data[0],0xff);assert.equal(data[1],0xd8,photo.src+' JPEG');
  const hash=createHash('sha256').update(data).digest('hex');
  assert.ok(!hashes.has(hash),photo.src+' duplicates '+hashes.get(hash));hashes.set(hash,photo.src);count++;
 }
 const html=photoCardsHtml(plant,record);
 assert.equal((html.match(/class="reference-photo"/g)||[]).length,1);
 assert.equal((html.match(/data-photo-select="/g)||[]).length,record.photos.length);
 for(const organ of ['leaf','twig','flower','fruit']){
  const selected=preferredPhotoIndex(record,organ);
  assert.ok(selected>=0&&selected<record.photos.length);
  if(record.photos.some(photo=>photo.organs.includes(organ)))assert.ok(record.photos[selected].organs.includes(organ),plant.id+' '+organ+' routed to an unrelated photograph');
 }
 assert.ok(!html.includes('<script'),'Untrusted metadata must remain text');
}
assert.ok(photoCardsHtml({id:'test',name:'<script>'},{subject:'"<x>',photos:[{...plantPhotos.ginkgo.photos[0],author:'<img src=x onerror=alert(1)>'}]}).includes('&lt;img'));
assert.equal(preferredPhotoIndex(plantPhotos.ginkgo,'leaf'),1,'Fan-shaped leaf photo should accompany the leaf diagram');
assert.equal(preferredPhotoIndex(plantPhotos.honeysuckle,'flower'),0);
assert.equal(preferredPhotoIndex(plantPhotos.honeysuckle,'fruit'),1,'Fruit observation should select the red-berry photograph');
assert.equal(preferredPhotoIndex(plantPhotos.ginkgo,'fruit',1),1,'Do not fabricate a fruit photograph when coverage is missing');
for(const page of ['public/index.html','public/index-dark.html']){
 const html=readFileSync(new URL('../'+page,import.meta.url),'utf8');
 assert.ok(html.includes('id="photos"')&&html.includes('id="photo-dialog"'));
 for(const plant of plants)for(const photo of plantPhotos[plant.id].photos){
  const published=new URL('../public/'+photo.src,import.meta.url);
  assert.ok(existsSync(published),'Missing published '+photo.src);
  assert.deepEqual(readFileSync(published),readFileSync(new URL('../'+photo.src,import.meta.url)),'Published photo differs: '+photo.src);
 }
 assert.ok(!/src="https?:\/\//.test(html),'Runtime assets should work offline');
}
console.log(`Photo catalog passed: ${plants.length} plants, ${count} unique local JPEGs, both published themes.`);
