# Emergency Knowledge Finder

A working prototype of a search and governance layer for emergency fundraising knowledge. A fundraiser asks a question in plain English and gets the current, source-of-record figure with its as-of date, page reference and a link to the document it came from. If the question relies on an outdated figure, the prototype corrects it. If the answer depends on a definition, it asks which one is meant. If the public evidence cannot support an answer, it says so and points to who can help.

It is built from public UNICEF documents about two emergencies: the crisis in Sudan (the 2026 Humanitarian Action for Children appeal and situation reports) and the 2026 flash floods in Nepal.

> **Independent portfolio prototype.** Not a UNICEF product, and not affiliated with or endorsed by UNICEF. Draft data v0.2 (5 November 2026): every figure has been re-checked against its source, and final review is in progress. Check the linked source before using any figure.

![The Ask view correcting an outdated funding figure for Sudan](docs/img/ask.png)

## The problem

In the first days of an emergency, fundraisers in National Committees and country offices all need the same few facts: how many children are affected, what UNICEF is appealing for, how much has been raised and what the money will do. Those figures change with every situation report. Older numbers keep circulating in decks, appeal pages and emails, and terms that sound alike mean different things: "mobilised" is not "received", and "children in need" is not "children UNICEF aims to reach".

This prototype explores one way to deal with that. It is designed to sit on top of the repositories a fundraising team already uses (such as SharePoint sites and the WeShare asset library), not to replace them. It adds what those repositories lack on their own:

- a register of which document is the source of record for each kind of figure;
- a status for every figure: current, superseded, initial or variant;
- search that respects both, so an older figure is never returned as the answer.

## What is in the app

| View | What it shows |
|---|---|
| **Ask** | Type a question or pick an example. The answer gives the figure, its as-of date, the document and page, its status, and the behaviour the prototype chose. |
| **Crises** | One page each for Sudan and the Nepal floods: current figures with dates and sources, how key figures changed over time, and variants and update checks. |
| **72-hour brief** | A knowledge brief on the Nepal floods for fundraising teams, in three versions (29 Aug, 31 Aug and 13 Oct 2026). Each version lists what changed since the previous one and can be copied as plain text with its sources. |
| **Evaluation** | The 30 evaluation questions, run live in the page, with the result for each. |
| **Sources and method** | How answers are produced, the scope and data rules, limitations and the document list. |

![Version 3 of the 72-hour brief on the Nepal floods](docs/img/brief.png)

## How it answers

Every answer carries one of seven behaviours.

| Behaviour | When it is used | Example question |
|---|---|---|
| `ANSWER` | A current figure answers the question. | "Which five 2026 appeals have the largest funding requirements?" |
| `ANSWER_CALC` | The answer needs a calculation from published figures. The formula and inputs are shown and labelled as a calculation. | "What share of UNICEF's 2026 global appeal is for Sudan?" |
| `ANSWER_FLAG` | A current figure exists but needs a caveat: documents differ slightly, an update is overdue, or the figure belongs to another agency. | "What is the total 2026 funding requirement for Sudan?" |
| `CORRECT_PREMISE` | The question quotes a figure that has been superseded. | "Our appeal page says the Sudan appeal is only 16% funded. Is that still right?" |
| `CLARIFY_DEFINITION` | The honest answer depends on which definition is meant. | "How much money has UNICEF received for Sudan this year?" |
| `ABSTAIN` | The public documents hold no evidence for the claim, such as per-gift impact or a forecast. | "What does a $50 gift provide for families hit by the Nepal floods?" |
| `REFUSE_ROUTE` | The answer is held in internal systems. The prototype says where to ask instead. | "Which photos and key messages are cleared for our Sudan campaign?" |

## How it works

- **Fact cards, not whole documents.** The prototype searches 41 fact cards. Each card holds one figure or fact with its source document, page, as-of date and status. Cards about the same item form a group, and the group decides which figure is current.
- **Keyword ranking (BM25)** with a light stemmer, synonyms and a stopword list. When a question names a crisis, cards from that crisis rank higher and cards from the other crisis lower; global cards are not affected.
- **Premise check.** Numbers in the question are compared with the figures in the matching group. A number that matches a superseded figure but not the current one triggers a correction.
- **Definition checks.** Some cards carry clarification triggers. For example, a question about money "received" "this year" for Sudan gets the received figure, with an explanation of how it differs from the larger "mobilised" total.
- **Labelled calculations.** Derived figures show their formula and inputs.
- **Update checks.** A card can record when the next report is due, and the answer is flagged once that date has passed.
- **Scope rules** stop the prototype from answering four kinds of question that public documents cannot support: a National Committee's own campaign results, cleared messages and images, per-gift impact, and forecasts.
- **No language model writes the answers** in this version. Every number shown comes from a card checked against its source.

