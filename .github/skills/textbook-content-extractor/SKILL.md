---
name: "textbook-content-extractor"
description: Extract the theory (Lesstof), key terms, and exercise questions (with answers where the book shows them) from an online school textbook open in Chrome, e.g. Noordhoff buiteNLand, and save it as one clean bilingual (English and Dutch) Markdown file per chapter. Use whenever the user wants to "pull", "scrape", "capture", "copy" or "digitise" a textbook chapter, build a content base or source file for practice tests, or prepare material for the chapter-test-generator skill, even if they only say "get the chapter content" or "read the book for me".
argument-hint: "Chapter or paragraphs to extract into bilingual English-Dutch Markdown"
user-invocable: true
---

# Textbook content extractor

Reads a chapter of an online textbook (through the user's open Chrome tab) and saves it as a structured, **bilingual (English + Dutch)** Markdown file. That file is the source of truth for other skills, mainly **chapter-test-generator**, so it can write bilingual tests without going back to the browser. Faithful, complete, well-labelled extraction matters more than speed: a gap here silently becomes a gap in every test built on it.

## Hard rules

- **Read only.** Never submit an exercise, click "check/controleer", type into an answer field, or change anything in the student's account. Answers on this platform appear only after submitting, so they are usually not available. Do not work around this.
- **Never invent book content.** If something is not on the page, say so in the file. Do not fill gaps from memory or the internet.
- **The book's own wording is the source; the other language is a faithful translation of it.** Extract the original first, verbatim. Only then add the translation. Never summarise, add facts, or "improve" the content while translating.

## 1. Confirm scope

Ask only what is unclear: subject, book title, level/year, and which chapter(s) or paragraphs. Default: the whole chapter, including Summary and At a glance / Samenvatting. Also note which language the book is written in (the *original language*); the other language is the *translation*.

## 2. Extract from Chrome

Two ways in. Check which one is available before starting:

**A. Live browser (preferred).** Use the browser tools available to GitHub Copilot in VS Code (`open_browser_page`, `navigate_page`, `read_page`, `click_element`, and `screenshot_page`) on the user's open textbook tab. If those tools are not available to this session, use the offline fallback instead.

**B. Offline files (fallback).** Read screenshots and PDFs the user has put in `./input/<subject>/<topic>/`, using the available workspace file/image readers. Same rules apply: verbatim extraction, no invented content, note anything unreadable. If the subject/topic folder is empty, ask the user to place the chapter pages there.

Never silently fall back to memory or the internet when neither is available. Say what is missing and stop.

1. Read the chapter menu (`read_page`) to list every paragraph, and the Summary / At a glance pages. Record this list; it is your checklist.
2. For each paragraph, in order:
  - **Theory (Lesstof):** open it and read with `read_page`. If the result is thin, use `screenshot_page` and inspect the visible page. Capture headings, body text, definitions, highlighted key terms, examples, and the full data of any table.
   - **Figures, maps, graphs, photos:** the text alone loses them. Describe them in a short line (what it shows, title, axes, key values, source/caption). Copy tables and graph data as Markdown tables when values are readable. If a figure is unreadable, say so.
   - **Exercises (Opdrachten):** open each exercise and record the question exactly as written, including numbering, sub-questions (a, b, c), answer options for multiple choice, and any source text, table or figure it refers to.
   - **Answers:** record an answer only if the book shows it without submitting anything (for example a visible answer, a model answer, or an answer section). Otherwise write `Answer: not available in book`.
3. Move through the book by navigating, not by interacting with exercises. If a page will not load or is behind something you cannot reach, stop, say which page, and ask the user to open it or upload screenshots/PDF.
4. For long chapters, save progress as you go (append each paragraph to the file) so an interruption does not lose work.

## 3. Translate (English and Dutch)

Every piece of extracted content appears in both languages: theory text, headings, key terms, figure descriptions, questions, answer options, source texts, and answers.

- **Order:** Dutch first in italics, English directly below in a separate Markdown paragraph, matching chapter-test-generator. Mark the book's original language with `(original)` on its label, e.g. `*NL (translation)*` / `**EN (original)**`, so nobody mistakes a translation for the book's text.
- **Terminology:** subject terms must be consistent across the whole chapter, and consistent with the book. Where the book is in English, use the standard Dutch school term (world trade = wereldhandel, developing country = ontwikkelingsland, globalisation = globalisering). Where the book is in Dutch, use the standard English term. Build the glossary as you go and reuse it. If there is no standard equivalent, keep the original term and add the other in brackets.
- **Natural school language:** natural Dutch a 3 vwo student would read, and natural English, not word for word. Meaning, numbers, names and structure must be identical.
- **Do not translate:** proper names, place names that have no established translation, quotations from sources (translate them, but keep the original in the source line), units and figures. Keep numbers exactly as in the book.
- **Answer options:** keep the same letters/order in both languages, so a multiple-choice question maps one-to-one.
- **Uncertain translation:** if a term or sentence is ambiguous, translate the most likely meaning and add `[check translation]` after it. Flag these in the Extraction notes.
- Suggested answers (section 4) are written in both languages too.

## 4. Optional: suggested answers

When the book gives no answer, a suggested answer is still valuable for test building, but only if it can be grounded in the chapter's own theory. Add it on a separate line, clearly labelled, in both languages:

`Suggested answer (derived from §1.2, unverified): ...`

Skip it when the question depends on a figure you could not read or on knowledge outside the chapter. Never present a suggested answer as the book's answer. Ask the user once at the start whether they want suggested answers; default to yes.

## 5. Output format

One file per chapter, named `<Subject>_<Book>_Chapter-<n>_content_EN-NL.md`. Use exactly this structure so downstream skills can parse it:

```markdown
---
subject: Geography
book: buiteNLand
level: 3 vwo
chapter: 1
chapter_title_en: ...
chapter_title_nl: ...
original_language: en        # language the book is written in
languages: [en, nl]
source: Noordhoff (apps.noordhoff.nl)
extracted: YYYY-MM-DD
paragraphs: [1.1, 1.2, 1.3, ...]
---

# Chapter 1: <EN title>
*Hoofdstuk 1: <NL titel>*

## §1.1 <EN paragraph title>
*§1.1 <NL paragraaftitel>*

### Theory / Lesstof
**EN (original)**
<text, headings preserved>

*NL (translation)*
*<vertaalde tekst, koppen behouden>*

### Key terms / Begrippen
| English | Nederlands | Definition (EN) | Definitie (NL) |
|---|---|---|---|
| ... | ... | ... | ... |

### Figures and tables / Figuren en tabellen
- Figure 1.2 — EN: <what it shows, caption, key values>
  *NL: <wat het toont, bijschrift, kerngetallen>*
| EN header | ... |   (data tables: headers in both languages, numbers once)

### Questions / Opdrachten
**Q1.1.3** (a)
EN (original): <question text, options A-D, referenced source>
*NL (translation): <vraag, opties A-D, bron>*
- Answer / Antwoord: EN: <book answer> *NL: <antwoord>*  |  not available in book
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
- Every exercise found on the pages has an entry; counts per paragraph noted.
- Tables and figure descriptions are present wherever a question refers to one.
- Every block has both languages, the original is marked, and the two versions say the same thing (numbers, names, option letters match).
- Terminology matches the glossary throughout.
- Nothing was submitted or changed on the platform.
- "Extraction notes" lists every gap honestly.

Save the file(s) to `./output/<subject>/<topic>/`. Finish with a short message: paragraphs covered, number of theory sections and questions extracted, how many questions have book answers vs. suggested vs. none, translations flagged for checking, and any gaps. Mention that the file can now be given to chapter-test-generator.
