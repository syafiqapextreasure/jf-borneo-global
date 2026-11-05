import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
import worker,{canonicalPath,paths,sitemap} from '../src/worker.mjs';
import vm from 'node:vm';
test('canonical routes remove .html and trailing slashes without changing clean URLs',()=>{
  for(const [input,output] of [['/index.html','/'],['/company.html','/company'],['/company/','/company'],['/contact/index.html','/contact'],['/our-work','/our-work'],['/assets/logo.webp','/assets/logo.webp']]) assert.equal(canonicalPath(input),output);
});
test('every published page has unique metadata, one h1, crawlable content and valid local targets',async()=>{
  const titles=new Set();
  for(const path of paths){
    const html=await readFile(`dist/${path==='/'?'index':path.slice(1)}.html`,'utf8');
    assert.equal((html.match(/<h1>/g)||[]).length,1,path);
    const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title));titles.add(title);
    assert(html.includes('name="description"'));assert(html.includes('rel="canonical"'));
    assert(html.includes('application/ld+json'));assert(html.includes('Johor'));assert(html.includes('Sarawak'));
    const data=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);assert.equal(data['@context'],'https://schema.org');
    for(const [,url] of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)){
      if(url==='/')continue;
      if(url.startsWith('/assets/')||url.endsWith('.css')||url.endsWith('.js'))await access(resolve('dist','.'+url));
      else assert(paths.includes(url),`Bad internal link ${url}`);
    }
    assert(!/href="[^"\n]*\.html/.test(html));
  }
});
test('worker injects the real deployment origin and security headers',async()=>{
  const html=await readFile('dist/contact.html','utf8');
  const res=await worker.fetch(new Request('https://jf.example/contact'),{ASSETS:{fetch:async()=>new Response(html,{headers:{'Content-Type':'text/html'}})}});
  const body=await res.text();assert(body.includes('https://jf.example/contact'));assert(!body.includes('__SITE_ORIGIN__'));assert.equal(res.status,200);assert.equal(res.headers.get('X-Content-Type-Options'),'nosniff');assert(res.headers.get('Content-Security-Policy').includes("frame-ancestors 'none'"));
});
test('redirects preserve enquiry query strings',async()=>{
  const res=await worker.fetch(new Request('https://jf.example/contact.html?service=construction'),{});
  assert.equal(res.status,308);assert.equal(res.headers.get('Location'),'https://jf.example/contact?service=construction');
});
test('sitemap and robots follow the actual origin; unsupported methods rejected',async()=>{
  const map=sitemap('https://jf.example');assert.equal((map.match(/<loc>/g)||[]).length,paths.length);
  const robots=await worker.fetch(new Request('https://jf.example/robots.txt'),{});assert((await robots.text()).includes('https://jf.example/sitemap.xml'));
  const response=await worker.fetch(new Request('https://jf.example/contact',{method:'POST'}),{});assert.equal(response.status,405);
});
test('construction enquiry and source attribution are present',async()=>{
  const services=await readFile('dist/manpower.html','utf8');const form=await readFile('dist/contact.html','utf8');const gallery=await readFile('dist/our-work.html','utf8');
  assert(services.includes('id="construction"'));assert(form.includes('<option>Construction manpower</option>'));assert(gallery.includes('7686531137061031188'));assert(gallery.includes('data-filter="Construction"'));
});
test('WhatsApp handoff encodes enquiry values and never sends a message',async()=>{
  let submit,redirect;
  const form={addEventListener:(name,handler)=>{if(name==='submit')submit=handler;},reportValidity:()=>true};
  const context={document:{querySelector:s=>s==='#enquiry-form'?form:null,querySelectorAll:()=>[],addEventListener:()=>{}},matchMedia:()=>({matches:true,addEventListener:()=>{}}),addEventListener:()=>{},window:{location:{assign:url=>{redirect=url;}}},FormData:class{get(key){return {name:'A & B',company:'Construction Co',reply:'test@example.com',type:'Construction manpower',details:'Johor\n10 roles & 2 months'}[key];}},encodeURIComponent};
  vm.runInNewContext(await readFile('public/site.js','utf8'),context);
  submit({preventDefault(){},currentTarget:form});
  const url=new URL(redirect);assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,'/60179105885');
  const text=url.searchParams.get('text');assert(text.includes('Name: A & B'));assert(text.includes('Construction manpower'));assert(text.includes('Johor\n10 roles & 2 months'));
  redirect=undefined;form.reportValidity=()=>false;submit({preventDefault(){},currentTarget:form});assert.equal(redirect,undefined);
});
