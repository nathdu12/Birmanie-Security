
window.pwCheck=function(){
  const inp=document.getElementById('pw-input-el'),err=document.getElementById('pw-err');
  if(!inp)return;const val=inp.value;if(!val)return;
  if(val==='BIrm@niEGl0rySecure#2026'){
    sessionStorage.setItem('mg_token_v3','ok');
    const gate=document.getElementById('pw-gate');
    if(gate){gate.style.transition='opacity .5s';gate.style.opacity='0';setTimeout(()=>{gate.style.display='none';},500);}
    const lk=document.getElementById('init-lock');if(lk)lk.remove();
    document.querySelectorAll('.hdr,.nav,.main').forEach(el=>el.style.display='');
    setTimeout(()=>{const ldr=$('ldr');if(ldr){ldr.classList.add('out');setTimeout(()=>{ldr.style.display='none';showToast('ACCÈS AUTORISÉ',2000);},900);}},400);
  } else {
    if(err){err.textContent='CODE INVALIDE — ACCÈS REFUSÉ';err.style.opacity='1';}
    inp.value='';inp.style.borderColor='rgba(255,24,64,.5)';
    setTimeout(()=>{if(err)err.style.opacity='0';inp.style.borderColor='';},3000);
  }
};
document.addEventListener('DOMContentLoaded',()=>{
  if(sessionStorage.getItem('mg_token_v3')){
    const gate=document.getElementById('pw-gate');if(gate)gate.style.display='none';
    const lk=document.getElementById('init-lock');if(lk)lk.remove();
    document.querySelectorAll('.hdr,.nav,.main').forEach(el=>el.style.display='');
  }
});


let actx=null,_au=false;
function sndNav(){
  if(!snd)return;
  try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(),g=actx.createGain();o.connect(g);g.connect(actx.destination);
    o.frequency.value=440;g.gain.setValueAtTime(0.04,actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.08);
    o.start();o.stop(actx.currentTime+0.08);}catch(e){}
}
function sndH(){
  if(!snd)return;
  try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(),g=actx.createGain();o.connect(g);g.connect(actx.destination);
    o.frequency.value=600;g.gain.setValueAtTime(0.015,actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.04);
    o.start();o.stop(actx.currentTime+0.04);}catch(e){}
}
function sndA(loud){
  if(!snd)return;
  try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(),g=actx.createGain();o.connect(g);g.connect(actx.destination);
    o.type='sawtooth';o.frequency.setValueAtTime(880,actx.currentTime);
    o.frequency.exponentialRampToValueAtTime(220,actx.currentTime+0.3);
    g.gain.setValueAtTime(loud?0.18:0.06,actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+0.35);
    o.start();o.stop(actx.currentTime+0.35);}catch(e){}
}


function pageFlash(){
  const f=document.getElementById('page-flash');if(!f)return;
  f.style.opacity='1';setTimeout(()=>f.style.opacity='0',120);
}


function fOL(srv){
  const tab=document.querySelector('.tab[onclick*=\'online\']');if(tab)tab.click();
  setTimeout(()=>{const sel=$('ol-srv');if(sel){sel.value=srv;loadOLS(srv);}},200);
}
function qCA(p){
  const tab=document.querySelector('.tab[onclick*=\'checkall\']');if(tab)tab.click();
  setTimeout(()=>{const inp=$('ca-input');if(inp){inp.value=p;doCA();}},200);
}
function animStat(id,val){
  const el=document.getElementById(id);if(!el)return;
  el.textContent=val;
}
function rHist(){
  const el=$('ca-hist');if(!el)return;
  if(!hist.length){el.innerHTML='<div class="empty">Aucune recherche</div>';return;}
  el.innerHTML=hist.map(h=>`<div class="wi" style="cursor:pointer" onclick="qCA('${h.p}')">
    <span style="font-family:var(--M);font-size:.6rem">${h.p}</span>
    <span style="font-family:var(--M);font-size:.5rem;color:var(--t3);margin-left:auto">${h.servers&&h.servers.length?'🟢 '+h.servers[0].toUpperCase():'◯'} · ${h.t||''}</span>
  </div>`).join('');
}
function toggleSound(){
  snd=!snd;localStorage.setItem('mg_sound',snd?'on':'off');
  const b=$('sound-btn');if(b){b.textContent=snd?'🔊 SON':'🔇 SON';b.style.color=snd?'':'var(--t3)';}
}
function renderRefGrid(){
  const el=document.getElementById('ref-list');if(!el)return;
  const stored=JSON.parse(localStorage.getItem('bs_referents')||'[]');
  el.innerHTML=stored.length?stored.map(r=>`<div class="wi">
    <span style="font-family:var(--M);font-size:.6rem">${r.country} — ${r.server.toUpperCase()}</span>
    <button class="btn btn-r" style="margin-left:auto;font-size:.46rem;padding:.08rem .35rem" onclick="removeReferentEntry('${r.server}','${r.country}')">✕</button>
  </div>`).join(''):'<div class="empty">Aucun référent</div>';
}
async function requestNotifPerms(){
  if(!('Notification' in window))return;
  if(Notification.permission==='default') await Notification.requestPermission();
}
function sendBrowserNotif(type,msg,srv){
  if(!('Notification' in window)||Notification.permission!=='granted')return;
  new Notification('BIRMANIE SECURITY',{body:msg});
}
function showPop(type,title,body){showToast(title+' — '+body,4000);}

function BUG(s){return false;}
/* auth géré inline */

const CORS_PROXY='https://corsproxy.io/?url=';
const NG_API_KEY='NGAPI_b7Tn@i4eIL9ZoLnnqI$Q6%vJ$W1y6oFJf077f5eaac79de484ddd5b73f6663bb1';
const NG_API_BASE='https://publicapi.nationsglory.fr';
const DYNMAP_BASES={lime:'https://lime.nationsglory.fr',blue:'https://blue.nationsglory.fr',coral:'https://coral.nationsglory.fr',cyan:'https://cyan.nationsglory.fr',mocha:'https://mocha.nationsglory.fr',red:'https://red.nationsglory.fr',orange:'https://orange.nationsglory.fr',yellow:'https://yellow.nationsglory.fr',white:'https://white.nationsglory.fr',black:'https://black.nationsglory.fr',jade:'https://jade.nationsglory.fr'};
let _dmCache={},_dmCacheTime={};
const _dmTTL=20000;

async function dynmapGetPlayers(srv){
  const now=Date.now();
  if(_dmCache[srv]&&(now-(_dmCacheTime[srv]||0))<_dmTTL)return _dmCache[srv];
  const base=DYNMAP_BASES[srv];
  if(!base)return[];
  const eps=[`${base}/up/world/world/0`,`${base}/up/world/nationsglory/0`,`${base}/standalone/dynmap_nationsglory.json`,`${base}/standalone/dynmap_world.json`];
  for(const ep of eps){
    try{
      let data=null;
      try{const r=await fetch(ep,{signal:AbortSignal.timeout(4000)});if(r.ok)data=await r.json();}catch(e){}
      if(!data){try{const r2=await fetch(CORS_PROXY+encodeURIComponent(ep),{signal:AbortSignal.timeout(5000)});if(r2.ok)data=await r2.json();}catch(e){}}
      if(data&&data.players&&Array.isArray(data.players)){
        const players=data.players.map(p=>({name:p.account||p.name||p.playerName||'',x:p.x||0,y:p.y||0,z:p.z||0})).filter(p=>p.name);
        _dmCache[srv]=players;_dmCacheTime[srv]=now;return players;
      }
    }catch(e){}
  }
  // Fallback API publique NationsGlory
  try{
    const r=await fetch(`${NG_API_BASE}/online/${srv}`,{signal:AbortSignal.timeout(5000),headers:{'x-api-key':NG_API_KEY}});
    if(r.ok){
      const d=await r.json();
      const players=(Array.isArray(d)?d:(d.players||d.online||[])).map(x=>({name:typeof x==='string'?x:(x.name||x.pseudo||''),x:0,y:0,z:0})).filter(x=>x.name);
      _dmCache[srv]=players;_dmCacheTime[srv]=now;return players;
    }
  }catch(e){}
  return[];
}

async function dynmapGetAll(){
  const results=await Promise.all(Object.keys(DYNMAP_BASES).map(async srv=>{
    const players=await dynmapGetPlayers(srv);
    return{srv,players};
  }));
  const map={};results.forEach(({srv,players})=>map[srv]=players);
  return map;
}



const API='https://nationsglory-spy.onrender.com';
const SRV=["blue","coral","orange","red","yellow","mocha","white","jade","black","cyan","lime"];
const EMO={blue:"🔵",coral:"🔴",orange:"🟠",red:"🔴",yellow:"🟡",mocha:"🟤",white:"⚪",jade:"🟢",black:"⚫",cyan:"🔵",lime:"🟢"};

const STATIC_COUNTRIES_FALLBACK=["AfriqueDuSud","Afghanistan","Alaska","Albanie","Algerie","Allemagne","Altai","Amour","Angola","ArchipelCrozet","Argentine","Armenie","Arizona","Australie","Autriche","Azerbaidjan","Bahamas","Bahrein","Baja","Bangladesh","Belgique","Belize","Benin","Bhoutan","Bielorussie","Birmanie","Bolivie","Bosnie","Botswana","Bouriatie","Bresil","Bulgarie","BurkinaFaso","Californie","Cambodge","Cameroun","Canada","CentreAfrique","Chili","Chine","Chypre","Colombie","Congo","CoreeDuNord","CoreeDuSud","CoteDivoire","Croatie","Dakota","Danemark","Djibouti","Egypte","EmiratsArabesUnis","EmpireBissaoguineen","EmpireIrkoutsk","EmpireJordanien","EmpireOmanais","Equateur","Erythree","Espagne","Estonie","EtatsUnis","Ethiopie","Floride","France","Gabon","Georgie","Ghana","Grece","Groenland","Guatemala","Guangdong","Guangxi","Guizhou","Guyana","Guyane","Hainan","Iakoutie","Iamalie","Idaho","IleCoats","IleBolchevique","IleDeLaReunion","IleGraham","IleMaurice","IleVictoria","IleWrangel","IlesBaleares","IlesCanaries","IlesFeroe","IlesFidji","IlesGalapagos","IlesKerguelen","IlesSalomon","IlesSandwich","IlesVancouver","IleBouvet","Inde","Indonesie","Irak","Iran","Islande","Italie","Jamaique","Japon","Java","Kazakhstan","Kenya","Khabarovsk","Kirghizistan","Kosovo","Koweit","Krasnoy","Laos","Liban","Liberia","Libye","Lituanie","Lettonie","Luxembourg","Macedoine","Madagan","Madagascar","Magadan","Malaisie","Malawi","Mali","Malte","Maroc","Mauritanie","Mexique","Michigan","Minnesota","Moldavie","Mongolie","Montenegro","Montana","Mozambique","Namibie","Nepal","Nevada","Nicaragua","Niger","Nigeria","Norvege","NouvelleCaledonie","NouvelleGuinee","NouvelleZelande","NouvelleZemble","NouveauMexique","Nunavut","Ontario","Oregon","Ouganda","Ouzbekistan","Pakistan","Palaos","Papouasie","Paraguay","PaysBas","Perou","Philippines","Pologne","Portugal","Qatar","Quebec","Quinghai","RDCongo","RepubliqueTcheque","Roumanie","RoyaumeUni","Russie","SaharaOccidental","Sakhaline","Salvador","Sardaigne","Serbie","Sichuan","Slovaquie","Slovenie","Socotra","Somalie","Sonora","Soudan","Srilanka","StHelena","Suede","Suisse","Sumatra","Suriname","Svalbard","Swaziland","Syrie","Tadjikistan","Taiwan","Tanzanie","Tasmanie","Tchad","Tchoukota","TerreAdelie","TerreBooth","TerreBurke","TerreDeFeu","TerreGrant","TerreLiard","TerreLow","TerreMasson","TerreMill","TerrePowell","TerreRoss","TerreSigny","TerreSiple","TerreSmith","TerreSnow","TerreSpaatz","TerreThor","TerreVega","Texas","Thailande","Tibet","Timor","Togo","Tomsk","Touva","TriniteEtTobago","Tunisie","Turkmenistan","Turquie","Uruguay","Utah","Venezuela","Vietnam","WallisEtFutuna","Washington","Wisconsin","Xinjiang","Yemen","Yunnam","Zambie","Zimbabwe"].sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));

const CC_LS_KEY='mg_cc_v1';const CC_LS_TTL=6*3600*1000;
function _ccLoadLS(){try{const r=JSON.parse(localStorage.getItem(CC_LS_KEY)||'{}');const now=Date.now();Object.entries(r).forEach(([s,v])=>{if(now-v.ts<CC_LS_TTL)cc[s]=v.list;});console.log('[countries] cache localStorage chargé:',Object.keys(cc));}catch{}}
function _ccSaveLS(server,list){try{const r=JSON.parse(localStorage.getItem(CC_LS_KEY)||'{}');r[server]={list,ts:Date.now()};localStorage.setItem(CC_LS_KEY,JSON.stringify(r));}catch{}}
_ccLoadLS();

