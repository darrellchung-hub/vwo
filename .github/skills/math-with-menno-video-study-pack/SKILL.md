---
name: math-with-menno-video-study-pack
description: 'Turn a Math with Menno YouTube video into source-grounded mathematics study materials. Use when given a Math with Menno video link, asked to extract its transcript or captions, make notes, explain methods, create worked examples, practice questions, quizzes, tests, or an answer key from a video.'
argument-hint: 'Share the specific video URL, student level, topic or goal, and which study materials you want'
user-invocable: true
---

# Math with Menno Video Study Pack

Use a specific Math with Menno YouTube video as the source for original, level-appropriate mathematics learning materials. Treat the video as the source of what was taught; do not infer its lesson from the title alone.

## 1. Confirm the request

Ask only for information that is missing:

- The specific video URL. A channel URL alone is not enough to identify the lesson. If the user wants help choosing, ask for the video title or topic and let them select a specific video.
- The learner's school year and track, or the level they want to practise at. Always ask when the level is missing; do not assume a level, including for Curtis.
- The learning goal or topic to focus on, if unclear.
- The requested materials. If unspecified, make a concise lesson summary, key methods/formulas, two original worked examples, graduated practice questions, and a separate answer key.
- Whether the learner wants Dutch only or bilingual material. For Curtis, default to Dutch first and English second, with Dutch learner-facing text italicized.

Do not ask again for details already supplied. Do not start a multi-video pack from a channel URL unless the user explicitly asks you to choose videos; in that case, propose candidate titles first and get the user's selection.

## 2. Access and capture the source

1. Open the specific video using the shared browser when available. Record its exact title, channel, URL, and access date.
2. Read captions or the YouTube transcript through the video page when available. Capture the mathematical explanations, definitions, notation, examples, stated prerequisites, and useful timestamps. Keep notes of the transcript's key points rather than reproducing it in full.
3. If captions or transcript access is unavailable, ask the user to enable/open the transcript or provide a caption/transcript file. Do not pretend to have watched or transcribed inaccessible content, and do not fill gaps from memory or unrelated videos.
4. Never bypass a login, paywall, age gate, regional restriction, or other access control. Do not submit comments, answers, or account data.
5. If a transcript is supplied by the user, use it as source material, but still transform it into original teaching materials rather than returning a lightly edited transcript.

## 3. Establish what the video teaches

Create a compact source outline before writing materials:

- Main topic and learning goals, expressed as actions the learner can perform.
- Key terms, formulas, notation, and procedures actually present in the video.
- The order of steps in each method and any conditions or common errors the teacher highlights.
- Short timestamp references for important explanations or examples, when available.
- Unclear audio, missing caption passages, or ambiguous notation that could affect correctness.

Keep video-specific claims separate from your own clarification. If you add prerequisite explanations not stated in the video, label them as a brief prerequisite or supplementary note. If a mathematical detail cannot be verified from the source, flag it and ask rather than inventing it.

## 4. Create the requested materials

Use only the video's verified learning points, the user's stated prior knowledge, and clearly labelled prerequisite explanations. Keep the mathematics within the requested level.

Depending on the request, create one or more of:

- Concise lesson notes that explain the ideas in fresh wording.
- A key-term and formula list with variable meanings and conditions of use.
- Step-by-step worked examples with reasoning, units, and checks where relevant.
- Original practice questions progressing from supported fluency to independent application and reasoning.
- A short quiz or test with clear instructions, time, total points, and unambiguous point allocation.
- A separate answer key with working, accepted equivalent forms, units, and marking guidance.

Do not copy the video's transcript, captions, examples, or exercises verbatim. Use new values and contexts while testing the same method. Do not imply that generated questions are from the video or an official exam. Keep any direct quotation very short and necessary; usually paraphrase and cite a timestamp instead.

For Curtis, make every learner-facing item bilingual: Dutch first, English second. Put each Dutch sentence or item in italics, followed by its English equivalent in a separate paragraph. Ensure translations preserve mathematical meaning and notation. Mark uncertain translations `[check translation]` and explain the uncertainty briefly.

For tests, include RTTI labels only if requested or known to be used by the school. Check all calculations, point totals, numbering, and alignment to the stated learning goals. Keep answers out of the student-facing test file.

## 5. Save and organize files

Read relevant existing sources under `./input/Wiskunde/` before creating materials. Save Markdown under `./output/Wiskunde/Math-with-Menno/<topic>/`, using a short stable topic name. Do not create DOCX or PDF unless explicitly requested.

Create only the deliverables requested. When the default pack is used, prefer:

- `Video-Notes.md`
- `Practice-<topic>.md`
- `Practice-<topic>-Answer-Key.md`
- `Sources.md` when there is more than one source or supplementary material

In the notes or `Sources.md`, include the video title, channel, link, access date, and timestamp references where useful. Do not save or publish a full copyrighted transcript. Keep the answer key in a separate file from practice questions.

## 6. Check and report

Before delivery, verify:

- Every claim about what the teacher covered is supported by the accessible video or transcript.
- Materials match the learner's level and do not depend on unstated techniques.
- Worked examples and answer keys have been recalculated independently.
- Questions are newly written, the numbering matches between questions and key, and points add up.
- Dutch and English versions convey the same instructions and mathematical content.
- Source details and timestamps are accurate; missing source access and uncertain details are disclosed.
- Student questions and answer keys are separated as requested.

Finish with a concise Dutch-first, English-second summary of the files created, the video used, any access gaps or assumptions, and one concrete next step for the learner.