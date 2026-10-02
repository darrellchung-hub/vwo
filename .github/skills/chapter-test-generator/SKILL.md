---
name: "chapter-test-generator"
description: "Generate bilingual (English/Dutch) practice tests at two levels, pass (6/10) and excellent (8-9/10), from textbook chapters open in Chrome, e.g. Noordhoff buiteNLand."
argument-hint: "Chapter or paragraphs to turn into bilingual pass and excellent practice tests"
user-invocable: true
---

# Chapter test generator

Builds web-first practice tests for a secondary-school student (e.g. 3 vwo) from the chapter(s) the user names. The tests are Markdown content displayed in a responsive study web app, commonly on phones, tablets, and desktop screens. Every run produces two tests at different difficulty levels, each in a single Markdown file with answers hidden in collapsed `<details>` sections. All questions are bilingual: Dutch first, English directly below.

Before generating or formatting test files, read and follow [design.md](design.md). It defines the shared visual style and Markdown portability rules.

## 1. Confirm the scope

Ask only what isn't already clear from the request:
- Which chapter(s) and/or paragraphs (e.g. "Chapter 1, 1.1-1.3").
- Anything to leave out or emphasise (e.g. "skip the Country comparison").

Defaults if not stated: whole chapter, including Summary / At a glance, about 45 minutes per test.

## 2. Gather the content from Chrome

Prefer a content file already produced by the `textbook-content-extractor` skill (a `*_content_EN-NL.md` in `output/<subject>/<topic>/`) — if one exists for the chapter, use it and skip the rest of this section. Otherwise gather the content yourself, either with the browser tools available to GitHub Copilot in VS Code (`open_browser_page`, `navigate_page`, `read_page`, `click_element`, and `screenshot_page`) on the user's open textbook tab (e.g. apps.noordhoff.nl), or from screenshots/PDFs in `input/<subject>/<topic>/`.
- Use `read_page` on the current tab to read the chapter menu.
- For each paragraph in scope, use `navigate_page` or `click_element` to open the **Lesstof** (theory) content, then read it with `read_page`. If that returns little, use `screenshot_page` and inspect the visible page.
- If the Lesstof landing page shows only learning objectives, use its **Start met opdrachten** / exercise flow to reach the theory units. Advance with **Verder** where needed. For every in-scope exercise group, navigate through each question and sub-question using question tabs, next/previous navigation, or **Verder**; do not inspect only the first screen. Read all in-scope items, including those labelled **Theory**, **Assignment**, **Support**, **Challenge**, **Final assignment**, and **Summary**.
- When the user says not to use the ebook, never open or read E-book(s), ebook pages, or ebook-linked content. Use only the non-ebook Theory/document flow.
- If the user has not restricted the scope to Lesstof/Theory only, also read the chapter's **Summary** and **At a glance** pages. These show what the book treats as core knowledge.
- Note key terms (begrippen), definitions, causes/effects, examples, named places/countries, figures, maps and data the text refers to.
- For every question or assignment, capture the wording or a faithful concise transcription, paragraph/section, and question style: for example multiple choice, matching, ordering, fill-in, source analysis, explain, compare, calculate, justify, or multi-step task. Also note the expected response length, number of steps, use of sources/data, and any RTTI level that is shown or can be inferred. Keep these as **question-pattern notes**, separate from the chapter theory.
- Inspect answer information that is already visible without student input: model-answer panels, worked solutions, answer sections, or feedback shown automatically when navigating to a question or review page. Record the answer and its source/page location so it can validate the generated answer key. If the platform reveals the correct answer only after an attempt, checking, or submission, do not trigger that action; record `Answer: not available without submitting` and continue to the next question.
- **Read-only interaction boundary:** it is allowed to click navigation controls that open or advance to another question, theory unit, source, or already-available feedback/review panel. Never choose an answer option, draw a match, type in a response field, click **Check/Controleer**, submit, or change account data to reveal an answer. If a navigation control is ambiguous and might submit or check the current answer, do not use it; report the page as inaccessible instead.
- If the page won't load or the content is behind something you can't reach, say so and ask the user to open the right page or upload screenshots/PDFs instead.

Write brief notes per paragraph before writing questions, followed by a question-pattern summary showing which formats and reasoning moves the chapter uses. Use those patterns to create additional practice questions with new wording and, where appropriate, new examples or data. **Only test what is in the chapter**: no outside facts, and use the book's own terms. Do not reproduce a textbook assignment verbatim unless the user explicitly asks for that.

## 3. Design the two tests

Use the Dutch grading formula: **cijfer = 1 + 9 × (points scored / total points)**, rounded to one decimal. Show it on the answer key along with a points-to-grade table.

Classify questions using RTTI (common in Dutch schools):
- **R**: Reproduction (recall facts, terms, definitions)
- **T1**: Trained application (apply a known method in a familiar situation)
- **T2**: Transfer (apply knowledge to a new situation, source, map or graph)
- **I**: Insight (reason, explain connections, evaluate, give an opinion with arguments)

