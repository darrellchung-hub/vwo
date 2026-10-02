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

function stripYamlFrontmatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

function buildEllaSidebar({ currentPage, ellaFiles, courseFiles, topics }) {
  const hrefFor = (target) => {
    const [targetPath, fragment] = target.split('#');
    const relativePath = path.posix.relative(path.posix.dirname(currentPage), targetPath);
    return `${encodePath(relativePath || path.posix.basename(targetPath))}${fragment ? `#${fragment}` : ''}`;
  };
  const linkFor = (target, label, className = '') => {
    const current = target === currentPage ? ' aria-current="page"' : '';
    return `<a${className ? ` class="${className}"` : ''} href="${hrefFor(target)}"${current}>${escapeHtml(label)}</a>`;
  };
  const courseLabels = new Map([
    ['Course-Plan.md', 'Year plan / Jaaroverzicht'],
    ['Lessons-and-Exercises-NL.md', 'Lessons and exercises · NL / Lessen en oefeningen · NL'],
    ['Lessons-and-Exercises-EN.md', 'Lessons and exercises · EN / Lessen en oefeningen · EN'],
    ['Answer-Key-NL.md', 'Course answers · NL / Cursusantwoorden · NL'],
    ['Answer-Key-EN.md', 'Course answers · EN / Cursusantwoorden · EN'],
  ]);
  const courseLinks = courseFiles.map((file) => {
    const target = path.posix.join('Wiskunde/VWO-1', file.relativePath.replace(/\.md$/i, '.html'));
    return `<li>${linkFor(target, courseLabels.get(path.basename(file.relativePath)) ?? path.basename(file.relativePath))}</li>`;
  }).join('');
  const currentTopic = path.basename(currentPage).match(/^(\d{2}-.+)-Level-[12]/)?.[1];
  const topicLinks = [...topics.entries()].map(([topicKey, levels]) => {
    const title = topicKey.replace(/^\d{2}-/, '').replaceAll('-', ' ');
    const overview = `<li>${linkFor(`ella/index.html#topic-${topicKey}`, 'Topic overview / Onderwerp')}</li>`;
    const levelLinks = [1, 2].map((level) => {
      const practice = levels.get(String(level));
      const answers = levels.get(`${level}-answers`);
      const links = [];
      if (practice) {
        const target = path.posix.join('Wiskunde/VWO-1', practice.relativePath.replace(/\.md$/i, '.html'));
        links.push(`<li>${linkFor(target, `Level ${level} practice / Oefenen`)}</li>`);
      }
      if (answers) {
        const target = path.posix.join('Wiskunde/VWO-1', answers.relativePath.replace(/\.md$/i, '.html'));
        links.push(`<li>${linkFor(target, `Level ${level} answers / Antwoorden`)}</li>`);
      }
      return links.join('');
    }).join('');
    return `<li><details class="ella-sidebar-topic"${topicKey === currentTopic ? ' open' : ''}><summary>${escapeHtml(title)}</summary><ul>${overview}${levelLinks}</ul></details></li>`;
  }).join('');

  return `<aside class="ella-sidebar" data-profile-name="Ella" aria-label="Ella's VWO 1 pages">
        <button class="ella-sidebar-toggle" type="button" aria-expanded="false" aria-controls="ella-sidebar-navigation" aria-label="Open Ella navigation / Open Ella-navigatie" title="Open Ella navigation / Open Ella-navigatie"><span aria-hidden="true">›</span></button>
        <p class="ella-sidebar-title">Ella's VWO 1</p>
        <details class="ella-sidebar-details" open>
          <summary>Ella's VWO 1 navigation / Navigatie</summary>
          <nav id="ella-sidebar-navigation" aria-label="Ella's VWO 1 navigation">
            ${linkFor('ella/index.html', 'Overview / Overzicht', 'ella-sidebar-overview')}
            <h2>Course materials / Cursusmateriaal</h2>
            <ul class="ella-sidebar-links">${courseLinks}</ul>
            <h2>Practice by chapter / Oefenen per hoofdstuk</h2>
            <ul class="ella-sidebar-topics">${topicLinks}</ul>
          </nav>
        </details>
      </aside>`;
}

    function buildCurtisSidebar({ currentPage, subjectGroups }) {
      const hrefFor = (target) => encodePath(path.posix.relative(path.posix.dirname(currentPage), target));
      const linkFor = (target, label, className = '') => {
        const current = target === currentPage ? ' aria-current="page"' : '';
        return `<a${className ? ` class="${className}"` : ''} href="${hrefFor(target)}"${current}>${escapeHtml(label)}</a>`;
      };
      const subjectSections = [...subjectGroups.entries()].map(([subject, topics]) => {
        const topicItems = [...topics.entries()].map(([topic, documents]) => {
          const links = documents.map((document) => `<li>${linkFor(document.path, document.heading)}</li>`).join('');
          if (topic === 'General') return links;
          const isCurrent = documents.some((document) => document.path === currentPage);
          return `<li><details class="ella-sidebar-topic"${isCurrent ? ' open' : ''}><summary>${escapeHtml(topic)}</summary><ul>${links}</ul></details></li>`;
        }).join('');
        return `<h2>${escapeHtml(subject)}</h2><ul class="ella-sidebar-links">${topicItems}</ul>`;
      }).join('');

      return `<aside class="ella-sidebar" data-profile-name="Curtis" aria-label="Curtis's 3 VWO pages">
            <button class="ella-sidebar-toggle" type="button" aria-expanded="false" aria-controls="curtis-sidebar-navigation" aria-label="Open Curtis navigation / Open Curtis-navigatie" title="Open Curtis navigation / Open Curtis-navigatie"><span aria-hidden="true">›</span></button>
            <p class="ella-sidebar-title">Curtis · 3 VWO</p>
            <details class="ella-sidebar-details" open>
              <summary>Curtis's 3 VWO navigation / Navigatie</summary>
              <nav id="curtis-sidebar-navigation" aria-label="Curtis's 3 VWO navigation">
                ${linkFor('curtis/index.html', 'Overview / Overzicht', 'ella-sidebar-overview')}
                ${subjectSections}
              </nav>
            </details>
          </aside>`;
    }

    const profileSidebarScript = `
    <script>
      (() => {
        const sidebar = document.querySelector('.ella-sidebar');
        const navigation = document.querySelector('.ella-sidebar-details');
        const toggle = document.querySelector('.ella-sidebar-toggle');
        if (!sidebar || !navigation || !toggle) return;
        const compactLayout = window.matchMedia('(max-width: 860px)');
        const setOpen = (open) => {
          const collapsed = !open;
          sidebar.dataset.collapsed = String(collapsed);
          toggle.setAttribute('aria-expanded', String(open));
          const profileName = sidebar.dataset.profileName || 'Study';
          const label = open ? 'Close ' + profileName + ' navigation / Sluit de navigatie van ' + profileName : 'Open ' + profileName + ' navigation / Open de navigatie van ' + profileName;
          toggle.setAttribute('aria-label', label);
          toggle.title = label;
          toggle.firstElementChild.textContent = open ? '‹' : '›';
        };
        const updateLayout = () => {
          if (compactLayout.matches) {
            setOpen(true);
            navigation.open = false;
            return;
          }
          navigation.open = true;
          setOpen(false);
        };
        document.addEventListener('pointermove', (event) => {
          if (compactLayout.matches) return;
          const collapsed = sidebar.dataset.collapsed === 'true';
          const pointerInsideDrawer = event.clientX >= 0 && event.clientX <= 270 && event.clientY >= 88;
          const pointerOnEdgeHandle = event.clientX <= 42 && event.clientY >= 88;
          const keyboardFocusInside = sidebar.contains(document.activeElement) && document.activeElement !== toggle;
          if (collapsed && pointerOnEdgeHandle) setOpen(true);
          else if (!collapsed && !pointerInsideDrawer && !keyboardFocusInside) setOpen(false);
        });
        sidebar.addEventListener('focusin', (event) => {
          if (!compactLayout.matches && event.target !== toggle) setOpen(true);
        });
        sidebar.addEventListener('focusout', (event) => {
          if (!compactLayout.matches && !sidebar.contains(event.relatedTarget)) setOpen(false);
        });
        toggle.addEventListener('click', (event) => {
          if (compactLayout.matches || event.detail !== 0) return;
          const open = sidebar.dataset.collapsed === 'true';
          setOpen(open);
          if (open) navigation.querySelector('a').focus();
        });
        sidebar.addEventListener('keydown', (event) => {
          if (event.key !== 'Escape' || compactLayout.matches) return;
          setOpen(false);
          toggle.focus();
        });
        updateLayout();
        compactLayout.addEventListener('change', updateLayout);
      })();
    </script>`;

