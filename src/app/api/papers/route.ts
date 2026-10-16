import {NextRequest,NextResponse} from 'next/server';
export const dynamic='force-dynamic';
export async function GET(req:NextRequest){
 const raw=req.nextUrl.searchParams.get('q')||'';
 const query=raw.trim().slice(0,160);
 if(query.length<4)return NextResponse.json({error:'Query too short'},{status:400});
 try {
  const url=new URL('https://api.crossref.org/works');url.searchParams.set('query.title',query);url.searchParams.set('rows','8');url.searchParams.set('sort','published');url.searchParams.set('order','desc');url.searchParams.set('filter','from-pub-date:2023-01-01,until-pub-date:2026-10-16');url.searchParams.set('select','DOI,title,published,publisher,URL,type');
  const res=await fetch(url.toString(),{signal:AbortSignal.timeout(9500),headers:{'User-Agent':'FrontierResearchAtlas/1.0 (educational scientific literature discovery)'}});
  if(!res.ok)return NextResponse.json({papers:[],error:'Crossref unavailable'},{status:502});
  const data=await res.json();
  const papers=(data.message?.items||[]).filter((p:any)=>typeof p.DOI==='string'&&Array.isArray(p.title)&&p.title[0]).map((p:any)=>({title:String(p.title[0]).replace(/<[^>]*>/g,'').slice(0,220),year:p.published?.['date-parts']?.[0]?.[0]||null,url:'https://doi.org/'+encodeURIComponent(p.DOI).replace(/%2F/gi,'/'),publisher:String(p.publisher||'').slice(0,90),type:p.type}));
  return NextResponse.json({papers},{headers:{'Cache-Control':'public, s-maxage=21600, stale-while-revalidate=86400'}});
 }catch {return NextResponse.json({papers:[],error:'Timeout'},{status:502});}
}