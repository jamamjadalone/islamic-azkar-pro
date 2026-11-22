// Builds the blocks index into every skill that reads it.
//
//   node scripts/build-blocks.mjs                       write blocks/ into each skill in BLOCK_SKILLS
//   node scripts/build-blocks.mjs --check               exit 1 if any copy is out of date
//   node scripts/build-blocks.mjs --from-book <book>    compare blocks-meta.json with the book, change nothing
//
// scripts/blocks-meta.json is the only source. It is written by hand, and anyone can edit it.
// Each skill gets its own copy, because a skill installed on its own (for example with
// `npx skills add`) can read only its own folder.
// The book comparison is an optional step for the maintainer: it reports blocks that are in the
// book but not in blocks-meta.json, the other way round, and parts that differ.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'plugins', 'lwh-ai-coding', 'skills');
const BLOCK_SKILLS = ['lwh-plan-app', 'lwh-challenge-plan', 'lwh-make-tasks', 'lwh-security-check'];
const outDirs = BLOCK_SKILLS.map((s) => join(skillsDir, s, 'blocks'));
const metaPath = join(root, 'scripts', 'blocks-meta.json');

const args = process.argv.slice(2);
const meta = JSON.parse(readFileSync(metaPath, 'utf8'));

// ---------- validate ----------

const STAGES = ['day-one', 'day-one-if', 'go-live', 'with-users', 'at-scale', 'any'];
const KINDS = ['checkable', 'practice', 'concept'];
const PROOFS = ['test', 'review'];
const SCOPES = ['feature', 'cross-cutting', 'setup'];
const errors = [];
const seen = new Set();

for (const part of meta.parts) {
  if (!part.name || !Array.isArray(part.blocks)) errors.push(`A part needs a name and a blocks list: ${JSON.stringify(part).slice(0, 60)}`);
  for (const b of part.blocks || []) {
    const at = `${part.name} > ${b.name}`;
    if (!b.name) errors.push(`${part.name}: a block has no name`);
    if (seen.has(b.name)) errors.push(`${at}: the name is used twice`);
    seen.add(b.name);
    for (const f of ['what', 'applies', 'stage', 'kind']) if (!b[f]) errors.push(`${at}: "${f}" is missing`);
    if (b.stage && !STAGES.includes(b.stage)) errors.push(`${at}: stage "${b.stage}" is not one of ${STAGES.join(', ')}`);
    if (b.kind && !KINDS.includes(b.kind)) errors.push(`${at}: kind "${b.kind}" is not one of ${KINDS.join(', ')}`);
    if (b.scope && !SCOPES.includes(b.scope)) errors.push(`${at}: scope "${b.scope}" is not one of ${SCOPES.join(', ')}`);
    if (b.kind === 'concept' && b.stage !== 'any') errors.push(`${at}: a concept must have stage "any"`);
    if (b.stage === 'any' && b.kind !== 'concept') errors.push(`${at}: stage "any" is only for concepts`);
    if (b.kind !== 'checkable' && b.check) errors.push(`${at}: only a checkable block has a "check"`);
    if (b.kind === 'checkable' && ['day-one', 'day-one-if'].includes(b.stage) && !b.check) errors.push(`${at}: a day-one checkable block needs a "check"`);
    if (b.check && !PROOFS.includes(b.proof)) errors.push(`${at}: a block with a check needs "proof": ${PROOFS.join(', ')}`);
    if (!b.check && b.proof) errors.push(`${at}: "proof" without a "check"`);
    for (const [k, v] of Object.entries(b)) if (typeof v === 'string' && v.includes('|')) errors.push(`${at}: "${k}" contains a "|", which breaks the tables`);
  }
}

