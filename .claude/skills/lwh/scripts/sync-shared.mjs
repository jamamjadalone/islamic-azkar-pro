// Copies every file in shared/ into each skill folder of each plugin.
//
//   node scripts/sync-shared.mjs           write the copies
//   node scripts/sync-shared.mjs --check   exit 1 if any copy is missing or out of date
//
// A skill can be installed on its own (for example with `npx skills add`), and then it can read
// only its own folder. So anything several skills need is kept once in shared/ and copied into
// every skill. Edit the file in shared/, then run this.
// Line endings are ignored when comparing, so a Windows checkout does not look out of date.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sharedDir = join(root, 'shared');
const pluginsDir = join(root, 'plugins');
const check = process.argv.includes('--check');
const norm = (s) => s.replace(/\r\n/g, '\n');
const dirsIn = (dir) => readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

const skillDirs = dirsIn(pluginsDir).flatMap((plugin) => {
  const skills = join(pluginsDir, plugin, 'skills');
  return existsSync(skills) ? dirsIn(skills).map((skill) => `plugins/${plugin}/skills/${skill}`) : [];
});
const files = readdirSync(sharedDir, { withFileTypes: true }).filter((d) => d.isFile()).map((d) => d.name);
let stale = 0;

for (const file of files) {
  const note = `<!-- Copied from shared/${file} by scripts/sync-shared.mjs. Edit that file, not this one. -->\n\n`;
  const content = note + norm(readFileSync(join(sharedDir, file), 'utf8'));
  for (const skillDir of skillDirs) {
    const target = join(root, skillDir, file);
    const current = existsSync(target) ? norm(readFileSync(target, 'utf8')) : null;
    if (current === content) continue;
    stale++;
    if (check) console.log(`Out of date: ${skillDir}/${file}`);
    else {
      writeFileSync(target, content);
      console.log(`Wrote ${skillDir}/${file}`);
    }
  }
}

// Frontmatter that a strict YAML parser accepts. Claude Code reads it leniently, but
// `npx skills` skips a skill whose frontmatter does not parse, for example a value with
// ": " in it that is not in quotes.
let badFrontmatter = 0;
for (const skillDir of skillDirs) {
  const name = skillDir.split('/').pop();
  const text = norm(readFileSync(join(root, skillDir, 'SKILL.md'), 'utf8'));
  const block = text.match(/^---\n([\s\S]*?)\n---\n/);
  const problems = [];
  if (!block) problems.push('no frontmatter');
  else {
    const fields = Object.fromEntries(block[1].split('\n').map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]));
    if (fields.name !== name) problems.push(`name is "${fields.name}", not the folder name "${name}"`);
    if (!fields.description) problems.push('no description');
    for (const [key, value] of Object.entries(fields)) {
      if (!/^["']/.test(value) && value.includes(': ')) problems.push(`${key} has ": " and is not in quotes`);
    }
  }
  if (problems.length) {
    badFrontmatter++;
    console.log(`Frontmatter in ${skillDir}/SKILL.md: ${problems.join('; ')}`);
  }
}

if (badFrontmatter || (check && stale)) process.exit(1);
if (!stale) console.log(`All shared files are up to date in ${skillDirs.length} skills, and every frontmatter is valid.`);
