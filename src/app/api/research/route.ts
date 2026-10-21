import {NextRequest,NextResponse} from 'next/server';
export const dynamic='force-dynamic';

type Paper={id:string;title:string;date:string;year:number;url:string;publisher:string;type:string;source:string;topicId:string};
const queries:Record<string,string>={
 toe:'fundamental interactions unification',gravity:'quantum gravity',cancer:'cancer immunotherapy',
 poverty:'extreme poverty development',energy:'renewable electricity storage',
 capitalism:'income inequality economic institutions',fusion:'nuclear fusion plasma confinement',
 climate:'climate change mitigation',ageing:'cellular senescence ageing',
 darkmatter:'dark matter detection',consciousness:'consciousness neuroscience',
 alignment:'artificial intelligence alignment safety evaluation'
};
const featured=['toe','cancer','poverty','energy','climate','alignment'];
const doiLink=(value:unknown)=>{
 const doi=String(value||'').replace(/^https?:\/\/(?:dx\.)?doi\.org\//i,'');
 return /^10\.\d{4,9}\/[a-z0-9._;()/:+-]+$/i.test(doi)?'https://doi.org/'+encodeURIComponent(doi).replace(/%2F/gi,'/'):'';
};
const clean=(s:unknown)=>String(s||'').replace(/<[^>]+>/g,'').trim().slice(0,300);
async function fromOpenAlex(topicId:string,from:string,today:string):Promise<Paper[]>{
 const u=new URL('https://api.openalex.org/works');
 u.searchParams.set('search',queries[topicId]);
 u.searchParams.set('filter','from_publication_date:'+from+',to_publication_date:'+today);
 u.searchParams.set('sort','publication_date:desc');
 u.searchParams.set('per_page','10');
 u.searchParams.set('select','id,title,doi,publication_date,type,primary_location');
 const response=await fetch(u,{signal:AbortSignal.timeout(9000),next:{revalidate:900}});
 if(!response.ok)throw Error('OpenAlex '+response.status);
 const json=await response.json();
 const results:Array<Record<string,any>>=Array.isArray(json.results)?json.results:[];
 return results.flatMap((p):Paper[]=>{
  const date=String(p.publication_date||'');
  const url=doiLink(p.doi)||(typeof p.id==='string'&&/^https:\/\/openalex\.org\/W\d+$/.test(p.id)?p.id:'');
  const title=clean(p.title);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!url||!title)return [];
  return [{id:url,title,date,year:Number(date.slice(0,4)),url,publisher:clean(p.primary_location?.source?.display_name).slice(0,110),type:clean(p.type),source:'OpenAlex',topicId}];
 });
}
async function fromCrossref(topicId:string,from:string,today:string):Promise<Paper[]>{
 const u=new URL('https://api.crossref.org/works');
 u.searchParams.set('query.bibliographic',queries[topicId]);
 u.searchParams.set('rows','10');u.searchParams.set('sort','published');u.searchParams.set('order','desc');
 u.searchParams.set('filter','from-pub-date:'+from+',until-pub-date:'+today);
 u.searchParams.set('select','DOI,title,published,publisher,type');
 const response=await fetch(u,{signal:AbortSignal.timeout(9000),next:{revalidate:900},headers:{'User-Agent':'FRONTIERKnowledgeAtlas/2.0 (public research discovery)'}});
 if(!response.ok)throw Error('Crossref '+response.status);
 const json=await response.json();
 const results:Array<Record<string,any>>=Array.isArray(json.message?.items)?json.message.items:[];
 return results.flatMap((p):Paper[]=>{
  const parts:number[]=p.published?.['date-parts']?.[0]||[];
  const date=parts.length?[String(parts[0]),String(parts[1]||1).padStart(2,'0'),String(parts[2]||1).padStart(2,'0')].join('-'):'';
  const title=clean(p.title?.[0]);const url=doiLink(p.DOI);
  if(!date||!title||!url)return [];
  return [{id:url,title,date,year:Number(parts[0]),url,publisher:clean(p.publisher).slice(0,110),type:clean(p.type),source:'Crossref',topicId}];
 });
}
async function getPapers(id:string,from:string,today:string){
 try{const papers=await fromOpenAlex(id,from,today);if(papers.length)return {papers,failed:false};}catch{}
 try{const papers=await fromCrossref(id,from,today);if(papers.length)return {papers,failed:false};}catch{}
 return {papers:[] as Paper[],failed:true};
}
export async function GET(req:NextRequest){
 const topic=req.nextUrl.searchParams.get('topic')||'all';
 if(topic!=='all'&&!Object.prototype.hasOwnProperty.call(queries,topic))
  return NextResponse.json({error:'Unknown topic'},{status:400});
 const now=Date.now();
 const today=new Date(now).toISOString().slice(0,10);
 const from=new Date(now-540*86400000).toISOString().slice(0,10);
 const ids=topic==='all'?featured:[topic];
 const chunks:Awaited<ReturnType<typeof getPapers>>[]=[];
 for(let i=0;i<ids.length;i+=3){
  chunks.push(...await Promise.all(ids.slice(i,i+3).map(id=>getPapers(id,from,today))));
 }
 const seen=new Set<string>();
 const papers=chunks.flatMap(c=>c.papers).sort((a,b)=>b.date.localeCompare(a.date)).filter(p=>{
  if(seen.has(p.id))return false;seen.add(p.id);return true;
 }).slice(0,topic==='all'?30:10);
 const failedTopics=chunks.flatMap((c,i)=>c.failed?[ids[i]]:[]);
 return NextResponse.json({papers,retrievedAt:new Date().toISOString(),fromDate:from,
  coveredTopics:ids,partial:failedTopics.length>0,failedTopics,
  scope:topic==='all'?'selected-highlights':'individual-topic',
  note:'Metadata discovery is not scientific validation or peer-review verification.'},
  {status:papers.length?200:503,headers:{'Cache-Control':'public, s-maxage=900, stale-while-revalidate=900'}});
}
