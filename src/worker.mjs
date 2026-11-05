import {blogPaths} from './blog.mjs';
export const paths = ['/', '/company', '/manpower', '/updates', '/our-work', '/contact', ...blogPaths];
export function canonicalPath(path) {
  if (path === '/index.html') return '/';
  return path.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
}
export function sitemap(origin) {
  return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map(path => `<url><loc>${origin}${path}</loc></url>`).join('') + '</urlset>';
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405,headers:{Allow:'GET, HEAD'}});
    const clean = canonicalPath(url.pathname);
    if(clean !== url.pathname) { url.pathname=clean; return Response.redirect(url.href,308); }
    if(url.pathname === '/robots.txt') return new Response(`User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
    if(url.pathname === '/sitemap.xml') return new Response(sitemap(url.origin),{headers:{'Content-Type':'application/xml; charset=utf-8'}});
    const response=await env.ASSETS.fetch(request);
    const headers=new Headers(response.headers);
    headers.set('X-Content-Type-Options','nosniff');
    headers.set('Referrer-Policy','strict-origin-when-cross-origin');
    headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');
    headers.set('Content-Security-Policy',"default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action https://wa.me");
    const html=headers.get('Content-Type')?.includes('text/html');
    if(html) {
      headers.set('Cache-Control','public, max-age=0, must-revalidate');
      const body=(await response.text()).replaceAll('__SITE_ORIGIN__',url.origin);
      return new Response(request.method==='HEAD'?null:body,{status:response.status,headers});
    }
    if(url.pathname.startsWith('/assets/')) headers.set('Cache-Control','public, max-age=86400');
    return new Response(response.body,{status:response.status,headers});
  }
};
