import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'output');
const siteRoot = path.join(root, 'dist');
const stylesheetSource = path.join(root, 'site', 'site.css');
const stylesheetTarget = path.join(siteRoot, 'assets', 'site.css');
const ellaMaterialsRoot = path.join(sourceRoot, 'Wiskunde', 'VWO-1');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function encodePath(value) {
  return value.split('/').map(encodeURIComponent).join('/');
}

async function findMarkdownFiles(directory, relativeDirectory = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const found = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      found.push(...await findMarkdownFiles(absolutePath, relativePath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      found.push({ absolutePath, relativePath });
    }
  }

  return found;
}

function pageTemplate({ title, stylesheet, content, breadcrumb }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#174b3b">
    <title>${escapeHtml(title)} | Study Tests</title>
    <link rel="stylesheet" href="${stylesheet}">
  </head>
  <body>
    <header class="site-header">
      <a class="site-mark" href="${breadcrumb.home}">Study Tests</a>
      <span class="site-context">3 vwo · Practice library</span>
    </header>
    <main class="document">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${breadcrumb.home}">All tests</a><span aria-hidden="true">/</span><span>${escapeHtml(breadcrumb.topic)}</span></nav>
      <article class="markdown-body">${content}</article>
      <p class="back-link"><a href="${breadcrumb.home}">Back to all tests</a></p>
    </main>
  </body>
</html>
`;
}

await rm(siteRoot, { recursive: true, force: true });
await mkdir(path.dirname(stylesheetTarget), { recursive: true });
await cp(stylesheetSource, stylesheetTarget);

const files = (await findMarkdownFiles(sourceRoot)).sort((left, right) =>
  left.relativePath.localeCompare(right.relativePath, 'en')
);
const groups = new Map();

for (const file of files) {
  const source = await readFile(file.absolutePath, 'utf8');
  const relativeHtmlPath = file.relativePath.replace(/\.md$/i, '.html');
  const targetPath = path.join(siteRoot, ...relativeHtmlPath.split('/'));
  const stylesheet = encodePath(path.posix.relative(path.posix.dirname(relativeHtmlPath), 'assets/site.css'));
  const home = encodePath(path.posix.relative(path.posix.dirname(relativeHtmlPath), 'index.html'));
  const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(file.relativePath, path.extname(file.relativePath)).replaceAll('_', ' ');
  const pathParts = file.relativePath.split('/');
  const subject = pathParts[0] ?? 'Other';
  const topic = pathParts.length > 2 ? pathParts[1] : subject;

  await mkdir(path.dirname(targetPath), { recursive: true });
  await writeFile(targetPath, pageTemplate({
    title: heading,
    stylesheet,
    content: await marked.parse(source),
    breadcrumb: { home, topic },
  }));

  if (!groups.has(subject)) groups.set(subject, []);
  groups.get(subject).push({ heading, topic, href: encodePath(relativeHtmlPath) });
}

const sections = [...groups.entries()].map(([subject, documents]) => `
      <section class="subject-section" aria-labelledby="subject-${encodeURIComponent(subject)}">
        <h2 id="subject-${encodeURIComponent(subject)}">${escapeHtml(subject)}</h2>
        <ul class="document-list">
${documents.map((document) => `          <li><a class="document-link" href="${document.href}"><span class="document-topic">${escapeHtml(document.topic)}</span><span class="document-title">${escapeHtml(document.heading)}</span><span class="document-action" aria-hidden="true">Open <span>→</span></span></a></li>`).join('\n')}
        </ul>
      </section>`).join('\n');

const indexContent = files.length === 0
  ? '<p class="empty-state">No Markdown tests found yet. Add a <code>.md</code> file under <code>output/</code> and rebuild.</p>'
  : sections;

await writeFile(path.join(siteRoot, 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#174b3b">
    <title>Study Tests | 3 vwo</title>
    <link rel="stylesheet" href="assets/site.css">
  </head>
  <body>
    <header class="site-header">
      <a class="site-mark" href="./">Study Tests</a>
      <span class="site-context">3 vwo · Practice library</span>
    </header>
    <main class="library">
      <div class="library-heading"><p class="eyebrow">Practice library</p><h1>Choose a test.</h1><p class="intro">Bilingual practice materials, organised by subject.</p></div>
      <p class="profile-entry"><a href="ella/">Ella's VWO 1 page <span aria-hidden="true">→</span></a><span><em>Haar eigen startpagina voor VWO 1.</em> Her own starting page for VWO 1.</span></p>
${indexContent}
      <footer class="library-footer">${files.length} ${files.length === 1 ? 'document' : 'documents'}</footer>
    </main>
  </body>
</html>
`);

