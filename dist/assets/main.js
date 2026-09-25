const nav=document.querySelector('#navegacao');
const menuButton=document.querySelector('.menu-toggle');
const servicesButton=document.querySelector('.services-toggle');
const panel=document.querySelector('#servicos-menu');
function closeServices(){servicesButton.setAttribute('aria-expanded','false');panel.hidden=true;}
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');nav.classList.remove('open');closeServices();}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open);if(!open)closeServices();});
servicesButton.addEventListener('click',()=>{const open=servicesButton.getAttribute('aria-expanded')!=='true';servicesButton.setAttribute('aria-expanded',String(open));panel.hidden=!open;});
document.addEventListener('click',e=>{if(!e.target.closest('.dropdown'))closeServices();if(!e.target.closest('.site-header'))closeMenu();});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!panel.hidden){closeServices();servicesButton.focus();}else if(nav.classList.contains('open')){closeMenu();menuButton.focus();}}});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){document.documentElement.classList.add('motion');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.07});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));}
const progress=document.querySelector('.reading-progress');let queued=false;function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?Math.min(100,scrollY/max*100):0}%`;queued=false;}window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateProgress);}},{passive:true});window.addEventListener('resize',()=>{updateProgress();if(innerWidth>1020)closeMenu();});updateProgress();
