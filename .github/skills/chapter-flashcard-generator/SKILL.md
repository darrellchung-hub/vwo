---
name: chapter-flashcard-generator
description: "Generate source-grounded, bilingual subject flashcards in Anki-importable TSV. Use when creating recall cards from a textbook chapter, study notes, or extracted chapter content for Anki."
argument-hint: "Subject, chapter or topic, source file or textbook, and desired card count"
user-invocable: true
---

# Chapter Flashcard Generator

Create focused, source-grounded recall cards about school subjects for a secondary-school learner. The default deliverable is a UTF-8, tab-separated `.tsv` file ready to import into Anki. This skill covers chapter knowledge across subjects; use `language-flashcard-coach` for French or German vocabulary and grammar practice.

## 1. Confirm the scope

Ask only for missing details:

- Subject and book, if known.
- Chapter, paragraphs, or topic.
- Source material or whether the textbook is open in Chrome.
- Desired number of cards, if not using the default.
- Any paragraphs or content to emphasize or leave out.

Defaults: use the whole named chapter, make about 20-30 high-value cards, and present Dutch first with an English equivalent. If the user wants a different language direction or a Dutch-only or English-only deck, follow that request.

## 2. Gather source material

1. Prefer an existing extracted chapter file such as `*_content_EN-NL.md` in `output/<subject>/<topic>/`.
2. Otherwise, use relevant source files in `input/<subject>/<topic>/`.
3. For live textbook content, follow the `textbook-content-extractor` skill's read-only browser workflow. Never answer or submit textbook assignments or change the student's account.
4. If the source is unavailable or incomplete, say what is missing and ask the user to open the relevant page or provide the source. Do not fill gaps from memory or unrelated sources.

Before making cards, identify the chapter's essential terms, definitions, relationships, sequences, causes and effects, formulas, and distinctions. Keep short notes by paragraph so cards can be traced to their source.

## 3. Design effective recall cards

- Test one important fact, term, distinction, or relationship per card. The learner should be able to answer in a few words or one short sentence.
- Write a clear question or cue on the front and a concise, self-contained answer on the back. Avoid vague prompts such as "Explain this" or prompts that depend on a nearby card.
- Make the answer genuinely retrievable: do not put the answer, a close synonym, or an unmistakable giveaway in the prompt.
- Include enough context to make the expected answer unambiguous, especially for names, dates, processes, and terms that could have multiple meanings.
- Prefer direct question-and-answer cards. Use a fill-in-the-blank cue only when it tests one clear target; do not create cloze syntax unless the user explicitly asks for Anki Cloze notes.
- Create reverse-direction cards only when recalling both directions is useful, such as term-to-definition and definition-to-term. Do not duplicate every card automatically.
- Split long definitions and multi-step processes into smaller cards where each step can be recalled independently. Keep an overview card only when the whole sequence or relationship is itself important.
- Include important contrasts and common confusions as separate cards with the distinction stated on the back.
- Do not invent facts, examples, causes, dates, or definitions. Test only what is supported by the provided chapter source.
- Do not copy textbook exercise wording verbatim. Rephrase prompts while preserving the source meaning.
- Keep the requested deck manageable. Prioritize core chapter knowledge over exhaustive coverage and remove redundant or low-value cards.

## 4. Bilingual card content

By default, put Dutch first and English second in both fields:

- Front: Dutch prompt, then its equivalent English prompt.
- Back: Dutch answer, then its equivalent English answer.
- Use natural school Dutch and consistent subject terminology. When the source is English, use the standard Dutch school term where one exists. If a translation is uncertain, mark it `[check translation]` and tell the learner in English.
- Keep both language versions equivalent in meaning and answer scope. Do not let one language reveal an answer that the other language is testing.
- Use simple HTML for visual structure, for example `<em>` for Dutch and `<br>` between language versions. Escape literal HTML-sensitive text (`&`, `<`, `>`) when it is not intended as markup.
- Keep each field short enough to read comfortably on a phone. Avoid wide tables, images, and decorative formatting.

Example field pair:

```text
Front: <em>Wat betekent ...?</em><br>What does ... mean?
Back: <em>...</em><br>...
```

## 5. Anki export format

Create one `.tsv` file by default, using three columns in this order: `Front`, `Back`, `Tags`. Include these Anki import headers at the top of the file:

```text
#separator:Tab
#html:true
#tags column:3
```

Export requirements:

- Save as plain text in UTF-8. Use a tab character between fields and one physical line per note.
- Do not put literal tab or newline characters inside a field. Use `<br>` for line breaks within bilingual content.
- Keep the three fields present for every card. Do not add a Markdown table, prose, or column-heading row after the import headers.
- Use the paragraph provenance in the Tags field. Add stable, whitespace-separated tags for subject, topic, paragraph, and card type where known, for example: `subject_history topic_world-war-i paragraph_1-2 type_definition`.
- Use simple tag values with underscores instead of spaces. Do not put the source paragraph only in a filename; it must be traceable per card.
- Avoid duplicate Front fields, since Anki uses the first field when checking for duplicate notes by default.
- Do not include a deck column or force a deck name unless the user requests it. The learner chooses the destination deck during import.
- Do not create an `.apkg` package or claim the TSV has been imported. Only create one if the user specifically requests an Anki package and the necessary Anki tooling is available.

Save the file to:

`./output/<subject>/<topic>/anki/<Subject>_<Chapter>_Anki.tsv`

Use stable, filesystem-safe subject and topic folder names. Create the `anki/` directory if needed. By default, do not create a second preview file; make one only if requested.

## 6. Import guidance

When delivering the file, tell the learner briefly:

1. In Anki, choose **File > Import** and select the `.tsv` file.
2. Choose the destination deck and a note type with `Front` and `Back` fields, such as **Basic**.
3. Verify that the separator is Tab, the third column is treated as tags, and the first two columns map to the note type's front and back fields. The included headers should preconfigure the separator, HTML, and tags-column options in supported Anki versions; check the import preview before confirming.
4. If HTML is not enabled automatically, enable **Allow HTML in fields** so bilingual line breaks and italics display correctly.
5. Review the duplicate-handling option before importing an updated deck.

Follow the current [Anki Manual: Text Files](https://docs.ankiweb.net/importing/text-files.html) for importer behavior. Do not claim that cards have been added to Anki; file creation and Anki import are separate actions.

## 7. Quality checks

Before delivering:

- Every answer is supported by the source and each card has a source paragraph tag.
- Each card targets one useful recall item, has one unambiguous answer, and does not reveal the answer on its front.
- Cards are concise, non-redundant, and appropriately divided; both directions are included only when useful.
- Dutch and English match in meaning and factual detail.
- The TSV has the three documented import-header lines followed by records with exactly three tab-separated fields each.
- No card contains a literal newline or tab inside a field, and tags are whitespace-separated.
- The UTF-8 text preserves Dutch diacritics and subject symbols.
- The destination path and filename are reported accurately.

Finish with a short English summary of the subject and paragraphs covered, the number of cards, the saved file path, and the import reminder.
