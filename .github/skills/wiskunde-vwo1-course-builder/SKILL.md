---
name: wiskunde-vwo1-course-builder
description: 'Plan and create a full-year VWO 1 mathematics course or topic pack: topic sequences, explanations, worked examples, graduated exercises, tests, and answer keys. Use for Getal & Ruimte, Moderne Wiskunde, Dutch VWO year 1 wiskunde, or adapting public exam-paper ideas to the learner''s current level.'
argument-hint: 'Name Getal & Ruimte or Moderne Wiskunde and its edition if known; specify full year or topics and desired materials'
user-invocable: true
---

# Wiskunde VWO 1 Course Builder

Create a coherent full-year course or topic pack for a Dutch VWO 1 student. Support both Getal & Ruimte and Moderne Wiskunde. Ground the scope in the student's actual method and edition, teacher-provided objectives, or another verifiable curriculum source. Produce a learning plan, explanations, worked examples, graduated exercises, and tests with separate answer keys as requested.

## When to use

- Build a course plan for one or more VWO 1 mathematics topics.
- Build a full-year VWO 1 course using Getal & Ruimte or Moderne Wiskunde.
- Explain a topic and make practice exercises or tests from a textbook chapter.
- Find publicly available Dutch exam questions that match a topic, or use them as inspiration for level-appropriate original practice.
- Extract or summarize relevant material from a school textbook website the student can access.

## 1. Confirm the scope

Ask only for details that are missing:

- Whether the student wants the full school year or selected topics.
- Textbook or math method: Getal & Ruimte or Moderne Wiskunde, including edition and volume if known.
- Topic(s), chapter, or learning goals, if the request is not for the full year.
- School calendar, lesson frequency, lesson length, and/or test dates, if a dated schedule is wanted.
- Which deliverables are wanted: plan, explanation, exercises, tests, or the complete pack.
- Any known prior knowledge, teacher-specific requirements, or preferred language.

Default to a full-year scope when requested, and to Dutch learner-facing materials. Use English only when requested. If the method is not chosen, ask which one to align to; do not silently combine their chapter sequences. If the edition or source is unavailable, offer a method-neutral draft and clearly mark its topic coverage as provisional. Do not claim a complete year plan until its scope has been checked against all relevant volumes or a school overview.

## 2. Establish and record the source base

Use sources in this order where available:

1. The student's stated learning goals, teacher handout, or syllabus.
2. The relevant pages in the named school method or textbook.
3. Official Dutch curriculum or examination resources for context and question style.
4. Other reputable, publicly accessible educational sources, clearly labelled as supplementary.

For an online textbook, use the user's shared browser page or files they provide. Read only pages the student is authorized to access. Do not bypass logins, paywalls, access controls, or platform restrictions; never submit answers or change account data. If the material cannot be accessed, state what is missing and ask for screenshots, PDFs, or the relevant text. Do not fill gaps by guessing what a particular school or textbook teaches.

For every source, record its title, publisher or organization, URL or chapter/page reference, access date when useful, and which learning goals it supports. Mark uncertain or inferred alignment explicitly.

### Public exam papers and copyright

- Prefer official sources such as Examenblad.nl or DUO's public exam resources. Verify the subject, level, year, paper/session, and question number from the source itself.
- VWO mathematics exams are generally written for VWO 6, not VWO 1. Treat them as question-style or concept references only unless every required idea, notation, prerequisite, and technique has been taught to the student.
- For a candidate question, give a source link and exact question reference, then explain why it is or is not answerable with the stated VWO 1 learning goals. Exclude questions that rely on untaught methods or knowledge.
- Do not reproduce full exam papers, textbook lessons, or exercise sets. Prefer a brief description of the relevant skill and create fresh questions with changed contexts and values. Do not label generated material as an official exam question.
- If a real question is recommended for independent practice, link to the official source rather than copying its full text. Never invent an exam year, question number, answer, or source attribution.

## 3. Make a learning plan

