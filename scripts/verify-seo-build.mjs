import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const build = path.join(root, '.next/server/app');
function walk(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
const files = walk(build).filter(f => f.endsWith('.html') && !path.basename(f).startsWith('_'));
const pages = new Map(files.map(file => [('/'+path.relative(build,file).replaceAll('\\','/').replace(/\.html$/,'').replace(/^index$/, '')), fs.readFileSync(file,'utf8')]));
const titles = new Set();
let links = 0, images = 0, schemas = 0;
for (const [route,html] of pages) {
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`H1 count: ${route}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title,`Missing title: ${route}`);
  assert.ok(!titles.has(title),`Duplicate title: ${route}`); titles.add(title);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical?.replace(/\/$/,''), ('https://versal-lestnicy.by'+(route==='/'?'':route)), `Canonical: ${route}`);
  for(const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href=match[1]; if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const [pathname,hash] = href.split('#');
    const targetPath = pathname || route;
    const target=pages.get(targetPath);
    assert.ok(target,`Missing link target ${href} on ${route}`);
    if(hash) assert.ok(target.includes(`id="${hash}"`),`Missing anchor ${href} on ${route}`);
    links++;
  }
  for(const match of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) {
    const src=match[1].replaceAll('&amp;','&');
    const url=new URL(src,'http://localhost');
    const imagePath=url.searchParams.get('url') || url.pathname;
    assert.ok(fs.existsSync(path.join(root,'public',imagePath)),`Missing asset: ${imagePath}`);
    images++;
  }
  for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {JSON.parse(match[1]);schemas++;}
}
const home=pages.get('/');
for(const route of ['/stoimost-betonnyh-lestnic','/proektirovanie-betonnyh-lestnic','/works/g-obraznye-betonnye-lestnitsy','/works/lestnitsy-s-obratnymi-stupenyami','/works/betonnye-lestnitsy-na-tetivakh']) assert.ok(home.includes(`href="${route}"`),`Missing homepage link: ${route}`);
const prices=pages.get('/stoimost-betonnyh-lestnic');
assert.equal((prices.match(/class="price-example"/g)||[]).length,8);
assert.equal((prices.match(/<p class="price-amount">от /g)||[]).length,8);
console.log(JSON.stringify({pages:pages.size,uniqueTitles:titles.size,links,images,schemas,priceCards:8,allStartingPrices:true,allFiveNewPagesLinkedFromHome:true},null,2));
