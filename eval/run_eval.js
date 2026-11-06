// Runs the development set (30 questions) and the reserve questions against src/engine.js.
// Usage: node eval/run_eval.js   (exit code 1 if any development-set check fails)
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "src", "engine.js"), "utf8");
const E = new Function(src + "\nreturn {runEval, answer, INDEX, CARDS, CARD, QUESTIONS, scoreStrict};")();
const today = new Date("2026-11-05T12:00:00Z"); // fixed date so the update-overdue check is reproducible
const pad = (s, n) => String(s).padEnd(n);

const dev = E.runEval(today);
console.log("Development set: 30 questions (the rules were tuned on this set)\n");
for (const r of dev) {
  console.log(`${pad(r.id, 4)} ${pad(r.type, 15)} expected ${pad(r.exp, 19)} got ${pad(r.got, 19)} ${r.bOk ? "behaviour ok" : "BEHAVIOUR MISS"}  ${r.sOk ? "source ok" : "SOURCE MISS"}  ${r.strict ? "strict ok" : "STRICT MISS"}`);
  if (!r.strict) console.log(`     complete ${r.complete}, cited ${r.cited}, dated ${r.dated}${r.missing.length ? "; missing: " + r.missing.join(", ") : ""}${r.unsupported.length ? "; wrong source: " + r.unsupported.join(", ") : ""}`);
}
const b = dev.filter(r => r.bOk).length, s = dev.filter(r => r.sOk).length;
const st = dev.filter(r => r.strict).length;
console.log(`\nBehaviour ${b}/${dev.length} | Source ${s}/${dev.length} | Searchable fact cards ${E.INDEX.n} of ${E.CARDS.length}`);
console.log(`Strict ${st}/${dev.length} (expected behaviour; every gold figure shown with its value and unit; each from a card citing an expected document; as-of date matches)`);

const reserve = [
  ["R1", "How many people are internally displaced in Sudan?", "ANSWER_FLAG"],
  ["R2", "Funding for Nepal went from 23% to 51%. Can we tell donors support doubled?", "CLARIFY_DEFINITION"],
  ["R3", "How many schools did the Nepal floods damage or destroy?", "ANSWER_FLAG"],
  ["R4", "How many children in Sudan will a US$1 million gift help?", "ABSTAIN"],
  ["R5", "Our page says about 10,000 children need education support after the Nepal floods. Is that current?", "CORRECT_PREMISE"]
];
console.log("\nReserve questions (also seen during development)\n");
let rb = 0;
for (const [id, q, exp] of reserve) {
  const r = E.answer(q, today);
  const ok = r.behaviour === exp; if (ok) rb++;
  console.log(`${pad(id, 4)} expected ${pad(exp, 19)} got ${pad(r.behaviour, 19)} ${ok ? "ok" : "MISS"}`);
}
console.log(`\nReserve behaviour ${rb}/${reserve.length}`);

// Regression checks: cases found in review on 6 November 2026 (X1-X4) and in a second review (X5-X11). They test fixes, not accuracy,
// so they are kept apart from the development and reserve sets.
const regression = [
  ["X1", "Is the Sudan appeal US$962.9 million?", r => r.behaviour !== "ABSTAIN" && r.primary && r.primary.id === "S1", "answers with the requirement, not a gift-impact refusal"],
  ["X2", "Has UNICEF received US$352.2M for Sudan?", r => r.behaviour === "CLARIFY_DEFINITION", "flags that US$352.2M is mobilised, not received"],
  ["X3", "Can we say US$100 provides clean water for a family in Sudan?", r => r.behaviour === "ABSTAIN", "still refuses a per-gift impact claim"],
  ["X4", "Compare the funding gaps for Sudan and Nepal", r => r.behaviour === "MULTI_PART" && r.parts.map(p => p.primary && p.primary.id).join() === "S10,N6", "answers both crises, each from its own card"],
  ["X5", "How much donation funding has UNICEF received for Sudan?", r => r.behaviour === "CLARIFY_DEFINITION", "the word donation alone does not trigger the gift-impact refusal"],
  ["X6", "How much has UNICEF received for Sudan?", r => r.behaviour === "CLARIFY_DEFINITION", "any question about money received gets the received/mobilised check"],
  ["X7", "What was Sudan's funding gap in February 2026?", r => r.behaviour === "ANSWER_PERIOD" && r.primary.id === "S6", "answers for the month asked, not the latest month"],
  ["X8", "What was the Sudan funding gap at the end of June 2026?", r => r.primary && r.primary.id === "S8", "one month asked: the figure for that month, not a change between two dates"],
  ["X9", "What was the Sudan funding gap in March 2026?", r => r.behaviour === "ANSWER_FLAG" && /No figure for March 2026/.test(r.notes.join(" ")), "says when there is no figure for the month asked"],
  ["X10", "How many children did the Nepal floods affect as of 31 August?", r => r.primary && r.primary.id === "N3i", "a how-many question gets a card with figures, for the date asked"],
  ["X11", "What will the Sudan funding gap be at the end of 2026?", r => r.behaviour === "ABSTAIN" && r.near && r.near.id === "S10", "a refused forecast shows the latest published figure, not a calculation"]
];
console.log("\nRegression checks\n");
let xb = 0;
for (const [id, q, test, what] of regression) {
  const ok = test(E.answer(q, today)); if (ok) xb++;
  console.log(`${pad(id, 4)} ${ok ? "ok  " : "FAIL"} ${what}`);
}
console.log(`\nRegression ${xb}/${regression.length}`);

// Scorer checks: the strict scorer must fail answers that are broken on purpose.
const Q = id => E.QUESTIONS.find(x => x.id === id);
const swapText = (c, from, to) => Object.assign({}, c, {text:c.text.split(from).join(to), facts:c.facts && c.facts.map(f => [f[0], f[1].split(from).join(to)])});
const broken = [
  ["S1", "Q07", "funding gap changed from 63% to 163%", r => { r.primary = swapText(r.primary, "(63%)", "(163%)"); }],
  ["S2", "Q07", "US$352.2M changed to US$352.25M", r => { r.primary = swapText(r.primary, "US$352.2M", "US$352.25M"); }],
  ["S3", "Q13", "US$1.1 million removed, US$351.1M still shown", r => { r.primary = swapText(r.primary, "about US$1.1 million", "a small amount"); }],
  ["S4", "Q09", "12 million changed to 1.2 million", r => { r.primary = swapText(r.primary, "12 million", "1.2 million"); }],
  ["S5", "Q07", "answered with the February card", r => { r.primary = E.CARD.S6; }],
  ["S6", "Q21", "earlier figure not shown", r => { r.premise = null; }],
  ["S7", "Q18", "basis-change caveat dropped", r => { r.flag = ""; }],
  ["S8", "Q25", "variant credited to the wrong document", r => { r.variants = r.variants.map(c => Object.assign({}, c, {doc:"D10"})); }]
];
console.log("\nScorer checks (each broken answer must fail strict scoring)\n");
let sb = 0;
for (const [id, qid, what, breakIt] of broken) {
  const r = E.answer(Q(qid).q, today); breakIt(r);
  const sc = E.scoreStrict(Q(qid), r); const caught = !(sc.complete && sc.cited && sc.dated); if (caught) sb++;
  console.log(`${pad(id, 4)} ${caught ? "ok  " : "FAIL"} ${qid}: ${what}`);
}
console.log(`\nScorer ${sb}/${broken.length}`);
process.exit(b === dev.length && s === dev.length && st === dev.length && xb === regression.length && sb === broken.length ? 0 : 1);
