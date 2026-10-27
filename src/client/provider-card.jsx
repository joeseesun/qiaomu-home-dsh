import React from 'react';
import {Card} from './cards.jsx';
import {IconGrid,IconImage,IconArrowRight} from './icons.jsx';
import {ProviderIcon} from './provider-icons.jsx';
import {emptyProviderStore} from './providers.js';
function Thumb({item}){const [failed,setFailed]=React.useState(false);return <div className={`qh-thumb${!item.image||failed?' is-icon':''}`}>{item.image&&!failed?<img src={item.image} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>:<ProviderIcon name={item.icon||"image"} size={17}/>}</div>;}
/** DOM structure/classes mirror original Home.renderSection / renderItem. */
export function ProviderCard({cardId,services,t}){
 const registry=services?.providers||emptyProviderStore;const state=React.useSyncExternalStore(registry.subscribe,registry.getSnapshot,registry.getSnapshot),section=state.sections.find(s=>s.cardId===cardId),[error,setError]=React.useState('');
 const run=action=>Promise.resolve().then(action).catch(e=>setError(e.message||t('search.error')));
 return <div className="qh-provider-card" data-source={section?.sourceId}><Card sourceId={section?.sourceId} icon={IconGrid} title={section?.title||cardId.split(':').at(-1)} actions={section?.more?<button className="qh-icon-button qh-card-more" type="button" onClick={()=>run(section.more.run)}><ProviderIcon name={section.more.icon} size={14}/><span>{section.more.label}</span></button>:null}>
 {error?<div className="qh-card-empty" role="alert">{error}</div>:null}
 {!section?<div className="qh-card-empty">{t('provider.unavailable')}</div>:!section.items.length?<div className="qh-card-empty">{section.empty}</div>:<div className="qh-list">{section.items.map(item=><div key={item.id} role="button" tabIndex={0} className={`qh-item${item.active?' is-active':''}`} onClick={()=>run(item.open)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();run(item.open);}}}><Thumb item={item}/><div className="qh-item-body"><div className="qh-item-title">{item.title}</div>{item.subtitle||item.meta?<div className="qh-item-sub">{[item.subtitle,item.meta].filter(Boolean).join(' · ')}</div>:null}{item.progress!==undefined?<div className="qh-progress"><div className="qh-progress-fill" style={{width:`${Math.round(item.progress*100)}%`}}/></div>:null}</div>{item.actions?.map(action=><button type="button" key={action.id} className="qh-icon-button qh-item-action" aria-label={action.label} onKeyDown={e=>e.stopPropagation()} onClick={e=>{e.stopPropagation();run(action.run);}}><ProviderIcon name={action.icon} size={14}/></button>)}</div>)}</div>}
 </Card></div>;
}