async function getCountries(server){
  if(cc[server]&&cc[server].length)return;
  try{
    const r=await fetch(`${NG_API_BASE}/countries/${server}`,{headers:{'x-api-key':NG_API_KEY}});
    if(r.ok){const d=await r.json();cc[server]=(d.countries||d).map(c=>typeof c==='string'?c:(c.name||''));}
  }catch{}
}
async function getPlayerCount(){
  try{
    const all=await dynmapGetAll();
    const d={};
    Object.keys(DYNMAP_BASES).forEach(s=>{ d[s]={players:(all[s]||[]).length}; });
    _pcCache=d;return d;
  }catch{return _pcCache;}
}
function getPCCount(srv){return _pcCache[srv]?.players??null;}
let WL=JSON.parse(localStorage.getItem('bs_wl')||'[]'),WLM=JSON.parse(localStorage.getItem('bs_wlm')||'[]'),cwl='lime',snd=localStorage.getItem('mg_sound')!=='off';
let ALR=[],prev={},hist=JSON.parse(localStorage.getItem('mg_h')||'[]'),cc={},oP=[];
const $=id=>document.getElementById(id);
const ld=()=>`<div class="ld">Chargement<span class="ldd"><span>.</span><span>.</span><span>.</span></span></div>`;
const ld2=()=>ld();
const rP=(i,p)=>p.find(x=>x.toLowerCase()===i.toLowerCase())||i;

const sparkData={total:[],wl:[],wc:[]};
function drawSpark(canvasId,data,color='rgba(0,80,216,.55)'){
  const c=$(canvasId);if(!c||!data.length)return;
  const W=c.offsetWidth,H=c.offsetHeight;c.width=W*devicePixelRatio;c.height=H*devicePixelRatio;
  const ctx=c.getContext('2d');ctx.scale(devicePixelRatio,devicePixelRatio);
  if(data.length<2)return;
  const mn=Math.min(...data),mx=Math.max(...data),range=mx-mn||1;
  ctx.beginPath();
  data.forEach((v,i)=>{const x=i/(data.length-1)*W,y=H-(v-mn)/range*H*.8-H*.1;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});
  ctx.strokeStyle=color;ctx.lineWidth=1;ctx.stroke();
  const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'rgba(0,80,216,.1)');grad.addColorStop(1,'transparent');
  ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
}

(()=>{
  const c=$('bg'),ctx=c.getContext('2d');
  const sz=()=>{c.width=innerWidth;c.height=innerHeight};sz();window.addEventListener('resize',sz);
  const pts=Array.from({length:55},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*.9+.2,a:Math.random()*.2+.04}));
  let mx=innerWidth/2,my=innerHeight/2,t=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
  const orbs=[[.14,.1,0,56,184,.055,.44],[.86,.84,26,111,255,.038,.42],[.5,.44,77,159,255,.025,.36]];
  const draw=()=>{
    t+=.003;ctx.clearRect(0,0,c.width,c.height);
    orbs.forEach(([ox,oy,r,g,b,a,s])=>{
      const px=c.width*(ox+Math.sin(t*.6+ox*10)*.038),py=c.height*(oy+Math.cos(t*.42+oy*8)*.028);
      const grd=ctx.createRadialGradient(px,py,0,px,py,c.width*s);
      grd.addColorStop(0,`rgba(${r},${g},${b},${a})`);grd.addColorStop(1,'transparent');
      ctx.fillStyle=grd;ctx.fillRect(0,0,c.width,c.height);
    });
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=c.width;if(p.x>c.width)p.x=0;if(p.y<0)p.y=c.height;if(p.y>c.height)p.y=0;
      const d=Math.hypot(p.x-mx,p.y-my),br=d<90?1-d/90:0;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r+br*1.2,0,Math.PI*2);
      ctx.fillStyle=`rgba(26,111,255,${p.a+br*.16})`;ctx.fill();
    });
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
      if(d<80){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(0,80,216,${.028*(1-d/80)})`;ctx.lineWidth=.5;ctx.stroke();}
    }
    requestAnimationFrame(draw);
  };draw();
})();

(()=>{
  
  const tc=document.createElement('canvas');
  tc.id='trl';tc.style.cssText='position:fixed;inset:0;z-index:9998;pointer-events:none';
  document.body.appendChild(tc);
  const ctx=tc.getContext('2d');
  const sync=()=>{tc.width=innerWidth;tc.height=innerHeight};sync();
  window.addEventListener('resize',sync);
  let trail=[],MAX=14;
  document.addEventListener('mousemove',e=>{
    trail.push({x:e.clientX,y:e.clientY,t:Date.now()});
    if(trail.length>MAX)trail.shift();
  });
  const draw=()=>{
    ctx.clearRect(0,0,tc.width,tc.height);
    const now=Date.now();
    trail.forEach((p,i)=>{
      const s=(i+1)/MAX*(1-(now-p.t)/220);
      if(s<=0)return;
      ctx.beginPath();ctx.arc(p.x,p.y,1.4*s,0,Math.PI*2);
      ctx.fillStyle=`rgba(26,111,255,${s*.14})`;ctx.fill();
    });
    requestAnimationFrame(draw);
  };draw();
})();

setInterval(()=>{$('clock').textContent=new Date().toLocaleTimeString('fr-FR');$('hdr-date').textContent=new Date().toLocaleDateString('fr-FR');},1000);

function showToast(msg,duration=3000){
  const wrap=$('toast-wrap'),t=document.createElement('div');
  t.className='toast';t.textContent=msg;wrap.appendChild(t);
  setTimeout(()=>{t.style.animation='toastOut .3s ease forwards';setTimeout(()=>t.remove(),300);},duration);
}

document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT'||e.target.tagName==='SELECT')return;
  const tabs=document.querySelectorAll('.tab');
  const map={'1':0,'2':1,'3':2,'4':3,'5':4,'6':5,'7':6,'8':7,'9':8};
  if(map[e.key]!==undefined&&tabs[map[e.key]]){tabs[map[e.key]].click();showToast(`Onglet ${e.key} — ${tabs[map[e.key]].textContent.trim()}`);return;}
  if(e.key==='/'||e.key==='k'&&(e.ctrlKey||e.metaKey)){e.preventDefault();tabs[2].click();setTimeout(()=>$('ca-input').focus(),300);}
});

let pct=0;
const pctT=setInterval(()=>{pct=Math.min(pct+(Math.random()*8+2),92);if($('l-pct'))$('l-pct').textContent=Math.floor(pct)+'%';},85);
const msgs=['CHARGEMENT DES MODULES...','CONNEXION API SÉCURISÉE...','SYNCHRONISATION SERVEURS...','VÉRIFICATION INTÉGRITÉ...','CHIFFREMENT CANAL...','SYSTÈME PRÊT À DÉMARRER...'];
let mi=0;const msgT=setInterval(()=>{if(mi<msgs.length-1&&$('l-msg'))$('l-msg').textContent=msgs[mi++];},500);

function _loaderReady(){
  clearInterval(pctT);clearInterval(msgT);
  if($('l-pct'))$('l-pct').textContent='100%';
  if($('l-fill'))$('l-fill').style.width='100%';
  setTimeout(()=>{
    const m=$('l-msg');
    if(m){m.textContent='SYSTÈME PRÊT — CLIQUEZ POUR ENTRER';m.classList.remove('blink');m.classList.add('rdy');}
    const b=$('lbtn');if(b)b.style.display='block';
  },300);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',_loaderReady);
}else{
  
  setTimeout(_loaderReady,200);
}

setTimeout(()=>{
  const b=$('lbtn');
  if(b&&b.style.display==='none'||b&&!b.style.display){_loaderReady();}
},4000);
function enterSite(){
  try{if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();actx.resume();}catch(e){}
  _au=true;window.scrollTo(0,0);
  const lk=document.getElementById('init-lock');if(lk)lk.remove();
  document.querySelectorAll('.hdr,.nav,.main').forEach(el=>el.style.display='');
  $('ldr').classList.add('out');
  setTimeout(()=>{$('ldr').style.display='none';showToast('SYSTÈME OPÉRATIONNEL',2500);},900);
}

let scW=null,scOn=false,scBarT=null;
(()=>{
  const ifr=document.createElement('iframe');ifr.allow='autoplay';
  ifr.style.cssText='position:absolute;width:0;height:0;border:none;opacity:0;pointer-events:none';
  ifr.src='https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-164072391-103154989/omer-adam-feat-arisa-tel-aviv&color=%23f0c040&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false';
  document.body.appendChild(ifr);
  const s=document.createElement('script');s.src='https://w.soundcloud.com/player/api.js';
  s.onload=()=>{
    scW=SC.Widget(ifr);
    scW.bind(SC.Widget.Events.READY,()=>scW.setVolume(70));
    scW.bind(SC.Widget.Events.PLAY,()=>{scOn=true;$('scp-tri').classList.add('p');$('scp-eq').classList.add('on');scStartBar();});
    scW.bind(SC.Widget.Events.PAUSE,()=>{scOn=false;$('scp-tri').classList.remove('p');$('scp-eq').classList.remove('on');scStopBar();});
    scW.bind(SC.Widget.Events.FINISH,()=>{scOn=false;$('scp-tri').classList.remove('p');$('scp-eq').classList.remove('on');$('scp-bf').style.width='0%';});
  };document.head.appendChild(s);
})();
function scToggle(){if(!scW)return;scOn?scW.pause():scW.play();}
function scVol(v){if(scW)scW.setVolume(parseInt(v));}
function scStartBar(){scStopBar();scBarT=setInterval(()=>{if(!scW)return;scW.getPosition(p=>{scW.getDuration(d=>{if(d>0)$('scp-bf').style.width=(p/d*100)+'%';});});},500);}
function scStopBar(){if(scBarT){clearInterval(scBarT);scBarT=null;}}

function _authHeader(){const t=sessionStorage.getItem('mg_token_v3');return t?{'Authorization':'Bearer '+t}:{};}
async function api(p,opts={}){throw new Error('Backend N/A');}

async function apiP(p,b){throw new Error('Backend N/A');}

async function nav(id,btn){
  try{sndNav();}catch(e){}
  try{pageFlash();}catch(e){}
  try{document.querySelector('.main').scrollTo({top:0,behavior:'instant'});}catch(e){}
  document.querySelectorAll('.sec').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  const sec=$('s-'+id);
  if(!sec){console.warn('[nav] section introuvable: s-'+id);return;}
  sec.classList.add('active');
  if(btn)btn.classList.add('active');
  try{
    if(id==='watchlist')await switchWl('lime');
    if(id==='countrywatch'){cwRender();cwRefreshAll();}
    if(id==='online'){$('ol-body').innerHTML=ld();loadOnline();}
    if(id==='checkall')rAT('ca-pl','ppCA');
    if(id==='stats')rAT('st-pl','ppST');
    if(id==='referents'){loadReferents();}
    if(id==='activite'){initActivity();}
    if(id==='swords'){loadSwords();}else{if(_swordPollId){clearInterval(_swordPollId);_swordPollId=null;}}
  }catch(e){console.warn('[nav] erreur post-nav:',e);}
}

function rAT(id,fn){const e=$(id);if(!e||!oP.length)return;e.innerHTML=oP.map(p=>`<span class="tag" onclick="${fn}('${p.replace(/'/g,"\\'")}')">${p}</span>`).join('');const cnt=$('ca-pl-count');if(cnt&&id==='ca-pl')cnt.textContent=oP.length+' joueurs';}
function fPT(ii,di){const e=$(di);if(!e)return;const v=$(ii).value.trim().toLowerCase(),f=v?oP.filter(p=>p.toLowerCase().includes(v)):oP;if(!f.length){e.innerHTML='';return;}const m={'ca-pl':'ppCA','st-pl':'ppST','wl-pl':'ppWL','sword-pl':'ppSword'};e.innerHTML=f.slice(0,100).map(p=>`<span class="tag" onclick="${m[di]||'qCA'}('${p.replace(/'/g,"\\'")}')">${p}</span>`).join('');}
function ppCA(p){$('ca-input').value=p;$('ca-pl').innerHTML='';$('ca-list').style.display='none';doCA();}
function ppST(p){$('st-input').value=p;$('st-pl').innerHTML='';$('st-list').style.display='none';loadStats();}
function ppSword(p){$('sword-name-inp').value=p;$('sword-pl').innerHTML='';$('sword-acl').style.display='none';}
function ppWL(p){$('wl-add').value=p;$('wl-pl').innerHTML='';$('wl-acl').style.display='none';}
function acF(ii,li,pool){const v=$(ii).value.trim().toLowerCase(),l=$(li);if(!v||!pool.length){l.style.display='none';return;}const m=pool.filter(p=>p.toLowerCase().includes(v)).slice(0,10);if(!m.length){l.style.display='none';return;}l.innerHTML=m.map(p=>`<div class="aci" onmousedown="acP('${ii}','${li}','${p.replace(/'/g,"\\'")}')">${p}</div>`).join('');l.style.display='block';}
function acFC(){const s=$('ck-srv').value;if(!s)return;const v=$('ck-country').value.trim().toLowerCase(),p=cc[s]||[];$('ck-suggest').innerHTML=(v?p.filter(c=>c.toLowerCase().includes(v)):p).map(c=>`<span class="tag" onclick="selC('${c.replace(/'/g,"\\'")}')">${c}</span>`).join('');acF('ck-country','ck-list',p);}
function acP(i,l,v){$(i).value=v;$(l).style.display='none';}
function acK(e,l,cb){const list=$(l),items=list.querySelectorAll('.aci'),cur=list.querySelector('.sel');if(e.key==='ArrowDown'){e.preventDefault();const n=cur?cur.nextElementSibling:items[0];if(cur)cur.classList.remove('sel');if(n)n.classList.add('sel');}else if(e.key==='ArrowUp'){e.preventDefault();const p=cur?cur.previousElementSibling:items[items.length-1];if(cur)cur.classList.remove('sel');if(p)p.classList.add('sel');}else if(e.key==='Enter'){if(cur){cur.onmousedown();return;}list.style.display='none';cb();}else if(e.key==='Escape')list.style.display='none';}
document.addEventListener('click',e=>{document.querySelectorAll('.acl').forEach(l=>{if(!l.parentElement.contains(e.target))l.style.display='none';});});

