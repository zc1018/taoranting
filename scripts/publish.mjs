import {mkdirSync,copyFileSync} from 'node:fs';
mkdirSync('public',{recursive:true});
for(const file of ['index.html','index-dark.html','taoranting-light.svg','taoranting-dark.svg','taoranting-plant-catalog.csv']) copyFileSync(file,`public/${file}`);
