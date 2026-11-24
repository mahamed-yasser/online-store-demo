const P=[["قميص قطني","ملابس",350,"👕","#e0e7ff"],["جاكيت خفيف","ملابس",890,"🧥","#fce7f3"],["بنطلون كاجوال","ملابس",520,"👖","#dbeafe"],["حقيبة ظهر","إكسسوارات",640,"🎒","#fef3c7"],["ساعة يد","إكسسوارات",1200,"⌚","#e5e7eb"],["نظارة شمس","إكسسوارات",410,"🕶️","#d1fae5"],["حذاء رياضي","أحذية",980,"👟","#ffedd5"],["صندل صيفي","أحذية",330,"🩴","#fae8ff"]].map((p,i)=>({id:i,name:p[0],cat:p[1],price:p[2],e:p[3],bg:p[4]}));
const $=s=>document.querySelector(s);let cat="الكل",q="";let cart={};try{cart=JSON.parse(localStorage.getItem("khait_cart")||"{}")}catch(e){}
const money=n=>n.toLocaleString("ar-EG")+" ج.م";
function el(t,c,x){const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function tabs(){const t=$("#tabs");t.replaceChildren();["الكل",...new Set(P.map(p=>p.cat))].forEach(c=>{const b=el("button",c===cat?"on":"",c);b.onclick=()=>{cat=c;tabs();grid()};t.append(b)})}
function grid(){const g=$("#grid");g.replaceChildren();const l=P.filter(p=>(cat==="الكل"||p.cat===cat)&&p.name.includes(q));$("#none").hidden=l.length>0;
l.forEach(p=>{const c=el("div","card"),i=el("div","img",p.e);i.style.background=p.bg;const f=el("div","info");const b=el("button","","أضف للسلة");b.onclick=()=>add(p.id);f.append(el("span","cat",p.cat),el("h3","",p.name),el("span","price",money(p.price)),b);c.append(i,f);g.append(c)})}
function save(){localStorage.setItem("khait_cart",JSON.stringify(cart));draw()}
function add(id){cart[id]=(cart[id]||0)+1;save();$("#drawer").hidden=false}
function draw(){const it=$("#items");it.replaceChildren();let tot=0,n=0;Object.entries(cart).forEach(([id,k])=>{const p=P[id];if(!p)return;tot+=p.price*k;n+=k;const r=el("div","row"),t=el("div","t",p.e);t.style.background=p.bg;const nm=el("div","n");nm.append(el("div","",p.name),el("small","",money(p.price)));const q=el("div","qty");const m=el("button","","−"),pl=el("button","","+");m.onclick=()=>{cart[id]--;if(cart[id]<=0)delete cart[id];save()};pl.onclick=()=>{cart[id]++;save()};q.append(m,el("span","",k),pl);r.append(t,nm,q);it.append(r)});
if(!n)it.append(el("p","","السلة فارغة."));$("#count").textContent=n;$("#total").textContent=money(tot)}
$("#cartBtn").onclick=()=>{$("#drawer").hidden=false};$("#close").onclick=()=>{$("#drawer").hidden=true};
$("#q").oninput=e=>{q=e.target.value.trim();grid()};
$("#checkout").onclick=()=>{if(!Object.keys(cart).length){$("#note").textContent="أضف منتجًا أولًا.";return}cart={};save();$("#note").textContent="تم تسجيل الطلب (تجريبي). لا يوجد دفع."};
tabs();grid();draw();