async function chkAPI(){
  try{
    const r=await fetch(NG_API_BASE+'/online/lime',{headers:{'x-api-key':NG_API_KEY},signal:AbortSignal.timeout(4000)});
    const ok=r.ok;
    const led=$('api-led'),txt=$('api-txt');
    if(led)led.className=ok?'led on':'led off';
    if(txt)txt.textContent=ok?'API OK':'DOWN';
    return ok;
  }catch{
    const led=$('api-led'),txt=$('api-txt');
    if(led)led.className='led off';
    if(txt)txt.textContent='DOWN';
    return false;
  }
}
async function loadWL(){
  try{
    const pl = await dynmapGetPlayers('lime');
    WL_ONLINE = pl.map(p=>p.name);
    if(typeof animStat==='function') animStat('st-wcount', WL.length);
    sparkData&&sparkData.wc&&sparkData.wc.push(WL.length);
    if(sparkData&&sparkData.wc&&sparkData.wc.length>30) sparkData.wc.shift();
    if(typeof drawSpark==='function') drawSpark('spark-wc', sparkData?.wc||[]);
  }catch{}
}

async function loadWLM(){
  try{
    const pl = await dynmapGetPlayers('mocha');
    WLM = WLM||[];
  }catch{}
}

async function loadKP(){
  try{
    const r=await fetch(`${NG_API_BASE}/players`,{headers:{'x-api-key':NG_API_KEY}});
    if(r.ok){
      const d=await r.json();
      oP=[...new Set([...(d.players||[]),...oP])].sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
      if(typeof rAT==='function'){rAT('ca-pl','ppCA');rAT('st-pl','ppST');rAT('wl-pl','ppWL');}
    }
  }catch{}
}

async function loadOLS(srv){
  const body=$('ol-body'),w='';
  try{
    const pl=await dynmapGetPlayers(srv);
    body.innerHTML=pl.length?
      `<div style="font-family:var(--M);font-size:.55rem;color:var(--t3);margin-bottom:.5rem"><span style="color:var(--gb)">${pl.length}</span> joueurs — ${srv.toUpperCase()}</div><div style="display:flex;flex-direction:column;gap:.3rem">${pl.map(p=>`<div class="wi" style="cursor:pointer" onclick="openPlayerPanel&&openPlayerPanel('${p.name.replace(/'/g,"\\'")}')"><img src="https://skins.nationsglory.fr/face/${encodeURIComponent(p.name)}/32" style="width:28px;height:28px;border-radius:4px;border:1px solid var(--b2);image-rendering:pixelated;flex-shrink:0" onerror="this.style.display='none'" alt=""><span style="font-family:var(--M);font-size:.62rem;color:var(--t1)">${p.name}</span><div class="wis on" style="margin-left:auto"><div class="led on" style="width:5px;height:5px;flex-shrink:0"></div>EN LIGNE</div></div>`).join('')}</div>`
      :`<div class="empty">Aucun joueur sur ${srv.toUpperCase()}</div>`;
  }catch(e){body.innerHTML=`<div class="empty" style="color:var(--red)">Erreur : ${e.message}</div>`;}
}

async function loadOnline(){
  const srv=$('ol-srv')?.value,body=$('ol-body');
  if(body) body.innerHTML=ld();
  try{
    if(!srv){
      const all=await dynmapGetAll();
      let tot=0;
      const srvList=Object.keys(DYNMAP_BASES);
      srvList.forEach(s=>tot+=(all[s]||[]).length);
      body.innerHTML=`<div style="font-family:var(--M);font-size:.55rem;color:var(--t3);margin-bottom:.55rem">TOTAL <span style="color:var(--gb)">${tot}</span> joueurs</div><div class="sg">${srvList.map(s=>{const pl=(all[s]||[]);const cnt=pl.length;return`<div class="sc" onmouseenter="sndH&&sndH()" onclick="fOL('${s}')"><div class="sc-top"><span class="sc-name">${s.toUpperCase()}</span><span class="sc-emo">${EMO[s]||''}</span></div><div class="sc-n">${cnt}</div><div class="sc-lbl">CLIQUER</div><div class="tags" style="max-height:110px;overflow-y:auto;padding-right:2px" onclick="event.stopPropagation()">${pl.slice(0,20).map(p=>`<span class="tag" onclick="event.stopPropagation();qCA&&qCA('${p.name}')">${p.name}</span>`).join('')}${pl.length>20?`<span style="font-family:var(--M);font-size:.46rem;color:var(--t3)">+${pl.length-20}</span>`:''}</div><div class="sbar"><div class="sbar-f" style="width:${Math.round(cnt/Math.max(...srvList.map(ss=>(all[ss]||[]).length),1)*100)}%"></div></div></div>`;}).join('')}</div>`;
    }else{
      await loadOLS(srv);
    }
  }catch(e){if(body)body.innerHTML=`<div class="empty" style="color:var(--red)">Erreur : ${e.message}</div>`;}
}

async function doCA(){
  const raw=$('ca-input').value.trim();
  if(!raw)return;
  const p=rP(raw,oP);
  $('ca-input').value=p;
  const res=$('ca-result');
  res.innerHTML=ld();

  const CORS_PROXY='https://corsproxy.io/?url=';
  const DYNMAP_BASES={lime:'https://lime.nationsglory.fr',blue:'https://blue.nationsglory.fr',coral:'https://coral.nationsglory.fr',cyan:'https://cyan.nationsglory.fr',mocha:'https://mocha.nationsglory.fr',red:'https://red.nationsglory.fr',orange:'https://orange.nationsglory.fr',yellow:'https://yellow.nationsglory.fr',white:'https://white.nationsglory.fr',black:'https://black.nationsglory.fr',jade:'https://jade.nationsglory.fr'};
  const SRV_LIST=Object.keys(DYNMAP_BASES);

  async function dynmapPlayers(srv){
    const base=DYNMAP_BASES[srv];
    const eps=[`${base}/up/world/world/0`,`${base}/up/world/nationsglory/0`,`${base}/standalone/dynmap_nationsglory.json`,`${base}/standalone/dynmap_world.json`];
    for(const ep of eps){
      try{
        let data=null;
        try{const r=await fetch(ep,{signal:AbortSignal.timeout(4000)});if(r.ok)data=await r.json();}catch(e){}
        if(!data){try{const r2=await fetch(CORS_PROXY+encodeURIComponent(ep),{signal:AbortSignal.timeout(5000)});if(r2.ok)data=await r2.json();}catch(e){}}
        if(data&&data.players&&Array.isArray(data.players)){
          return data.players.map(pl=>({name:pl.account||pl.name||pl.playerName||'',x:pl.x||0,y:pl.y||0,z:pl.z||0})).filter(pl=>pl.name);
        }
      }catch(e){}
    }
    // Fallback API publique NG
    try{
      const r=await fetch(`https://publicapi.nationsglory.fr/online/${srv}`,{headers:{'x-api-key':'NGAPI_b7Tn@i4eIL9ZoLnnqI$Q6%vJ$W1y6oFJf077f5eaac79de484ddd5b73f6663bb1'}});
      if(r.ok){const d=await r.json();return(Array.isArray(d)?d:(d.players||[])).map(x=>({name:typeof x==='string'?x:(x.name||''),x:0,y:0,z:0})).filter(x=>x.name);}
    }catch(e){}
    return[];
  }

  try{
    const skinUrl=`https://skins.nationsglory.fr/face/${encodeURIComponent(p)}/64`;
    const allChecks=await Promise.all(SRV_LIST.map(async srv=>{
      const players=await dynmapPlayers(srv);
      const found=players.find(pl=>pl.name.toLowerCase()===p.toLowerCase());
      return found?{srv,player:found}:null;
    }));
    const match=allChecks.find(r=>r!==null);

    if(match){
      const {srv,player}=match;
      const posInfo=player.x?`<div style="font-family:var(--M);font-size:.5rem;color:var(--t3);margin-top:.2rem">📍 X=${Math.round(player.x)} Y=${Math.round(player.y)} Z=${Math.round(player.z)}</div>`:'';
      res.innerHTML=`<div class="res ok"><div style="display:flex;align-items:center;gap:.8rem;margin-bottom:.5rem"><img src="${skinUrl}" style="width:48px;height:48px;border-radius:6px;border:1px solid var(--b2);image-rendering:pixelated;flex-shrink:0" onerror="this.style.display='none'" alt=""><div><div class="rt" style="margin-bottom:.2rem">Joueur localisé — ${p}</div><div style="margin:.15rem 0">${EMO[srv]||'🟢'} <span style="color:var(--grn);font-weight:bold;font-size:.85rem">${srv.toUpperCase()}</span></div><div style="display:inline-flex;align-items:center;gap:.4rem;margin-top:.2rem"><span style="width:7px;height:7px;border-radius:50%;background:var(--grn);display:inline-block"></span><span style="color:var(--grn);font-size:.6rem;font-family:var(--M)">EN LIGNE</span></div>${posInfo}<div style="font-size:.5rem;color:var(--t3);margin-top:.3rem;font-family:var(--M)">Source : DYNMAP SCRAPING</div></div></div></div>`;
      if(typeof sndF==='function')sndF();
    }else{
      res.innerHTML=`<div class="res err"><div style="display:flex;align-items:center;gap:.8rem;margin-bottom:.3rem"><img src="${skinUrl}" style="width:40px;height:40px;border-radius:5px;border:1px solid var(--b2);image-rendering:pixelated;flex-shrink:0;opacity:.5" onerror="this.style.display='none'" alt=""><div><div class="rt">Résultat</div><span style="color:var(--t3)">${p} n'est connecté sur aucun serveur</span><div style="font-size:.5rem;color:var(--t3);margin-top:.3rem;font-family:var(--M)">Scan : ${SRV_LIST.length} serveurs Dynmap</div></div></div></div>`;
    }

    hist=hist.filter(h=>h.p.toLowerCase()!==p.toLowerCase());
    hist.unshift({p,servers:match?[match.srv]:[],t:new Date().toLocaleTimeString('fr-FR')});
    if(hist.length>15)hist.pop();
    localStorage.setItem('mg_h',JSON.stringify(hist));
    if(typeof rHist==='function')rHist();
  }catch(e){
    res.innerHTML=`<div class="res err">Erreur : ${e.message}</div>`;
  }
}

async function loadCS(){const s=$('ck-srv').value;if(!s)return;await getCountries(s);rCS(s);}
function rCS(s){const el=$('ck-suggest'),p=cc[s]||[];if(!p.length){el.innerHTML='';return;}el.innerHTML=p.map(c=>`<span class="tag" onclick="selC('${c.replace(/'/g,"\\'")}')">${c}</span>`).join('');}
function selC(c){$('ck-country').value=c;$('ck-list').style.display='none';doCheck();}
async function doCheck(){const s=$('ck-srv').value,raw=$('ck-country').value.trim();if(!s||!raw)return;await getCountries(s);const c=rP(raw,cc[s]||[]);$('ck-country').value=c;const res=$('ck-result');res.innerHTML=ld();try{const d=await api(`/api/check/${s}/${encodeURIComponent(c)}`);const note=`<div class="warn" style="margin-top:.34rem">⚠ Dynmap hors service</div>`;const hasDynmap=d.power||d.claims||d.mmr;const powerPct=d.power&&d.maxpower?Math.min(100,Math.round(d.power/d.maxpower*100)):0;const isSP=d.power<d.claims;const powerBar=d.maxpower?`<div style="margin:.3rem 0 .1rem;background:var(--bg2);border-radius:3px;height:4px;overflow:hidden"><div style="height:100%;width:${powerPct}%;background:${isSP?'var(--red)':'var(--grn)'};transition:width .4s"></div></div>`:'';const infoBloc=hasDynmap?`<div style="font-family:var(--M);font-size:.49rem;color:var(--t3);margin:.35rem 0 .05rem;display:flex;gap:.8rem;flex-wrap:wrap;align-items:center">${d.claims?`<span>🏴 <b style="color:var(--t1)">${d.claims}</b> claims</span>`:''}${d.power?`<span>⚡ <b style="color:${isSP?'var(--red)':'var(--grn)'}">${d.power}</b>/<b style="color:var(--t2)">${d.maxpower}</b> power${isSP?` <span style="color:var(--red);font-size:.44rem">▼ SOUS-POWER (${d.claims-d.power})</span>`:''}</span>`:''}${d.mmr?`<span>🏆 <b style="color:var(--t1)">${d.mmr}</b> MMR</span>`:''}${d.leader?`<span style="display:inline-flex;align-items:center;gap:.3rem"><img src="https://skins.nationsglory.fr/face/${d.leader}/32" style="width:20px;height:20px;border-radius:3px;border:1px solid var(--b2);image-rendering:pixelated;flex-shrink:0" onerror="this.style.display='none'">👑 <b style="color:var(--t1)">${d.leader}</b></span>`:''}</div>${powerBar}`:'';if(d.online_total===0){res.innerHTML=`<div class="res ok"><div class="rt">Pays : <a href="https://${s}.nationsglory.fr/" target="_blank" rel="noopener" style="color:var(--blue-pale);text-decoration:none" title="Dynmap ${s}">${d.country} ↗</a> — ${d.members_total} membres</div>${infoBloc}<span style="color:var(--grn)">✓ Aucun membre connecté</span>${BUG(s)?note:''}</div>`;}else{res.innerHTML=`<div class="res err"><div class="rt">Pays : <a href="https://${s}.nationsglory.fr/" target="_blank" rel="noopener" style="color:var(--blue-pale);text-decoration:none" title="Dynmap ${s}">${d.country} ↗</a> — ${d.online_total}/${d.members_total} connectés</div>${infoBloc}`+Object.entries(d.servers).sort((a,b)=>a[0]===s?-1:1).map(([x,pl])=>`<div style="margin:.2rem 0">${EMO[x]} <span style="color:var(--g)">${x.toUpperCase()}</span>${BUG(x)?'<span style="color:var(--org);font-size:.46rem"> ⚠</span>':''}${x===s?'<span style="color:var(--red);font-size:.46rem"> ← CIBLE</span>':''} <span style="color:var(--t3);margin-left:.22rem">${pl.join(', ')}</span></div>`).join('')+(Object.keys(d.servers).some(x=>BUG(x))||BUG(s)?note:'')+'</div>';}}catch(e){res.innerHTML=`<div class="res err"><div class="rt">Erreur</div>${e.message}</div>`;}}

