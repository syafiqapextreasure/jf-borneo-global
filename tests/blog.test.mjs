import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {articles} from '../src/blog.mjs';
import {selectArticles} from '../public/blog-state.js';
test('blog search combines words and category and handles empty results',()=>{
 const items=articles.map(a=>({...a,description:a.description||''}));
 assert.equal(selectArticles(items,{category:'Construction'}).total,1);
 assert.equal(selectArticles(items,{query:'WELDING JOHOR'}).items[0].slug,'welding-manpower-fabrication-johor');
 assert.equal(selectArticles(items,{category:'Offshore',query:'zzzz'}).total,0);
 assert.equal(selectArticles(items,{query:'zzzz',page:9}).page,1);
});
test('pagination covers every article once and clamps stale page numbers',()=>{
 const pages=[1,2,3].flatMap(page=>selectArticles(articles,{page}).items);
 assert.equal(pages.length,10);assert.equal(new Set(pages.map(a=>a.slug)).size,10);
 assert.equal(selectArticles(articles,{page:99}).page,3);
 assert.equal(selectArticles(articles,{page:-2}).page,1);
});
test('all ten articles are crawlable and expose matching article schema and contents anchors',async()=>{
 assert.equal(articles.length,10);
 const listing=await readFile('dist/blog.html','utf8');
 for(const article of articles){
  assert(listing.includes(`/blog/${article.slug}`));
  const html=await readFile(`dist/blog/${article.slug}.html`,'utf8');
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  const post=schema['@graph'].find(item=>item['@type']==='BlogPosting');
  assert(post);assert.equal(post.headline,article.title);
  for(const section of article.sections)assert(html.includes(`id="${section.id}"`));
  assert(!html.includes('Johannes Medan'));
 }
});
