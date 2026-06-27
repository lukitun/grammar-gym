import { readFileSync, readdirSync, writeFileSync } from "fs";
const dir = "build/topics";
// desired order
const order = ["articles","tenses","present-perfect","prepositions","phrasal-verbs","conditionals","passive","modals","relative-clauses","comparatives","gerunds-infinitives","reported","questions","quantifiers","countable-uncountable","pronouns","adverbs-word-order","used-to","subject-verb-agreement","confusing-words"];
const files = readdirSync(dir).filter(f=>f.endsWith(".json"));
const byId = {};
let total=0, errors=[];
for (const f of files) {
  let t;
  try { t = JSON.parse(readFileSync(`${dir}/${f}`,"utf8")); }
  catch(e){ errors.push(`PARSE ${f}: ${e.message}`); continue; }
  if(!t.id||!t.title||!Array.isArray(t.questions)) { errors.push(`SHAPE ${f}`); continue; }
  // validate questions
  const seen=new Set();
  t.questions=t.questions.filter((q,i)=>{
    if(!q.q||!q.why){errors.push(`${t.id}[${i}] missing q/why`);return false;}
    const key=q.q.trim().toLowerCase();
    if(seen.has(key)){return false;} seen.add(key);
    if(q.type==="mc"){
      if(!Array.isArray(q.options)||q.options.length<2){errors.push(`${t.id}[${i}] bad options`);return false;}
      if(!q.options.map(o=>String(o).trim().toLowerCase()).includes(String(q.answer).trim().toLowerCase())){errors.push(`${t.id}[${i}] answer not in options: "${q.answer}"`);return false;}
    } else if(q.type==="fill"){
      if(!Array.isArray(q.answer)) q.answer=[String(q.answer)];
      if(q.answer.length===0){errors.push(`${t.id}[${i}] no fill answer`);return false;}
    } else {errors.push(`${t.id}[${i}] bad type ${q.type}`);return false;}
    return true;
  });
  byId[t.id]=t; total+=t.questions.length;
}
const sorted = order.filter(id=>byId[id]).map(id=>byId[id]);
for(const id of Object.keys(byId)) if(!order.includes(id)) sorted.push(byId[id]);
const out = "// Auto-generated grammar exercise bank. "+total+" exercises across "+sorted.length+" topics.\n// Edit build/topics/*.json and run build/assemble.mjs to regenerate.\nwindow.TOPICS = "+JSON.stringify(sorted,null,2)+";\n";
writeFileSync("exercises.js", out);
console.log("TOPICS:",sorted.length,"TOTAL Q:",total);
console.log("counts:",sorted.map(t=>t.id+":"+t.questions.length).join("  "));
if(errors.length){console.log("\nISSUES ("+errors.length+"):"); errors.slice(0,40).forEach(e=>console.log("  "+e));}
else console.log("no validation issues");