function rewriteMarkdownLinksToHtml(content) {
  return content.replace(/(<a\b[^>]*\bhref=")([^"]+)(")/gi, (anchor, prefix, href, suffix) => {
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return anchor;
    const suffixIndex = href.search(/[?#]/);
    const pathname = suffixIndex < 0 ? href : href.slice(0, suffixIndex);
    const queryAndHash = suffixIndex < 0 ? '' : href.slice(suffixIndex);
    if (!/\.md$/i.test(pathname)) return anchor;
    return `${prefix}${pathname.replace(/\.md$/i, '.html')}${queryAndHash}${suffix}`;
  });
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

function pageTemplate({ title, stylesheet, content, breadcrumb, sidebarNavigation, sidebarScript, contextLabel = '3 vwo · Practice library' }) {
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
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${breadcrumb.home}">${escapeHtml(breadcrumb.homeLabel)}</a><span aria-hidden="true">/</span><span>${escapeHtml(breadcrumb.topic)}</span></nav>
      <div class="site-header-tools">
        <span class="site-context">${escapeHtml(contextLabel)}</span>
        <div class="language-switch" role="group" aria-label="Language view / Taalweergave" hidden>
          <span class="language-switch-label">Show / Toon</span>
          <button type="button" data-language-mode="nl" aria-pressed="false">Nederlands</button>
          <button type="button" data-language-mode="en" aria-pressed="false">English</button>
          <button type="button" data-language-mode="all" aria-pressed="true">Both / Beide</button>
        </div>
      </div>
    </header>
    <div class="document-layout${sidebarNavigation ? ' has-sidebar' : ''}">
${sidebarNavigation ?? ''}
      <main class="document">
        <article class="markdown-body">${content}</article>
        <p class="back-link"><a href="${breadcrumb.home}">Back to ${escapeHtml(breadcrumb.homeLabel)}</a></p>
      </main>
    </div>
  <script>
      (() => {
        const article = document.querySelector('.markdown-body');
        const control = document.querySelector('.language-switch');
        if (!article || !control) return;

        const markLanguage = (element, language) => {
          element.dataset.language = language;
          element.lang = language;
        };
        const isDutchParagraph = (paragraph) => {
          const content = [...paragraph.childNodes].filter((node) => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
          return content.length === 1 && content[0].nodeType === Node.ELEMENT_NODE && content[0].tagName === 'EM';
        };
        const languageSpan = (text, language) => {
          const span = document.createElement('span');
          span.textContent = text;
          markLanguage(span, language);
          return span;
        };
        const languageSeparator = () => {
          const separator = document.createElement('span');
          separator.textContent = ' / ';
          separator.dataset.language = 'all';
          return separator;
        };
        const splitBilingualHeading = (heading) => {
          if (!/^H[1-6]$/.test(heading.tagName) || heading.children.length || !heading.textContent.includes(' / ')) return;
          const [firstPart, ...remainingParts] = heading.textContent.split(' / ');
          const secondPart = remainingParts.join(' / ');
          if (!firstPart.trim() || !secondPart.trim()) return;
          const englishFirstHeadings = new Set(['key terms', 'figures and tables']);
          const firstIsEnglish = englishFirstHeadings.has(firstPart.trim().toLowerCase());
          const dutch = firstIsEnglish ? secondPart : firstPart;
          const english = firstIsEnglish ? firstPart : secondPart;
          heading.replaceChildren(
            languageSpan(dutch.trim(), 'nl'),
            languageSeparator(),
            languageSpan(english.trim(), 'en'),
          );
        };
        const splitQuestionItems = () => {
          const labelTranslations = new Map([
            ['Prompt / Vraag:', ['Vraag:', 'Prompt:']],
            ['Response / Antwoordvorm:', ['Antwoordvorm:', 'Response:']],
            ['Source limitation / Bronbeperking:', ['Bronbeperking:', 'Source limitation:']],
            ['Answer / Antwoord:', ['Antwoord:', 'Answer:']],
            ['Source note / Bronnotitie:', ['Bronnotitie:', 'Source note:']],
          ]);
          for (const item of article.querySelectorAll('li')) {
            if (!/^Q\\d/.test(item.textContent.trim())) continue;
            for (const label of item.querySelectorAll('strong')) {
              const text = label.textContent;
              for (const [sourceLabel, [dutchLabel, englishLabel]] of labelTranslations) {
                if (!text.endsWith(sourceLabel)) continue;
                const prefix = text.slice(0, -sourceLabel.length);
                label.replaceChildren(
                  document.createTextNode(prefix),
                  languageSpan(dutchLabel, 'nl'),
                  languageSeparator(),
                  languageSpan(englishLabel, 'en'),
                  document.createTextNode(' '),
                );
                break;
              }
            }
            const dutchPrompt = item.querySelector('em');
            if (dutchPrompt) {
              markLanguage(dutchPrompt, 'nl');
              const slash = dutchPrompt.nextSibling;
              if (slash?.nodeType === Node.TEXT_NODE && /^\\s*\\/\\s*/.test(slash.textContent)) {
                const englishPrompt = document.createElement('span');
                markLanguage(englishPrompt, 'en');
                const remainingText = slash.textContent.replace(/^\\s*\\/\\s*/, '');
                if (remainingText) englishPrompt.append(document.createTextNode(remainingText));
                let sibling = slash.nextSibling;
                while (sibling && !(sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === 'STRONG')) {
                  const next = sibling.nextSibling;
                  englishPrompt.append(sibling);
                  sibling = next;
                }
                const separator = document.createElement('span');
                separator.textContent = ' / ';
                separator.dataset.language = 'all';
                slash.replaceWith(separator, englishPrompt, document.createTextNode(' '));
              }
            }
            const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
            const textNodes = [];
            while (walker.nextNode()) textNodes.push(walker.currentNode);
            for (const textNode of textNodes.filter((node) => node.textContent.includes(' / '))) {
              if (/^\\s*\\//.test(textNode.textContent) || !textNode.textContent.includes(' / ')) continue;
              const pair = textNode.textContent.match(/^(.*?)\\s+\\/\\s+(.*?)$/s);
              if (!pair || !pair[1].trim() || !pair[2].trim()) continue;
              const separator = document.createElement('span');
              separator.textContent = ' / ';
              separator.dataset.language = 'all';
              textNode.replaceWith(
                languageSpan(pair[2].trim(), 'nl'),
                separator,
                languageSpan(pair[1].trim(), 'en'),
                document.createTextNode(' '),
              );
            }
          }
        };

        for (const heading of article.querySelectorAll('h1, h2, h3, h4, h5, h6')) splitBilingualHeading(heading);

        for (const heading of article.querySelectorAll('h1, h3')) {
          if (heading.querySelector('[data-language]')) continue;
          const translation = heading.nextElementSibling;
          if (translation && translation.tagName === 'P' && isDutchParagraph(translation)) {
            markLanguage(heading, 'nl');
            markLanguage(translation, 'en');
          }
        }
        const headingLanguages = new Map([
          ['doorlopende onderdelen', 'nl'],
          ['bronnen', 'nl'],
          ['pacing and alignment notes', 'en'],
        ]);
        for (const heading of article.querySelectorAll('h2')) {
          if (heading.querySelector('[data-language]')) continue;
          const translation = heading.nextElementSibling;
          if (!translation || translation.tagName !== 'P' || !isDutchParagraph(translation)) continue;
          const language = headingLanguages.get(heading.textContent.trim().toLowerCase());
          if (!language) continue;
          markLanguage(heading, language);
          markLanguage(translation, language === 'nl' ? 'en' : 'nl');
        }

        const paragraphs = [...article.querySelectorAll('p')];
        for (const paragraph of paragraphs) {
          if (!isDutchParagraph(paragraph) || paragraph.dataset.language) continue;
          let translation = paragraph.nextElementSibling;
          if ((!translation || translation.tagName !== 'P') && paragraph.parentElement.tagName === 'LI') {
            const list = paragraph.parentElement.parentElement;
            const isLastListItem = paragraph.parentElement === list.lastElementChild;
            translation = isLastListItem && list.nextElementSibling && list.nextElementSibling.tagName === 'P'
              ? list.nextElementSibling
              : null;
          }
          if (!translation || translation.tagName !== 'P' || isDutchParagraph(translation)) continue;
          markLanguage(paragraph, 'nl');
          markLanguage(translation, 'en');
        }

        for (const item of article.querySelectorAll('li')) {
          if (!/^Source\s/i.test(item.textContent.trim())) continue;
          for (const paragraph of item.querySelectorAll('p')) {
            const dutch = paragraph.querySelector('em');
            const translation = paragraph.nextElementSibling;
            if (!dutch || !translation || translation.tagName !== 'P' || isDutchParagraph(translation)) continue;
            markLanguage(dutch, 'nl');
            markLanguage(translation, 'en');
          }
        }
        splitQuestionItems();

        for (const item of article.querySelectorAll('li')) {
          const breaks = [...item.childNodes].filter((node) => node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR');
          if (breaks.length !== 1 || item.querySelector('[data-language]')) continue;
          const lineBreak = breaks[0];
          const dutchNodes = [];
          const englishNodes = [];
          let afterBreak = false;
          for (const node of [...item.childNodes]) {
            if (node === lineBreak) {
              afterBreak = true;
              continue;
            }
            (afterBreak ? englishNodes : dutchNodes).push(node);
          }
          const dutchHasEmphasis = dutchNodes.some((node) => node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'EM' || node.querySelector('em')));
          const englishHasEmphasis = englishNodes.some((node) => node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'EM' || node.querySelector('em')));
          if (!dutchHasEmphasis || !englishHasEmphasis) continue;
          const dutchBlock = document.createElement('span');
          dutchBlock.dataset.language = 'nl';
          dutchBlock.lang = 'nl';
          dutchNodes.forEach((node) => dutchBlock.append(node));
          const englishBlock = document.createElement('span');
          englishBlock.dataset.language = 'en';
          englishBlock.lang = 'en';
          englishNodes.forEach((node) => englishBlock.append(node));
          const separator = document.createElement('br');
          separator.dataset.language = 'all';
          item.replaceChildren(dutchBlock, separator, englishBlock);
        }

        const paragraphLabels = [
          ['bron:', 'nl'], ['modelantwoord:', 'nl'], ['punten:', 'nl'],
          ['andere goede antwoorden:', 'nl'], ['instructies:', 'nl'], ['tip bij uitlegvragen:', 'nl'],
          ['source:', 'en'], ['model answer:', 'en'], ['points:', 'en'],
          ['other acceptable answers:', 'en'], ['instructions:', 'en'], ['tip for explanation questions:', 'en'],
        ];
        for (const paragraph of article.querySelectorAll('p')) {
          const label = paragraph.firstElementChild;
          if (!label || label.tagName !== 'STRONG') continue;
          const text = label.textContent.trim().toLowerCase();
          const match = paragraphLabels.find(([prefix]) => text.startsWith(prefix));
          if (match) markLanguage(paragraph, match[1]);
        }

        const tables = [...article.querySelectorAll('table')];
        const hasLabel = (table, labels) => {
          const text = table.textContent.toLowerCase();
          return labels.some((label) => text.includes(label));
        };
        const sameTableShape = (first, second) => {
          const firstRows = [...first.rows];
          const secondRows = [...second.rows];
          return firstRows.length === secondRows.length && firstRows.every((row, index) => row.cells.length === secondRows[index].cells.length);
        };
        const dutchTableLabels = ['vak', 'boek', 'hoofdstuk', 'totaal', 'tijd', 'naam', 'veld', 'gegeven', 'punten', 'cijfer', 'herhalen'];
        const englishTableLabels = ['subject', 'book', 'chapter', 'total', 'time', 'name', 'field', 'details', 'points', 'grade', 'review'];
        for (let index = 0; index < tables.length - 1; index += 1) {
          const dutchTable = tables[index];
          const englishTable = tables[index + 1];
          if (dutchTable.nextElementSibling !== englishTable || !sameTableShape(dutchTable, englishTable)) continue;
          if (hasLabel(dutchTable, dutchTableLabels) && hasLabel(englishTable, englishTableLabels)) {
            markLanguage(dutchTable, 'nl');
            markLanguage(englishTable, 'en');
            index += 1;
          }
        }

        const sectionLanguages = new Map([['beoordeling', 'nl'], ['grading', 'en']]);
        for (const heading of article.querySelectorAll('h2')) {
          const language = sectionLanguages.get(heading.textContent.trim().toLowerCase());
          if (!language) continue;
          markLanguage(heading, language);
          let sibling = heading.nextElementSibling;
          while (sibling && !/^H[1-6]$/.test(sibling.tagName)) {
            markLanguage(sibling, language);
            sibling = sibling.nextElementSibling;
          }
        }

        for (const summary of article.querySelectorAll('details > summary')) {
          const dutch = summary.querySelector('em');
          const lineBreak = dutch ? dutch.nextElementSibling : null;
          const englishText = lineBreak ? lineBreak.nextSibling : null;
          if (!dutch || !lineBreak || lineBreak.tagName !== 'BR' || !englishText || englishText.nodeType !== Node.TEXT_NODE || !englishText.textContent.trim()) continue;
          markLanguage(dutch, 'nl');
          const english = document.createElement('span');
          english.textContent = englishText.textContent.trim();
          markLanguage(english, 'en');
          englishText.replaceWith(english);
        }

        for (const cell of article.querySelectorAll('th, td')) {
          if (cell.children.length || cell.childNodes.length !== 1 || cell.firstChild.nodeType !== Node.TEXT_NODE) continue;
          const value = cell.textContent.trim();
          const separatorIndex = value.indexOf(' / ');
          if (separatorIndex < 0) continue;
          const dutchText = value.slice(0, separatorIndex).trim();
          const englishText = value.slice(separatorIndex + 3).trim();
          if (!/[A-Za-zÀ-ÿ]/.test(dutchText) || !/[A-Za-zÀ-ÿ]/.test(englishText)) continue;
          const dutch = document.createElement('span');
          dutch.textContent = dutchText.trim();
          markLanguage(dutch, 'nl');
          const separator = document.createElement('span');
          separator.textContent = ' / ';
          separator.dataset.language = 'all';
          const english = document.createElement('span');
          english.textContent = englishText.trim();
          markLanguage(english, 'en');
          cell.replaceChildren(dutch, separator, english);
        }

        const hasDutch = article.querySelector('[data-language="nl"]');
        const hasEnglish = article.querySelector('[data-language="en"]');
        if (!hasDutch || !hasEnglish) return;

        control.hidden = false;
        const buttons = [...control.querySelectorAll('[data-language-mode]')];
        const setMode = (mode) => {
          document.documentElement.dataset.languageMode = mode;
          for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.languageMode === mode));
          try { localStorage.setItem('study-language-mode', mode); } catch {}
        };
        let initialMode = 'all';
        try {
          const savedMode = localStorage.getItem('study-language-mode');
          if (['nl', 'en', 'all'].includes(savedMode)) initialMode = savedMode;
        } catch {}
        for (const button of buttons) button.addEventListener('click', () => setMode(button.dataset.languageMode));
        setMode(initialMode);
      })();
    </script>
${sidebarScript ?? ''}
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
const ellaFiles = files
  .filter((file) => file.relativePath.startsWith('Wiskunde/VWO-1/'))
  .map((file) => ({ ...file, relativePath: file.relativePath.slice('Wiskunde/VWO-1/'.length) }));
const ellaFileByName = new Map(ellaFiles.map((file) => [path.basename(file.relativePath), file]));
const courseFiles = ['Course-Plan.md', 'Lessons-and-Exercises-NL.md', 'Lessons-and-Exercises-EN.md', 'Answer-Key-NL.md', 'Answer-Key-EN.md']
  .map((name) => ellaFileByName.get(name))
  .filter(Boolean);
const topics = new Map();
for (const file of ellaFiles) {
  const match = path.basename(file.relativePath).match(/^(\d{2}-.+)-Level-([12])(-Answers)?\.md$/);
  if (!match) continue;
  const [, topicKey, level, isAnswer] = match;
  if (!topics.has(topicKey)) topics.set(topicKey, new Map());
  topics.get(topicKey).set(`${level}${isAnswer ? '-answers' : ''}`, file);
}
const isCurtisMaterial = (relativePath) =>
  !relativePath.startsWith('Wiskunde/VWO-1/') && relativePath !== 'Languages/German/progress.md';
const curtisFiles = files.filter((file) => isCurtisMaterial(file.relativePath));
const curtisSubjectGroups = new Map();
for (const file of curtisFiles) {
  const source = await readFile(file.absolutePath, 'utf8');
  const relativeHtmlPath = file.relativePath.replace(/\.md$/i, '.html');
  const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim()
    ?? path.basename(file.relativePath, path.extname(file.relativePath)).replaceAll('_', ' ');
  const pathParts = file.relativePath.split('/');
  const subject = pathParts[0] ?? 'Other';
  const topic = pathParts.slice(1, -1).map((part) => part.replace(/[-_]+/g, ' ')).join(' / ') || 'General';
  if (!curtisSubjectGroups.has(subject)) curtisSubjectGroups.set(subject, new Map());
  const subjectTopics = curtisSubjectGroups.get(subject);
  if (!subjectTopics.has(topic)) subjectTopics.set(topic, []);
  subjectTopics.get(topic).push({ heading, path: relativeHtmlPath });
}
for (const subjectTopics of curtisSubjectGroups.values()) {
  for (const documents of subjectTopics.values()) documents.sort((left, right) => left.heading.localeCompare(right.heading, 'en'));
}
const copiedMediaDirectories = new Set();
for (const file of files) {
  const source = await readFile(file.absolutePath, 'utf8');
  const relativeHtmlPath = file.relativePath.replace(/\.md$/i, '.html');
  const targetPath = path.join(siteRoot, ...relativeHtmlPath.split('/'));
  const stylesheet = encodePath(path.posix.relative(path.posix.dirname(relativeHtmlPath), 'assets/site.css'));
  const defaultHome = encodePath(path.posix.relative(path.posix.dirname(relativeHtmlPath), 'index.html'));
  const isEllaVwo1 = file.relativePath.startsWith('Wiskunde/VWO-1/');
  const isCurtisVwo3 = isCurtisMaterial(file.relativePath);
  const profileHome = isEllaVwo1 ? 'ella/index.html' : 'curtis/index.html';
  const home = isEllaVwo1 || isCurtisVwo3
    ? encodePath(path.posix.relative(path.posix.dirname(relativeHtmlPath), profileHome))
    : defaultHome;
  const homeLabel = isEllaVwo1 ? "Ella's VWO 1" : isCurtisVwo3 ? "Curtis's 3 VWO" : 'All tests';
  const heading = source.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(file.relativePath, path.extname(file.relativePath)).replaceAll('_', ' ');
  const pathParts = file.relativePath.split('/');
  const topic = pathParts.length > 2 ? pathParts[1] : pathParts[0] ?? 'Other';

  await mkdir(path.dirname(targetPath), { recursive: true });
  const mediaSource = path.join(path.dirname(file.absolutePath), 'media');
  if (!copiedMediaDirectories.has(mediaSource)) {
    const mediaTarget = path.join(siteRoot, ...path.dirname(relativeHtmlPath).split('/'), 'media');
    try {
      await cp(mediaSource, mediaTarget, { recursive: true });
      copiedMediaDirectories.add(mediaSource);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  await writeFile(targetPath, pageTemplate({
    title: heading,
    stylesheet,
    content: rewriteMarkdownLinksToHtml(await marked.parse(stripYamlFrontmatter(source))),
    breadcrumb: { home, homeLabel, topic },
    contextLabel: isEllaVwo1 ? 'VWO 1 · Ella' : isCurtisVwo3 ? '3 VWO · Curtis' : '3 vwo · Practice library',
    sidebarNavigation: isEllaVwo1
      ? buildEllaSidebar({ currentPage: relativeHtmlPath, ellaFiles, courseFiles, topics })
      : isCurtisVwo3
        ? buildCurtisSidebar({ currentPage: relativeHtmlPath, subjectGroups: curtisSubjectGroups })
        : '',
    sidebarScript: isEllaVwo1 || isCurtisVwo3 ? profileSidebarScript : '',
  }));
}

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
      <div class="library-heading"><p class="eyebrow">Study library</p><h1>Choose a student.</h1><p class="intro">Open a personal study space to continue.</p></div>
      <p class="profile-entry"><a href="ella/">Ella's VWO 1 page <span aria-hidden="true">→</span></a><span><em>Haar eigen startpagina voor VWO 1.</em> Her own starting page for VWO 1.</span></p>
      <p class="profile-entry"><a href="curtis/">Curtis's 3 VWO page <span aria-hidden="true">→</span></a><span>His study materials, grouped by subject and topic.</span></p>
    </main>
  </body>
</html>
`);

const ellaHref = (file) => encodePath(path.posix.join('..', 'Wiskunde', 'VWO-1', file.relativePath.replace(/\.md$/i, '.html')));
const courseLinks = courseFiles.map((file) => {
  const name = path.basename(file.relativePath, '.md')
    .replace('Course-Plan', 'Year plan')
    .replace('Lessons-and-Exercises-NL', 'Lessons and exercises · Nederlands')
    .replace('Lessons-and-Exercises-EN', 'Lessons and exercises · English')
    .replace('Answer-Key-NL', 'Course answer key · Nederlands')
    .replace('Answer-Key-EN', 'Course answer key · English');
  return `        <li><a class="document-link" href="${ellaHref(file)}"><span class="document-title">${escapeHtml(name)}</span><span class="document-action" aria-hidden="true">Open <span>→</span></span></a></li>`;
}).join('\n');

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
    <div class="document-layout has-sidebar profile-layout ella-layout">
${buildEllaSidebar({ currentPage: 'ella/index.html', ellaFiles, courseFiles, topics })}
    <main class="library">
      <div class="library-heading"><p class="eyebrow">Ella's study page</p><h1>VWO 1</h1><p class="intro"><em>Een eigen plek om rustig te beginnen met wiskunde.</em></p><p class="intro">A dedicated place to get started with mathematics at her own pace.</p><p class="video-disclaimer"><em>Video's zijn extra uitleg; sommige komen uit de 13e editie of zijn een vooruitblik op 2 VWO. Controleer steeds of het onderwerp aansluit bij haar les.</em> Videos are optional explanations; some are from the 13th edition or preview 2 VWO. Check that each topic matches what she is learning.</p></div>
      <section class="subject-section" aria-labelledby="course-materials"><h2 id="course-materials">Course materials</h2><ul class="document-list">\n${courseLinks}\n      </ul></section>
${topicSections}
      <p class="back-link"><a href="../index.html">Back to all study materials</a></p>
    </main>
    </div>
${profileSidebarScript}
  </body>
</html>
`);

const curtisSections = [...curtisSubjectGroups.entries()].map(([subject, subjectTopics], subjectIndex) => {
  const documents = [...subjectTopics.entries()].flatMap(([topic, topicDocuments]) =>
    topicDocuments.map((document) => ({ ...document, topic }))
  );
  return `      <section class="subject-section" aria-labelledby="curtis-subject-${subjectIndex}"><h2 id="curtis-subject-${subjectIndex}">${escapeHtml(subject)}</h2><ul class="document-list">${documents.map((document) => `<li><a class="document-link" href="${encodePath(path.posix.join('..', document.path))}"><span class="document-topic">${escapeHtml(document.topic)}</span><span class="document-title">${escapeHtml(document.heading)}</span><span class="document-action" aria-hidden="true">Open <span>→</span></span></a></li>`).join('')}</ul></section>`;
}).join('\n');

await mkdir(path.join(siteRoot, 'curtis'), { recursive: true });
await writeFile(path.join(siteRoot, 'curtis', 'index.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#174b3b">
    <title>Curtis's 3 VWO | Study Tests</title>
    <link rel="stylesheet" href="../assets/site.css">
  </head>
  <body>
    <header class="site-header">
      <a class="site-mark" href="../index.html">Study Tests</a>
      <span class="site-context">3 VWO · Curtis</span>
    </header>
    <div class="document-layout has-sidebar profile-layout curtis-layout">
${buildCurtisSidebar({ currentPage: 'curtis/index.html', subjectGroups: curtisSubjectGroups })}
      <main class="library">
        <div class="library-heading"><p class="eyebrow">Curtis's study page</p><h1>3 VWO</h1><p class="intro">Study materials grouped by subject and topic.</p></div>
${curtisSections}
        <p class="back-link"><a href="../index.html">Back to all study materials</a></p>
      </main>
    </div>
${profileSidebarScript}
  </body>
</html>
`);

console.log(`Built ${files.length} Markdown document${files.length === 1 ? '' : 's'} into dist/.`);