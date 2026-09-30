---
name: youtube-transcript-extractor
description: 'Retrieve and organize captions or a transcript from a specific YouTube video. Use when asked to extract, capture, transcribe, or timestamp a YouTube video; distinguish accessible captions from unavailable content and respect copyright and access restrictions.'
argument-hint: 'Share the YouTube video URL, preferred transcript language, and whether you own or have permission to reproduce the video transcript'
user-invocable: true
---

# YouTube Transcript Extractor

Retrieve the transcript or captions for one specific YouTube video and report exactly what source was accessible. Do not infer transcript content from a title, description, or another video.

## 1. Confirm the request

Ask only for missing information:

- The exact video URL. A channel or search-results URL is not enough; ask the user to choose a specific video.
- The desired caption language if the video has multiple tracks.
- Whether the user owns the video, has permission to reproduce its transcript, or the video has a reuse license that permits it, if they want the full transcript reproduced or saved.
- Whether they want the result in chat or saved as a Markdown file, and the destination if it is not clear.

Do not repeat questions the user has already answered. If the user only wants a summary or study notes, no rights clarification is needed to provide that transformed result.

## 2. Open and inspect the source

1. Open the exact video URL in the shared browser when available. Record the title, channel, URL, access date, and visible video language.
2. Check whether YouTube provides captions or a transcript and identify the selected caption track and whether it is auto-generated or creator-provided, when visible.
3. Use the transcript panel or captions available in the page to capture the requested material. Preserve wording and timestamps only when reproducing the transcript is permitted.
4. Do not bypass sign-in, age, regional, paywall, or other access restrictions. Do not use account credentials, submit comments, or interact with quizzes or graded activities.
5. If the transcript is unavailable, incomplete, or inaccessible, say so plainly. Ask the user to open the transcript or provide a caption/transcript file. Never claim to have watched or transcribed content that was not accessible.

## 3. Apply the copyright boundary

- Reproduce or save a full transcript only when the user supplied the transcript, confirms they own or have permission to reproduce it, or the source license clearly permits that reuse.
- For other videos, do not return or save the full transcript or a near-verbatim substitute. Offer a concise summary, timestamped outline, key terms, or study notes in original wording instead. Short quotations may be used only when necessary and should be limited.
- Do not treat public availability, a YouTube URL, or the user's request as permission to reproduce the full transcript.
- Keep any source-grounded summary distinct from exact transcript wording. Do not fill caption gaps from memory or unrelated sources.

## 4. Format the result

For an authorized full transcript, include:

- Video title, channel, URL, access date, transcript language, and caption type if known.
- The transcript in chronological order, with timestamps when provided by the source.
- A brief note for missing, unclear, or auto-captioned passages. Do not silently repair uncertain wording or speaker attribution.

When a full transcript cannot be reproduced, provide only the requested alternative, such as a concise timestamped outline. Mark uncertain audio or missing sections explicitly and avoid long verbatim excerpts.

For this study workspace, keep learner-facing summaries bilingual: Dutch first in italics, then the English equivalent in a separate paragraph. Preserve an authorized transcript in its original language; do not translate or duplicate a full transcript unless the user explicitly asks and has rights to use it.

## 5. Save and verify

- Save Markdown only when requested. In this study workspace, use `./output/<Subject>/<Topic>/` and a stable, descriptive filename. If the subject or topic cannot be determined, ask before choosing a folder.
- Save a full transcript only when the copyright conditions above are met. Otherwise save only the requested transformed notes or outline.
- Before delivery, check that the video identity and language are correct, timestamps remain in order, inaccessible sections are disclosed, and the output does not exceed the permitted amount of verbatim source text.
- Finish with a concise report of what was captured, which caption source was used, any gaps, and the saved path when applicable.