The logic is in [`src/engine.js`](src/engine.js) (data, search and answer rules) and the interface in [`src/ui.js`](src/ui.js).

## Evaluation

[`eval/`](eval/) holds 30 questions written the way a fundraiser would ask them, from four roles: National Committee digital and partnerships staff, the PFP emergency fundraising team, and country office private sector fundraisers. Twenty are normal questions. Ten are traps, two of each type:

| Trap | What it tests |
|---|---|
| T1 Stale | The question relies on a superseded figure. |
| T2 No evidence | The claim has no support in the documents. |
| T3 Variant | Documents give slightly different figures for the same thing. |
| T4 Definition | The answer depends on which definition is meant. |
| T5 Internal | The answer is held in internal systems only. |

Five reserve questions (R1 to R5) test the same behaviours with new questions. They were also seen during development.

| Check | Result |
|---|---|
| Follows the expected behaviour | 30 of 30 |
| Cites an expected source | 30 of 30 |
| Reserve questions: follows the expected behaviour | 5 of 5 |

**Read these results with care.** The rules and cards were tuned on these same questions, so the scores show that the prototype works as designed, not how it handles new questions. A held-out set, with questions written independently of the rules and questions gathered from interviews with fundraisers, will be scored before any results are claimed. Figure accuracy and as-of dates are scored by hand in the workbook.

Run the evaluation with `node eval/run_eval.js` (or `npm test`).

## Metadata and governance

[`schema/`](schema/) defines the metadata that makes each answer checkable:

- [`figure.schema.json`](schema/figure.schema.json) (JSON Schema 2020-12): 28 fields for one published figure, including value, unit, qualifier, as-of date, source document and location, a short source quote, calculation basis, status, source-of-record flag, authority rank, what it supersedes and, for calculated figures, how it was derived.
- [`document.schema.json`](schema/document.schema.json): 22 fields for each source document, including type, crisis, publication date, status, what it is the source of record for, its content owner, what triggers a review and how it may be stored.
- [`controlled-lists.json`](schema/controlled-lists.json): the allowed values for crisis, document type, metric type, qualifier, status, authority rank, role and task moment, each with a definition.
- [`source-of-record-rules.md`](schema/source-of-record-rules.md): which document is the authority for each kind of figure, and how newer or conflicting figures are handled.

[`data/corpus.csv`](data/corpus.csv) is the document register: 23 documents, 22 of them with a public link (one Executive Board document could not be found online). The documents themselves are not stored here. The workbook in [`eval/`](eval/) holds the questions, schemas and rules on separate sheets, with columns for the reviewer's sign-off.

## Repository layout

```
docs/index.html     the built app: one self-contained page, also served by GitHub Pages
docs/img/           screenshots used in this README
src/                app source: engine.js, ui.js, head.html, body.html
scripts/build.js    assembles docs/index.html from src/
eval/               evaluation questions (CSV and workbook) and run_eval.js
schema/             JSON Schemas, controlled lists and source-of-record rules
data/corpus.csv     document register (links only)
```

## Running it

Open `docs/index.html` in a browser. There is nothing to install.

After editing anything in `src/`, rebuild the page and run the evaluation again:

```
node scripts/build.js
node eval/run_eval.js
```

Both need Node.js 18 or later and no other packages. GitHub Actions runs the same steps on every push and fails if a question no longer gets its expected behaviour and source, or if `docs/index.html` is out of date.

To publish the app with GitHub Pages, go to Settings, then Pages, choose "Deploy from a branch", and select `main` and the `/docs` folder. On a free GitHub plan, Pages works only for public repositories.

## Data rules

- Public documents only. The app shows short facts with page references and links to the original documents. It does not store or redistribute UNICEF files.
- No UNICEF logo or branded material.
- Differences between documents are described as variants, not errors.
- Funding totals in situation reports describe appeal funding. They are not fundraising campaign results.

## Limitations

- Draft data v0.2: figures were re-checked against their sources on 5 November 2026, and final human review is in progress. Page references for six questions still need confirming against the UNICEF-hosted copy of the Sudan appeal.
- Two crises and 14 documents so far.
- Keyword search only. A question worded very differently from the cards may not find the right one; the prototype then abstains rather than guess.
- The evaluation questions were also used to develop the rules (see above).

## How it was built

The author set the brief, scope and evaluation approach and is reviewing every figure before release. Claude (Anthropic) drafted the code, evaluation questions and schemas and re-checked each figure against its source document. Other AI models reviewed the concept and the evaluation design.

## Licence

The code is released under the MIT licence (see [LICENSE](LICENSE)). Figures and short quotations come from public UNICEF documents and remain subject to UNICEF's terms of use; this repository links to those documents rather than copying them.

Prototype by Jeerana Noymanee.