const ellaFiles = await findMarkdownFiles(ellaMaterialsRoot);
const ellaFileByName = new Map(ellaFiles.map((file) => [path.basename(file.relativePath), file]));
const ellaHref = (file) => encodePath(path.posix.join('..', 'Wiskunde', 'VWO-1', file.relativePath.replace(/\.md$/i, '.html')));
const courseFiles = ['Course-Plan.md', 'Lessons-and-Exercises-NL.md', 'Lessons-and-Exercises-EN.md', 'Answer-Key-NL.md', 'Answer-Key-EN.md']
  .map((name) => ellaFileByName.get(name))
  .filter(Boolean);
const courseLinks = courseFiles.map((file) => {
  const name = path.basename(file.relativePath, '.md')
    .replace('Course-Plan', 'Year plan')
    .replace('Lessons-and-Exercises-NL', 'Lessons and exercises · Nederlands')
    .replace('Lessons-and-Exercises-EN', 'Lessons and exercises · English')
    .replace('Answer-Key-NL', 'Course answer key · Nederlands')
    .replace('Answer-Key-EN', 'Course answer key · English');
  return `        <li><a class="document-link" href="${ellaHref(file)}"><span class="document-title">${escapeHtml(name)}</span><span class="document-action" aria-hidden="true">Open <span>→</span></span></a></li>`;
}).join('\n');
const topics = new Map();

for (const file of ellaFiles) {
  const match = path.basename(file.relativePath).match(/^(\d{2}-.+)-Level-([12])(-Answers)?\.md$/);
  if (!match) continue;
  const [, topicKey, level, isAnswer] = match;
  if (!topics.has(topicKey)) topics.set(topicKey, new Map());
  topics.get(topicKey).set(`${level}${isAnswer ? '-answers' : ''}`, file);
}

const videoMatches = {
  '01-Ruimtefiguren': [
    { title: 'Ruimtefiguren (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=C-Uc4-sTacM' },
    { title: 'Uitslag (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=WK7O_uYNMP0' },
    { title: 'Aanzichten (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=oE_dIUOoka0' },
  ],
  '02-Rekenen-met-getallen': [
    { title: 'Breuken vermenigvuldigen (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=Rh8XazMaaqA' },
    { title: 'Procenten deel I (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=GjbbX9baRMc' },
  ],
  '03-Grafieken': [
    { title: 'Graphs in axis systems (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=h_gi3uydhq0' },
  ],
  '04-Lijnen-en-hoeken': [
    { title: 'Calculating angles in figures with multiple triangles (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=7ZZXv41SBI4' },
    { title: 'Drawing triangles with a compass (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=m29OOgJRyJo' },
  ],
  '05-Verhoudingen': [
    { title: 'Scale (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=JLB-zfNovzo' },
    { title: 'Procenten deel I (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=GjbbX9baRMc' },
  ],
  '06-Formules-en-grafieken': [
    { title: 'H6 - Formules en letters (1 VWO, 13e editie) · playlist', url: 'https://www.youtube.com/playlist?list=PLqmYEL-9zWjNzAszzK4_a2CkW6e0G57NG', note: 'playlist' },
  ],
  '07-Negatieve-getallen': [
    { title: 'Negatieve getallen optellen (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=sraPCi9Yyas' },
    { title: 'Machten met een negatief grondtal (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=108huNoDSFM' },
    { title: 'Squares (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=z-iZmyahxZM' },
  ],
  '08-Formules-en-vergelijkingen': [
    { title: 'Solving equations with the balance method part I (2 HAVO/VWO & 2 VWO)', url: 'https://www.youtube.com/watch?v=5qPE_stgrC0', note: 'vooruitblik' },
  ],
  '09-Omtrek-oppervlakte-inhoud': [
    { title: 'Omtrek en oppervlakte (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=GkA_VDQOgSc' },
    { title: 'De oppervlakte van een balk (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=bFgMrK5ofRU' },
    { title: 'H7 - Meten (1 VWO, 13e editie) · playlist', url: 'https://www.youtube.com/playlist?list=PLqmYEL-9zWjMO7nSsqsofwhcSnw2pnGC_', note: 'playlist' },
  ],
  '10-Rekenen-met-variabelen': [
    { title: 'H6 - Formules en letters (1 VWO, 13e editie) · playlist', url: 'https://www.youtube.com/playlist?list=PLqmYEL-9zWjNzAszzK4_a2CkW6e0G57NG', note: 'playlist' },
  ],
  '12-Vlakke-figuren': [
    { title: 'Lijnsymmetrie (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=bcanXyq6e14' },
    { title: 'Drawing a mirror image (1 HAVO/VWO & 1 VWO)', url: 'https://www.youtube.com/watch?v=q_K6gNNOpAk' },
    { title: 'H9 - Symmetrie en vlakke figuren (1 HAVO/VWO, 13e editie) · playlist', url: 'https://www.youtube.com/playlist?list=PLqmYEL-9zWjOgg7Eh45srEtoMgcZmBN6N', note: 'playlist' },
  ],
};

