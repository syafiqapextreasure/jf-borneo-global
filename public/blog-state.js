export function selectArticles(items,{category='All',query='',page=1,pageSize=4}={}){
 const words=String(query).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().split(/\s+/).filter(Boolean);
 const matches=items.filter(item=>(category==='All'||item.category===category)&&words.every(word=>`${item.title} ${item.description}`.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(word)));
 const pageCount=Math.max(1,Math.ceil(matches.length/pageSize));
 const currentPage=Math.min(pageCount,Math.max(1,Math.floor(Number(page))||1));
 return {items:matches.slice((currentPage-1)*pageSize,currentPage*pageSize),total:matches.length,pageCount,page:currentPage};
}
