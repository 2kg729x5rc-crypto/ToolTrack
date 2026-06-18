let zamestnanci = [];
let naradi = [];

fetch("zamestnanci.txt")
.then(r => r.text())
.then(data => {

zamestnanci = data.split("\n");

const select = document.getElementById("zamestnanec");

zamestnanci.forEach(z => {
if(!z.trim()) return;

let o = document.createElement("option");
o.textContent = z;
select.appendChild(o);
});
});

fetch("naradi.txt")
.then(r => r.text())
.then(data => {

naradi = data.split("\n");

const select = document.getElementById("naradi");

naradi.forEach(n => {

if(!n.trim()) return;

let o = document.createElement("option");
o.textContent = n;
select.appendChild(o);
});
});

function pujc(){

const zam = document.getElementById("zamestnanec").value;
const nar = document.getElementById("naradi").value;

let seznam =
JSON.parse(localStorage.getItem("vypujcky") || "[]");

seznam.push({
zamestnanec:zam,
naradi:nar,
datum:new Date().toLocaleString()
});

localStorage.setItem(
"vypujcky",
JSON.stringify(seznam)
);

vykresli();
}

function vratit(index){

let seznam =
JSON.parse(localStorage.getItem("vypujcky") || "[]");

seznam.splice(index,1);

localStorage.setItem(
"vypujcky",
JSON.stringify(seznam)
);

vykresli();
}

function vykresli(){

let seznam =
JSON.parse(localStorage.getItem("vypujcky") || "[]");

let html="";

seznam.forEach((v,i)=>{

html += `
<div class="karta">
<b>${v.zamestnanec}</b><br>
${v.naradi}<br>
${v.datum}<br><br>
<button onclick="vratit(${i})">
Vrátit
</button>
</div>
`;
});

document.getElementById("vypujcky").innerHTML = html;
}

vykresli();