const topicSections = [...topics.entries()].sort(([left], [right]) => left.localeCompare(right, 'en')).map(([topicKey, levels]) => {
  const topicTitle = topicKey.replace(/^\d{2}-/, '').replaceAll('-', ' ');
  const links = [1, 2].map((level) => {
    const practice = levels.get(String(level));
    const answers = levels.get(`${level}-answers`);
    if (!practice) return '';
    return `          <li><a class="document-link" href="${ellaHref(practice)}"><span class="document-topic">Level ${level}</span><span class="document-title">Practice</span><span class="document-action" aria-hidden="true">Open <span>→</span></span></a>${answers ? `<a class="answer-link" href="${ellaHref(answers)}">Answer key</a>` : ''}</li>`;
  }).filter(Boolean).join('\n');
  const videos = videoMatches[topicKey];
  const videoContent = videos
    ? `<div class="topic-videos"><p><em>Extra video-uitleg</em> · Optional video explanations</p><ul>${videos.map((video) => `<li><a href="${video.url}" target="_blank" rel="noreferrer">${escapeHtml(video.title)}</a>${video.note ? `<span class="video-note">${video.note === 'vooruitblik' ? 'Preview · 2 VWO' : 'Playlist · 13th edition'}</span>` : ''}</li>`).join('')}</ul></div>`
    : '<p class="video-empty"><em>Ik vond in deze zoekronde geen passende video van Math with Menno.</em> I did not find a suitable Math with Menno video in this search.</p>';
  return `      <section class="subject-section ella-topic" aria-labelledby="topic-${escapeHtml(topicKey)}"><h2 id="topic-${escapeHtml(topicKey)}">${escapeHtml(topicTitle)}</h2><ul class="document-list">\n${links}\n      </ul>${videoContent}</section>`;
}).join('\n');

await mkdir(path.join(siteRoot, 'ella'), { recursive: true });
await writeFile(path.join(siteRoot, 'ella', 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#174b3b">
    <title>Ella's VWO 1 | Study Tests</title>
    <link rel="stylesheet" href="../assets/site.css">
  </head>
  <body>
    <header class="site-header">
      <a class="site-mark" href="../index.html">Study Tests</a>
      <span class="site-context">VWO 1 · Ella</span>
    </header>
    <main class="library">
      <div class="library-heading"><p class="eyebrow">Ella's study page</p><h1>VWO 1</h1><p class="intro"><em>Een eigen plek om rustig te beginnen met wiskunde.</em></p><p class="intro">A dedicated place to get started with mathematics at her own pace.</p><p class="video-disclaimer"><em>Video's zijn extra uitleg; sommige komen uit de 13e editie of zijn een vooruitblik op 2 VWO. Controleer steeds of het onderwerp aansluit bij haar les.</em> Videos are optional explanations; some are from the 13th edition or preview 2 VWO. Check that each topic matches what she is learning.</p></div>
      <section class="subject-section" aria-labelledby="course-materials"><h2 id="course-materials">Course materials</h2><ul class="document-list">\n${courseLinks}\n      </ul></section>
${topicSections}
      <p class="back-link"><a href="../index.html">Back to all study materials</a></p>
    </main>
  </body>
</html>
`);

console.log(`Built ${files.length} Markdown document${files.length === 1 ? '' : 's'} into dist/.`);