function wlR(){const el=$('wl-manage'),wl=cwl==='mocha'?WLM:WL;if(!wl.length){el.innerHTML='<div class="empty">Watchlist vide</div>';return;}el.innerHTML=wl.map(p=>`<div class="wi"><img src="https://skins.nationsglory.fr/face/${encodeURIComponent(p)}/32" style="width:28px;height:28px;border-radius:4px;border:1px solid var(--b2);image-rendering:pixelated;flex-shrink:0" onerror="this.style.display='none'" alt=""><span style="font-family:var(--M);font-size:.62rem">${p}</span><button class="btn btn-r" style="padding:.07rem .34rem;font-size:.48rem;margin-left:auto" onclick="wlRm('${p}')">✕</button></div>`).join('');}
async function wlAdd(){
  const raw=$('wl-add')?.value.trim();if(!raw)return;
  const name=rP(raw,oP);
  if($('wl-add'))$('wl-add').value='';
  if(cwl==='mocha'){if(!WLM.includes(name))WLM.push(name);localStorage.setItem('bs_wlm',JSON.stringify(WLM));}
  else{if(!WL.includes(name))WL.push(name);localStorage.setItem('bs_wl',JSON.stringify(WL));}
  if(typeof wlR==='function')wlR();
  if(typeof wlRS==='function')wlRS();
  if(typeof showToast==='function')showToast(`${name} ajouté à la watchlist`);
}
async function wlRm(name){
  if(cwl==='mocha'){WLM=WLM.filter(p=>p!==name);localStorage.setItem('bs_wlm',JSON.stringify(WLM));}
  else{WL=WL.filter(p=>p!==name);localStorage.setItem('bs_wl',JSON.stringify(WL));}
  if(typeof wlR==='function')wlR();
  if(typeof wlRS==='function')wlRS();
  if(typeof showToast==='function')showToast(`${name} retiré`);
}
async function switchWl(s){cwl=s;document.querySelectorAll('.wtb').forEach(e=>e.classList.remove('act'));const a=$('wl-tab-'+s);if(a)a.classList.add('act');if($('wl-pt'))$('wl-pt').textContent='◈ Watchlist — '+s.toUpperCase();if($('wl-st'))$('wl-st').textContent='⚡ Statut live — '+s.toUpperCase();$('wl-manage').innerHTML='';$('wl-status').innerHTML='';if(s==='lime')await loadWL();else await loadWLM();wlR();wlRS();}
async function wlRS(){
  const el=$('wl-status');
  if(!el)return;
  el.innerHTML=ld();
  const s=cwl==='mocha'?'mocha':'lime';
  const wl=cwl==='mocha'?WLM:WL;
  if(!wl||!wl.length){el.innerHTML='<div class="empty">Watchlist vide</div>';return;}
  try{
    const pl=await dynmapGetPlayers(s);
    const lp=pl.map(p=>p.name);
    const on=wl.filter(p=>lp.map(x=>x.toLowerCase()).includes(p.toLowerCase()));
    const off=wl.filter(p=>!lp.map(x=>x.toLowerCase()).includes(p.toLowerCase()));
    on.forEach(p=>{if(typeof setLastSeen==='function')setLastSeen(p,s);if(typeof loadSessionDurations==='function')loadSessionDurations(p);});
    el.innerHTML=[...on.map(p=>{
      const pred=typeof predictDecoTime==='function'?predictDecoTime(p):null;
      return`<div class="wi" onclick="openPlayerPanel&&openPlayerPanel('${p}')"><img src="https://skins.nationsglory.fr/face/${encodeURIComponent(p)}/32" style="width:28px;height:28px;border-radius:4px;border:1px solid var(--b2);image-rendering:pixelated;flex-shrink:0" onerror="this.style.display='none'" alt=""><span style="font-family:var(--M);font-size:.62rem">${p}</span><div class="wis on"><div class="led on" style="width:5px;height:5px;flex-shrink:0"></div>EN LIGNE</div><span class="session-timer" data-player="${p}">${typeof getSessionTime==='function'?getSessionTime(p)||'':''}</span>${pred?`<span class="pred-badge ${pred.cls}">⏳ ${pred.text}</span>`:''}</div>`;
    }),...off.map(p=>{
      const seen=typeof getLastSeenText==='function'?getLastSeenText(p):null;
      return`<div class="wi" onclick="openPlayerPanel&&openPlayerPanel('${p}')"><img src="https://skins.nationsglory.fr/face/${encodeURIComponent(p)}/32" style="width:28px;height:28px;border-radius:4px;border:1px solid var(--b2);image-rendering:pixelated;flex-shrink:0;opacity:.35" onerror="this.style.display='none'" alt=""><span style="font-family:var(--M);font-size:.62rem;opacity:.4">${p}</span><div class="wis off">${seen?`<span class="wi-seen ${seen.cls}">${seen.text}</span>`:'◯ Hors ligne'}</div></div>`;
    })].join('');
  }catch(e){el.innerHTML=`<div class="empty" style="color:var(--red)">Erreur dynmap : ${e.message}</div>`;}
}

async function loadHistorySection(player,containerId,periodBtnId,curDays){
  const wrap=document.getElementById(containerId);
  if(!wrap)return;
  wrap.innerHTML=`<div style="font-family:var(--M);font-size:.5rem;color:var(--t3)">Historique disponible sur le profil NationsGlory.<br><a href="https://nationsglory.fr/profile/${encodeURIComponent(player)}" target="_blank" style="color:var(--blue-pale)">↗ Voir le profil</a></div>`;
}

async function loadStats(){
  const raw=$('st-input').value.trim();if(!raw)return;
  const p=rP(raw,oP);$('st-input').value=p;
  const res=$('st-result');
  res.innerHTML=ld();
  const skinUrl=`https://skins.nationsglory.fr/face/${encodeURIComponent(p)}/64`;
  const profileUrl=`https://nationsglory.fr/profile/${encodeURIComponent(p)}`;

  try{
    // Localisation dynmap
    let foundSrv=null;
    const allChecks=await Promise.all(Object.keys(DYNMAP_BASES).map(async srv=>{
      const players=await dynmapGetPlayers(srv);
      const found=players.find(pl=>pl.name.toLowerCase()===p.toLowerCase());
      return found?{srv,player:found}:null;
    }));
    const match=allChecks.find(r=>r!==null);
    if(match) foundSrv=match.srv;

    const online=!!foundSrv;
    res.innerHTML=`
    <div class="panel mb">
      <div style="display:flex;align-items:center;gap:.8rem;margin-bottom:.6rem">
        <img src="${skinUrl}" style="width:52px;height:52px;border-radius:6px;border:1px solid var(--b2);image-rendering:pixelated" onerror="this.style.display='none'" alt="">
        <div>
          <div style="font-family:var(--D);font-size:1.1rem;letter-spacing:.1em">${p}</div>
          <div class="pp-status ${online?'on':'off'}" style="margin-top:.3rem">
            <div class="led ${online?'on':'off'}" style="width:5px;height:5px;flex-shrink:0"></div>
            ${online?`${EMO[foundSrv]||''} <span style="color:var(--grn)">${foundSrv.toUpperCase()}</span>`:'Hors ligne'}
          </div>
        </div>
      </div>
      <a class="pp-ng-link" href="${profileUrl}" target="_blank" rel="noopener">↗ Voir le profil complet sur NationsGlory</a>
      <div style="font-family:var(--M);font-size:.5rem;color:var(--t3);margin-top:.5rem">
        Les statistiques détaillées (grades, historique, plages horaires) sont disponibles sur le profil NationsGlory.
      </div>
    </div>`;
  }catch(e){
    res.innerHTML=`<div class="res err">Erreur : ${e.message}</div>`;
  }
}

async function loadDashActivityChart(){
  const canvas=document.getElementById('activity-graph');
  if(!canvas)return;
  try{
    const d=await api(`/api/activity?hours=${_dashPeriod}`);
    const pts=d.points||[];
    if(!pts.length){
      canvas.style.display='none';
      const em=$('dash-act-empty');if(em){em.style.display='flex';}
      return;
    }
    canvas.style.display='block';
    const em=$('dash-act-empty');if(em)em.style.display='none';

    const labels=pts.map(p=>{
      const dt=new Date(p.ts);
      return _dashPeriod<=24
        ?dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})
        :dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})+'  '+dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    });

    const datasets=SRV.map(s=>({
      label:s.toUpperCase(),
      data:pts.map(p=>p.data[s]||0),
      borderColor:ACT_COLORS[s]||'#ffffff',
      backgroundColor:(ACT_COLORS[s]||'#ffffff')+'18',
      borderWidth:1.6,
      pointRadius:0,
      pointHoverRadius:4,
      tension:0.3,
      fill:false,
    }));

    if(_dashChart){_dashChart.destroy();_dashChart=null;}
    _dashChart=new Chart(canvas,{
      type:'line',
      data:{labels,datasets},
      options:{
        responsive:true,
        maintainAspectRatio:false,
        interaction:{mode:'index',intersect:false},
        plugins:{
          legend:{
            position:'right',
            labels:{
              color:'rgba(255,255,255,.55)',
              font:{family:'monospace',size:9},
              boxWidth:14,
              padding:8,
            }
          },
          tooltip:{
            backgroundColor:'rgba(1,10,26,.92)',
            borderColor:'rgba(91,163,255,.2)',
            borderWidth:1,
            titleColor:'rgba(255,255,255,.6)',
            bodyColor:'rgba(255,255,255,.85)',
            titleFont:{family:'monospace',size:9},
            bodyFont:{family:'monospace',size:9},
            itemSort:(a,b)=>b.parsed.y-a.parsed.y,
          }
        },
        scales:{
          x:{
            ticks:{color:'rgba(255,255,255,.3)',font:{family:'monospace',size:8},maxRotation:0,maxTicksLimit:8},
            grid:{color:'rgba(255,255,255,.04)'},
            border:{color:'rgba(255,255,255,.08)'}
          },
          y:{
            ticks:{color:'rgba(255,255,255,.3)',font:{family:'monospace',size:8}},
            grid:{color:'rgba(255,255,255,.04)'},
            border:{color:'rgba(255,255,255,.08)'},
            min:0,
          }
        }
      }
    });
  }catch(e){console.warn('activity chart:',e);}
}

function setDashPeriod(btn){
  document.querySelectorAll('.dash-period').forEach(b=>b.classList.remove('dash-period-active'));
  btn.classList.add('dash-period-active');
  _dashPeriod=parseInt(btn.dataset.h);
  loadDashActivityChart();
}

function drawActivityGraph(){loadDashActivityChart();}

// ── SSE — events temps réel ──────────────────────────────────────
let _sseSource=null,_sseRetry=0;
function _connectSSE(){
  // SSE désactivé
}


let cdTotal=5,cdLeft=5;
function startCountdown(total=5){cdTotal=total;cdLeft=total;updateCountdown();}
function updateCountdown(){
  const txt=document.getElementById('cd-txt'),fill=document.getElementById('cd-fill');
  if(txt)txt.textContent=cdLeft+'s';
  if(fill)fill.style.width=(cdLeft/cdTotal*100)+'%';
}
function tickCountdown(){cdLeft=Math.max(0,cdLeft-1);updateCountdown();}

const lastSeen={};
function setLastSeen(player,server){lastSeen[player]={ts:Date.now(),server};}
function getLastSeenText(player){
  const s=lastSeen[player];if(!s)return null;
  const sec=Math.floor((Date.now()-s.ts)/1000);
  if(sec<60)return{text:`vu il y a ${sec}s`,cls:'fresh'};
  if(sec<3600)return{text:`vu il y a ${Math.floor(sec/60)}min`,cls:'recent'};
  return{text:`vu il y a ${Math.floor(sec/3600)}h`,cls:''};
}

