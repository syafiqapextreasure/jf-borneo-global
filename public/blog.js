import {selectArticles} from './blog-state.js';
const listing=document.querySelector('.blog-listing');
if(listing){
 const cards=[...listing.querySelectorAll('[data-blog-card]')];
 const items=cards.map((el,index)=>({index,category:el.dataset.category,title:el.dataset.title,description:el.dataset.description}));
 const search=listing.querySelector('#blog-search');
 const nav=listing.querySelector('.blog-pagination');
 const buttons=[...listing.querySelectorAll('[data-blog-category]')];
 const parameters=new URLSearchParams(location.search);
 let state={category:parameters.get('category')||'All',query:parameters.get('q')||'',page:Number(parameters.get('page'))||1};
 if(!buttons.some(b=>b.dataset.blogCategory===state.category))state.category='All';
 search.value=state.query;
 function render(updateUrl=true){
  const browsingAll=state.category==='All'&&!state.query.trim();
  const result=selectArticles(browsingAll?items.slice(1):items,state);state.page=result.page;
  const visible=new Set(result.items.map(item=>item.index));
  cards.forEach((card,index)=>{card.hidden=!visible.has(index);});
  buttons.forEach(button=>{const active=button.dataset.blogCategory===state.category;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  listing.querySelector('.blog-featured').hidden=state.category!=='All'||!!state.query.trim()||state.page!==1;
  listing.querySelector('.blog-empty').hidden=result.total!==0;
  const count=result.total+(browsingAll?1:0);
  listing.querySelector('#blog-status').textContent=result.total?`${count} ${count===1?'guide':'guides'} · Page ${result.page} of ${result.pageCount}`:'No matching guides';
  nav.replaceChildren();nav.hidden=result.pageCount<=1;
  const addButton=(label,page,current=false)=>{const button=document.createElement('button');button.type='button';button.className='page-button';button.textContent=label;button.setAttribute('aria-label',/^\d+$/.test(label)?`Page ${label}`:label);if(current)button.setAttribute('aria-current','page');button.addEventListener('click',()=>{state.page=page;render();listing.querySelector('.blog-section-heading').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});nav.querySelector('[aria-current]')?.focus({preventScroll:true});});nav.append(button);};
  if(result.page>1)addButton('Previous',result.page-1);
  for(let page=1;page<=result.pageCount;page++)addButton(String(page),page,page===result.page);
  if(result.page<result.pageCount)addButton('Next',result.page+1);
  if(updateUrl){const url=new URL(location.href);url.searchParams.delete('category');url.searchParams.delete('q');url.searchParams.delete('page');if(state.category!=='All')url.searchParams.set('category',state.category);if(state.query.trim())url.searchParams.set('q',state.query.trim());if(state.page>1)url.searchParams.set('page',String(state.page));history.replaceState(null,'',url);}
 }
 buttons.forEach(button=>button.addEventListener('click',()=>{state.category=button.dataset.blogCategory;state.page=1;render();}));
 search.addEventListener('input',()=>{state.query=search.value;state.page=1;render();});
 listing.querySelector('#blog-reset').addEventListener('click',()=>{state={category:'All',query:'',page:1};search.value='';render();search.focus();});
 listing.querySelector('.blog-tools').hidden=false;render(false);
}
