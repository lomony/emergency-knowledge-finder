// Runs the development set (30 questions) and the reserve questions against src/engine.js.
// Usage: node eval/run_eval.js   (exit code 1 if any development-set check fails)
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "src", "engine.js"), "utf8");
const E = new Function(src + "\nreturn {runEval, answer, INDEX, CARDS};")();
const today = new Date("2026-11-05T12:00:00Z"); // fixed date so the update-overdue check is reproducible
const pad = (s, n) => String(s).padEnd(n);

const dev = E.runEval(today);
console.log("Development set: 30 questions (the rules were tuned on this set)\n");
for (const r of dev) {
  console.log(`${pad(r.id, 4)} ${pad(r.type, 15)} expected ${pad(r.exp, 19)} got ${pad(r.got, 19)} ${r.bOk ? "behaviour ok" : "BEHAVIOUR MISS"}  ${r.sOk ? "source ok" : "SOURCE MISS"}`);
}
const b = dev.filter(r => r.bOk).length, s = dev.filter(r => r.sOk).length;
console.log(`\nBehaviour ${b}/${dev.length} | Source ${s}/${dev.length} | Searchable fact cards ${E.INDEX.n} of ${E.CARDS.length}`);

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

// Regression checks: cases found in review on 6 November 2026. They test fixes, not accuracy,
// so they are kept apart from the development and reserve sets.
const regression = [
  ["X1", "Is the Sudan appeal US$962.9 million?", r => r.behaviour !== "ABSTAIN" && r.primary && r.primary.id === "S1", "answers with the requirement, not a gift-impact refusal"],
  ["X2", "Has UNICEF received US$352.2M for Sudan?", r => r.behaviour === "CLARIFY_DEFINITION", "flags that US$352.2M is mobilised, not received"],
  ["X3", "Can we say US$100 provides clean water for a family in Sudan?", r => r.behaviour === "ABSTAIN", "still refuses a per-gift impact claim"],
  ["X4", "Compare the funding gaps for Sudan and Nepal", r => r.behaviour === "MULTI_PART" && r.parts.map(p => p.primary && p.primary.id).join() === "S10,N6", "answers both crises, each from its own card"]
];
console.log("\nRegression checks\n");
let xb = 0;
for (const [id, q, test, what] of regression) {
  const ok = test(E.answer(q, today)); if (ok) xb++;
  console.log(`${pad(id, 4)} ${ok ? "ok  " : "FAIL"} ${what}`);
}
console.log(`\nRegression ${xb}/${regression.length}`);
process.exit(b === dev.length && s === dev.length && xb === regression.length ? 0 : 1);
