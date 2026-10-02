---
name: "textbook-content-extractor"
description: Extract online textbook chapters into source-faithful text when reproduction is authorized, or into concise bilingual study notes otherwise. Capture in-scope questions, answers, and referenced figures, maps, charts, and source images. Use when the user wants to extract, digitise, or prepare chapter content for practice tests.
argument-hint: "Chapter or paragraphs to extract into bilingual English-Dutch Markdown"
user-invocable: true
---

# Textbook content extractor

Reads a chapter of an online textbook (through the user's open Chrome tab) and saves it as a structured, **bilingual (English + Dutch)** Markdown file. That file is the source of truth for other skills, mainly **chapter-test-generator**, so it can write bilingual tests without going back to the browser. Faithful, complete, well-labelled extraction matters more than speed: a gap here silently becomes a gap in every test built on it.

## Hard rules

- **Read only.** Never submit an exercise, click "check/controleer", type into an answer field, or change anything in the student's account. Answers on this platform appear only after submitting, so they are usually not available. Do not work around this.
- **Never invent book content.** If something is not on the page, say so in the file. Do not fill gaps from memory or the internet.
- **The source is the source of truth.** Never invent, silently correct, summarize, or interpret text that is being transcribed. Follow the verbatim-mode and copyright rules below to decide whether to transcribe or paraphrase.

## Verbatim mode and copyright

- When the user asks for verbatim extraction, transcribe the original exactly only when the material is user-authored, public domain, or the user confirms they are authorized to reproduce it. Preserve wording, spelling, punctuation, capitalization, numbering, and paragraph structure. Mark unreadable text as `[unreadable]`; never guess or repair it.
- Keep the source transcription unchanged. If a translation is requested, place it separately, label it as a translation, and do not present it as verbatim source text. Do not add explanations, summaries, suggested answers, or interpretations in verbatim mode unless the user separately requests them.
- Do not reproduce a full chapter or extensive exercise text verbatim from copyrighted commercial textbooks or online platforms, even when the user can access them. For those sources, provide only brief necessary quotations and concise, clearly labeled paraphrases or study notes. An account subscription is not by itself permission to reproduce the content.
- If reproduction rights are unclear, ask whether the material is user-authored, public domain, or otherwise authorized. Until clarified, use the concise-notes/paraphrase approach and say so.
- A caption or description is not the same as an image asset. Do not download or embed copyrighted textbook images unless the user confirms they are authorized for reuse. For inaccessible or copyrighted visuals, record the source ID, caption, where it is referenced, and a concise description of visible relevant information instead.

## 1. Confirm scope

Ask only what is unclear: subject, book title, level/year, and which chapter(s) or paragraphs. If the user requests verbatim extraction and reproduction rights are unclear, clarify whether the source is user-authored, public domain, or authorized for reproduction. Ask whether a separate translation is wanted; never alter the original transcription. Default scope: the whole chapter, including Summary and At a glance / Samenvatting. Also note the source's *original language*.

## 2. Extract from Chrome

Two ways in. Check which one is available before starting:

**A. Live browser (preferred).** Use the browser tools available to GitHub Copilot in VS Code (`open_browser_page`, `navigate_page`, `read_page`, `click_element`, and `screenshot_page`) on the user's open textbook tab. If those tools are not available to this session, use the offline fallback instead.

**B. Offline files (fallback).** Read screenshots and PDFs the user has put in `./input/<subject>/<topic>/`, using the available workspace file/image readers. Apply the verbatim-mode and copyright rules above. Never invent unreadable content; record gaps explicitly. If the subject/topic folder is empty, ask the user to place the chapter pages there.

Never silently fall back to memory or the internet when neither is available. Say what is missing and stop.

1. Read the chapter menu (`read_page`) to list every paragraph, and the Summary / At a glance pages. Record this list; it is your checklist.
2. For each paragraph, in order:
  - **Theory (Lesstof):** open it and read with `read_page`. If the result is thin, use `screenshot_page` and inspect the visible page. In authorized verbatim mode, transcribe the visible source exactly. Otherwise capture concise, source-grounded notes, headings, definitions, highlighted key terms, examples, and the full data of any table without reproducing long passages.
  - **Referenced visuals:** make an inventory of every figure, map, graph, photo, diagram, or source panel referenced by the theory or an exercise. Inspect the visual itself using the available image control or screenshot; do not rely on its caption alone. Record its source ID, exact visible caption/title, where it is referenced, and the visual details needed to understand that reference. For maps, note the area, legend, symbols, labels, and only the legible values relevant to the reference. For charts, note title, axes, units, series/legend, period, and relevant legible values. For photos/illustrations, describe only observable content and attribution; do not infer motives, identity, or causation from appearance alone. Transcribe or copy table/chart data only to the extent permitted and legible; mark unreadable or unavailable details rather than guessing.
  - **Image assets:** if the image is user-provided, user-authored, public domain, or the user confirms reuse is authorized, save the relevant asset under `./output/<subject>/<topic>/media/` with a stable descriptive filename and embed it from the chapter file using a relative Markdown path, for example `![Source 1.2: short accessible description](media/source-1-2.png)`. Preserve its caption, source/creator attribution, and any license information. Do not hotlink temporary authenticated asset URLs. If copying is not authorized or the image cannot be downloaded, do not create a substitute or screenshot copy; include the visual record and explain the limitation.
  - **Exercises (Opdrachten):** this is part of every chapter extraction by default. Open and inspect every listed exercise type in scope, including Assignment, Support, Challenge, Final assignment, and other question items; do not stop after reading Theory. In authorized verbatim mode, transcribe each question, its sub-parts and options exactly. Otherwise record a stable question ID, concise faithful paraphrase, all sub-parts, response format, essential short answer options, and every source/table/figure/image it uses. For copyrighted material, describe lengthy source material and relevant values rather than copying it in full. Cross-link each exercise to the corresponding visual record by source ID, and report if that referenced visual could not be inspected.
   - **Answers:** record an answer only if the book shows it without submitting anything (for example a visible answer, a model answer, or an answer section). Otherwise write `Answer: not available in book`.
  - **Coverage log:** count the questions inspected per paragraph and distinguish captured questions from items that were inaccessible or intentionally excluded by the user's scope. Never imply an exercise was captured based on its menu label alone.
3. Move through the book by navigating, not by interacting with exercises. If a page will not load or is behind something you cannot reach, stop, say which page, and ask the user to open it or upload screenshots/PDF.
4. For long chapters, save progress as you go (append each paragraph to the file) so an interruption does not lose work.

## 3. Translate (English and Dutch)

Keep the original-language text unchanged in verbatim mode. Add a separate translation only when requested; label it clearly as a translation. In concise-notes mode, provide the requested bilingual notes for headings, theory, key terms, figure descriptions, question paraphrases, essential answer options, source descriptions, and visible answers.

- **Order and block structure in bilingual notes or requested translations:** Dutch first in italics in its own Markdown paragraph; put English directly below in a separate Markdown paragraph. Do not combine the two languages in one paragraph, one list item line, or a `Dutch / English` inline pair; the study site's language toggle uses these separate blocks to show one language at a time. For list items, keep the Dutch and English versions as separate paragraphs inside the same list item. Mark the source's original language with `(original)` and any added version with `(translation)` so nobody mistakes a translation for the book's text. In source-only verbatim mode, omit unrequested translations.
- **Terminology:** subject terms must be consistent across the whole chapter, and consistent with the book. Where the book is in English, use the standard Dutch school term (world trade = wereldhandel, developing country = ontwikkelingsland, globalisation = globalisering). Where the book is in Dutch, use the standard English term. Build the glossary as you go and reuse it. If there is no standard equivalent, keep the original term and add the other in brackets.
- **Natural school language for translations:** use natural Dutch a 3 vwo student would read and natural English while preserving the source meaning. Keep numbers, names, and structure aligned. This rule applies only to separately labeled translations, never to the source transcription.
- **Preserve in the source transcription:** proper names, place names, quotations, units, figures, wording, and punctuation exactly as shown. If a translation is requested, translate separately and retain the unchanged original alongside it.
- **Answer options:** keep the same letters/order in both languages, so a multiple-choice question maps one-to-one.
- **Uncertain translation:** if a term or sentence is ambiguous, translate the most likely meaning and add `[check translation]` after it. Flag these in the Extraction notes.
- Suggested answers (section 4) are only for concise-notes mode. In verbatim mode, do not add suggested answers unless the user explicitly asks for a separate study section.

## 4. Optional: suggested answers

In concise-notes mode, when the book gives no answer, a suggested answer may help test building, but only if grounded in the chapter's own theory. Ask whether suggested answers are wanted; default to yes in concise-notes mode and no in verbatim mode. If requested, add one on a separate line, clearly labeled, in both languages:

`Suggested answer (derived from §1.2, unverified): ...`

Skip suggested answers when the question depends on a figure you could not read or on knowledge outside the chapter. Never present a suggested answer as the book's answer. Ask once whether they are wanted; default to yes only in concise-notes mode and no in verbatim mode.

## 5. Output format

One file per chapter, named `<Subject>_<Book>_Chapter-<n>_content_EN-NL.md`. Use this structure so downstream skills can parse it. In source-only verbatim mode, retain the section structure but omit translation blocks the user did not request:

```markdown
---
subject: Geography
book: buiteNLand
level: 3 vwo
chapter: 1
chapter_title_en: ...
chapter_title_nl: ...
original_language: en        # language the book is written in
languages: [en, nl]       # list only languages actually present in the file
source: Noordhoff (apps.noordhoff.nl)
extracted: YYYY-MM-DD
paragraphs: [1.1, 1.2, 1.3, ...]
---

# Chapter 1: <EN title>
*Hoofdstuk 1: <NL titel>*

## §1.1 <EN paragraph title>
*§1.1 <NL paragraaftitel>*

### Theory / Lesstof
**EN (original transcription, when authorized)**
<exact source text, headings and paragraph breaks preserved>

*NL (translation, if requested)*
*<separate translation; never substitute it for or alter the source text>*

### Key terms / Begrippen
| English | Nederlands | Definition (EN) | Definitie (NL) |
|---|---|---|---|
| ... | ... | ... | ... |

### Verwezen afbeeldingen en bronnen / Referenced visuals
- Source 1.2 — Used in: §1.1, Q1.1.3.
  *NL: <bijschrift, visuele beschrijving, relevante leesbare details, bronvermelding en status/bestandspad indien toegestaan>*
  EN: <caption, visual description, relevant legible details, attribution, and asset status/path if authorized>
  ![Source 1.2: <short accessible description>](media/source-1-2.png)  (include only when asset reuse is authorized)
- Table or chart data, when included, must identify its source visual and preserve units, labels, and time period. Do not infer values from an unreadable graphic.

### Questions / Opdrachten
**Q1.1.3** (a)
*NL (translation): <vraag, opties A-D, bron>*

EN (original): <question text, options A-D, referenced source>

*Antwoord: <boekantwoord of niet beschikbaar in het boek>*

Answer: <book answer or not available in book>
- Suggested answer (derived from §1.1, unverified): EN: ... *NL: ...*   (optional)

## Summary / Samenvatting (At a glance)
<same bilingual pattern>

## Extraction notes
- Anything missing, unreadable, skipped, or uncertain, by paragraph.
- Translations flagged [check translation].
```

Keep question IDs stable (`Q<paragraph>.<number>`) so test-generator answer keys can trace back to them.

## 6. Check before delivering

- Every paragraph on the chapter menu appears in the file (compare with your checklist).
- Every in-scope exercise type was inspected, and every readable question has an entry; counts per paragraph and any inaccessible or excluded items are stated.
- Every visual referenced by theory or a question has a record with its source ID, caption, cross-reference, inspection status, and relevant visible details; any omitted asset has a stated reason.
- Any saved image asset is authorized for reuse, stored locally under the topic's `media/` folder, linked with a relative path, and accompanied by attribution/license information where available. No temporary authenticated URL is used.
- In verbatim mode, transcribed authorized source text matches the visible source exactly; any translation is separate and clearly labeled. For copyrighted textbook sources, no extensive text has been reproduced verbatim.
- Tables and figure descriptions/data are present wherever a question refers to one, subject to legibility and copyright limits.
- In bilingual notes or when a translation is requested, every block has both languages, the original is marked, and the two versions agree (numbers, names, and option letters match). Source-only verbatim mode contains no unrequested translation.
- Terminology matches the glossary throughout.
- Nothing was submitted or changed on the platform.
- "Extraction notes" lists every gap honestly.

Save the file(s) to `./output/<subject>/<topic>/`. Finish with a short message: paragraphs covered, number of theory sections and questions inspected/captured, how many questions have book answers vs. suggested vs. none, translations flagged for checking, and any inaccessible or intentionally excluded items. Mention that the file can now be given to chapter-test-generator.
