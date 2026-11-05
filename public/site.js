const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation?.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false');}
menuButton?.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(expanded));navigation.classList.toggle('is-open',expanded);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
matchMedia('(min-width:761px)').addEventListener('change',closeMenu);
const grid=document.querySelector('.gallery-grid');
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const selected=button.dataset.filter;let count=0;
 document.querySelectorAll('[data-filter]').forEach(el=>{const active=el===button;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=selected!=='All'&&card.dataset.category!==selected;if(!card.hidden)count++;});
 grid.classList.toggle('filtered',selected!=='All');
 document.querySelector('#filter-status').textContent=`${count} ${selected==='All'?'work':selected.toLowerCase()} ${count===1?'scene':'scenes'}`;
}));
document.querySelector('#enquiry-form')?.addEventListener('submit',event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const values=new FormData(form);
 const message=`Hello JF Borneo Global,\n\nEnquiry: ${values.get('type')}\nName: ${values.get('name')}\nCompany: ${values.get('company')||'Not specified'}\nEmail / phone: ${values.get('reply')}\n\nProject details:\n${values.get('details')}`;
 window.location.assign(`https://wa.me/60179105885?text=${encodeURIComponent(message)}`);
});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const heroImage=document.querySelector('.parallax-image');
let pending=false;
function updateParallax(){pending=false;if(!heroImage)return;if(reducedMotion.matches||innerWidth<=760){heroImage.style.removeProperty('--parallax');return;}heroImage.style.setProperty('--parallax',`${-Math.min(scrollY*.12,45)}px`);}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateParallax);}},{passive:true});
reducedMotion.addEventListener('change',updateParallax);
if(!reducedMotion.matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.service-row,.office-outline,.gallery-card').forEach(el=>observer.observe(el));}
