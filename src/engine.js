/* ===== Data: documents (public sources) ===== */
const DOCS = {
  D01:{t:"HAC 2026 Overview", url:"https://www.unicef.org/media/177341/file/UNICEF-2026-HAC-Overview.pdf", pub:"Dec 2025"},
  D02:{t:"HAC 2026 Overview (web page)", url:"https://www.unicef.org/documents/unicef-humanitarian-action-children-appeal-2026-overview", pub:"8 Dec 2025 (modified 13 Jan 2026)"},
  D03:{t:"HAC 2026: Sudan appeal", url:"https://www.unicef.org/media/177086/file/2026-HAC-Sudan%282%29.pdf", pub:"Dec 2025"},
  D04:{t:"Sudan Situation Report No. 40", url:"https://www.unicef.org/sudan/media/19256/file/Sudan%20SitRep%20February%202026.pdf.pdf", pub:"As of 28 Feb 2026"},
  D06:{t:"Sudan Situation Report No. 42", url:"https://www.unicef.org/media/182151/file", pub:"As of 30 Apr 2026"},
  D08:{t:"Sudan Situation Report No. 44 (Mid-Year)", url:"https://www.unicef.org/media/183591/file/Sudan-Humanitarian-Situation-Report-No.%2044%20(Mid-Year),30-June-2026.pdf.pdf", pub:"Published 7 Aug 2026"},
  D09:{t:"Sudan Situation Report No. 45", url:"https://www.unicef.org/sudan/reports/unicef-sudan-humanitarian-situation-report-july-2026", pub:"As of 31 Jul 2026"},
  D10:{t:"Sudan Situation Report No. 46", url:"https://www.unicef.org/sudan/media/20641/file/UNICEF%20Sudan%20August%202026%20SitRep%20-%20Approved%20by%20RO.pdf.pdf", pub:"Published 28 Oct 2026"},
  D11:{t:"Press release: Nepal flash floods", url:"https://www.unicef.org/press-releases/flash-floods-nepal-leave-more-17000-children-need-urgent-humanitarian-assistance", pub:"27 Aug 2026"},
  D12:{t:"Nepal Situation Report No. 1", url:"https://www.unicef.org/nepal/media/31146/file", pub:"31 Aug 2026"},
  D18:{t:"Nepal Situation Report No. 7", url:"https://www.unicef.org/nepal/media/31801/file/UNICEF%20Nepal%20-%20Humanitarian%20Situation%20Report%20No.%207%20%2813%20October%202026%29.pdf.pdf", pub:"13 Oct 2026"},
  D19:{t:"Nepal floods situation reports (index)", url:"https://www.unicef.org/nepal/reports/nepal-floods-2026-humanitarian-situation-reports", pub:"Checked 5 Nov 2026"},
  D20:{t:"UNICEF Funding Compendium 2025", url:"https://www.unicef.org/reports/funding-compendium-2025", pub:"Jul 2026"},
  D21:{t:"PFP 2025 results briefing (Executive Board)", url:"https://www.unicef.org/executiveboard/media/38256/file/2026-AS-Informal-PFP-financial-report-Haddad-Mardini-PPT-EN-2026-05-15.pdf", pub:"15 May 2026"}
};

/* Date every source was last checked for newer reports. "Latest" always means latest in this prototype as of this date. */
const SOURCES_CHECKED = "5 Nov 2026";