### Test A: "Pass level" (aim: a student who knows the basics scores 6 or more)
- About 60% R, 30% T1, 10% T2. No I questions.
- Question types: multiple choice (4 options), match the term to its definition, fill in the blank, true/false with correction, short answers (1-2 sentences).
- Covers every paragraph in scope, focusing on key terms and main ideas from the Summary.
- Straightforward wording, one idea per question.
- 20-25 questions, about 40 points.

### Test B: "Excellent level" (aim: only a well-prepared student scores 8-9)
- About 15% R, 25% T1, 35% T2, 25% I.
- Question types: explain a cause-and-effect chain, compare two countries/regions, interpret a compact table, graph or described map (include the data in the test so it is usable on screen), apply a concept to a new example, "agree or disagree? Give two arguments", and multi-step questions that connect several paragraphs.
- Include at least 2 questions that combine content from different paragraphs.
- Point allocation that rewards complete reasoning (e.g. 3 points = 3 connected steps).
- 12-16 questions, about 40 points.

For both tests:
- Put the RTTI label and points next to each question number (e.g. "3. [T2, 2p]").
- Keep the question order roughly following the paragraph order.
- Distractors in multiple-choice questions must be plausible and drawn from the chapter.
- Reuse the chapter's observed question patterns and response demands, but vary the wording, values, source excerpts, and examples so the tests provide fresh practice. Do not copy an assignment's answer or present a generated question as an original textbook question.

## 4. Bilingual layout

For every question, including instructions, answer options and data tables:
- Dutch text first, in italic, with the same numbering.
- English translation in a separate Markdown paragraph directly below. Put a blank line between the Dutch and English blocks; never rely on a single Markdown newline because renderers may place both languages on the same visual line.
- Keep subject terms consistent in both languages. Where the book is in English, use the standard Dutch geography term (e.g. world trade = wereldhandel, developing country = ontwikkelingsland, globalisation = globalisering). If a term has no standard translation, give the English term in brackets.
- The Dutch must be natural school Dutch, not word for word.
- Avoid long underscore answer lines and oversized blank response areas. After both language versions, add a short response cue only when useful; tell the student to work in their notes for calculations or extended answers. Omit response cues for questions answered by selecting or matching options.

## 5. Hidden answers in the same file

Each test keeps its answers in the same Markdown file, hidden in a collapsed `<details>` block immediately underneath the question.
- Put the question, then the bilingual answer in a collapsed `<details>` section directly below it; never group answers at the end.
- For any calculation, construction, multi-step application, or explanation, give a worked solution the student can follow: show the chosen method, each meaningful intermediate step, the calculation or evidence used, and a check or interpretation where relevant. Do not give only the final result.
- Present worked reasoning in numbered, bilingual steps: Dutch first in italics, then the equivalent English step in its own paragraph. Keep the step order and mathematical values identical across languages.
- State a clearly labelled final answer after the working. Include units, simplified form, and a sentence answering the question when needed.
- For simple recall, naming, or definition questions that need no procedure, keep the response concise; add a distinguishing detail or short explanation when it helps the student understand or avoid a common confusion. Do not invent artificial steps.
- Put the points breakdown directly below the solution and map points to the demonstrated steps or required ideas (for example, 1p for setting up the common denominator, 1p for the correct subtraction, 1p for simplifying).
- Include acceptable alternatives for open questions.
- Add the paragraph each question comes from (e.g. "§1.2"), so gaps can be traced back to the book.
- End the file with the grade formula and a points-to-grade table, plus a short "If you scored low on … revisit §…" guide.

## 6. Build the files

Create two Markdown files directly. Do not create DOCX or PDF files for this skill:
- `<Subject>_<Chapter>_Test-A_Pass.md`
- `<Subject>_<Chapter>_Test-B_Excellent.md`

Each test's Markdown header includes: subject, book, chapter/paragraphs, level, time (45 min), total points, and compact name/date labels when useful. Use headings, compact tables, italic Dutch text first and English translations in separate paragraphs, and collapsed `<details>` blocks for answers immediately underneath each question. Keep tables narrow; use short lists instead when data would force sideways scrolling on a phone. The test file contains both the questions and the hidden answers in one document.

Save the finished files to `./output/<subject>/<topic>/`. Do not write outside the workspace unless the user explicitly asks.

## 7. Check before delivering

- Every question can be answered from the chapter content that was read.
- Generated questions reflect the captured question patterns without copying textbook assignments, and any visible textbook answers are used only to check validity and answer-key accuracy.
- Points add up to the stated totals, and the RTTI mix matches the level targets.
- Dutch and English say the same thing.
- The hidden answer blocks match the question numbering.
- In each question section, the bilingual answer, points breakdown, acceptable alternatives, and source paragraph appear immediately below that question; no answer-only block is appended at the end.
- Worked solutions show enough intermediate reasoning for the student to reproduce the method; point allocations correspond to the visible steps, and Dutch/English steps agree.
- Confirm the Markdown renders correctly in the study web app, including headings, compact tables or lists, bilingual text, answer disclosures, and answer-key numbering. Check that content remains easy to read across phone, tablet, and desktop viewports.

Finish with a short message: which paragraphs are covered, the number of questions and points per test, and where the files are.