For a full-year course, first create a year map grouped into units or terms, then organize each unit into a teachable sequence. For a topic pack, organize only the requested scope. Do not invent a school calendar: use lesson counts or dates only when supplied, otherwise give a flexible sequence. For each unit, lesson, or section, include:

- Learning goals stated as observable actions.
- Required prior knowledge and key vocabulary or notation.
- A concise explanation of the central idea and when to use it.
- At least one fully worked example, with reasoning shown step by step.
- A short check for understanding and a link to the next step.
- Estimated time, if the user supplied a course duration or requested timing.

Order concepts from prerequisites to more demanding applications. For Getal & Ruimte or Moderne Wiskunde, follow the selected edition's chapter and skill progression when verified. Keep the shared mathematical goals distinct from method-specific chapter order, terminology, and exercises. Do not assume a particular year-1 topic sequence without a source. If a full-year source map is missing, propose a provisional outline and label its unknowns before writing the complete lessons and tests.

## 4. Write explanations and exercises

- Use clear Dutch suitable for VWO 1; define symbols and terms before relying on them.
- Show mathematical reasoning and units, not just final answers. Check arithmetic, equivalent forms, and domain restrictions where relevant.
- Move practice from supported examples to independent, mixed, and transfer questions. Label difficulty or skill so the student can identify what to revisit.
- Use varied formats: calculate, simplify, explain an error, interpret a table or graph, and apply a method in a new context when appropriate to the topic.
- Keep every exercise within the verified learning goals. Do not use a textbook exercise verbatim; create a new problem that practises the same skill.
- Provide hints or scaffolded subparts where useful, without removing the reasoning the learner needs to practise.

## 5. Create tests and answer keys

When tests are requested:

- Build questions from the course goals and the material actually taught, not from the grade level label alone.
- Use a balanced spread of routine fluency, multi-step application, and reasoning. Use RTTI labels only when the user's school uses them or the user asks for them.
- State the time, total points, permitted tools, and what each question assesses.
- Make the point allocation unambiguous and ensure the sum matches the stated total.
- Put solutions in separate answer-key files unless the user requests otherwise. Show intermediate steps, accepted equivalent answers, units, and a brief marking scheme for multi-step questions.
- If a grading scale is requested, use the teacher's formula. Do not invent a school-specific grade conversion.
- Include a short revision guide that maps mistakes back to lessons or learning goals.

## 6. Save and organize the pack

Read any relevant source files in `./input/Wiskunde/<topic>/`. For a full year, use a stable folder such as `./output/Wiskunde/VWO-1/`; for a topic pack, use `./output/Wiskunde/<topic>/`. Do not create DOCX or PDF files unless the user explicitly asks.

For a complete pack, prefer separate, clearly named files:

- `Course-Plan.md`
- `Lesson-<number>-<topic>.md` (one per lesson or topic)
- `Exercises-<topic>.md` and, when needed, `Exercises-<topic>-Answers.md`
- `Test-A-<topic>.md` and `Test-A-<topic>-Answer-Key.md`
- `Test-B-<topic>.md` and `Test-B-<topic>-Answer-Key.md`
- `Sources.md` when the pack uses multiple external sources

Only create deliverables the user requested. Keep a source reference close to the material it supports, and distinguish sourced facts from original explanations and generated questions.

## 7. Check before delivery

- Every topic and assessment question maps to a stated learning goal and an accessible source or taught lesson.
- The sequence respects prerequisites and does not silently import VWO 6 techniques into VWO 1 work.
- Worked solutions and answer keys have been recalculated; units, notation, points, and numbering are consistent.
- Questions are original and are not presented as copied textbook or official-exam material.
- Source titles, links, question references, and answerability notes are accurate; inaccessible or uncertain material is clearly flagged.
- The Markdown structure is readable and answer keys are separated from student-facing tests.

Finish with a concise Dutch summary of what was created, the topics and sources used, any gaps or assumptions, and one concrete next step for the student.