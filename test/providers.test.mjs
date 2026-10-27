import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createProviderRegistry} from '../src/client/providers.js';
import {normalizeTabs} from '../src/client/layout.js';
import {ProviderCard} from '../src/client/provider-card.jsx';
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const item={id:'book',title:'Test book',image:'javascript:alert(1)',progress:2,open(){return this.title;}};
const provider=extra=>({protocol:'qiaomu-home',version:1,sections:()=>[{id:'recent',title:'Recent',items:[item]}],...extra});
test('original validation, provider rendering, navigation and layout survive disconnect',async()=>{
 const registry=createProviderRegistry();let opened=0;
 const unregister=registry.register('reader',provider({sections:()=>[{id:'recent',title:'Recent',items:Array.from({length:9},(_,i)=>({...item,id:String(i),open:()=>opened++}))}],search:()=>[item]}));
 await registry.refresh();const section=registry.getSnapshot().sections[0];assert.equal(section.items.length,6);assert.equal(section.items[0].image,undefined);assert.equal(section.items[0].progress,1);
 const html=renderToString(React.createElement(ProviderCard,{cardId:section.cardId,services:{providers:registry},t:k=>k}));assert.match(html,/qh-item-title/);assert.match(html,/width:100%/);assert.match(html,/data-source="reader"/);
 await section.items[0].open();assert.equal(opened,1);const results=await registry.search('book');assert.equal(results[0].providerItem,true);assert.equal(results[0].open(),'Test book');
 const layout=[{id:'tab1',name:'Books',cards:[section.cardId]}];unregister();assert.equal(registry.getSnapshot().sections.length,0);assert.ok(normalizeTabs(layout).find(tab=>tab.id==='tab1').cards.includes(section.cardId));registry.dispose();
});
test('outdated refresh/search cannot resurrect a removed provider, and cleanup is once',async()=>{
 const registry=createProviderRegistry();let resolveSections,resolveSearch,cleanups=0;
 const unregister=registry.register('slow',provider({sections:()=>new Promise(r=>resolveSections=r),search:()=>new Promise(r=>resolveSearch=r),subscribe:()=>()=>cleanups++}));
 const search=registry.search('x');unregister();resolveSections([{id:'recent',title:'Late',items:[item]}]);resolveSearch([item]);await tick();assert.deepEqual(await search,[]);assert.equal(registry.getSnapshot().sections.length,0);
 registry.dispose();unregister();assert.equal(cleanups,1);assert.throws(()=>registry.register('later',provider()),/disposed/);
});
test('provider failures are isolated and disposal unsubscribes live sources',async()=>{
 const registry=createProviderRegistry();let cleanups=0;
 registry.register('healthy',provider({subscribe:()=>()=>cleanups++}));registry.register('broken',provider({sections:()=>{throw Error('fixture failure');}}));
 await registry.refresh();assert.equal(registry.getSnapshot().sections[0].sourceId,'healthy');assert.deepEqual(registry.getSnapshot().errors,['broken']);assert.throws(()=>registry.register('healthy',provider()),/already/);
 registry.dispose();registry.dispose();assert.equal(cleanups,1);
});