/* ===== Data: verified fact cards (draft v0.2, re-checked 5 Nov 2026; final review pending) ===== */
const SDN_REQ = 962866106, GLB_REQ = 7661245305;
const SHARE = (SDN_REQ / GLB_REQ * 100).toFixed(1);
const CARDS = [
  {id:"G1", group:"GLB-hac", title:"HAC 2026 global appeal", text:"UNICEF is appealing for US$7.66 billion in 2026 (table total US$7,661,245,305) to reach 117 million people, including 73 million children, in 133 countries and territories.", asOf:"Dec 2025", d:"2025-12-08", status:"current", doc:"D01", loc:"p.16 and headline figures", kw:"global appeal appealing total requirement how much 2026 hac humanitarian action for children aim reach people children countries territories", nums:["7.66","7661245305","117","73","133"]},
  {id:"G3", group:"GLB-need", title:"Children in need in 2026", text:"More than 200 million children are expected to need humanitarian assistance in 2026 (UNICEF estimate). The 2026 appeal aims to reach 73 million of them (117 million people in total).", asOf:"Dec 2025", d:"2025-12-08", status:"current", doc:["D01","D02"], loc:"Headline figures", kw:"children need humanitarian assistance help 2026 how many expected estimate plan reach", nums:["200","73"]},
  {id:"G4", group:"GLB-top", title:"Largest 2026 appeals", text:"The five largest 2026 requirements: Sudan US$962.9M, Afghanistan US$949.1M, State of Palestine (Gaza Strip and West Bank) US$673.8M, Syrian Arab Republic US$481.4M and Democratic Republic of the Congo US$402.7M (marked preliminary). Ethiopia is sixth at US$401.5M.", asOf:"Dec 2025", d:"2025-12-08", status:"current", doc:"D01", loc:"p.16, Funding Required in 2026",
    facts:[["1. Sudan","US$962,866,106"],["2. Afghanistan","US$949,074,566"],["3. State of Palestine (Gaza Strip and West Bank)","US$673,830,000"],["4. Syrian Arab Republic","US$481,432,714"],["5. Democratic Republic of the Congo (preliminary)","US$402,730,214"],["6. Ethiopia","US$401,508,000"],["7. Ukraine and Refugee Response","US$387,900,943"],["8. Lebanon","US$376,800,000"],["9. Myanmar","US$267,186,048"],["10. Haiti","US$256,598,900"]],
    kw:"largest biggest top five ten appeals requirements ranking rank afghanistan palestine gaza syria congo ethiopia ukraine lebanon myanmar haiti"},
  {id:"G5", group:"GLB-currency", title:"How current HAC appeal data are", text:"UNICEF states that the data and context in each HAC appeal reflect the situation at the document’s stated publication date, and that appeals may be updated periodically to reflect changes in context and funding.", asOf:"8 Dec 2025 (page modified 13 Jan 2026)", d:"2025-12-08", status:"current", doc:"D02", loc:"Overview page", kw:"how current currency information hac appeal up to date publication date updated periodically revised data reflect situation"},
  {id:"G6", group:"GLB-private", title:"UNICEF income in 2025 (Funding Compendium)", text:"UNICEF’s total income in 2025 was US$8,084M. Private sector income was US$2,209M (27%) and public sector income US$5,523M (69%).", asOf:"2025 (published Jul 2026)", d:"2026-07-30", status:"current", doc:"D20", loc:"p.3, Executive summary", kw:"private sector raise raised income 2025 how much unicef total income public share compendium", nums:["8084","2209","27","5523","69"]},
  {id:"G7", group:"GLB-private", title:"Private sector fundraising results 2025 (PFP)", text:"PFP reports that UNICEF’s private sector ecosystem raised US$2.215 billion in 2025, 19.7% more than in 2024.", asOf:"2025 (briefing 15 May 2026)", d:"2026-05-15", status:"current", doc:"D21", loc:"Slide 2 (total); slide 4 (growth)", kw:"private sector raise raised fundraising revenue results 2025 ecosystem growth pfp how much", nums:["2.215","19.7"]},
  {id:"G8", group:"GLB-pfp-split", title:"Where private sector revenue came from (2025)", text:"About 83% of 2025 private sector revenue came through National Committees and about 17% through country offices. 90% of private sector regular resources came from individual supporters.", asOf:"2025 (briefing 15 May 2026)", d:"2026-05-15", status:"current", doc:"D21", loc:"Slide 4 (confirm against E/ICEF/2026/AB/L.5)", kw:"share national committees country offices came through split individual supporters regular resources private sector revenue 2025 where", nums:["83","17","90"]},
  {id:"G9", group:"GLB-top-nc", title:"Top National Committees for regular resources (2025)", text:"France, Germany, Japan, the Republic of Korea and Spain were the top National Committee contributors of regular resources in 2025 (listed alphabetically; no ranking given). More than half of UNICEF’s total regular resources came from the private sector.", asOf:"2025 (briefing 15 May 2026)", d:"2026-05-15", status:"current", doc:"D21", loc:"Slides 3 and 4 (confirm against E/ICEF/2026/AB/L.5)", kw:"which national committees gave most top contributors regular resources core france germany japan korea spain 2025"},
  {id:"C1", group:"C-share", title:"Sudan’s share of the 2026 global appeal", text:`Sudan accounts for about ${SHARE}% of the 2026 global appeal.`, derived:true, derivation:"US$962,866,106 ÷ US$7,661,245,305, both from the HAC 2026 overview table. Calculated by this prototype, not published.", asOf:"Dec 2025", d:"2025-12-08", status:"current", doc:"D01", loc:"p.16", kw:"share percentage percent proportion part sudan global appeal 2026"},

  {id:"S1", group:"SDN-req", title:"Sudan 2026 funding requirement", text:"UNICEF’s 2026 requirement for Sudan is US$962,866,106 (about US$962.9 million).", asOf:"2026 appeal", d:"2026-02-05", status:"current", doc:["D03","D01"], loc:"D03 p.4; D01 p.16 (source of record)", kw:"total funding requirement sudan 2026 appeal how much needed ask amount", nums:["962.9","962866106","963"]},
  {id:"S1v", group:"SDN-req", title:"Variant in Situation Report No. 40", text:"Report No. 40 shows US$962.9 million in its funding chart, but its text says US$963 million in one sentence and US$962.6 million in another.", asOf:"28 Feb 2026", d:"2026-02-28", status:"variant", doc:"D04", loc:"p.1 chart; p.2 text", kw:"variant sudan requirement report 40", nums:["962.6"]},
  {id:"S2", group:"SDN-sectors", title:"Sudan 2026 requirement by sector", text:"Nutrition has the largest requirement (US$257.2M), followed by WASH (US$225.4M), health including public health emergencies (US$173.4M), child protection and GBViE (US$150.0M), education (US$77.2M), social protection (US$58.7M) and cross-sectoral work on AAP, SBC and PSEA (US$20.9M).", asOf:"2026 appeal", d:"2026-02-05", status:"current", doc:"D03", loc:"p.4, funding requirements table",
    facts:[["Nutrition","US$257,220,326"],["Water, sanitation and hygiene","US$225,444,667"],["Health (incl. public health emergencies)","US$173,439,014"],["Child protection and GBViE","US$150,020,620"],["Education","US$77,159,895"],["Social protection","US$58,681,584"],["Cross-sectoral (AAP, SBC, PSEA)","US$20,900,000"],["Total","US$962,866,106"]],
    kw:"sector split sectors breakdown which sector needs most largest nutrition wash water sanitation hygiene health child protection education social protection cross-sectoral"},
  {id:"S3", group:"SDN-need", title:"People and children in need in Sudan", text:"33.7 million people, including 17.3 million children, need humanitarian assistance in Sudan in 2026 (preliminary 2026 Humanitarian Needs and Response Plan figures).", asOf:"2026 appeal", d:"2026-02-05", status:"current", doc:"D03", loc:"p.1, In need", kw:"in need people children humanitarian assistance help unicef sudan how many need million", nums:["33.7","17.3"],
    clarify:{when:[["17.3","help"],["17.3","reach"],["17.3","support"],["17.3","assist"]], text:"No. 17.3 million is the number of children in need. UNICEF’s appeal aims to reach 7.9 million children (13.8 million people), so 17.3 million should not be presented as the number UNICEF will help."}},
  {id:"S4", group:"SDN-plan", title:"What UNICEF plans to deliver in Sudan in 2026", text:"UNICEF aims to reach 7.9 million children (13.8 million people) in Sudan in 2026.", asOf:"2026 appeal", d:"2026-02-05", status:"current", doc:"D03", loc:"p.1, To be reached; Key planned targets",
    facts:[["Children and women accessing primary health care","3.6 million"],["Children with severe wasting admitted for treatment","633,611"],["Children accessing formal or non-formal education","1.6 million"],["People accessing water for drinking and domestic needs","12 million"]],
    kw:"plan planned deliver targets key targets to be reached reach sudan 2026 primary health care severe wasting education water", nums:["7.9","13.8"]},
  {id:"S6", group:"SDN-funding", title:"Sudan funding status, 28 Feb 2026", text:"US$149.9M mobilised (US$22.8M received in 2026 plus US$127.1M carried forward from 2025): 16% funded, 84% gap.", asOf:"28 Feb 2026", d:"2026-02-28", status:"superseded", doc:"D04", loc:"Funding overview", kw:"funding status funded gap mobilised sudan february percent", nums:["16","149.9","22.8","84"]},
  {id:"S7", group:"SDN-funding", title:"Sudan funding status, 30 Apr 2026", text:"US$191.3M mobilised; funding gap US$771.6M (80%).", asOf:"30 Apr 2026", d:"2026-04-30", status:"superseded", doc:"D06", loc:"Funding overview", kw:"funding status april gap mobilised sudan", nums:["191.3","771.6","80"]},
  {id:"S8", group:"SDN-funding", title:"Sudan funding status, 30 Jun 2026", text:"US$351.1M mobilised: US$96.4M received in 2026, US$127.6M other resources and US$127.1M carried forward from 2025 (36% of the requirement; 64% gap, US$611.8M).", asOf:"30 Jun 2026", d:"2026-06-30", status:"superseded", doc:"D08", loc:"p.2, Funding overview", kw:"funding status june mid-year mobilised received carried forward other resources sudan", nums:["351.1","96.4","36","64","611.8"]},
  {id:"S9", group:"SDN-funding", title:"Sudan funding status, 31 Jul 2026", text:"US$352.2M mobilised against the US$962.9M appeal; 63% gap.", asOf:"31 Jul 2026", d:"2026-07-31", status:"superseded", doc:"D09", loc:"Highlights", kw:"funding status july mobilised sudan", nums:["352.2","63"]},
  {id:"S10", group:"SDN-funding", title:"Sudan funding status, 31 Aug 2026 (latest)", text:"US$352.2M mobilised against the US$962.9M appeal, leaving a funding gap of US$610.7M (63%).", asOf:"31 Aug 2026", d:"2026-08-31", status:"current", doc:"D10", loc:"p.1 Funding overview; Annex B p.11",
    facts:[["Humanitarian resources received in 2026","US$97,531,794"],["Other resources used in 2026","US$127,628,543"],["Carried forward from 2025","US$127,055,683"],["Funding gap","US$610,650,086 (63%)"]],
    basis:"“Mobilised” adds three things: humanitarian resources received in 2026, other resources used in 2026, and funds carried forward from 2025.",
    kw:"latest current funding status funded gap mobilised received money sudan appeal how much this year so far", nums:["352.2","610.7","63","97.5","127.6","127.1"],
    clarify:{when:[["received","this year"],["received","so far"],["received","in 2026"],["received","352"],["money","this year"]], text:"Humanitarian resources received in 2026 were US$97.5M, about 10% of the requirement (calculated). The US$352.2M “mobilised” total also counts US$127.6M of other resources used in 2026 and US$127.1M carried forward from 2025, so it should not be described as money received this year."}},
  {id:"C2", group:"C-growth", title:"Sudan appeal funding growth, end of June to end of August 2026", text:"Funds mobilised for Sudan grew by about US$1.1 million between 30 June and 31 August 2026 (US$351.1M to US$352.2M). Humanitarian resources received in 2026 rose from US$96.4M to US$97.5M.", derived:true, derivation:"352.2 − 351.1 and 97.5 − 96.4, from Reports No. 44 and No. 46. Calculated by this prototype, not published.", asOf:"30 Jun and 31 Aug 2026", d:"2026-08-31", status:"current", doc:["D08","D10"], loc:"D08 p.2; D10 p.1", kw:"grow growth grew increase increased change between end june august funding momentum flat how much sudan appeal"},
  {id:"S11", group:"SDN-results", title:"Sudan results, January to August 2026", text:"January to August 2026: 348,438 children with severe wasting admitted for treatment (55% of target); 7.2 million people with access to safe water (60% of target); 1.2 million children, adolescents and caregivers reached with community-based mental health and psychosocial support.", asOf:"31 Aug 2026", d:"2026-08-31", status:"current", doc:"D10", loc:"pp.3-4",
    facts:[["Children with severe wasting admitted for treatment","348,438 (55% of target)"],["People with access to safe water","7.2 million (60% of target)"],["Children, adolescents and caregivers reached with mental health and psychosocial support","1.2 million"]],
    kw:"achieved achievements results so far delivered reached progress sudan 2026 treatment severe wasting water mental health"},
  {id:"S12", group:"SDN-results", title:"Sudan results, January to June 2026", text:"174,737 children with severe acute malnutrition treated; 6.6 million people with access to safe water; 1.3 million children reached with education services.", asOf:"30 Jun 2026", d:"2026-06-30", status:"superseded", doc:"D08", loc:"p.1 and p.4", note:"Report No. 44 says “treated”; Report No. 46 says “admitted for treatment”. Check definitions before comparing.", kw:"results mid-year june achieved sudan", nums:["174737","6.6","1.3"]},
  {id:"S13", group:"SDN-aug", title:"Sudan: what changed in August 2026", text:"Escalating conflict in Blue Nile, Darfur and Kordofan displaced more than 58,000 people in August 2026 alone.", asOf:"31 Aug 2026", d:"2026-08-31", status:"current", doc:"D10", loc:"p.1, Highlights", kw:"changed change august new developments escalation escalating conflict displaced blue nile darfur kordofan supporters know update", nums:["58000"]},
  {id:"S14", group:"SDN-cost", title:"Why the Sudan response costs so much", text:"Rising operational costs come from hyperinflation, market volatility, insecurity and logistical barriers. Moving 50 tonnes from Port Sudan to hard-to-reach areas of Darfur and Kordofan costs about US$53,000, around five times the cost of shipping the same volume from Asia to Port Sudan. The requirement includes 8% for programme support.", asOf:"2026 appeal", d:"2026-02-05", status:"current", doc:"D03", loc:"Endnotes 37-38", kw:"why cost costs expensive so much hyperinflation inflation fuel insecurity access logistics transport programme support darfur kordofan port sudan"},
  {id:"S15", group:"SDN-ccc", title:"Standards the Sudan appeal follows", text:"The appeal states it is aligned with the revised Core Commitments for Children in Humanitarian Action (CCCs), which are based on global standards and norms for humanitarian action.", asOf:"2026 appeal", d:"2026-02-05", status:"current", doc:"D03", loc:"p.3", kw:"standards standard follow aligned alignment core commitments ccc norms humanitarian action framework"},
  {id:"S16", group:"SDN-idp", title:"Internally displaced people in Sudan", text:"Report No. 46 gives 8,583,274 internally displaced people in its Situation in numbers box, citing IOM DTM.", asOf:"31 Aug 2026", d:"2026-08-31", status:"current", doc:"D10", loc:"p.1", kw:"internally displaced idp idps displacement displaced people sudan how many", nums:["8583274"]},
  {id:"S16v", group:"SDN-idp", title:"Variant in the same report", text:"The narrative of Report No. 46 says the number fell from 11.5 million to 8.66 million.", asOf:"31 Aug 2026", d:"2026-08-31", status:"variant", doc:"D10", loc:"p.2", kw:"idp narrative", nums:["8.66","11.5"]},
  {id:"S16o", group:"SDN-idp", title:"Earlier figure", text:"Reports No. 40 and No. 44 showed 9,139,309 internally displaced people.", asOf:"30 Jun 2026", d:"2026-06-30", status:"superseded", doc:"D08", loc:"p.1", kw:"idp earlier", nums:["9139309"]},

  {id:"N1", group:"NPL-event", title:"What happened in Nepal", text:"Severe flash floods began on 26 August 2026. Situation Report No. 1 lists Rasuwa, Nuwakot, Dhading, Gorkha and Tanahun districts; the government declared 15 municipalities disaster-affected for three months. The first press release (27 August) named Rasuwa, Nuwakot and Dhading.", asOf:"31 Aug 2026", d:"2026-08-31", status:"current", doc:["D12","D11"], loc:"D12 situation overview; D11", kw:"what happened nepal when where which districts hit affected flash floods flood rasuwa nuwakot dhading gorkha tanahun municipalities august"},
  {id:"N2", group:"NPL-impact", title:"First figures (press release, 27 Aug)", text:"At least 17,000 children affected; an estimated 332 deaths, including at least 14 children; hundreds missing.", asOf:"27 Aug 2026", d:"2026-08-27", status:"initial", doc:"D11", loc:"Press release", kw:"children affected deaths killed died missing nepal floods impact", nums:["17000","332","14"]},
  {id:"N3i", group:"NPL-impact", title:"Impact in Situation Report No. 1 (31 Aug)", text:"About 65,000 people affected, including 22,100 children; 903 deaths reported and rising; about 4,247 missing.", asOf:"31 Aug 2026", d:"2026-08-31", status:"superseded", doc:"D12", loc:"Situation in numbers", kw:"affected deaths missing nepal impact", nums:["65000","22100","903","4247"]},
  {id:"N5", group:"NPL-impact", title:"Latest impact figures (Situation Report No. 7)", text:"84,270 people affected, including 32,021 children; 1,458 deaths and 5,285 people missing, including 195 children (government data of 9 October); 595 people still in nine holding centres.", asOf:"9 Oct 2026", d:"2026-10-13", status:"current", doc:"D18", loc:"Situation in numbers; Highlights", kw:"latest children affected people affected deaths killed died missing nepal floods impact how many current", nums:["84270","32021","1458","5285","195","595"]},
  {id:"N4", group:"NPL-first", title:"What UNICEF did in the first days (to 31 Aug)", text:"By 31 August, UNICEF and partners had delivered the first wave of supplies and services listed below. Cash support was planned, not yet delivered.", asOf:"31 Aug 2026", d:"2026-08-31", status:"current", doc:"D12", loc:"Response sections",
    facts:[["WASH supplies","About 19,000 people reached, incl. 3,820 hygiene kits"],["Mental health and psychosocial support","1,052 people supported, incl. 237 children and adolescents; two helplines active"],["Nutrition supplies dispatched","500 cartons of therapeutic food; 560 cartons of micronutrient powder"],["Health supplies pre-positioned","433 bed nets; 500 newborn kits; three medical tents"],["Child protection","Tracing supported for at least 107 possibly separated children"],["Cash (planned)","About US$100 per household for about 13,000 households"]],
    kw:"first days initial early response immediately first week what did unicef do nepal floods supplies hygiene kits psychosocial helplines therapeutic food bed nets newborn kits tents tracing cash"},
  {id:"N3f", group:"NPL-funding", title:"Funding in Situation Report No. 1 (31 Aug)", text:"Requirement US$17,243,050; 23% available, including a US$2.5M Emergency Programme Fund loan; 77% gap.", asOf:"31 Aug 2026", d:"2026-08-31", status:"superseded", doc:"D12", loc:"Funding", kw:"funding available gap nepal epf loan", nums:["23","77","2.5"]},
  {id:"N6", group:"NPL-funding", title:"Nepal appeal funding (Situation Report No. 7)", text:"Requirement US$17,243,050; received US$8,776,695 (51%); gap US$8,466,355 (49%).", asOf:"13 Oct 2026", d:"2026-10-13", status:"current", doc:"D18", loc:"Funding status table, footnotes 1-2",
    basis:"Received funds exclude Emergency Programme Fund loans and pipeline funding. They include a US$2.5M US Government contribution.",
    flag:"Basis changed between reports. Report No. 1’s 23% “available” included a US$2.5M EPF loan, so 23% and 51% are not directly comparable.",
    kw:"appeal appealing how much funded funding received gap nepal requirement ask", nums:["17.2","17243050","8776695","51","8466355","49"],
    clarify:{when:[["23"],["doubled"],["double"]], text:"Not on these numbers. Report No. 1’s 23% included a US$2.5M Emergency Programme Fund loan, while Report No. 7’s 51% counts received funds only and excludes EPF loans and pipeline funding."}},
  {id:"N7", group:"NPL-results", title:"What UNICEF has delivered in Nepal (to 9 Oct)", text:"Cumulative results as of 9 October 2026.", asOf:"9 Oct 2026", d:"2026-10-13", status:"current", doc:"D18", loc:"Results sections and summary table",
    facts:[["Hygiene kits","More than 9,000, reaching 35,589 people"],["Water","About 36,000 people (8,974 households) regained or kept access"],["Psychological first aid in schools","894 children"],["Education","1,481 children through 52 temporary learning centres"],["Cash transfers","934 households (target 4,419)"],["Family reunification","73 children reunified"]],
    kw:"delivered so far to date results achieved reached nepal hygiene kits water psychological first aid education temporary learning centres cash transfers reunified"},
  {id:"N9", group:"NPL-edu", title:"Children needing education support in Nepal", text:"30,000 children need education assistance.", asOf:"13 Oct 2026", d:"2026-10-13", status:"current", doc:"D18", loc:"Situation in numbers", kw:"education children need education support assistance school schools learning nepal how many", nums:["30000"]},
  {id:"N9o", group:"NPL-edu", title:"First education figure (press release, 27 Aug)", text:"About 10,000 school-age children need urgent education support.", asOf:"27 Aug 2026", d:"2026-08-27", status:"initial", doc:"D11", loc:"Press release", kw:"education school-age children support nepal", nums:["10000"]},
  {id:"N10", group:"NPL-schools", title:"Schools damaged or destroyed in Nepal (latest count)", text:"At least 19 schools damaged or destroyed, as of Situation Report No. 1.", asOf:"31 Aug 2026", d:"2026-08-31", status:"current", doc:"D12", loc:"Key impacts", flag:"Report No. 7 (13 October) gives no school-damage count, so this is the latest count available. The first press release gave a different breakdown.", kw:"schools school damaged destroyed nepal floods how many count", nums:["19"]},
  {id:"N10v", group:"NPL-schools", title:"Press release count (27 Aug)", text:"18 schools destroyed and 20 damaged.", asOf:"27 Aug 2026", d:"2026-08-27", status:"variant", doc:"D11", loc:"Press release", kw:"schools destroyed damaged", nums:["18","20"]},
  {id:"N8", group:"NPL-cadence", title:"Nepal situation report schedule", text:"Seven reports were published between 31 August and 13 October 2026 (31 Aug; 4, 8, 16 and 22 Sep; 5 and 13 Oct). Report No. 7 said the next report was due on 28 October 2026.", asOf:"Index checked 5 Nov 2026", d:"2026-11-05", status:"current", doc:["D19","D18"], loc:"Index page; Report No. 7 cover", nextDue:"2026-10-28", checked:"5 November 2026",
    kw:"how often published publish situation reports schedule cadence frequency latest current next report due update nepal"},

  /* Brief-only cards: used by the 72-hour brief, not by search */
  {id:"B0", group:"BRIEF", search:false, title:"Situation at T+72h", text:"Flash floods struck Rasuwa, Nuwakot and Dhading districts on 26 August 2026.", asOf:"27 Aug 2026", d:"2026-08-27", status:"initial", doc:"D11", loc:"Press release"},
  {id:"B1", group:"BRIEF", search:false, title:"First response (press release)", text:"UNICEF is sending pre-positioned medical tents, bed nets, newborn kits and therapeutic food; hygiene kits are reaching thousands of households; mental health and psychosocial support teams are deployed; UNICEF is helping trace and reunite separated children; emergency cash assistance is being arranged with the government.", asOf:"27 Aug 2026", d:"2026-08-27", status:"initial", doc:"D11", loc:"Press release"},
  {id:"B2", group:"BRIEF", search:false, title:"Funding ask (press release)", text:"UNICEF is appealing for US$17.2 million to sustain the emergency response and support early recovery. No funding status published yet.", asOf:"27 Aug 2026", d:"2026-08-27", status:"initial", doc:"D11", loc:"Press release"},
  {id:"B3", group:"BRIEF", search:false, title:"Schools and health facilities (press release)", text:"18 schools destroyed and 20 damaged; about 10,000 school-age children need urgent education support; at least four health facilities severely damaged.", asOf:"27 Aug 2026", d:"2026-08-27", status:"initial", doc:"D11", loc:"Press release"},
  {id:"B4", group:"BRIEF", search:false, title:"Schools and health facilities (Report No. 1)", text:"At least 19 schools damaged or destroyed; six health facilities destroyed or damaged.", asOf:"31 Aug 2026", d:"2026-08-31", status:"superseded", doc:"D12", loc:"Key impacts"}
];

