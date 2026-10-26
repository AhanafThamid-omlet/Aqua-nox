/*img: your photo path (e.g. "images/Red_and_orange fish.png"); "" shows a placeholder fish
badge: "new" | "sale" | "" ; old: old price ; rating: 0-5 */





const arrivals = [
  {name:"Halfmoon Betta",      price:19.50, badge:"new",  rating:5, img:"images/halfmoon_betta.jpg", color:"#d6336c"},
  {name:"Neon Tetra (6 pack)", price:12.99, old:15.99, badge:"sale", rating:4, img:"images/Neon Tetra.jpg", color:"#27b5e8"},
  {name:"Ocellaris Clownfish", price:44.00, rating:5, img:"images/Ocellaris_Clownfish.jpg", color:"#ff7a1a"},
  {name:"Fancy Goldfish",      price:9.99,  badge:"new",  rating:4, img:"images/Fancy_Goldfish.jpg", color:"#f59f00"},
  {name:"Blue Tang",           price:59.00, rating:5, img:"images/Blue_Tang.jpg", color:"#2457d6"}
];
/* deal of the day: the thumbnails on the left switch between these*/
const dealEnds = new Date("2026-12-31T23:59:59");   // countdown target
const deals = [
  {name:"Royal Betta", price:35.99, old:60.00, rating:4, score:"4.0", reviews:3,
   desc:"Hand-selected, tank-raised and quarantined for 14 days. Ships with a live-arrival guarantee.", img:"images/royal-betta.jpeg", color:"#2457d6"},
  {name:"Flame Angelfish",  price:49.00, old:72.00, rating:5, score:"4.8", reviews:12,
   desc:"A vivid reef favourite that adds instant colour to any marine tank.", img:"images/Flame Angelfish.webp", color:"#ff5a1f"},
  {name:"Emerald Java Fern",price:15.99, old:22.00, rating:4, score:"4.3", reviews:7,
   desc:"Easy, low-light plant that attaches to wood and rock. Great for beginners.", img:"images/Emerald Java Fern.jpg", color:"#2f9e44"}
];
 






const fish=c=>`<svg viewBox="0 0 220 130" aria-hidden="true"><ellipse cx="100" cy="65" rx="46" ry="27" fill="${c}"/><path d="M140 65l42-30v60z" fill="${c}"/><circle cx="76" cy="58" r="5" fill="#fff"/><circle cx="75" cy="58" r="2" fill="#000"/></svg>`;
const art=p=>p.img?`<img src="${p.img}" alt="${p.name}">`:fish(p.color);
const stars=n=>"★".repeat(n)+"☆".repeat(5-n);
const money=v=>"$"+v.toFixed(2);
 
/* carousel*/
document.getElementById("track").innerHTML=arrivals.map(p=>`
<article class="card"><div class="thumb">${p.badge?`<span class="badge ${p.badge}">${p.badge}</span>`:""}${art(p)}</div>
<div class="info"><div class="row"><h3 class="name">${p.name}</h3><button class="heart" type="button" aria-label="Save">&#9825;</button></div>
<div class="row"><span class="price">${money(p.price)}${p.old?`<span class="old">${money(p.old)}</span>`:""}</span><span class="stars">${stars(p.rating)}</span></div></div></article>`).join("");
const track=document.getElementById("track");
document.querySelector(".prev").onclick=()=>track.scrollBy({left:-track.clientWidth*.8});
document.querySelector(".next").onclick=()=>track.scrollBy({left: track.clientWidth*.8});
 
/* spotlight */
const $=id=>document.getElementById(id);
function show(i){
  const d=deals[i];
  $("pic").innerHTML=art(d);$("dName").textContent=d.name;$("dStars").textContent=stars(d.rating);
  $("dScore").textContent=d.score;$("dRev").textContent=`(${d.reviews} Reviews)`;$("dDesc").textContent=d.desc;
  $("dPrice").innerHTML=money(d.price)+`<span class="old">${money(d.old)}</span>`;
  [...$("thumbs").children].forEach((b,j)=>b.setAttribute("aria-selected",j==i));
}
$("thumbs").innerHTML=deals.map((d,i)=>`<button class="t" role="tab" type="button" aria-label="${d.name}" data-i="${i}">${art(d)}</button>`).join("");
$("thumbs").onclick=e=>{const b=e.target.closest(".t");if(b)show(+b.dataset.i)};
show(0);
 
/* countdown*/
function tick(){
  let s=Math.max(0,Math.floor((dealEnds-Date.now())/1000));
  const p=n=>String(n).padStart(2,"0");
  $("tD").textContent=p(Math.floor(s/86400));$("tH").textContent=p(Math.floor(s%86400/3600));
  $("tM").textContent=p(Math.floor(s%3600/60));$("tS").textContent=p(s%60);
}
tick();setInterval(tick,1000);
 
/* hearts*/
document.addEventListener("click",e=>{if(e.target.classList.contains("heart")){e.target.classList.toggle("on");e.target.innerHTML=e.target.classList.contains("on")?"&#9829;":"&#9825;"}});




