import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'output');
const siteRoot = path.join(root, 'dist');
const stylesheetSource = path.join(root, 'site', 'site.css');
const stylesheetTarget = path.join(siteRoot, 'assets', 'site.css');

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
${indexContent}
      <footer class="library-footer">${files.length} ${files.length === 1 ? 'document' : 'documents'}</footer>
    </main>
  </body>
</html>
`);

console.log(`Built ${files.length} Markdown document${files.length === 1 ? '' : 's'} into dist/.`);