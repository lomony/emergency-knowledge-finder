/* ===== Interface ===== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const BEH = {ANSWER:["ok","Answer"], ANSWER_CALC:["calc","Calculated answer"], ANSWER_FLAG:["warn","Answer with a flag"], CORRECT_PREMISE:["warn","Outdated figure corrected"], CLARIFY_DEFINITION:["calc","Definition check"], ABSTAIN:["old","Not in the sources"], REFUSE_ROUTE:["stop","Internal information"]};
const STATUS = {current:["ok","Current"], superseded:["old","Superseded"], initial:["old","Initial figure"], variant:["warn","Variant"]};
const TYPECLS = {"Normal":"", "T1 Stale":"t1", "T2 No evidence":"t2", "T3 Variant":"t3", "T4 Definition":"t4", "T5 Internal":"t5"};
const pill = (cls, label) => `<span class="pill ${cls}">${esc(label)}</span>`;
const statusPill = c => { const s = c.derived ? ["calc","Calculated"] : (STATUS[c.status] || STATUS.current); return pill(s[0], s[1]); };
function refLink(id){ const d = DOCS[id]; if (!d) return `<span class="ref">${esc(id)}</span>`; return `<a class="ref" href="${esc(d.url)}" target="_blank" rel="noopener" title="${esc(d.t)}">${esc(id)}</a>`; }
function sourceBlock(c){ return docsOf(c).map(id => `<div class="src">${refLink(id)} <span>${esc(DOCS[id] ? DOCS[id].t : id)}</span></div>`).join("") + (c.loc ? `<div class="loc">${esc(c.loc)}</div>` : ""); }
function factTable(c){ if (!c.facts) return ""; return `<div class="tbl-wrap"><table class="tbl facts"><tbody>${c.facts.map(f => `<tr><th scope="row">${esc(f[0])}</th><td class="num">${esc(f[1])}</td></tr>`).join("")}</tbody></table></div>`; }
function miniCard(c, label){
  return `<div class="mini"><div class="mini-h">${label ? `<span class="eyebrow">${esc(label)}</span>` : ""}${statusPill(c)}<span class="asof">As of ${esc(c.asOf)}</span></div>`
    + `<p class="mini-t"><strong>${esc(c.title)}.</strong> ${esc(c.text)}</p>${c.note ? `<p class="mini-note">${esc(c.note)}</p>` : ""}`
    + `<div class="mini-src">${docsOf(c).map(refLink).join(" ")} <span class="loc">${esc(c.loc || "")}</span></div></div>`;
}
function traceHtml(r){
  const rows = (r.hits || []).slice(0, 5).map(x => `<tr><td class="mono">${esc(x.card.id)}</td><td>${esc(x.card.title)}</td><td>${statusPill(x.card)}</td><td class="num">${x.score.toFixed(2)}</td></tr>`).join("");
  const rule = r.rule ? `<p>Scope rule applied: ${esc(r.rule.name)}.</p>` : "";
  return `${rule}<p class="muted">Keyword ranking (BM25) over ${INDEX.n} verified fact cards, with cards from the crisis named in the question ranked first. The top card’s group decides which figure is current.</p>`
    + `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Card</th><th>Title</th><th>Status</th><th class="num">Score</th></tr></thead><tbody>${rows || `<tr><td colspan="4">No matches</td></tr>`}</tbody></table></div>`;
}
function renderAnswer(q){
  const r = answer(q); const b = BEH[r.behaviour];
  let h = `<article class="answer"><div class="ans-top ${b[0]}"><span class="ans-k">${esc(b[1])}</span><span class="q-echo">${esc(q)}</span></div><div class="ans-body">`;
  if (r.behaviour === "ABSTAIN" || r.behaviour === "REFUSE_ROUTE"){
    h += `<p class="lead">${esc(r.rule.msg)}</p><p class="note"><span class="note-k">Where to go</span>${esc(r.rule.route)}</p>`;
    if (r.near) h += miniCard(r.near, "Nearest verified fact");
  } else {
    const p = r.primary;
    if (r.behaviour === "CORRECT_PREMISE") h += `<p class="premise">The figure in the question is from ${esc(r.premise.asOf)} (${esc(docsOf(r.premise).map(d => DOCS[d] ? DOCS[d].t : d).join(", "))}). The latest figure is below.</p>`;
    if (r.clarify) h += `<p class="lead">${esc(r.clarify)}</p>`;
    h += `<h3 class="ans-title">${esc(p.title)}</h3><p class="${r.clarify ? "body" : "lead"}">${esc(p.text)}</p>`;
    if (p.derived) h += `<p class="calc-note"><span class="note-k">How it was calculated</span>${esc(p.derivation)}</p>`;
    h += factTable(p);
    h += `<dl class="meta"><div><dt>As of</dt><dd>${esc(p.asOf)}</dd></div><div><dt>Source</dt><dd>${sourceBlock(p)}</dd></div><div><dt>Status</dt><dd>${statusPill(p)}</dd></div></dl>`;
    if (p.basis) h += `<p class="note"><span class="note-k">What the figure includes</span>${esc(p.basis)}</p>`;
    if (r.flag) h += `<p class="flag"><span class="note-k">Flag</span>${esc(r.flag)}</p>`;
    r.notes.forEach(n => { if (n) h += `<p class="flag"><span class="note-k">Note</span>${esc(n)}</p>`; });
    r.others.forEach(c => { h += miniCard(c, "Also published"); });
    r.variants.forEach(c => { h += miniCard(c, "Variant"); });
    if (r.history.length) h += `<details class="hist"><summary>Earlier figures (${r.history.length})</summary>${r.history.map(c => miniCard(c)).join("")}</details>`;
  }
  h += `<details class="trace"><summary>How this answer was found</summary>${traceHtml(r)}</details></div></article>`;
  $("#answer").innerHTML = h;
}
const EXAMPLES = [
  ["Only 16% funded?","Our appeal page says the Sudan appeal is only 16% funded. Is that still right?"],
  ["17,000 children, 332 deaths?","Can we still say the Nepal floods affected 17,000 children and killed 332 people?"],
  ["Received this year","How much money has UNICEF received for Sudan this year?"],
  ["Help 17.3 million?","We'd like to say UNICEF will help 17.3 million children in Sudan this year. Is that right?"],
  ["Sudan requirement","What is the total 2026 funding requirement for Sudan?"],
  ["Nepal funding","How much is UNICEF appealing for in Nepal, and how much is funded?"],
  ["Private sector 2025","How much did UNICEF raise from the private sector in 2025?"],
  ["What does $50 provide?","What does a $50 gift provide for families hit by the Nepal floods?"],
  ["Our NatCom’s total","How much has our National Committee raised for the Nepal floods appeal, and how do we compare with other National Committees?"]
];

/* Crises */
const CRISES = {
  sudan:{name:"Sudan", sub:"Protracted conflict · 2026 requirement US$962.9M",
    figs:[["US$962.9M","2026 funding requirement","S1"],["17.3M","Children in need of humanitarian assistance","S3"],["7.9M","Children UNICEF aims to reach in 2026","S4"],["63%","Appeal funding gap","S10"]],
    fund:{card:"S10", title:"Funds mobilised against the 2026 appeal", part:352.2, total:962.9, partLabel:"US$352.2M mobilised (37%)", gapLabel:"US$610.7M gap (63%)", totalLabel:"Requirement US$962.9M"}, current:["S1","S10","S3","S4","S11","S16"],
    hist:{title:"Funds mobilised against the 2026 appeal", cols:["As of","Mobilised","Gap","What the total includes","Source"],
      rows:[["28 Feb 2026","US$149.9M","84%","US$22.8M received in 2026 + US$127.1M carried forward","D04"],["30 Apr 2026","US$191.3M","80% (US$771.6M)","Breakdown not yet extracted","D06"],["30 Jun 2026","US$351.1M","64% (US$611.8M)","US$96.4M received + US$127.6M other resources + US$127.1M carried forward","D08"],["31 Jul 2026","US$352.2M","63%","Breakdown not yet extracted","D09"],["31 Aug 2026","US$352.2M","63% (US$610.7M)","US$97.5M received + US$127.6M other resources + US$127.1M carried forward","D10"]],
      note:"Between 30 June and 31 August, total funds mobilised rose by about US$1.1M (calculated from Reports No. 44 and No. 46)."},
    flags:["S1v","S16v"], next:"Report No. 46 (August) was published on 28 October 2026. Check for Report No. 47 before using these figures."},
  nepal:{name:"Nepal floods 2026", sub:"Sudden onset · flash floods from 26 August 2026 · requirement US$17.2M",
    figs:[["32,021","Children affected","N5"],["84,270","People affected","N5"],["1,458","Deaths","N5"],["5,285","People missing, including 195 children","N5"]],
    fund:{card:"N6", title:"Funds received against the appeal", part:8776695, total:17243050, partLabel:"US$8.78M received (51%)", gapLabel:"US$8.47M gap (49%)", totalLabel:"Requirement US$17.24M"}, current:["N1","N5","N9","N6","N7"],
    hist:{title:"How the impact figures changed", cols:["As of","Children affected","Deaths","Missing","Source"],
      rows:[["27 Aug 2026","At least 17,000","About 332","Hundreds","D11"],["31 Aug 2026","22,100","903","About 4,247","D12"],["9 Oct 2026","32,021","1,458","5,285","D18"]],
      note:"Deaths reported on 9 October were more than four times the figure in the first press release (calculated)."},
    flags:[], cadence:"N8"},
  global:{name:"Global and PFP", sub:"HAC 2026 and private sector results for 2025",
    figs:[["US$7.66B","Global 2026 humanitarian appeal","G1"],["73M","Children UNICEF aims to reach","G1"],["117M","People UNICEF aims to reach","G1"],["133","Countries and territories","G1"]], current:["G1","G3","G6","G7","G8","G9","G5"],
    hist:{title:"Ten largest 2026 appeals", cols:["Appeal","Requirement"], fromFacts:"G4", note:"The Democratic Republic of the Congo figure is marked preliminary in the source."},
    flags:[]}
};
function situationHtml(c){
  const latest = c.figs.map(f => CARD[f[2]]).sort((a, b) => b.d.localeCompare(a.d))[0];
  let h = `<section class="sin" aria-label="Situation in numbers"><div class="sin-h"><h3>Situation in numbers</h3><span class="muted small">Latest as of ${esc(latest.asOf)}</span></div><div class="figs">`;
  h += c.figs.map(([v, l, id]) => { const x = CARD[id]; return `<div class="fig"><div class="fig-v">${esc(v)}</div><p class="fig-l">${esc(l)}</p><div class="fig-s"><span>${esc(x.asOf)}</span>${docsOf(x).map(refLink).join(" ")}</div></div>`; }).join("");
  h += `</div>`;
  const f = c.fund;
  if (f){
    const pct = Math.round(f.part / f.total * 1000) / 10; const x = CARD[f.card];
    h += `<div class="fund"><div class="fund-h"><strong>${esc(f.title)}</strong><span class="muted small">${esc(f.totalLabel)} · as of ${esc(x.asOf)} ${docsOf(x).map(refLink).join(" ")}</span></div>`
      + `<div class="bar" role="img" aria-label="${esc(f.partLabel)}; ${esc(f.gapLabel)}"><span style="width:${pct}%"></span></div>`
      + `<div class="bar-legend"><span><i class="k k-fill"></i>${esc(f.partLabel)}</span><span><i class="k k-gap"></i>${esc(f.gapLabel)}</span></div></div>`;
  }
  return h + `</section>`;
}
function renderCrisis(key){
  const c = CRISES[key] || CRISES.sudan;
  $$(".seg-crisis button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.k === key)));
  let h = `<header class="sec-h"><h2>${esc(c.name)}</h2><p class="muted">${esc(c.sub)}</p></header>`;
  h += situationHtml(c);
  h += `<h3 class="h3">Current figures</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Item</th><th>Figure</th><th>As of</th><th>Source</th></tr></thead><tbody>`;
  h += c.current.map(id => { const x = CARD[id]; return `<tr><th scope="row">${esc(x.title)}</th><td>${esc(x.text)}${x.flag ? `<div class="cell-flag">${esc(x.flag)}</div>` : ""}</td><td class="nowrap">${esc(x.asOf)}</td><td class="nowrap">${docsOf(x).map(refLink).join(" ")}</td></tr>`; }).join("");
  h += `</tbody></table></div>`;
  const hs = c.hist; const rows = hs.fromFacts ? CARD[hs.fromFacts].facts.map(f => [f[0], f[1], "D01"]) : hs.rows;
  const cols = hs.fromFacts ? hs.cols.concat(["Source"]) : hs.cols;
  h += `<h3 class="h3">${esc(hs.title)}</h3><div class="tbl-wrap"><table class="tbl"><thead><tr>${cols.map(t => `<th>${esc(t)}</th>`).join("")}</tr></thead><tbody>`;
  h += rows.map(r => `<tr>${r.map((v, i) => i === r.length - 1 && /^D\d\d$/.test(v) ? `<td>${refLink(v)}</td>` : `<td${i === 0 ? ' class="nowrap"' : ""}>${esc(v)}</td>`).join("")}</tr>`).join("");
  h += `</tbody></table></div>${hs.note ? `<p class="muted small">${esc(hs.note)}</p>` : ""}`;
  const flagCards = c.flags.map(id => miniCard(CARD[id], "Variant")).join("");
  const cadence = c.cadence ? flagOf(CARD[c.cadence], new Date()) : "";
  if (flagCards || cadence || c.next){
    h += `<h3 class="h3">Variants and update checks</h3>${flagCards}`;
    if (cadence) h += `<p class="flag"><span class="note-k">Update check</span>${esc(cadence)}</p>`;
    if (c.next) h += `<p class="note"><span class="note-k">Update check</span>${esc(c.next)}</p>`;
  }
  $("#crisis-out").innerHTML = h;
}

/* 72-hour brief */
const BRIEF = [
  {id:"v1", label:"v1 · 29 Aug", asOf:"29 August 2026, about 72 hours after onset", sections:[["Situation","B0"],["People and children affected","N2"],["Schools and health facilities","B3"],["UNICEF response","B1"],["Funding","B2"]], changes:[]},
  {id:"v2", label:"v2 · 31 Aug", asOf:"31 August 2026", sections:[["Situation","N1"],["People and children affected","N3i"],["Schools and health facilities","B4"],["UNICEF response","N4"],["Funding","N3f"]],
    changes:["Children affected: at least 17,000 → 22,100","Deaths: about 332 → 903, still rising","Missing: hundreds → about 4,247","Funding: first status published, 23% available including a US$2.5M EPF loan"]},
  {id:"v3", label:"v3 · 13 Oct", asOf:"13 October 2026 (government figures of 9 October)", sections:[["Situation","N1"],["People and children affected","N5"],["Education","N9"],["UNICEF response","N7"],["Funding","N6"]],
    changes:["Children affected: 22,100 → 32,021","Deaths: 903 → 1,458","Missing: about 4,247 → 5,285, including 195 children","Children needing education support: about 10,000 (27 Aug press release) → 30,000","Funding: 51% received. EPF loans are now excluded, so 23% → 51% is not growth on the same basis","Report No. 8 was due on 28 October and was not listed on 5 November"]}
];
let briefText = "";
function renderBrief(id){
  const v = BRIEF.find(x => x.id === id) || BRIEF[BRIEF.length - 1];
  $$(".seg-brief button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.k === v.id)));
  let h = `<article class="brief"><div class="brief-top"><p class="eyebrow">Knowledge brief for fundraising teams · ${esc(v.label)}</p><span class="stamp">Draft · not cleared</span></div><h2 class="brief-h">Nepal floods 2026</h2>`
    + `<p class="brief-asof">Figures as of ${esc(v.asOf)}. Draft for internal clearance, not approved messaging.</p>`;
  const lines = [`Nepal floods 2026: knowledge brief (${v.label})`, `Figures as of ${v.asOf}. Draft for internal clearance, not approved messaging.`, ""];
  v.sections.forEach(([t, cid]) => {
    const c = CARD[cid];
    h += `<section class="b-sec"><h3>${esc(t)}</h3><div><p>${esc(c.text)} ${docsOf(c).map(refLink).join(" ")}</p>${factTable(c)}`
      + `${c.basis ? `<p class="b-note">${esc(c.basis)}</p>` : ""}${c.flag ? `<p class="b-flag">${esc(c.flag)}</p>` : ""}</div></section>`;
    lines.push(t.toUpperCase(), `${c.text} [${docsOf(c).join(", ")}]`);
    (c.facts || []).forEach(f => lines.push(`- ${f[0]}: ${f[1]}`));
    if (c.flag) lines.push(`Note: ${c.flag}`);
    lines.push("");
  });
  if (v.changes.length){
    h += `<section class="b-sec"><h3>What changed</h3><div><ul class="list">${v.changes.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></section>`;
    lines.push("WHAT CHANGED SINCE THE PREVIOUS VERSION", ...v.changes.map(x => `- ${x}`), "");
  }
  const used = [...new Set(v.sections.flatMap(([, cid]) => docsOf(CARD[cid])))];
  h += `<section class="b-sec"><h3>Sources</h3><div><ul class="list">${used.map(d => `<li>${refLink(d)} ${esc(DOCS[d].t)} (${esc(DOCS[d].pub)})</li>`).join("")}</ul></div></section></article>`;
  lines.push("SOURCES", ...used.map(d => `[${d}] ${DOCS[d].t} (${DOCS[d].pub}) ${DOCS[d].url}`));
  briefText = lines.join("\n");
  $("#brief-out").innerHTML = h;
  $("#copy-status").textContent = "";
}

/* Evaluation */
function renderEval(){
  const res = runEval(new Date()); const n = res.length;
  const b = res.filter(r => r.bOk).length, s = res.filter(r => r.sOk).length;
  const types = ["Normal","T1 Stale","T2 No evidence","T3 Variant","T4 Definition","T5 Internal"];
  let h = `<header class="sec-h"><h2>Evaluation</h2><p class="muted">The 30 questions from the evaluation workbook, run live in this page.</p></header>`;
  h += `<div class="scores"><div class="score ${b === n ? "ok" : "bad"}"><div class="score-v">${b}<small> / ${n}</small></div><div class="score-l">Responses follow the expected behaviour</div></div>`
    + `<div class="score ${s === n ? "ok" : "bad"}"><div class="score-v">${s}<small> / ${n}</small></div><div class="score-l">Responses cite an expected source</div></div>`
    + `<div class="score"><div class="score-v">${types.length}</div><div class="score-l">Question types, from routine figures to internal-only requests</div></div></div>`;
  h += `<p class="flag"><span class="note-k">Read this first</span>This is a development set. The scope rules and cards were tuned on these questions, so the score shows the prototype works as designed, not how it handles new questions. A held-out set (your own questions and questions from interviews with fundraisers) will be scored before results are claimed. Figure accuracy and as-of dates are scored by hand in the workbook.</p>`;
  h += `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Question type</th><th class="num">Questions</th><th class="num">Behaviour match</th><th class="num">Source match</th></tr></thead><tbody>`;
  h += types.map(t => { const rs = res.filter(r => r.type === t); return `<tr><td><span class="typechip ${TYPECLS[t]}">${esc(t)}</span></td><td class="num">${rs.length}</td><td class="num">${rs.filter(r => r.bOk).length}</td><td class="num">${rs.filter(r => r.sOk).length}</td></tr>`; }).join("");
  h += `</tbody></table></div>`;
  h += `<h3 class="h3">All questions</h3><div class="tbl-wrap"><table class="tbl eval"><thead><tr><th>ID</th><th>Type</th><th>Question</th><th>Expected</th><th>Prototype</th><th>Behaviour</th><th>Source</th></tr></thead><tbody>`;
  h += res.map(r => `<tr><td class="mono">${esc(r.id)}</td><td><span class="typechip ${TYPECLS[r.type]}">${esc(r.type)}</span></td><td><button class="linkish" data-q="${esc(r.q)}">${esc(r.q)}</button></td><td class="mono">${esc(r.exp)}</td><td class="mono">${esc(r.got)}</td><td>${r.bOk ? '<span class="ok-t">Match</span>' : '<span class="bad-t">Miss</span>'}</td><td>${r.sOk ? '<span class="ok-t">Match</span>' : '<span class="bad-t">Miss</span>'}</td></tr>`).join("");
  h += `</tbody></table></div><p class="muted small">Select a question to open its full answer in Ask.</p>`;
  $("#eval-out").innerHTML = h;
}

/* Sources and method */
function renderSources(){
  let h = `<div class="prose"><header class="sec-h"><h2>Sources and method</h2></header>`
    + `<h3>How answers are produced</h3><p>The prototype searches ${INDEX.n} verified fact cards with keyword ranking (BM25). Each card holds one figure or fact with its source document, page, as-of date and status: current, superseded, initial or variant. Cards about the same item form a group, so an answer always shows the current figure and lists earlier or conflicting ones. Questions that name a crisis rank that crisis’s cards first.</p>`
    + `<p>No language model writes the answers in this version. Every number shown comes from a card checked against its source, and figures the prototype calculates are labelled as calculations.</p>`
    + `<h3>Scope rules</h3><p>Four rules stop the prototype from answering what public documents cannot support: a National Committee’s own campaign results, cleared messages and images, per-gift impact claims, and forecasts.</p>`
    + `<h3>Data rules</h3><p>Public documents only. The page shows short facts and links to the original documents and does not store UNICEF files. It uses no UNICEF logo or branded material. Differences between documents are described as variants, not errors.</p>`
    + `<h3>Limitations</h3><ul class="list"><li>Draft data v0.2 (5 November 2026): every figure re-checked against its source; final review pending.</li><li>The evaluation questions were also used to tune the rules; a held-out set is still needed.</li><li>Funding totals in situation reports are not campaign results.</li><li>PFP figures come from the Executive Board briefing slides; the formal report was not online on 5 November. Sudan appeal page numbers were checked on a copy hosted by UNICEF USA and still need confirming in the UNICEF file.</li></ul></div>`;
  h += `<h3 class="h3">Documents</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>ID</th><th>Document</th><th>Date</th></tr></thead><tbody>`;
  h += Object.entries(DOCS).map(([id, d]) => `<tr><td>${refLink(id)}</td><td><a class="plain" href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.t)}</a></td><td>${esc(d.pub)}</td></tr>`).join("");
  h += `</tbody></table></div>`;
  $("#sources-out").innerHTML = h;
}

/* Views and wiring */
const VIEWS = ["ask","crises","brief","evaluation","sources"];
function show(view){
  if (!VIEWS.includes(view)) view = "ask";
  VIEWS.forEach(v => { $("#view-" + v).hidden = v !== view; const t = $(`.tab[data-view="${v}"]`); t.setAttribute("aria-selected", String(v === view)); t.tabIndex = v === view ? 0 : -1; });
}
function init(){
  $("#chip-meta").textContent = `${INDEX.n} fact cards · ${Object.keys(DOCS).length} documents · 2 crises`;
  $(".chips").innerHTML = EXAMPLES.map(([l, q]) => `<button type="button" data-q="${esc(q)}" title="${esc(q)}">${esc(l)}</button>`).join("");
  $("#q").value = EXAMPLES[0][1];
  renderAnswer(EXAMPLES[0][1]);
  $("#ask-form").addEventListener("submit", e => { e.preventDefault(); const q = $("#q").value.trim(); if (q) renderAnswer(q); });
  document.addEventListener("click", e => {
    const qb = e.target.closest("[data-q]");
    if (qb){ $("#q").value = qb.dataset.q; renderAnswer(qb.dataset.q); if (!$("#view-ask").hidden) return; location.hash = "ask"; show("ask"); window.scrollTo(0, 0); }
  });
  $$(".seg-crisis button").forEach(b => b.addEventListener("click", () => renderCrisis(b.dataset.k)));
  $$(".seg-brief button").forEach(b => b.addEventListener("click", () => renderBrief(b.dataset.k)));
  $("#copy-brief").addEventListener("click", () => {
    const st = $("#copy-status");
    try {
      navigator.clipboard.writeText(briefText).then(() => { st.textContent = "Brief copied with sources."; }, () => { st.textContent = "Copying is blocked here. Select the brief text and copy it."; });
    } catch (err) { st.textContent = "Copying is blocked here. Select the brief text and copy it."; }
  });
  $$(".tab").forEach(t => t.addEventListener("click", () => { location.hash = t.dataset.view; show(t.dataset.view); }));
  window.addEventListener("hashchange", () => show(location.hash.slice(1)));
  renderCrisis("sudan"); renderBrief("v3"); renderEval(); renderSources();
  show(location.hash.slice(1));
}
init();