const GROUP_NOTES = {
  "SDN-req":"Use the HAC figure, the source of record for requirements. The difference is noted, not judged.",
  "SDN-idp":"IOM DTM updates often. Cite it directly, with its date.",
  "GLB-private":"Two published figures from different reports, which may use different bases. Use the Funding Compendium for UNICEF’s income share and the PFP report for fundraising results. Do not merge or average them."
};
const PARALLEL = new Set(["GLB-private"]);

/* ===== Scope rules: questions the public corpus must not answer ===== */
const RULES = [
  {type:"REFUSE_ROUTE", name:"Internal: National Committee campaign results", re:/\b(our|my)\s+(national committee|natcom)\b|\bcampaign[- ](results?|performance)\b|\bcompared? with other national committees\b/i,
   msg:"Campaign-level National Committee results are internal. They are not in the public documents this prototype uses.", route:"The PFP Emergency Fundraising Unit, or internal fundraising reports."},
  {type:"REFUSE_ROUTE", name:"Internal: cleared messages and images", re:/\b(cleared|approved|sign[- ]?off)\b[^?]*\b(photos?|images?|messages?|messaging|assets?|visuals?)\b|\b(photos?|images?|key messages?)\b[^?]*\b(cleared|approved)\b/i,
   msg:"Cleared messages and images are managed in internal systems and clearance processes, not in public documents.", route:"Your communications or clearance focal point, and the internal asset library."},
  {type:"ABSTAIN", name:"No evidence: gift impact", re:/\b(gifts?|donations?)\b|\bper[- ](child|family|dollar|donor|person)\b|(\$|us\$|usd|aud|eur|€|£)\s?\d[\d,.]*(?![\d.,]|\s?(k|m|bn|million|billion)\b)\s+(can\s+|could\s+|will\s+|would\s+)?(provides?|buys?|pays?\s+for|feeds?|vaccinates?|protects?|helps?|supports?)\b/i,
   msg:"The public documents give no cost-per-child or per-gift impact figures for this response. The prototype will not build one from supply counts or appeal totals.", route:"The approved gift-impact statements from your fundraising team."},
  {type:"ABSTAIN", name:"No evidence: forecast", re:/\b(forecast|projection|projected|predict(ed|ion)?)\b|\bwill\b[^?]*\bbe\b[^?]*\b(end of|by the end|next year|by december|in 2027)\b/i,
   msg:"No forecast exists in the sources, and the prototype does not predict figures.", route:"The latest reported figure with its date, and the next situation report when it is published."}
];

