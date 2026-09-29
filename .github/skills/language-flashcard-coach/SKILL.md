---
name: language-flashcard-coach
description: "Create cumulative French or German language practice from vocabulary and grammar topics. Use for flashcards, vocabulary review, root-word or etymology connections, sentence generation, grammar drills, mixed quizzes, and spaced reuse of previously learned material."
argument-hint: "French or German, level, topic or word list, and the kind of practice wanted"
user-invocable: true
---

# Language Flashcard Coach

Builds cumulative French and German practice for a secondary-school learner. Each session combines flashcards, contextual sentences, and grammar practice, then records what should return in later sessions.

## When to Use

Use this skill when the user asks to:

- make French or German flashcards;
- practise a word list, chapter, theme, or textbook section;
- connect a word to a Latin or Greek root, cognate, prefix, or suffix;
- generate example sentences or translation exercises;
- practise a grammar topic together with vocabulary;
- review older words or grammar;
- build a cumulative quiz or study session from previous work.

Ask only for missing information. Useful inputs are the language, school level, topic or source material, target words, grammar topics, desired session length, and whether the user wants answers hidden or shown immediately. Default to a 3 vwo-style session, 15-20 minutes, and a mixture of new material and review.

## Output Language and Format

- Speak to the learner in English unless they request another language.
- The target language must be visible in every flashcard and example.
- Give a concise English meaning, part of speech, pronunciation help when useful, and one natural example sentence.
- For French, include the article and gender for nouns (`le/la/un/une`) and note common plural forms when relevant.
- For German, include the article and gender for nouns (`der/die/das`), plural form, and capitalization.
- Preserve accents, umlauts, ß, apostrophes, and hyphens accurately.
- Use Markdown. Use tables only for compact flashcard sets; use headings for sections and `<details>` for optional answers when the learner wants a self-test.
- Do not create DOCX or PDF files unless explicitly requested.

## Source and Accuracy Rules

1. Prefer words supplied by the user or extracted from a textbook/source file.
2. If a word is ambiguous, ask for the intended meaning or state the chosen meaning clearly.
3. Do not invent a Latin or Greek root. Label the relationship precisely:
   - **Direct root/derivation:** historically derived from the root.
   - **Cognate/related word:** shares historical ancestry or a useful word family but is not a direct root.
   - **Mnemonic link:** only a memory aid, not an etymological claim.
4. If the etymology is uncertain, write `[check etymology]` and say what is uncertain.
5. Do not claim that a modern French or German word comes from Latin or Greek merely because the meanings are similar.
6. Prefer natural, age-appropriate example sentences over literal translations.
7. Keep grammar explanations short and contrastive. Explain why the form is used, not only what the answer is.

## Session Workflow

### 1. Establish the session

Identify the language, level, source/topic, target grammar, and available time. If a progress ledger exists, read it before creating new material. If there is no ledger, create one after the first session.

Use these defaults when the user does not specify otherwise:

- 60% review and 40% new material;
- 8-12 target words;
- 2-3 grammar targets;
- 10-15 flashcards or questions;
- a short production task at the end.

### 2. Select and classify vocabulary

For every selected word, record:

- target word and article/gender where applicable;
- English meaning;
- part of speech;
- plural, principal forms, or irregular forms where useful;
- pronunciation note only when it prevents a likely mistake;
- word family, prefix, suffix, cognate, or root connection if verified;
- source/topic and first-seen date.

Prioritise words that are useful for sentences and that connect naturally to the chosen grammar. Mix nouns, verbs, adjectives, and high-frequency connectors rather than producing a list of isolated nouns.

### 3. Build flashcards

Use several retrieval directions instead of one repeated format:

- target language -> English meaning;
- English meaning -> target word;
- fill the missing word in a sentence;
- choose the correct article, gender, case, preposition, or verb form;
- produce a short sentence from a cue;
- identify a word family or root connection.

For a self-test, show the prompt first and hide the answer in a collapsed `<details>` block. Do not reveal the answer in the prompt or in a nearby heading.

### 4. Integrate grammar

Use the vocabulary in grammar tasks rather than separating vocabulary and grammar completely. Select grammar that matches the language:

- **French:** gender and articles, adjective agreement, present tense, avoir/être, negation, questions, near future, passé composé, imperfect, object pronouns, common prepositions, and word order.
- **German:** gender and articles, plural forms, nominative/accusative/dative, verb position, separable verbs, modal verbs, present tense, perfect tense, adjective endings, prepositions, and subordinate clauses.

Only introduce a grammar topic when it is supported by the learner's level or source. Explain one rule, show one model, then test it in a new sentence. Include at least one contrastive item that targets a likely error.

### 5. Recycle earlier learning

Before adding new material, select older items using this priority:

1. Items previously missed or marked uncertain.
2. Items due for review according to the ledger.
3. Items that combine with the current grammar topic.
4. A small number of secure items for confidence and fluency.

Reuse old words in new contexts. Do not simply repeat the same sentence or the same translation direction. At least one final task should combine older vocabulary with the new grammar.

### 6. Assess and update progress

After the learner answers, mark each item as `correct`, `almost`, `incorrect`, or `not attempted`. Give a brief correction and one useful explanation. Do not overwhelm the learner with every possible exception.

Update the progress ledger with:

- date;
- language and topic;
- new words introduced;
- words needing review;
- grammar topics practised;
- recurring error patterns;
- suggested next review date or trigger;
- a short next step.

If the learner provides only a score, infer no individual errors. Ask for the answers or offer a focused follow-up based on the topics practised.

## Progress Ledger

Store cumulative progress in Markdown under:

`./output/Languages/<language>/progress.md`

Use `French` or `German` for `<language>`. Create the folder and ledger when the first session is completed. Keep the ledger compact and append sessions rather than rewriting history.

Recommended structure:

```markdown
# French Progress

## Vocabulary to Recycle
| Word | Meaning | Topic | Status | Last seen | Next review |
|---|---|---|---|---|---|

## Grammar to Recycle
| Topic | Current confidence | Common error | Last practised | Next review |
|---|---|---|---|---|

## Session Log
### YYYY-MM-DD - Topic
- New words:
- Reviewed words:
- Grammar:
- Errors:
- Next step:
```

Keep French and German ledgers separate. Do not mix word gender systems or grammar terminology between languages.

## Recommended Session Shape

For a normal 15-20 minute session, produce:

1. A short goal and review/new split.
2. 4-6 review flashcards.
3. 4-6 new-word flashcards with examples.
4. 3-5 grammar-in-context questions.
5. One short production task, such as translating or writing 3-5 sentences.
6. A separate answer section or hidden answers, depending on the user's preference.

For a quick session, reduce the quantity but keep at least one review item, one new word, and one grammar item. For an exam-preparation session, increase retrieval difficulty and add a cumulative mixed section.

## Quality Checks Before Delivering

- The requested language is used consistently.
- Every noun has the required article/gender information for that language.
- German nouns are capitalised; French accents and contractions are preserved.
- Sentences are natural and match the learner's level.
- Grammar answers agree with the explanation and the sentence context.
- Root or etymology claims are verified or clearly labelled as uncertain.
- At least some previous vocabulary or grammar is reused when a ledger exists.
- New and review material are clearly distinguished.
- Answer numbering, hidden answers, and point totals match when a scored quiz is requested.
- The progress ledger is updated only after the learner has attempted the practice, unless the user explicitly asks to pre-register material.

End with one concrete next step, for example: `Complete the cards without looking at the answers, then send me the items you missed.`