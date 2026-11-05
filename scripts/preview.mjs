import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve, extname} from 'node:path';
import {canonicalPath,sitemap} from '../src/worker.mjs';
const root=resolve('dist'), port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.svg':'image/svg+xml','.txt':'text/plain'};
http.createServer(async(req,res)=>{
  const url=new URL(req.url,`http://127.0.0.1:${port}`), clean=canonicalPath(url.pathname);
  if(clean!==url.pathname){res.writeHead(308,{Location:clean+url.search});return res.end();}
  if(clean==='/sitemap.xml'){res.setHeader('Content-Type','application/xml');return res.end(sitemap(url.origin));}
  if(clean==='/robots.txt')return res.end(`User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml`);
  let file=resolve(root,'.'+decodeURIComponent(clean==='/'?'/index.html':extname(clean)?clean:clean+'.html'));
  if(!file.startsWith(root)){res.writeHead(403);return res.end();}
  try {let data=await readFile(file);res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');if(extname(file)==='.html')data=data.toString().replaceAll('__SITE_ORIGIN__',url.origin);res.end(data);}
  catch {res.writeHead(404,{'Content-Type':'text/html'});res.end((await readFile(resolve(root,'404.html'),'utf8')).replaceAll('__SITE_ORIGIN__',url.origin));}
}).listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