/* ===== Search: BM25 over fact cards ===== */
const STOP = new Set("a an the of for to in on and or is are was were be been by with what which who whom how much many does do did has have had this that these those it its at as from about into than then so our we us you your their there here can could would should will may might per vs not no yes still right say like whether just one ones".split(" "));
const SYN = {kill:"death", die:"death", died:"death", dead:"death", death:"death", fatalit:"death", kid:"children", child:"children",
  fund:"fund", money:"fund", financ:"fund", displac:"idp", idp:"idp", biggest:"largest", top:"largest", appealing:"appeal"};
function norm(s){ return String(s).toLowerCase().replace(/[’']/g,"'"); }
function stem(t){
  if (/^\d/.test(t)) return t;
  if (t.length>5 && t.endsWith("ing")) return t.slice(0,-3);
  if (t.length>4 && t.endsWith("ed")) return t.slice(0,-2);
  if (t.length>3 && t.endsWith("s") && !t.endsWith("ss")) return t.slice(0,-1);
  return t;
}
function tokens(s){
  const raw = norm(s).match(/\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?|[a-z]+/g) || [];
  const out = [];
  for (let t of raw){
    if (/^\d/.test(t)){ out.push(t.replace(/,/g,"")); continue; }
    if (STOP.has(t)) continue;
    const s1 = stem(t); out.push(s1);
    if (SYN[s1] && SYN[s1] !== s1) out.push(SYN[s1]);
  }
  return out;
}
function numsIn(s){
  const out = []; const re = /\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/g; let m;
  while ((m = re.exec(s))){ let n = m[0].replace(/,/g,""); n = n.replace(/\.0+$/,""); if (/^(19|20)\d\d$/.test(n)) continue; out.push(n); }
  return out;
}
const docsOf = c => Array.isArray(c.doc) ? c.doc : [c.doc];
const CRISIS_OF = {"C-share":["GLB","SDN"], "C-growth":["SDN"], "BRIEF":["NPL"]};
CARDS.forEach(c => { c.crisis = CRISIS_OF[c.group] || [c.group.split("-")[0]]; });
const CRISIS_RE = {SDN:/\bsudan(ese)?\b|darfur|kordofan|khartoum/i, NPL:/\bnepal(i)?\b|rasuwa|nuwakot|dhading|gorkha|tanahun/i};
function crisisOfQuery(q){ return Object.keys(CRISIS_RE).filter(k => CRISIS_RE[k].test(q)); }
const GROUPS = {};
CARDS.forEach(c => { (GROUPS[c.group] = GROUPS[c.group] || []).push(c); });
const CARD = Object.fromEntries(CARDS.map(c => [c.id, c]));
const INDEX = (() => {
  const docs = CARDS.filter(c => c.search !== false).map(c => {
    const text = [c.title, c.title, c.text, c.kw || "", (c.facts || []).map(f => f.join(" ")).join(" "), c.basis || ""].join(" ");
    const tk = tokens(text); const tf = {};
    tk.forEach(t => tf[t] = (tf[t] || 0) + 1);
    return {card:c, tf, len:tk.length};
  });
  const df = {}; docs.forEach(d => Object.keys(d.tf).forEach(t => df[t] = (df[t] || 0) + 1));
  const avg = docs.reduce((a, d) => a + d.len, 0) / docs.length;
  return {docs, df, avg, n:docs.length};
})();
function search(q, only){
  const k1 = 1.4, b = 0.6, qt = [...new Set(tokens(q))], named = only || crisisOfQuery(q);
  return INDEX.docs.map(d => {
    let s = 0;
    for (const t of qt){
      const f = d.tf[t]; if (!f) continue;
      const idf = Math.log(1 + (INDEX.n - INDEX.df[t] + 0.5) / (INDEX.df[t] + 0.5));
      s += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / INDEX.avg));
    }
    if (s > 0 && named.length){
      const own = d.card.crisis;
      if (named.some(k => own.includes(k))) s *= 1.25;
      else if (!own.includes("GLB")) s *= 0.35;
    }
    return {card:d.card, score:s};
  }).filter(x => x.score > 0).sort((a, b2) => b2.score - a.score);
}
const byDate = (a, b) => (a.d || "").localeCompare(b.d || "");
function latestCurrent(groupCards){ const cur = groupCards.filter(c => c.status === "current").sort(byDate); return cur[cur.length - 1]; }
function flagOf(c, today){
  if (c.flag) return c.flag;
  if (c.nextDue && today > new Date(c.nextDue + "T23:59:59Z")) return `Report No. 8 was due on 28 October 2026 and was not listed when the index was checked on ${c.checked}. Treat the latest figures as possibly out of date.`;
  return "";
}
const MIN_SCORE = 1.5;
function answer(q, today){
  today = today || new Date();
  for (const r of RULES){
    if (r.re.test(q)){
      const hits = search(q);
      const top = hits.length ? hits[0].card : null;
      const near = top ? (top.status === "current" ? top : latestCurrent(GROUPS[top.group]) || top) : null;
      return {behaviour:r.type, rule:r, near, hits, cites:new Set(), notes:[], variants:[], history:[], others:[]};
    }
  }
  const named = crisisOfQuery(q);
  if (named.length > 1) return answerParts(q, today, named);
  return answerFrom(q, today, search(q));
}
/* A question that names two crises is answered once per crisis, so a partial answer cannot pass as a complete one. */
const CRISIS_NAME = {SDN:"Sudan", NPL:"Nepal floods"};
function answerParts(q, today, named){
  const parts = named.map(k => Object.assign(answerFrom(q, today, search(q, [k]).filter(x => x.card.crisis.includes(k))), {crisis:k, crisisName:CRISIS_NAME[k] || k}));
  const cites = new Set(); parts.forEach(p => p.cites.forEach(d => cites.add(d)));
  const notes = [];
  const missing = parts.filter(p => !p.primary).map(p => p.crisisName);
  if (missing.length) notes.push(`No verified figure for ${missing.join(" and ")} answers this question. Only the other part is answered.`);
  const groups = parts.filter(p => p.primary).map(p => p.primary.group.split("-")[1]);
  if (groups.length > 1 && groups.every(g => g === "funding")) notes.push("The two funding figures are not on the same basis. Sudan reports funds mobilised, including other resources and funds carried forward from 2025; Nepal reports funds received, excluding loans. Compare the gap percentages with care, and give both dates.");
  const hits = parts.flatMap(p => p.hits).sort((a, b) => b.score - a.score);
  return {behaviour:"MULTI_PART", parts, partial:missing.length > 0, notes, cites, hits, variants:[], history:[], others:[]};
}
function answerFrom(q, today, hits){
  if (!hits.length || hits[0].score < MIN_SCORE)
    return {behaviour:"ABSTAIN", rule:{name:"No matching evidence", msg:"Nothing in the corpus answers this question.", route:"Rephrase the question, or add a source document to the corpus."}, hits, cites:new Set(), notes:[], variants:[], history:[], others:[]};
  const top = hits[0].card, g = GROUPS[top.group];
  const res = {hits, top, notes:[], cites:new Set(), variants:[], history:[], others:[]};
  let primary = top, behaviour = "ANSWER";
  const qn = numsIn(q), ql = norm(q);
  if (PARALLEL.has(top.group)){
    res.others = g.filter(c => c.status === "current" && c !== top);
    behaviour = "ANSWER_FLAG"; res.notes.push(GROUP_NOTES[top.group]);
  } else {
    const cur = latestCurrent(g);
    if (top.status !== "current"){
      primary = cur || top;
      if (top.status !== "variant"){
        const curN = new Set(cur ? (cur.nums || []) : []);
        const premise = qn.filter(n => (top.nums || []).includes(n) && !curN.has(n));
        if (premise.length){ behaviour = "CORRECT_PREMISE"; res.premise = top; }
      }
    }
    res.variants = g.filter(c => c.status === "variant");
    res.history = g.filter(c => c.status === "superseded" || c.status === "initial").sort(byDate);
    if (res.variants.length && behaviour === "ANSWER"){ behaviour = "ANSWER_FLAG"; }
    if (res.variants.length && GROUP_NOTES[top.group]) res.notes.push(GROUP_NOTES[top.group]);
  }
  if (primary.clarify && primary.clarify.when.some(set => set.every(t => ql.includes(t)))){ behaviour = "CLARIFY_DEFINITION"; res.clarify = primary.clarify.text; }
  const fl = flagOf(primary, today);
  if (behaviour === "ANSWER" && primary.derived) behaviour = "ANSWER_CALC";
  if (behaviour === "ANSWER" && fl) behaviour = "ANSWER_FLAG";
  if (fl) res.flag = fl;
  res.primary = primary; res.behaviour = behaviour;
  [primary, ...res.others, ...(res.premise ? [res.premise] : []), ...res.variants].forEach(c => docsOf(c).forEach(d => res.cites.add(d)));
  return res;
}

/* ===== Evaluation set (development set v0.1) ===== */
const QUESTIONS = [
  ["Q01","Normal","PFP-EF","What is UNICEF appealing for in 2026, and how many people and children does the appeal aim to reach?","ANSWER",["D01"]],
  ["Q02","Normal","NC-PART","Which five 2026 appeals have the largest funding requirements?","ANSWER",["D01"]],
  ["Q03","Normal","NC-DIG","What share of UNICEF's 2026 global appeal is for Sudan?","ANSWER_CALC",["D01"]],
  ["Q04","Normal","NC-DIG","How many children will need humanitarian help in 2026, and how many does UNICEF plan to reach?","ANSWER",["D01","D02"]],
  ["Q05","Normal","PFP-EF","What share of UNICEF's 2025 private sector revenue came through National Committees, and where did private regular resources come from?","ANSWER",["D21"]],
  ["Q06","Normal","NC-PART","Which National Committees gave the most regular resources in 2025?","ANSWER",["D21"]],
  ["Q07","Normal","NC-DIG","What is the latest funding status of UNICEF's Sudan appeal?","ANSWER",["D10"]],
  ["Q08","Normal","NC-PART","How is the Sudan 2026 requirement split by sector, and which sector needs the most?","ANSWER",["D03"]],
  ["Q09","Normal","NC-PART","What does UNICEF plan to deliver for children in Sudan in 2026?","ANSWER",["D03"]],
  ["Q10","Normal","CO-PSFR","What has UNICEF achieved in Sudan so far in 2026?","ANSWER",["D10"]],
  ["Q11","Normal","CO-PSFR","What changed in Sudan in August 2026 that our supporters should know?","ANSWER",["D10"]],
  ["Q12","Normal","NC-PART","Why does the Sudan response cost so much?","ANSWER",["D03"]],
  ["Q13","Normal","PFP-EF","How much did funding for the Sudan appeal grow between the end of June and the end of August 2026?","ANSWER_CALC",["D08","D10"]],
  ["Q14","Normal","CO-PSFR","Which humanitarian standards does the Sudan appeal follow?","ANSWER",["D03"]],
  ["Q15","Normal","NC-DIG","What happened in Nepal, when, and which districts were hit?","ANSWER",["D12","D11"]],
  ["Q16","Normal","CO-PSFR","What did UNICEF do in the first days after the Nepal floods?","ANSWER",["D12"]],
  ["Q17","Normal","CO-PSFR","What has UNICEF delivered in Nepal so far?","ANSWER",["D18"]],
  ["Q18","Normal","NC-PART","How much is UNICEF appealing for in Nepal, and how much is funded?","ANSWER_FLAG",["D18","D12"]],
  ["Q19","Normal","PFP-EF","How often has UNICEF Nepal published flood situation reports, and is the latest one current?","ANSWER_FLAG",["D19","D18"]],
  ["Q20","Normal","PFP-EF","How current is the information in a UNICEF HAC appeal?","ANSWER",["D02"]],
  ["Q21","T1 Stale","NC-DIG","Our appeal page says the Sudan appeal is only 16% funded. Is that still right?","CORRECT_PREMISE",["D04","D10"]],
  ["Q22","T1 Stale","NC-DIG","Can we still say the Nepal floods affected 17,000 children and killed 332 people?","CORRECT_PREMISE",["D11","D18"]],
  ["Q23","T2 No evidence","NC-DIG","What does a $50 gift provide for families hit by the Nepal floods?","ABSTAIN",[]],
  ["Q24","T2 No evidence","PFP-EF","What will the Sudan funding gap be at the end of 2026?","ABSTAIN",[]],
  ["Q25","T3 Variant","NC-DIG","What is the total 2026 funding requirement for Sudan?","ANSWER_FLAG",["D03","D01","D04"]],
  ["Q26","T3 Variant","PFP-EF","How much did UNICEF raise from the private sector in 2025?","ANSWER_FLAG",["D20","D21"]],
  ["Q27","T4 Definition","NC-DIG","How much money has UNICEF received for Sudan this year?","CLARIFY_DEFINITION",["D10"]],
  ["Q28","T4 Definition","NC-PART","We'd like to say UNICEF will help 17.3 million children in Sudan this year. Is that right?","CLARIFY_DEFINITION",["D03"]],
  ["Q29","T5 Internal","NC-PART","How much has our National Committee raised for the Nepal floods appeal, and how do we compare with other National Committees?","REFUSE_ROUTE",[]],
  ["Q30","T5 Internal","NC-DIG","Which photos and key messages are cleared for our Sudan campaign?","REFUSE_ROUTE",[]]
].map(([id,type,persona,q,exp,docs]) => ({id,type,persona,q,exp,docs}));
function runEval(today){
  return QUESTIONS.map(x => {
    const r = answer(x.q, today);
    const bOk = r.behaviour === x.exp;
    const sOk = x.docs.length ? x.docs.some(d => r.cites.has(d)) : (r.behaviour === "ABSTAIN" || r.behaviour === "REFUSE_ROUTE");
    return Object.assign({}, x, {got:r.behaviour, bOk, sOk, top:r.primary ? r.primary.id : (r.near ? r.near.id : "")});
  });
}