let notifGranted=false;
async function requestNotifPerms(){
  if(!('Notification' in window))return;
  if(Notification.permission==='granted'){notifGranted=true;return;}
  if(Notification.permission!=='denied'){const p=await Notification.requestPermission();notifGranted=p==='granted';}
}
function sendBrowserNotif(type,player,server){
  if(!notifGranted||document.visibilityState==='visible')return;
  const icon='https://nationsglory.fr/favicon.ico';
  const title=type==='connect'?`🟢 ${player} connecté`:`🔴 ${player} déconnecté`;
  const body=`Serveur : ${server.toUpperCase()} · ${new Date().toLocaleTimeString('fr-FR')}`;
  try{const n=new Notification(title,{body,icon,silent:false});n.onclick=()=>{window.focus();n.close();};}catch(e){}
}

let ppOpen=false;
async function openPlayerPanel(player){
  const panel=document.getElementById('player-panel');
  const overlay=document.getElementById('pp-overlay');
  const nameEl=document.getElementById('pp-name');
  const body=document.getElementById('pp-body');
  if(!panel||!body)return;
  nameEl.textContent=player;
  body.innerHTML=`<div class="pp-loading">◌ Chargement du profil...</div>`;
  panel.classList.add('open');
  if(overlay)overlay.classList.add('open');
  document.body.style.overflow='hidden';
  ppOpen=true;

  const skinUrl=`https://skins.nationsglory.fr/face/${encodeURIComponent(player)}/64`;
  const profileUrl=`https://nationsglory.fr/profile/${encodeURIComponent(player)}`;

  // Chercher le joueur sur tous les serveurs via Dynmap
  let foundSrv=null, foundPos=null;
  try{
    const allChecks=await Promise.all(Object.keys(DYNMAP_BASES).map(async srv=>{
      const players=await dynmapGetPlayers(srv);
      const found=players.find(p=>p.name.toLowerCase()===player.toLowerCase());
      return found?{srv,player:found}:null;
    }));
    const match=allChecks.find(r=>r!==null);
    if(match){foundSrv=match.srv;foundPos=match.player;}
  }catch(e){}

  const online=!!foundSrv;
  const seen=typeof getLastSeenText==='function'?getLastSeenText(player):null;

  let h='';
  // Avatar + statut
  h+=`<div class="pp-info-row">
    <div class="pp-avatar"><img src="${skinUrl}" onerror="this.src='https://mc-heads.net/avatar/${encodeURIComponent(player)}/64'" alt=""></div>
    <div class="pp-info-meta">
      <div class="pp-meta-line">${WL&&WL.includes(player)?'🎯 Dans la watchlist LIME':''}${WLM&&WLM.includes(player)?' 🟤 Dans la watchlist MOCHA':''}</div>
      <div class="pp-status ${online?'on':'off'}">
        <div class="led ${online?'on':'off'}" style="width:5px;height:5px;flex-shrink:0"></div>
        ${online?`${EMO[foundSrv]||''} <span style="color:var(--grn);font-weight:bold">${foundSrv.toUpperCase()}</span>`:'Hors ligne'}
      </div>
      ${foundPos&&foundPos.x?`<div class="pp-meta-line" style="font-size:.5rem;margin-top:.2rem">📍 X=${Math.round(foundPos.x)} Y=${Math.round(foundPos.y)} Z=${Math.round(foundPos.z)}</div>`:''}
      ${seen?`<div class="pp-meta-line" style="margin-top:.28rem">${seen.text}</div>`:''}
    </div>
  </div>`;

  // Statut par serveur
  h+=`<div style="margin:.5rem 0 .6rem;display:flex;flex-direction:column;gap:.2rem">`;
  (SRV||Object.keys(DYNMAP_BASES)).forEach(s=>{
    const isOnline=online&&foundSrv===s;
    h+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:.22rem .5rem;border-radius:4px;background:${isOnline?'rgba(0,232,122,.05)':''};border:1px solid ${isOnline?'rgba(0,232,122,.15)':'transparent'}">
      <span style="font-family:var(--M);font-size:.58rem;color:${isOnline?'var(--grn)':'var(--t3)'}">${EMO[s]||''} ${s.toUpperCase()}${isOnline?' <span style="font-size:.44rem">●</span>':''}</span>
    </div>`;
  });
  h+=`</div>`;

  h+=`<a class="pp-ng-link" href="${profileUrl}" target="_blank" rel="noopener">↗ Profil NationsGlory</a>`;

  // Section historique de connexion (local uniquement)
  const _ppHistId='pp-hist-grid-'+player.replace(/[^a-z0-9]/gi,'_');
  h+=`<div class="pp-section"><div class="pp-sec-title">🕐 Historique de connexion</div>
  <div style="display:flex;gap:.3rem;flex-wrap:wrap;margin:.3rem 0 .5rem">
    ${[1,2,7,15,30].map(d=>`<button class="btn pp-hist-btn" data-d="${d}" onclick="ppHistSwitch&&ppHistSwitch(this,'${encodeURIComponent(player)}','${_ppHistId}')" style="font-size:.46rem;padding:.12rem .45rem${d===7?';background:rgba(0,56,184,.25);border-color:rgba(26,111,255,.5)':''}">${d===1?'1j':d===2?'2j':d===7?'7j':d===15?'15j':'30j'}</button>`).join('')}
  </div>
  <div id="${_ppHistId}"><div style="font-family:var(--M);font-size:.5rem;color:var(--t3)">Historique non disponible (source dynmap uniquement)</div></div></div>`;

  body.innerHTML=h;
}

function closePlayerPanel(){
  document.getElementById('player-panel').classList.remove('open');
  document.getElementById('pp-overlay').classList.remove('open');
  document.body.style.overflow='';ppOpen=false;
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ppOpen)closePlayerPanel();});

(()=>{
  const c=document.getElementById('matrix-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  const resize=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};
  resize();window.addEventListener('resize',resize);
  const chars='アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF◈⊕◉◎';
  const fs=14;let cols=Math.floor(c.width/fs);
  let drops=Array(cols).fill(1);
  const draw=()=>{
    ctx.fillStyle='rgba(1,4,8,.08)';ctx.fillRect(0,0,c.width,c.height);
    cols=Math.floor(c.width/fs);if(drops.length!==cols)drops=Array(cols).fill(1);
    ctx.font=fs+'px JetBrains Mono,monospace';
    drops.forEach((y,i)=>{
      const ch=chars[Math.floor(Math.random()*chars.length)];
      const bright=Math.random()>.92;
      ctx.fillStyle=bright?'#4d9fff':`rgba(0,80,216,${Math.random()*.6+.15})`;
      ctx.fillText(ch,i*fs,y*fs);
      if(y*fs>c.height&&Math.random()>.975)drops[i]=0;
      drops[i]++;
    });
  };
  const interval=setInterval(draw,45);
  const obs=new MutationObserver(()=>{
    const ldr=document.getElementById('ldr');
    if(ldr&&ldr.style.display==='none'){clearInterval(interval);obs.disconnect();}
  });
  const ldr=document.getElementById('ldr');
  if(ldr)obs.observe(ldr,{attributes:true,attributeFilter:['style']});
})();

function updateWeather(onlineCount){
  const icon=document.getElementById('weather-icon');
  const label=document.getElementById('weather-label');
  if(!icon||!label)return;
  const wl=WL.length+WLM.length;
  const ratio=wl>0?onlineCount/wl:0;
  let ic,lb,cls;
  if(onlineCount===0){ic='🌙';lb='CALME';cls='calm';}
  else if(ratio<.3){ic='🌤';lb='ACTIVITÉ';cls='active';}
  else if(ratio<.6){ic='⚡';lb='AGITÉ';cls='hot';}
  else{ic='🔥';lb='CRITIQUE';cls='critical';}
  if(icon.textContent!==ic){icon.style.transform='scale(1.4)';icon.textContent=ic;setTimeout(()=>icon.style.transform='',300);}
  label.textContent=lb;
  label.className='weather-label '+cls;
}

const sessionStart={};
function startSession(player){if(!sessionStart[player])sessionStart[player]=Date.now();}
function getSessionTime(player){
  if(!sessionStart[player])return null;
  const sec=Math.floor((Date.now()-sessionStart[player])/1000);
  if(sec<60)return sec+'s';
  if(sec<3600)return Math.floor(sec/60)+'min '+String(sec%60).padStart(2,'0')+'s';
  return Math.floor(sec/3600)+'h '+String(Math.floor(sec%3600/60)).padStart(2,'0')+'min';
}
setInterval(()=>{
  document.querySelectorAll('.session-timer[data-player]').forEach(el=>{
    const t=getSessionTime(el.dataset.player);
    if(t)el.textContent=t;
  });
},1000);

function predictDecoTime(player){
  const s=sessionStart[player];
  if(!s)return null;
  const elapsed=Math.floor((Date.now()-s)/1000/60);
  const durs=sessionDurations[player]||[];
  if(durs.length<2)return null;
  const avg=durs.reduce((a,b)=>a+b,0)/durs.length;
  const remaining=Math.round(avg-elapsed);
  if(remaining<=0)return{text:'déco imminente',cls:'verysoon'};
  if(remaining<=10)return{text:`~${remaining}min restantes`,cls:'verysoon'};
  if(remaining<=30)return{text:`~${remaining}min restantes`,cls:'soon'};
  return{text:`~${remaining}min restantes`,cls:''};
}

const sessionDurations={};
function endSession(player){
  if(sessionStart[player]){
    const dur=Math.floor((Date.now()-sessionStart[player])/1000/60);
    if(dur>1){
      if(!sessionDurations[player])sessionDurations[player]=[];
      sessionDurations[player].push(dur);
      if(sessionDurations[player].length>10)sessionDurations[player].shift();
    }
  }
  delete sessionStart[player];
}

async function loadSessionDurations(player){
  try{
    const d=null; // plages non disponibles sans backend
    if(!d||!d.heatmap)return;
    const hm=d.heatmap;
    let totalSessions=0,totalDur=0;
    hm.forEach(dayRow=>{
      let streak=0,maxStreak=0;
      dayRow.forEach(v=>{if(v>0){streak++;maxStreak=Math.max(maxStreak,streak);}else{streak=0;}});
      if(maxStreak>0){totalSessions++;totalDur+=maxStreak*60;}
    });
    if(totalSessions>0&&!sessionDurations[player]?.length){
      const avgMin=Math.round(totalDur/totalSessions);
      sessionDurations[player]=[avgMin,avgMin];
    }
  }catch(e){}
}

let cwWatches=[];
let cwCountries={};

async function cwSave(){localStorage.setItem('mg_cw',JSON.stringify(cwWatches));}

async function cwLoadCountries(){
  const s=$('cw-srv').value;if(!s)return;
  $('cw-suggest').innerHTML=`<span style="font-family:var(--M);font-size:.5rem;color:var(--t3)">Chargement...</span>`;
  try{
    cwCountries[s]=await getCountries(s);
    cwFilterCountries();
  }catch{$('cw-suggest').innerHTML='';}
}

function cwFilterCountries(){
  const s=$('cw-srv').value,v=$('cw-country').value.trim().toLowerCase();
  const p=cwCountries[s]||[];
  const f=v?p.filter(x=>x.toLowerCase().includes(v)):p;
  $('cw-suggest').innerHTML=f.slice(0,60).map(x=>`<span class="tag" onclick="$('cw-country').value='${x.replace(/'/g,"\'")}';$('cw-acl').style.display='none';cwFilterCountries()">${x}</span>`).join('');
  const acl=$('cw-acl');
  if(v&&f.length){
    acl.innerHTML=f.slice(0,8).map(x=>`<div class="aci" onmousedown="$('cw-country').value='${x.replace(/'/g,"\'")}';acl.style.display='none'">${x}</div>`).join('');
    acl.style.display='block';
  }else acl.style.display='none';
}

function cwAdd(){
  const s=$('cw-srv').value,country=$('cw-country').value.trim();
  if(!s||!country)return showToast('Sélectionne un serveur et un pays');
  const exists=cwWatches.find(w=>w.server===s&&w.country.toLowerCase()===country.toLowerCase());
  if(exists)return showToast('Déjà surveillé !');
  cwWatches.push({server:s,country,threshold:2,online:0,members:[],alertFired:false});
  cwSave();cwRender();cwRefreshAll();
  $('cw-country').value='';
  showToast(`${country} (${s.toUpperCase()}) ajouté`);
}

async function cwRemove(idx){
  const w=cwWatches[idx];if(!w)return;
  cwWatches=cwWatches.filter(x=>!(x.server===w.server&&x.country===w.country));localStorage.setItem('mg_cw',JSON.stringify(cwWatches));
  cwWatches.splice(idx,1);cwSave();cwRender();
  showToast('Surveillance supprimée');
}

async function cwRefreshOne(idx){
  const w=cwWatches[idx];if(!w)return;
  try{
    const d=await api(`/api/check/${w.server}/${encodeURIComponent(w.country)}`);
    const members=d.servers?.[w.server]||[];
    const online=members.length;
    const wasAlert=w.alertFired;
    w.online=online;w.members=members;w.hasNonRecruit=false;w.alertFired=false;w.leader=d.leader||'';
    if(online>=2){const _nr=await hasNonRecruit(members,w.server);w.hasNonRecruit=_nr;w.alertFired=_nr;}
    if(w.alertFired&&!wasAlert){
      showPop('connect',`⚔ ${w.country}`,`${online} membres · assaut possible · ${w.server.toUpperCase()}`);
      sendBrowserNotif('connect',`🚨 Assaut possible sur ${w.country} — ${online} membres connectés`,w.server);
      sndA(true);
      showToast(`🚨 ASSAUT POSSIBLE — ${w.country} · ${online} membres sur ${w.server.toUpperCase()}`);
    }
    cwSave();
  }catch(e){w.online=-1;}
  cwRender();
}

async function cwRefreshAll(){await Promise.all(cwWatches.map((_,i)=>cwRefreshOne(i)));}

function cwRender(){
  const el=$('cw-list');if(!el)return;
  if(!cwWatches.length){el.innerHTML='<div class="cw-empty">Aucun pays surveillé — ajoutez-en un ci-dessus</div>';return;}
  el.innerHTML=cwWatches.map((w,i)=>{
    const alert=w.alertFired;const recruitOnly=w.online>=2&&!w.hasNonRecruit&&!alert;
    const cnt=w.online<0?'?':w.online;
    return`<div class="cw-item ${alert?'alert':recruitOnly?'recruit-only':''}" style="margin-bottom:.5rem">
      <div class="cw-count ${alert?'danger':''}">${cnt}</div>
      <div class="cw-info">
        <div class="cw-name">${w.country}</div>${w.leader?`<div style="display:flex;align-items:center;gap:.4rem;margin-top:.2rem;font-family:var(--M);font-size:.52rem;color:var(--t3)"><img src="https://skins.nationsglory.fr/face/${w.leader}/16" style="width:16px;height:16px;border-radius:2px;image-rendering:pixelated" onerror="this.style.display='none'"> 👑 ${w.leader}</div>`:''}
        <div class="cw-meta">${EMO[w.server]||''} ${w.server.toUpperCase()} · assaut possible si ≥ 2 connectés</div>
        ${w.members.length?`<div class="cw-members">${w.members.slice(0,8).map(p=>{const k=p+'@'+w.server;const g=gradeCache[k]?.rank||'?';const col=g&&g!=='recruit'&&g!=='?'?'var(--grn)':g==='recruit'?'var(--red)':'var(--t3)';return`<span style="color:${col}">${p} <span style="font-size:.4rem;opacity:.7">[${g}]</span></span>`;}).join(', ')}${w.members.length>8?` <span style="color:var(--t3)">+${w.members.length-8}</span>`:''}</div>`:''}
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.35rem">
        <span class="cw-status ${alert?'':'ok'}">${alert?'🚨 ASSAUT POSSIBLE':'◯ PAS ASSEZ'}</span>
        <button class="btn btn-r" style="padding:.08rem .35rem;font-size:.46rem" onclick="cwRemove(${i})">✕</button>
      </div>
    </div>`;
  }).join('');
}

setInterval(cwRefreshAll, 30000);

const gradeCache={};
async function getPlayerGrade(player,server){
  return null; // grades: endpoint backend indisponible
}
async function hasNonRecruit(members,server){
  const results=await Promise.allSettled(members.slice(0,12).map(p=>getPlayerGrade(p,server)));
  return results.some(r=>r.status==='fulfilled'&&r.value&&r.value!==''&&r.value!=='recruit');
}

async function init(){
  const b=$('sound-btn');if(b&&!snd){b.textContent='🔇 SON';b.style.color='var(--t3)';}
  if(sessionStorage.getItem('mg_token_v3')){if(typeof requestNotifPerms==='function')requestNotifPerms();}
  cwWatches=JSON.parse(localStorage.getItem('mg_cw')||'[]');cwRender();
  rHist();const ok=await chkAPI();$('scan-led').className=ok?'led on':'led off';
  if(ok){
    await loadWL();await loadWLM();loadKP();await loadDash();
    startCountdown(5);
    loadDashActivityChart();
    setInterval(tickCountdown,1000);
    setInterval(async()=>{await loadWL();await loadDash();},5000);
    _connectSSE();
  }
}
init();

function rmCalc() {
  const power   = parseFloat(document.getElementById('rm-power')?.value)   || 0;
  let   warzone = parseFloat(document.getElementById('rm-warzone')?.value)  || 0;
  const claims  = parseFloat(document.getElementById('rm-claims')?.value)   || 0;

  if (power <= 0) {
    showToast('⚠ Entre un power total valide');
    return;
  }

  if (warzone > power) warzone = power;

  const factor      = Math.pow(0.96, 18);
  const soumis      = power - warzone;
  const powerAfter  = Math.round(soumis * factor);
  const powerLost   = power - powerAfter;          
  const claimsAfter = Math.max(0, claims - 8);

  const results = document.getElementById('rm-results');
  if (results) results.style.display = 'block';

  const elLost   = document.getElementById('rm-lost');
  const elRemain = document.getElementById('rm-remain');
  const elClaims = document.getElementById('rm-claims-out');
  const elAlert  = document.getElementById('rm-alert');

  if (elLost)   { elLost.textContent   = powerLost.toLocaleString('fr-FR');   elLost.style.animation='none'; setTimeout(()=>{elLost.style.animation='bump .35s cubic-bezier(.34,1.56,.64,1)';},10); }
  if (elRemain) { elRemain.textContent = powerAfter.toLocaleString('fr-FR');  elRemain.style.animation='none'; setTimeout(()=>{elRemain.style.animation='bump .35s cubic-bezier(.34,1.56,.64,1)';},10); }
  if (elClaims) { elClaims.textContent = claimsAfter.toLocaleString('fr-FR'); elClaims.style.animation='none'; setTimeout(()=>{elClaims.style.animation='bump .35s cubic-bezier(.34,1.56,.64,1)';},10); }

  if (elAlert) {
    elAlert.style.display = 'block';
    const diff = powerAfter - claimsAfter;
    const isSafe = powerAfter >= claimsAfter;

    if (isSafe) {
      elAlert.style.background = 'rgba(0,240,122,.06)';
      elAlert.style.border     = '1px solid rgba(0,240,122,.25)';
      elAlert.style.color      = '#00f07a';
      elAlert.innerHTML = `
        ✅ &nbsp;<strong>SAFE</strong> — Le pays survit au Red Matter<br>
        <span style="opacity:.7">Power restant : <strong>${powerAfter.toLocaleString('fr-FR')}</strong> · Claims restants : <strong>${claimsAfter.toLocaleString('fr-FR')}</strong> · Avance : <strong>+${diff.toLocaleString('fr-FR')}</strong> power</span>
      `;
    } else {
      elAlert.style.background = 'rgba(255,24,64,.06)';
      elAlert.style.border     = '1px solid rgba(255,24,64,.25)';
      elAlert.style.color      = '#ff1840';
      const manquant = Math.abs(diff);
      elAlert.innerHTML = `
        ☢ &nbsp;<strong>SOUS-POWER</strong> — Le pays sera en sous-power !<br>
        <span style="opacity:.7">Power restant : <strong>${powerAfter.toLocaleString('fr-FR')}</strong> · Claims restants : <strong>${claimsAfter.toLocaleString('fr-FR')}</strong> · Il manque : <strong>${manquant.toLocaleString('fr-FR')}</strong> power</span>
      `;
    }
  }

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.setValueAtTime(80, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.4);
  } catch(e) {}
}





setInterval(()=>{
  const active=document.querySelector('.sec.active');
  if(!active)return;
},30000);


let refAllReferents=[],refAllStats=[],refCurSrv=null,refCurCtry=null,refCmpPeriod=90;
const refCountryCache={};

async function refLoadCountries(){
  const s=$('ref-add-srv').value;
  if(!s){$('ref-suggest').innerHTML='';return;}
  $('ref-suggest').innerHTML=`<span style="font-family:var(--M);font-size:.5rem;color:var(--t3)">Chargement...</span>`;
  try{
    refCountryCache[s]=await getCountries(s);
    refFilterCountries();
  }catch(e){$('ref-suggest').innerHTML='';}
}

function refFilterCountries(){
  const s=$('ref-add-srv').value,v=$('ref-add-country').value.trim().toLowerCase();
  const p=refCountryCache[s]||[];
  const f=v?p.filter(x=>x.toLowerCase().includes(v)):p;
  $('ref-suggest').innerHTML=f.slice(0,60).map(x=>`<span class="tag" onclick="refSelectTag('${x.replace(/'/g,"\\'")}')">${x}</span>`).join('');
  const acl=$('ref-add-acl');
  if(v&&f.length){acl.innerHTML=f.slice(0,8).map(x=>`<div class="aci" onmousedown="refSelectTag('${x.replace(/'/g,"\\'")}')">${x}</div>`).join('');acl.style.display='block';}
  else acl.style.display='none';
}

function refSelectTag(name){$('ref-add-country').value=name;$('ref-add-acl').style.display='none';refFilterCountries();}

async function loadReferents(){
  try{
    const stored=JSON.parse(localStorage.getItem('bs_referents')||'[]');
    const el=document.getElementById('ref-list');
    if(el) el.innerHTML=stored.length
      ? stored.map(r=>`<div class="wi">${r.country} — ${r.server.toUpperCase()}</div>`).join('')
      : '<div class="empty">Aucun référent enregistré</div>';
  }catch(e){}
}

async function openRefMembers(server,country){
  refCurSrv=server;refCurCtry=country;
  const ref=refAllReferents.find(w=>w.server===server&&w.country.toLowerCase()===country.toLowerCase());
  $('ref-mp-title').textContent=(ref?.name||country).toUpperCase();
  $('ref-mp-sub').textContent=server.toUpperCase()+' · '+(ref?.member_count||'?')+' membres';
  $('ref-members-panel').style.display='block';
  $('ref-members-panel').scrollIntoView({behavior:'smooth',block:'start'});
  renderRefGrid();
  await refRefreshMembers();
}

async function refRefreshMembers(){
  const el=document.getElementById('ref-members');
  if(!el||!refCurSrv||!refCurCtry)return;
  el.innerHTML=ld();
  try{
    const players=await dynmapGetPlayers(refCurSrv);
    el.innerHTML=players.length
      ? `<div style="font-family:var(--M);font-size:.55rem;color:var(--t3);margin-bottom:.4rem">${players.length} joueurs en ligne sur ${refCurSrv.toUpperCase()}</div>`
        + players.map(p=>`<span class="tag" onclick="openPlayerPanel&&openPlayerPanel('${p.name}')">${p.name}</span>`).join('')
      : `<div class="empty">Aucun joueur sur ${refCurSrv.toUpperCase()}</div>`;
  }catch(e){el.innerHTML=`<div class="empty" style="color:var(--red)">Erreur : ${e.message}</div>`;}
}

async function loadRefHistory(){
  const el=document.getElementById('ref-history');
  if(el) el.innerHTML='<div class="empty">Historique non disponible (backend requis)</div>';
}

async function loadRefCmp(){
  const el=document.getElementById('ref-cmp');
  if(el) el.innerHTML='<div class="empty">Comparaison non disponible (backend requis)</div>';
}

async function addReferentEntry(server,country){
  const stored=JSON.parse(localStorage.getItem('bs_referents')||'[]');
  if(!stored.find(r=>r.server===server&&r.country===country)){
    stored.push({server,country});
    localStorage.setItem('bs_referents',JSON.stringify(stored));
    if(typeof showToast==='function') showToast(`${country} ajouté`);
    loadReferents();
  }
}

async function removeReferentEntry(server,country){
  let stored=JSON.parse(localStorage.getItem('bs_referents')||'[]');
  stored=stored.filter(r=>!(r.server===server&&r.country===country));
  localStorage.setItem('bs_referents',JSON.stringify(stored));
  if(typeof showToast==='function') showToast(`${country} retiré`);
  loadReferents();
}

async function _fetchDimClaims(server,dim){
  try{
    const dimUrl=`${API}/api/dim_markers/${server}/${encodeURIComponent(dim)}`;
    const r=await fetch(dimUrl,{headers:{..._authHeader()}});
    if(!r.ok){console.warn('[dimClaims] HTTP',r.status,dimUrl);return{};}
    const areas=await r.json();
    // Si le backend retourne une erreur JSON, areas sera {error:...}
    if(!areas||typeof areas!=='object'||areas.error)return{};
    const map={};
    for(const[k,v]of Object.entries(areas)){
      const label=v.label||'';
      if(!label)continue;
      const name=label.toLowerCase();
      const xs=v.x||[];const zs=v.z||[];
      if(xs.length<3)continue;
      const claims=Math.round(_polyArea(xs,zs)/256);
      if(claims===0)continue;
      const cx=xs.reduce((a,b)=>a+b,0)/xs.length;
      const cz=zs.reduce((a,b)=>a+b,0)/zs.length;
      if(map[name]){
        map[name].claims+=claims;
      } else {
        map[name]={claims,x:Math.round(cx),z:Math.round(cz)};
      }
    }
    return map;
  }catch(e){console.error('[dimClaims] erreur fetch',dimUrl,e);return{};}
}

async function loadSouspower(){
  const s=$('sp-srv').value;
  if(!s){alert('Choisis un serveur');return;}
  const res=$('sp-result'),ts=$('sp-ts');
  res.innerHTML=ld();ts.textContent='';
  try{
    // Fetch main souspower data + all 3 dimension markers in parallel
    const [d, dimLune, dimMars, dimEdora] = await Promise.all([
      api(`/api/souspower/${s}`),
      _fetchDimClaims(s,'DIM-28'),
      _fetchDimClaims(s,'DIM-29'),
      _fetchDimClaims(s,'DIM-31'),
    ]);
    const pays=d.countries||[];
    if(!pays.length){res.innerHTML='<div class="empty">Aucun pays trouvé</div>';return;}
    const sp=pays.filter(p=>p.marge<0);
    const proche=pays.filter(p=>p.marge>=0&&p.marge<200);
    const safe=pays.filter(p=>p.marge>=200);

    // Helper to build a dim claims chip
    const dimChip=(dimData, dimWorldname, dimLabel, dimColor)=>{
      const key=dimData; // already the entry {claims,x,z} or null
      if(!key){
        return`<span style="font-family:var(--M);font-size:.5rem;color:var(--t4);border:1px solid var(--b1);border-radius:3px;padding:.1rem .4rem;white-space:nowrap">${dimLabel} <span style="opacity:.5">aucun claim</span></span>`;
      }
      const url=`https://${s}.nationsglory.fr/?worldname=${dimWorldname}&mapname=flat&zoom=4&x=${key.x}&y=64&z=${key.z}`;
      return`<a href="${url}" target="_blank" rel="noopener"
          title="Voir ${dimLabel} sur la Dynmap"
          style="display:inline-flex;align-items:center;gap:.3rem;font-family:var(--M);font-size:.5rem;
            color:${dimColor};text-decoration:none;border:1px solid ${dimColor}33;
            border-radius:3px;padding:.1rem .45rem;background:${dimColor}11;
            transition:all .15s;white-space:nowrap"
          onmouseover="this.style.background='${dimColor}22';this.style.borderColor='${dimColor}66'"
          onmouseout="this.style.background='${dimColor}11';this.style.borderColor='${dimColor}33'">
          ${dimLabel} <b>${key.claims}</b> <span style="opacity:.6">↗</span>
        </a>`;
    };

    const row=(p,cat)=>{
      const pct=p.maxpower?Math.min(100,Math.round(p.power/p.maxpower*100)):0;
      const col=cat==='sp'?'var(--red)':cat==='proche'?'var(--org)':'var(--grn)';
      const badge=cat==='sp'?`<span style="background:rgba(255,60,60,.15);color:var(--red);border:1px solid rgba(255,60,60,.3);border-radius:4px;padding:.2rem .5rem;font-size:.55rem;margin-left:.6rem;font-weight:700">⛔ −${Math.abs(p.marge)}</span>`:
        cat==='proche'?`<span style="background:rgba(255,160,0,.12);color:var(--org);border:1px solid rgba(255,160,0,.25);border-radius:4px;padding:.2rem .5rem;font-size:.55rem;margin-left:.6rem">⚠ +${p.marge}</span>`:
        `<span style="color:var(--t3);font-size:.55rem;margin-left:.6rem">+${p.marge}</span>`;
      const hasCoord=(p.x||p.z);
      const dynmapUrl=`https://${s}.nationsglory.fr/?worldname=world&mapname=flat&zoom=4&x=${Math.round(p.x)}&y=64&z=${Math.round(p.z)}`;
      const coordBlock=hasCoord?`<a href="${dynmapUrl}" target="_blank" rel="noopener"
          title="Ouvrir sur la Dynmap"
          style="display:inline-flex;align-items:center;gap:.35rem;font-family:var(--M);font-size:.58rem;
            color:var(--blue-pale);text-decoration:none;border:1px solid rgba(91,163,255,.25);
            border-radius:4px;padding:.15rem .55rem;background:rgba(91,163,255,.07);
            transition:all .15s;white-space:nowrap"
          onmouseover="this.style.background='rgba(91,163,255,.18)';this.style.borderColor='rgba(91,163,255,.5)'"
          onmouseout="this.style.background='rgba(91,163,255,.07)';this.style.borderColor='rgba(91,163,255,.25)'">
          📍 ${Math.round(p.x)}, ${Math.round(p.z)} <span style="font-size:.5rem;opacity:.7">↗</span>
        </a>`:'';
      const leaderSkin=p.leader?`<img src="https://skins.nationsglory.fr/face/${p.leader}/32"
          alt="${p.leader}" title="${p.leader}"
          style="width:22px;height:22px;border-radius:3px;border:1px solid var(--b2);
            image-rendering:pixelated;flex-shrink:0;vertical-align:middle"
          onerror="this.style.display='none'">`:'';

      // Dimension claims lookup
      const nk=p.name.toLowerCase();
      const luneData=dimLune[nk]||null;
      const marsData=dimMars[nk]||null;
      const edoraData=dimEdora[nk]||null;
      const dimRow=`<div style="display:flex;align-items:center;gap:.5rem;margin-top:.45rem;flex-wrap:wrap">
          <span style="font-family:var(--M);font-size:.48rem;color:var(--t4);letter-spacing:.08em;white-space:nowrap">DIMS :</span>
          ${dimChip(luneData,'DIM-28','🌙 Lune','#c8aaff')}
          ${dimChip(marsData,'DIM-29','🔴 Mars','#ff7755')}
          ${dimChip(edoraData,'DIM-31','🟢 Edora','#44dd88')}
        </div>`;

      return`<div style="display:flex;align-items:center;gap:1rem;padding:.75rem 1rem;border-bottom:1px solid var(--b1);flex-wrap:wrap">
        <div style="min-width:160px;font-family:var(--D);font-size:1.05rem;color:var(--t1);display:flex;align-items:center">${p.name}${badge}</div>
        <div style="flex:1;min-width:200px">
          <div style="display:flex;gap:1.2rem;font-family:var(--M);font-size:.6rem;color:var(--t3);margin-bottom:.3rem;flex-wrap:wrap;align-items:center">
            <span>⚡ <b style="color:${col};font-size:.65rem">${p.power}</b><span style="color:var(--t3)">/${p.maxpower}</span></span>
            <span>🏴 <b style="color:var(--t1)">${p.claims}</b> claims</span>
            ${p.mmr?`<span>🏆 <b style="color:var(--t1)">${p.mmr}</b> MMR</span>`:''}
            <span>👥 <b style="color:var(--t1)">${p.members}</b> membres</span>
            ${p.leader?`<span style="display:inline-flex;align-items:center;gap:.3rem">${leaderSkin}👑 <b style="color:var(--t2)">${p.leader}</b></span>`:''}
          </div>
          <div style="background:var(--bg2);border-radius:4px;height:6px;overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${col};transition:width .4s"></div>
          </div>
          ${hasCoord?`<div style="margin-top:.4rem">${coordBlock}</div>`:''}
          ${dimRow}
        </div>
      </div>`;
    };
    const section=(title,list,cat,color)=>list.length?`
      <div style="font-family:var(--M);font-size:.6rem;color:${color};letter-spacing:.1em;padding:.7rem 1rem;border-bottom:1px solid var(--b1);background:rgba(0,0,0,.2);font-weight:700">${title} — ${list.length} pays</div>
      ${list.map(p=>row(p,cat)).join('')}
    `:'';
    res.innerHTML=`<div style="border:1px solid var(--b1);border-radius:var(--r);overflow:hidden">
      ${section('⛔ EN SOUS-POWER',sp,'sp','var(--red)')}
      ${section('⚠ PROCHES DU SOUS-POWER (marge < 200)',proche,'proche','var(--org)')}
      ${section('✅ SAFE',safe,'safe','var(--grn)')}
    </div>`;
    ts.textContent=`${pays.length} pays analysés — ${new Date().toLocaleTimeString('fr-FR')}`;
  }catch(e){res.innerHTML=`<div class="empty" style="color:var(--red)">Erreur : ${e.message}</div>`;}
}

// ══════════════════════ ACTIVITÉ GRAPHIQUE ══════════════════════
const ACT_COLORS={
  lime:'#00e87a',mocha:'#c68642',blue:'#5ba3ff',coral:'#ff4466',
  orange:'#ff9900',red:'#ff3355',yellow:'#ffd700',white:'#e0e0e0',
  jade:'#00c896',black:'#9e9e9e',cyan:'#00d4ff'
};
let actPeriod=24;
let actHiddenSrv=new Set();
let actData=null;
let actCanvas=null,actCtx=null;

function initActivity(){
  if(!actCanvas){
    actCanvas=$('act-canvas');
    actCtx=actCanvas.getContext('2d');
  }
  buildSrvFilters();
  loadActivity();
}

function buildSrvFilters(){
  const wrap=$('act-srv-filters');
  if(wrap.children.length)return;
  SRV.forEach(s=>{
    const btn=document.createElement('button');
    btn.className='btn act-srv-btn';
    btn.dataset.srv=s;
    btn.style.cssText=`border-color:${ACT_COLORS[s]||'var(--b2)'};color:${ACT_COLORS[s]||'var(--t2)'};font-size:.52rem;padding:.2rem .55rem`;
    btn.innerHTML=`${EMO[s]||''} ${s.toUpperCase()}`;
    btn.onclick=()=>toggleActSrv(s,btn);
    wrap.appendChild(btn);
  });
}

function toggleActSrv(s,btn){
  if(actHiddenSrv.has(s)){actHiddenSrv.delete(s);btn.style.opacity='1';}
  else{actHiddenSrv.add(s);btn.style.opacity='.35';}
  if(actData)renderActivityChart(actData);
}

function setPeriod(btn){
  document.querySelectorAll('.act-period').forEach(b=>b.classList.remove('act-period-active'));
  btn.classList.add('act-period-active');
  actPeriod=parseInt(btn.dataset.h);
  loadActivity();
}

async function loadActivity(){
  $('act-loading').style.display='flex';
  $('act-empty').style.display='none';
  try{
    const d=await api(`/api/activity?hours=${actPeriod}`);
    actData=d;
    if(!d.points||d.points.length===0){
      $('act-loading').style.display='none';
      $('act-empty').style.display='flex';
      return;
    }
    $('act-loading').style.display='none';
    renderActivityChart(d);
    renderActivityStats(d);
    if($('act-last-update'))$('act-last-update').textContent='Mis à jour '+new Date().toLocaleTimeString('fr-FR');
  }catch(e){
    $('act-loading').style.display='none';
    $('act-empty').style.display='flex';
    $('act-empty').textContent='Erreur : '+e.message;
  }
}

function renderActivityChart(d){
  const canvas=actCanvas,ctx=actCtx;
  const wrap=$('act-chart-wrap');
  const dpr=window.devicePixelRatio||1;
  canvas.width=wrap.clientWidth*dpr;
  canvas.height=340*dpr;
  ctx.scale(dpr,dpr);
  const W=wrap.clientWidth,H=340;
  ctx.clearRect(0,0,W,H);

  const pts=d.points;
  const srvs=SRV.filter(s=>!actHiddenSrv.has(s));
  const pad={t:20,r:20,b:40,l:45};
  const cW=W-pad.l-pad.r,cH=H-pad.t-pad.b;

  // Max Y
  let maxY=0;
  pts.forEach(p=>srvs.forEach(s=>{if((p.data[s]||0)>maxY)maxY=p.data[s]||0;}));
  maxY=Math.max(maxY+2,10);

  // Grille horizontale
  const steps=5;
  ctx.strokeStyle='rgba(255,255,255,.05)';
  ctx.lineWidth=1;
  ctx.fillStyle='rgba(255,255,255,.25)';
  ctx.font=`${10}px monospace`;
  ctx.textAlign='right';
  for(let i=0;i<=steps;i++){
    const y=pad.t+cH-(cH*i/steps);
    const val=Math.round(maxY*i/steps);
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+cW,y);ctx.stroke();
    ctx.fillText(val,pad.l-6,y+4);
  }

  // Axe X labels
  ctx.fillStyle='rgba(255,255,255,.25)';
  ctx.textAlign='center';
  ctx.font='9px monospace';
  const labelCount=Math.min(8,pts.length);
  const step=Math.floor(pts.length/labelCount)||1;
  for(let i=0;i<pts.length;i+=step){
    const x=pad.l+cW*(i/(pts.length-1||1));
    const dt=new Date(pts[i].ts);
    const lbl=actPeriod<=48
      ?dt.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})
      :dt.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'});
    ctx.fillText(lbl,x,H-pad.b+14);
  }

  // Courbes
  srvs.forEach(s=>{
    const color=ACT_COLORS[s]||'#ffffff';
    ctx.save();
    // Zone remplie (transparente)
    ctx.beginPath();
    pts.forEach((p,i)=>{
      const x=pad.l+cW*(i/(pts.length-1||1));
      const y=pad.t+cH-(cH*(p.data[s]||0)/maxY);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.lineTo(pad.l+cW,pad.t+cH);ctx.lineTo(pad.l,pad.t+cH);ctx.closePath();
    ctx.fillStyle=color.replace(')',',0.07)').replace('rgb','rgba').replace('#','')==color
      ?color+'18'
      :color+'18';
    // fallback propre
    ctx.globalAlpha=0.12;ctx.fillStyle=color;ctx.fill();ctx.globalAlpha=1;

    // Ligne
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=1.8;
    ctx.lineJoin='round';
    pts.forEach((p,i)=>{
      const x=pad.l+cW*(i/(pts.length-1||1));
      const y=pad.t+cH-(cH*(p.data[s]||0)/maxY);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.stroke();
    ctx.restore();
  });

  // Légende
  const legend=$('act-legend');
  legend.innerHTML=srvs.map(s=>`<div style="display:flex;align-items:center;gap:.3rem;font-family:var(--M);font-size:.52rem;color:${ACT_COLORS[s]||'var(--t2)'}"><div style="width:18px;height:2px;background:${ACT_COLORS[s]||'#fff'};border-radius:2px"></div>${s.toUpperCase()}</div>`).join('');
}


function renderTreemap(d){
  const wrap=document.getElementById('treemap-wrap');
  const legend=document.getElementById('treemap-legend');
  if(!wrap||!d||!d.points||!d.points.length)return;
  const pts=d.points;

  // Calcule la moyenne de chaque serveur sur la période
  const avgs=SRV.map(s=>{
    const vals=pts.map(p=>p.data[s]||0);
    const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
    return{s,avg};
  }).filter(x=>x.avg>0).sort((a,b)=>b.avg-a.avg);

  const total=avgs.reduce((a,x)=>a+x.avg,0)||1;

  wrap.innerHTML=avgs.map(({s,avg})=>{
    const pct=avg/total*100;
    const color=ACT_COLORS[s]||'#ffffff';
    const show=pct>4;
    return `<div style="
      flex:0 0 ${pct.toFixed(2)}%;
      background:${color}22;
      border:1px solid ${color}66;
      border-radius:4px;
      display:flex;flex-direction:column;
      align-items:center;justify-content:center;
      overflow:hidden;cursor:default;
      transition:flex .6s cubic-bezier(.4,0,.2,1), background .3s;
      position:relative;
    "
    onmouseenter="this.style.background='${color}44'"
    onmouseleave="this.style.background='${color}22'"
    title="${s.toUpperCase()} — ${pct.toFixed(1)}% (moy ${avg.toFixed(1)} joueurs)">
      ${show?`<span style="font-family:var(--M);font-size:.46rem;color:${color};letter-spacing:.1em;text-align:center;line-height:1.3;padding:.2rem">${s.toUpperCase()}<br><span style="font-size:.55rem;color:var(--t1);font-weight:bold">${pct.toFixed(0)}%</span></span>`:''}
    </div>`;
  }).join('');

  legend.innerHTML=avgs.map(({s,avg})=>{
    const pct=(avg/total*100).toFixed(1);
    const color=ACT_COLORS[s]||'#fff';
    return `<div style="display:flex;align-items:center;gap:.3rem;font-family:var(--M);font-size:.48rem;color:var(--t2)">
      <div style="width:10px;height:10px;border-radius:2px;background:${color};flex-shrink:0"></div>
      <span style="color:${color}">${s.toUpperCase()}</span>
      <span style="color:var(--t3)">${pct}%</span>
    </div>`;
  }).join('');

  const upd=document.getElementById('treemap-last-update');
  if(upd)upd.textContent='Mis à jour '+new Date().toLocaleTimeString('fr-FR');
}

function renderActivityStats(d){
  const grid=$('act-stats-grid');
  if(!grid)return;
  const pts=d.points;
  const stats=SRV.map(s=>{
    const vals=pts.map(p=>p.data[s]||0);
    const max=Math.max(...vals,0);
    const avg=vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0;
    const last=vals[vals.length-1]||0;
    return{s,max,avg,last};
  }).sort((a,b)=>b.avg-a.avg).slice(0,4);
  renderTreemap(d);
  grid.innerHTML=stats.map(({s,max,avg,last})=>`
    <div class="panel" style="border-color:${ACT_COLORS[s]||'var(--b2)'}33">
      <div class="ptop" style="background:${ACT_COLORS[s]||'var(--blue)'}"></div>
      <div style="padding:.9rem 1rem">
        <div style="font-family:var(--M);font-size:.55rem;color:${ACT_COLORS[s]||'var(--t2)'};letter-spacing:.18em;margin-bottom:.5rem">${EMO[s]||''} ${s.toUpperCase()}</div>
        <div style="display:flex;justify-content:space-between;font-family:var(--M);font-size:.5rem;color:var(--t3)">
          <span>MOY <b style="color:var(--t1)">${avg}</b></span>
          <span>MAX <b style="color:var(--t1)">${max}</b></span>
          <span>NOW <b style="color:${ACT_COLORS[s]||'var(--t1)'}">${last}</b></span>
        </div>
      </div>
    </div>`).join('');
}

// ════════════════════════════════════════════════════════
// ⚔️  SWORD TRACKER
// ════════════════════════════════════════════════════════
let _swords=[], _swordOnline={}, _swordPollId=null;

async function loadSwords(){
  try{
    // swords: backend non disponible
    _swords=[];
    _swordOnline={};
    renderSwords();
  }catch(e){console.error('sword load',e);}
  // Poll live toutes les 8s
  if(!_swordPollId)_swordPollId=setInterval(async()=>{
    try{
      // swords: backend non disponible
      _swords=[];
      _swordOnline={};
      renderSwords();
    }catch(e){}
  },8000);
}

function renderSwords(){
  renderSwordList();
  renderSwordOnline();
}

function renderSwordList(){
  const el=document.getElementById('sword-list');
  if(!el)return;
  if(!_swords.length){
    el.innerHTML='<div style="font-family:var(--M);font-size:.48rem;color:var(--t4);padding:.3rem 0 .8rem">Aucune sword — ajoute un pseudo ci-dessus</div>';
    return;
  }
  el.innerHTML=_swords.map(s=>{
    const isOut=s.is_out||false;
    const isOnline=_swordOnline[s.name];
    return `<div style="display:flex;align-items:center;gap:.6rem;padding:.45rem .8rem;background:var(--bg2);border:1px solid ${isOut?'rgba(255,80,80,.2)':isOnline?'rgba(255,200,0,.2)':'var(--b1)'};border-radius:var(--r);margin-bottom:.3rem">
      <span style="font-family:var(--M);font-size:.55rem;color:${isOut?'rgba(255,100,100,.5)':isOnline?'#ffd700':'var(--t1)'};flex:1;${isOut?'text-decoration:line-through':''}">${isOnline?'⚔️':'🗡️'} ${s.name}${isOnline?' <span style=\'font-size:.4rem;color:var(--t3)\'>— '+(_swordOnline[s.name]||'').toUpperCase()+'</span>':''}</span>
      <label style="display:flex;align-items:center;gap:.35rem;cursor:pointer;font-family:var(--M);font-size:.46rem;color:${isOut?'#ff6666':'var(--t3)'}">
        <input type="checkbox" ${isOut?'checked':''} onchange="swordToggleOut('${s.name}',this.checked)"
          style="width:14px;height:14px;cursor:pointer;accent-color:#ff4444">
        OUT
      </label>
      <button onclick="swordRemove('${s.name}')" style="font-family:var(--M);font-size:.42rem;background:rgba(255,60,60,.1);color:#ff5555;border:1px solid rgba(255,60,60,.2);border-radius:4px;padding:.12rem .5rem;cursor:pointer">✕</button>
    </div>`;
  }).join('');
}

function renderSwordOnline(){
  const el=document.getElementById('sword-online-list');
  const badge=document.getElementById('sword-co-badge');
  if(!el)return;
  const swordNames=_swords.map(s=>s.name);
  const coSwords=Object.keys(_swordOnline).filter(n=>swordNames.includes(n));
  const coActive=coSwords.filter(n=>!(_swords.find(s=>s.name===n)||{}).is_out);
  if(badge)badge.style.display=coActive.length>=2?'inline':'none';
  if(!coSwords.length){
    el.innerHTML='<div style="font-family:var(--M);font-size:.48rem;color:var(--t4)">Aucune sword connectée actuellement</div>';
    return;
  }
  el.innerHTML=coSwords.map(name=>{
    const srv=_swordOnline[name]||'?';
    const sw=_swords.find(s=>s.name===name)||{};
    const isOut=sw.is_out||false;
    return `<div style="display:flex;align-items:center;gap:.6rem;padding:.5rem .8rem;margin-bottom:.35rem;background:${isOut?'rgba(255,255,255,.03)':'rgba(255,200,0,.06)'};border:1px solid ${isOut?'rgba(255,255,255,.07)':'rgba(255,200,0,.25)'};border-radius:var(--r);opacity:${isOut?.5:1}">
      <span style="font-family:var(--M);font-size:.58rem;font-weight:700;color:${isOut?'var(--t3)':'#ffd700'};flex:1">⚔️ ${name} <span style="font-size:.42rem;color:var(--t4);font-weight:400">— ${srv.toUpperCase()}</span></span>
      ${isOut?'<span style="font-family:var(--M);font-size:.42rem;color:#ff6666;background:rgba(255,60,60,.1);padding:.15rem .5rem;border-radius:10px">☠️ OUT</span>':'<span style="font-family:var(--M);font-size:.42rem;color:#00e87a;background:rgba(0,232,122,.08);padding:.15rem .5rem;border-radius:10px">✅ ACTIF</span>'}
    </div>`;
  }).join('');
  if(coActive.length>=2){
    el.innerHTML+=`<div style="margin-top:.6rem;font-family:var(--M);font-size:.52rem;background:rgba(255,50,50,.1);border:1px solid rgba(255,50,50,.3);border-radius:var(--r);padding:.5rem .8rem;color:#ff4444">🚨 <b>${coActive.length} swords actifs co simultanément sur LIME</b> — alerte Discord envoyée</div>`;
  }
}

async function swordToggleOut(name,isOut){
  // swords: backend non disponible
  await loadSwords();
}

async function swordAdd(){
  const name=document.getElementById('sword-name-inp').value.trim();
  if(!name)return;
  // swords: backend non disponible
  document.getElementById('sword-name-inp').value='';
  document.getElementById('sword-acl').style.display='none';
  await loadSwords();
}

async function swordRemove(name){
  if(!confirm('Supprimer '+name+' des swords ?'))return;
  // swords: backend non disponible
  await loadSwords();
}


function _polyArea(xs,zs){let a=0,n=xs.length;for(let i=0;i<n;i++){const j=(i+1)%n;a+=xs[i]*zs[j]-xs[j]*zs[i];}return Math.abs(a)/2;}


async function loadDash(){
  const ov=$('srv-overview'),wq=$('wl-quick');
  if(ov)ov.innerHTML=ld();
  try{
    const all=await dynmapGetAll();
    const srvList=Object.keys(DYNMAP_BASES);
    let tot=0;srvList.forEach(s=>tot+=(all[s]||[]).length);
    const elTot=document.getElementById('st-total');if(elTot)elTot.textContent=tot;
    if(ov){
      ov.innerHTML=srvList.map(s=>{
        const pl=(all[s]||[]),cnt=pl.length;
        const mx=Math.max(...srvList.map(ss=>(all[ss]||[]).length),1);
        const pct=Math.round(cnt/mx*100);
        return `<div class="so" onclick="fOL('${s}')">
          <div class="so-top"><span class="so-name">${EMO[s]||''} ${s.toUpperCase()}</span><span class="so-n" style="color:var(--grn)">${cnt}</span></div>
          <div class="sbar"><div class="sbar-f" style="width:${pct}%"></div></div>
          <div class="so-pl">${pl.slice(0,8).map(p=>`<span class="tag" onclick="event.stopPropagation();qCA('${p.name}')">${p.name}</span>`).join('')}${cnt>8?`<span style="font-family:var(--M);font-size:.44rem;color:var(--t3)">+${cnt-8}</span>`:''}</div>
        </div>`;
      }).join('');
    }
    if(wq){
      const pl=all['lime']||[],lp=pl.map(p=>p.name.toLowerCase());
      const on=WL.filter(p=>lp.includes(p.toLowerCase())),off=WL.filter(p=>!lp.includes(p.toLowerCase()));
      wq.innerHTML=WL.length?[
        ...on.map(p=>`<div class="wi"><img src="https://skins.nationsglory.fr/face/${encodeURIComponent(p)}/32" style="width:24px;height:24px;border-radius:3px;image-rendering:pixelated" onerror="this.style.display='none'"><span style="font-family:var(--M);font-size:.6rem">${p}</span><div class="wis on"><div class="led on"></div>EN LIGNE</div></div>`),
        ...off.map(p=>`<div class="wi"><img src="https://skins.nationsglory.fr/face/${encodeURIComponent(p)}/32" style="width:24px;height:24px;border-radius:3px;image-rendering:pixelated;opacity:.3" onerror="this.style.display='none'"><span style="font-family:var(--M);font-size:.6rem;opacity:.4">${p}</span><div class="wis off">◯ Hors ligne</div></div>`)
      ].join(''):'<div class="empty">Watchlist vide — ajoutez des joueurs dans Watchlist</div>';
      const elOn=document.getElementById('st-wonline');if(elOn)elOn.textContent=on.length;
      const elCnt=document.getElementById('st-wcount');if(elCnt)elCnt.textContent=WL.length;
      if(typeof updateWeather==='function')updateWeather(on.length);
    }
    if(sparkData?.total){sparkData.total.push(tot);if(sparkData.total.length>30)sparkData.total.shift();}
    if(typeof drawSpark==='function')drawSpark('spark-total',sparkData?.total||[]);
    const lu=document.getElementById('last-update');if(lu)lu.textContent='Mis à jour '+new Date().toLocaleTimeString('fr-FR');
  }catch(e){if(ov)ov.innerHTML=`<div class="empty" style="color:var(--red)">Erreur : ${e.message}</div>`;}
}
