const dot=document.querySelector('.cursor-dot');
const ring=document.querySelector('.cursor-ring');
if(dot&&ring){
  let mx=-100,my=-100,rx=-100,ry=-100;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function loop(){
    dot.style.left=mx+'px';dot.style.top=my+'px';
    rx+=(mx-rx)*0.085;ry+=(my-ry)*0.085;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.hoverable').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('expanded'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('expanded'));
  });
}
const nav=document.querySelector('.nav');
if(nav)window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
const bg=document.getElementById('hero-bg');
if(bg)window.addEventListener('scroll',()=>bg.style.transform=`translateY(${scrollY*0.25}px)`,{passive:true});
const revealEls=document.querySelectorAll('.reveal,.reveal-left');
if(revealEls.length){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:0.08,rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach(el=>{el.style.transitionDelay=(el.dataset.delay||0)+'ms';io.observe(el);});
}
const sideLinks=document.querySelectorAll('.sidenav a');
const secs=document.querySelectorAll('section[id]');
if(sideLinks.length&&secs.length){
  const sio=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        sideLinks.forEach(a=>a.classList.remove('active'));
        const a=document.querySelector(`.sidenav a[href="#${e.target.id}"]`);
        if(a)a.classList.add('active');
      }
    });
  },{threshold:0.35});
  secs.forEach(s=>sio.observe(s));
}
