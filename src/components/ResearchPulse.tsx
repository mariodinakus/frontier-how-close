'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowRight,ArrowUpRight,BookOpen,Clock3,RefreshCw,Search,Radio,AlertTriangle} from 'lucide-react';
import {frontiers,type Lang} from '@/lib/content';

type Paper={id:string;title:string;date:string;year:number;url:string;publisher:string;type:string;source:string;topicId:string};
type Feed={papers?:Paper[];retrievedAt?:string;partial?:boolean};
export default function ResearchPulse({lang,compact=false,onOpen}:{lang:Lang;compact?:boolean;onOpen?:()=>void}){
 const [topic,setTopic]=useState('all');
 const [term,setTerm]=useState('');
 const [papers,setPapers]=useState<Paper[]>([]);
 const [stamp,setStamp]=useState('');
 const [partial,setPartial]=useState(false);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState(false);
 const [nonce,setNonce]=useState(0);
 const greek=lang==='el';const locale=greek?'el-GR':'en-GB';
 const name=(id:string)=>frontiers.find(f=>f.id===id)?.title[lang]||id;
 const date=(value:string)=>{const d=new Date(value+'T00:00:00Z');return isNaN(d.getTime())?value:d.toLocaleDateString(locale,{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});};
 useEffect(()=>{
  const controller=new AbortController();
  async function load(){
   setLoading(true);setError(false);
   try{
    const r=await fetch('/api/research?topic='+encodeURIComponent(compact?'all':topic),{signal:controller.signal,cache:'no-store'});
    if(!r.ok)throw Error(String(r.status));
    const j:Feed=await r.json();
    if(controller.signal.aborted)return;
    setPapers(Array.isArray(j.papers)?j.papers:[]);
    setStamp(j.retrievedAt||'');setPartial(Boolean(j.partial));
   }catch{if(!controller.signal.aborted)setError(true)}
   finally{if(!controller.signal.aborted)setLoading(false)}
  }
  void load();
  return ()=>controller.abort();
 },[topic,compact,nonce]);
 useEffect(()=>{const id=window.setInterval(()=>setNonce(n=>n+1),900000);return ()=>clearInterval(id)},[]);
 const shown=useMemo(()=>papers.filter(p=>(p.title+' '+p.publisher).toLowerCase().includes(term.toLowerCase())).slice(0,compact?3:24),[papers,term,compact]);
 return <section className={'pulse '+(compact?'pulse-compact':'pulse-full')}>
  <div className="pulse-head"><div>
   <div className="pulse-kicker"><span className="pulse-beacon"/>{greek?'ΑΝΟΙΧΤΗ ΕΡΕΥΝΑ · ΣΥΝΕΧΗΣ ΑΝΑΝΕΩΣΗ':'OPEN RESEARCH · CONTINUOUS UPDATES'}</div>
   <h2>{greek?'Η γνώση κινείται.':'Knowledge never stands still.'}</h2>
   <p>{greek?'Δημοσιεύσεις από βιβλιογραφικές βάσεις, με ημερομηνία, πηγή και άμεσο σύνδεσμο. Αυτόματη ανανέωση κάθε 15 λεπτά όσο η σελίδα είναι ανοιχτή.':'Research records with publication dates, sources and direct links. Automatically refreshed every 15 minutes while the page is open.'}</p>
  </div><div className="pulse-controls">{compact&&onOpen?<button className="pulse-more" onClick={onOpen}>{greek?'Όλες οι έρευνες':'Browse research'}<ArrowRight size={17}/></button>:<button className="pulse-more" disabled={loading} onClick={()=>setNonce(n=>n+1)}><RefreshCw size={17} className={loading?'rotate':''}/>{greek?'Ανανέωση':'Refresh'}</button>}</div></div>
  <div className="pulse-metadata" aria-live="polite">
   <span><Radio size={14}/>{loading?(greek?'Ενημέρωση…':'Updating…'):(greek?'Βιβλιογραφική ροή':'Scholarly research feed')}</span>
   <span><Clock3 size={14}/>{stamp?(greek?'Ανάκτηση: ':'Retrieved: ')+new Date(stamp).toLocaleString(locale,{dateStyle:'medium',timeStyle:'short'}):(greek?'Χωρίς ανάκτηση ακόμη':'Not fetched yet')}</span>
   <span><BookOpen size={14}/>{papers.length} {greek?'εγγραφές':'records'}</span>
  </div>
  {!compact&&<><div className="pulse-topic-heading"><strong>{greek?'ΕΞΕΡΕΥΝΗΣΗ ΑΝΑ ΘΕΜΑ':'EXPLORE BY RESEARCH TOPIC'}</strong><small>{greek?'Τα highlights καλύπτουν 6 πεδία. Κάθε ειδικό θέμα έχει ξεχωριστή αναζήτηση.':'Highlights sample six areas. Each individual frontier has its own search.'}</small></div>
   <div className="pulse-topics"><button className={topic==='all'?'active':''} onClick={()=>setTopic('all')}>{greek?'Κύρια ροή':'Highlights'} <span>06</span></button>{frontiers.map(f=><button key={f.id} className={topic===f.id?'active':''} onClick={()=>setTopic(f.id)}>{f.title[lang]}</button>)}</div>
   <div className="pulse-toolbar"><div className="pulse-search"><Search size={17}/><input value={term} onChange={e=>setTerm(e.target.value)} placeholder={greek?'Αναζήτηση σε δημοσιεύσεις…':'Search loaded papers…'} aria-label={greek?'Αναζήτηση δημοσιεύσεων':'Search publications'}/></div><span>{topic==='all'?(greek?'Επιλεγμένοι τομείς':'Selected areas'):name(topic)}</span></div>
  </>}
  {error&&<div className="pulse-notice"><AlertTriangle size={16}/>{greek?'Δεν ήταν δυνατή η ενημέρωση. Οι προηγούμενες εγγραφές μπορεί να είναι παλαιότερες.':'Research providers did not respond. Previously loaded records may be older.'}<button onClick={()=>setNonce(n=>n+1)}>{greek?'Ξανά':'Retry'}</button></div>}
  {partial&&!loading&&<div className="pulse-notice"><AlertTriangle size={16}/>{greek?'Η ροή είναι μερική: τουλάχιστον ένα θέμα δεν επέστρεψε αποτελέσματα.':'Partial feed: at least one topic returned no records.'}</div>}
  <div className="pulse-grid">
   {shown.map((p,i)=><a key={p.id} className={'pulse-card '+(i===0?'pulse-first':'')} href={p.url} target="_blank" rel="noopener noreferrer">
    <div className="pulse-card-top"><span className="pulse-topic-dot"/><span>{name(p.topicId)}</span><ArrowUpRight size={17}/></div>
    <h3>{p.title}</h3><div className="pulse-card-bottom"><span>{date(p.date)}</span><span>{p.publisher||p.type}</span></div><div className="pulse-card-source">{p.source} · {greek?'Βιβλιογραφική εγγραφή':'indexed record'}</div>
   </a>)}
   {loading&&!papers.length&&Array.from({length:compact?3:6},(_,i)=><div className="pulse-skeleton" key={i}><div/><div/><div/></div>)}
  </div>
  {!loading&&!shown.length&&!error&&<div className="pulse-empty">{greek?'Δεν υπάρχουν αποτελέσματα για αυτό το φίλτρο.':'No results match this filter.'}</div>}
  <div className="pulse-footer"><span>{greek?'Οι εγγραφές προέρχονται από OpenAlex ή Crossref. Δεν αποτελούν επιβεβαίωση peer review, ορθότητας ή επιστημονικής συναίνεσης.':'Records come from OpenAlex or Crossref. Indexing does not verify peer review, correctness or scientific consensus.'}</span>{compact&&onOpen&&<button onClick={onOpen}>{greek?'Άνοιγμα ροής':'Open full feed'}<ArrowRight size={16}/></button>}</div>
 </section>;
}