if (errors.length) {
  console.error(`blocks-meta.json has ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

// ---------- optional: compare with the book ----------

const fromBook = args.indexOf('--from-book');
if (fromBook !== -1) {
  const bookPath = args[fromBook + 1];
  if (!bookPath) {
    console.error('Usage: node scripts/build-blocks.mjs --from-book <path-to-book.html>');
    process.exit(1);
  }
  const decode = (s) =>
    s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      .replace(/&#39;|&rsquo;|&lsquo;|&#8217;/g, "'").replace(/&nbsp;/g, ' ').replace(/&mdash;|&#8212;/g, '—').replace(/\s+/g, ' ').trim();
  const pick = (chunk, re) => { const m = chunk.match(re); return m ? decode(m[1]) : ''; };
  const book = readFileSync(bookPath, 'utf8')
    .split(/<section class="sheet bb[^"]*">/).slice(1)
    .map((c) => ({ name: pick(c, /<h1 class="title">([\s\S]*?)<\/h1>/), part: pick(c, /<span class="series">([\s\S]*?)<\/span>/) }))
    .filter((b) => b.name && b.part);
  const ours = new Map(meta.parts.flatMap((p) => p.blocks.map((b) => [b.name, p.name])));
  const theirs = new Map(book.map((b) => [b.name, b.part]));
  const onlyBook = book.filter((b) => !ours.has(b.name)).map((b) => `${b.part} > ${b.name}`);
  const onlyMeta = [...ours.keys()].filter((n) => !theirs.has(n));
  const moved = [...ours].filter(([n, p]) => theirs.has(n) && theirs.get(n) !== p).map(([n, p]) => `${n}: "${p}" here, "${theirs.get(n)}" in the book`);
  console.log(`Book: ${book.length} blocks. blocks-meta.json: ${ours.size} blocks.`);
  if (onlyBook.length) console.log(`In the book, not in blocks-meta.json:\n  ${onlyBook.join('\n  ')}`);
  if (onlyMeta.length) console.log(`In blocks-meta.json, not in the book:\n  ${onlyMeta.join('\n  ')}`);
  if (moved.length) console.log(`In a different part:\n  ${moved.join('\n  ')}`);
  if (!onlyBook.length && !onlyMeta.length && !moved.length) console.log('No differences.');
  process.exit(0);
}

// ---------- build ----------

const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const sentence = (s) => (/[.?!]$/.test(s) ? s : `${s}.`);

const files = new Map();
const index = [
  '# Blocks index',
  '',
  '<!-- Generated by scripts/build-blocks.mjs from scripts/blocks-meta.json. Edit that file, not this one. -->',
  '',
  'Every block, with when it applies and when it starts to matter. Pick blocks from these tables, then open only the part files you need for the full entries, including each block\'s "Done when" check.',
  '',
  '**Stage:** when the block starts to matter.',
  '- `day-one`: every app, from the first version.',
  '- `day-one-if`: from the first version, when the app has the feature in "Applies when".',
  '- `go-live`: before the app is put on the internet for real users.',
  '- `with-users`: after launch, once people use it.',
  '- `at-scale`: with real traffic.',
  '- `any`: a concept, explained when the term comes up.',
  '',
  '**Kind:** `checkable` (a test or a reviewer can prove it), `practice` (a way of working; no box in any task), `concept` (something to understand; never put in a plan or turned into a check).',
  '',
  '**Proof:** how a check is proven. `test` goes into a build task and is proven by running a test. `review` goes into the milestone\'s review task and is judged by a fresh reviewer, never by the worker who built it.',
  '',
  '**Scope:** `setup` blocks are the boxes of T00, the task that sets the project up. `cross-cutting` blocks apply to every change: they go into the "Rules every change follows" list in the project\'s `CLAUDE.md`, not into single tasks, and each milestone review checks them. Blank means the block belongs to the tasks that build its feature.',
  '',
];

let count = 0;
for (const part of meta.parts) {
  const file = `${slug(part.name)}.md`;
  index.push(`## ${part.name}`, '', `File: \`${file}\``, '', '| Block | Applies when | Stage | Kind | Proof | Scope |', '|---|---|---|---|---|---|');
  const body = [`# ${part.name}`, '', '<!-- Generated by scripts/build-blocks.mjs from scripts/blocks-meta.json. Edit that file, not this one. -->', ''];
  for (const b of part.blocks) {
    const scope = b.scope && b.scope !== 'feature' ? b.scope : '';
    index.push(`| ${b.name} | ${b.applies} | ${b.stage} | ${b.kind} | ${b.proof || ''} | ${scope} |`);
    body.push(`### ${b.name}`, `- What: ${sentence(b.what)}`, `- Applies when: ${sentence(b.applies)}`, `- Stage: ${b.stage}`, `- Kind: ${b.kind}`);
    if (scope) body.push(`- Scope: ${scope}`);
    if (b.check) body.push(`- Proof: ${b.proof}`, `- Done when: ${b.check}`);
    body.push('');
    count++;
  }
  index.push('');
  files.set(file, body.join('\n'));
}
files.set('index.md', index.join('\n'));

if (args.includes('--check')) {
  const norm = (s) => s.replace(/\r\n/g, '\n');
  let bad = false;
  for (const [i, outDir] of outDirs.entries()) {
    const existing = existsSync(outDir) ? readdirSync(outDir) : [];
    const stale = [...files].filter(([f, c]) => !existsSync(join(outDir, f)) || norm(readFileSync(join(outDir, f), 'utf8')) !== norm(c)).map(([f]) => f);
    const extra = existing.filter((f) => !files.has(f));
    if (stale.length || extra.length) {
      bad = true;
      console.log(`Out of date in ${BLOCK_SKILLS[i]}/blocks: ${[...stale, ...extra.map((f) => `${f} (should not exist)`)].join(', ')}`);
    }
  }
  if (bad) process.exit(1);
  console.log(`blocks/ is up to date in ${BLOCK_SKILLS.length} skills.`);
  process.exit(0);
}

for (const outDir of outDirs) {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const [f, c] of files) writeFileSync(join(outDir, f), c);
}
console.log(`Wrote ${count} blocks in ${meta.parts.length} parts to the blocks/ folder of ${BLOCK_SKILLS.join(', ')}`);
