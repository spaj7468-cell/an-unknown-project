(function(){
const pages=[...document.querySelectorAll('.page')];
const nav=[...document.querySelectorAll('[data-page]')];
const sidebar=document.getElementById('sidebar'),shade=document.getElementById('mobileShade');
function openPage(name,updateHash=true){
 const target=document.getElementById('page-'+name);
 if(!target)return;
 pages.forEach(p=>p.classList.toggle('active',p===target));
 document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
 document.title=(target.dataset.title||'Documentation')+' — An Unknown Project';
 if(updateHash)history.replaceState(null,'','#'+name);
 sidebar.classList.remove('open');shade.classList.remove('open');
 window.scrollTo({top:0,behavior:'smooth'});
 const toc=document.getElementById('toc');
 toc.innerHTML=name==='overview'?'<a href="#principles">Our approach</a><a href="#paths">Learning paths</a><a href="#example">Code comparison</a><a href="#roadmap-preview">Knowledge layers</a>':'<a href="#page-'+name+'">Overview</a><a href="#page-'+name+' .section">Main topics</a>';
}
document.addEventListener('click',e=>{
 const button=e.target.closest('[data-page]');
 if(button){e.preventDefault();openPage(button.dataset.page);return;}
 const copy=e.target.closest('[data-copy]');
 if(copy){const raw=copy.getAttribute('data-copy').replace(/&#10;/g,'\n');navigator.clipboard?.writeText(raw).then(()=>{copy.textContent='Copied';setTimeout(()=>copy.textContent='Copy code',1300)}).catch(()=>{copy.textContent='Select code to copy'});}
});
function searchOpen(){document.getElementById('searchOverlay').classList.add('open');document.getElementById('searchInput').focus();renderResults('');}
function searchClose(){document.getElementById('searchOverlay').classList.remove('open');}
document.getElementById('openSearch').addEventListener('click',searchOpen);
document.getElementById('heroSearch').addEventListener('click',searchOpen);
document.getElementById('menuToggle').addEventListener('click',()=>{sidebar.classList.toggle('open');shade.classList.toggle('open')});
shade.addEventListener('click',()=>{sidebar.classList.remove('open');shade.classList.remove('open')});
document.getElementById('searchOverlay').addEventListener('click',e=>{if(e.target.id==='searchOverlay')searchClose()});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();searchOpen()}if(e.key==='Escape')searchClose()});
const searchable=[
['Overview','overview','The developer knowledge system, learning paths and project introduction'],
['Getting started','getting-started','Learning loop, first steps, how to use the documentation'],
['Core concepts','fundamentals','Types, control flow, data structures, memory, errors'],
['Python','python','Python functions, lists, dictionaries, exceptions, project structure'],
['JavaScript','javascript','JavaScript functions, promises, async await, browser and server'],
['Java','java','Java types, classes, collections, JVM'],
['C and C++','cpp','Compilation, pointers, memory, RAII, resources'],
['Rust','rust','Ownership, borrowing, lifetimes, Result, error handling'],
['Software architecture','architecture','System design, modules, contracts, layers, monolith'],
['APIs and protocols','apis','HTTP, status codes, retries, idempotency'],
['Databases','databases','SQL, relational databases, document databases, backups'],
['Security','security','Authentication, authorization, secrets, input validation'],
['Testing and debugging','testing','Unit tests, integration tests, reproduce, diagnose, regression'],
['Design patterns','patterns','Adapter, Strategy, Observer, Factory, Repository, dependency injection'],
['Glossary','glossary','Definitions, API, ABI, concurrency, latency, runtime'],
['Developer discipline map','discipline-map','HTML CSS JavaScript TypeScript backend database languages hierarchy project structure'],
['Project roadmap','roadmap','Knowledge base roadmap and future chapters']
];
function renderResults(query){
 const box=document.getElementById('searchResults'),q=query.trim().toLowerCase();
 const matches=searchable.filter(item=>!q||(item[0]+' '+item[2]).toLowerCase().includes(q));
 box.innerHTML='';
 if(!matches.length){box.innerHTML='<div class="empty">No matching topic. Try a language, concept, or engineering term.</div>';return}
 matches.slice(0,12).forEach(item=>{const b=document.createElement('button');b.className='result';b.innerHTML='<strong></strong><small></small>';b.querySelector('strong').textContent=item[0];b.querySelector('small').textContent=item[2];b.addEventListener('click',()=>{openPage(item[1]);searchClose()});box.appendChild(b)});
}
document.getElementById('searchInput').addEventListener('input',e=>renderResults(e.target.value));
document.querySelectorAll('.copy').forEach(btn=>btn.addEventListener('click',()=>{}));
const initial=location.hash.slice(1);
if(initial&&document.getElementById('page-'+initial))openPage(initial,false);
})();
