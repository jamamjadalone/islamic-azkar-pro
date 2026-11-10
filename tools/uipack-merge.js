/* uipack-merge.js - p19-e: merge authored UI language packs (data/source-packs/uipack-<lang>.json)
   into index.html. Rewrites, idempotently:
   - `const I18N = {...}`        — flat keys: pack.I18N[key] -> I18N[key][lang]
   - `const SECTION_I18N = {...}` — nested sub-dicts; {__fn:[a,b]} emitted as
     (isIndopak) => (isIndopak ? A : B) script-conditional arrows
   - `const SECS = [...]`         — title/ct (loc) per matched id (string ct untouched)
   - `const WELCOME_CARDS_DATA = {...}` — title/sub per card
   Usage: node tools/uipack-merge.js [lang]   (default: bn; later ru, fa)
   Idempotent: re-running with same pack produces zero changes.
*/
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const lang = process.argv[2] || 'bn';
const packFile = path.join(__dirname, '..', 'data', 'source-packs', `uipack-${lang}.json`);
if (!fs.existsSync(packFile)) {
	console.error(`pack not found: ${packFile}`);
	process.exit(1);
}
const pack = JSON.parse(fs.readFileSync(packFile, 'utf8'));

const htmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const orig0 = html;

/* locate `const NAME = <{|[>` inside `text`, return [startIndex, endIndex, blockSource] */
function blockRange(text, name) {
	const re = new RegExp(`const\\s+${name}\\s*=\\s*([\\[{])`);
	const m = re.exec(text);
	if (!m) return null;
	const openCh = m[1];
	const closeCh = openCh === '[' ? ']' : '}';
	let depth = 0, inS = null;
	for (let i = m.index + m[0].length - 1; i < text.length; i++) {
		const c = text[i];
		if (inS) {
			if (c === '\\') { i++; continue; }
			if (inS === c) inS = null;
			continue;
		}
		if (c === '`' || c === "'" || c === '"') { inS = c; continue; }
		if (c === openCh) depth++;
		else if (c === closeCh) {
			depth--;
			if (depth === 0) {
				return [m.index, i + 1, text.slice(m.index + m[0].length - 1, i + 1)];
			}
		}
	}
	return null;
}

function evalText(src) {
	return vm.runInNewContext(`(${src})`, Object.create(null), { timeout: 5000 });
}

/* serialize: string -> JSON, function -> script-conditional arrow, flat object -> { k: v } */
function ser(v) {
	if (typeof v === 'function') return fnSrc([v(true), v(false)]);
	if (typeof v === 'string') return JSON.stringify(v);
	if (v && typeof v === 'object' && Array.isArray(v.__fn)) return fnSrc(v.__fn);
	if (v && typeof v === 'object') {
		const parts = Object.keys(v).map((k) => `${k}: ${ser(v[k])}`);
		return `{ ${parts.join(', ')} }`;
	}
	return JSON.stringify(v);
}
function fnSrc(pair) {
	return `(isIndopak) => (isIndopak ? ${JSON.stringify(pair[0])} : ${JSON.stringify(pair[1])})`;
}

/* splice a const NAME = <block>; statement, consuming any trailing `;` after block */
function splice2(name, newSource) {
	const r = blockRange(html, name);
	if (!r) throw new Error(`cannot locate ${name}`);
	let end = r[1];
	while (end < html.length && /\s/.test(html[end])) end++;
	if (html[end] === ';') end++;
	html = html.slice(0, r[0]) + `const ${name} = ${newSource};` + html.slice(end);
}

let added = { i18n: 0, sec: 0, secs: 0, wel: 0 };
let same = 0;

/* ── I18N ── */
{
	const obj = evalText(blockRange(html, 'I18N')[2]);
	for (const k of Object.keys(pack.I18N)) {
		if (!obj[k]) { console.warn(`skip I18N.${k} (absent)`); continue; }
		const want = pack.I18N[k];
		const have = typeof obj[k][lang] === 'string' ? obj[k][lang] : undefined;
		if (have === want) { same++; continue; }
		obj[k][lang] = want;
		added.i18n++;
	}
	splice2('I18N', ser(obj));
}

/* ── SECTION_I18N ── */
{
	const obj = evalText(blockRange(html, 'SECTION_I18N')[2]);
	for (const top of Object.keys(pack.SECTION_I18N)) {
		if (!obj[top]) { console.warn(`skip SECTION_I18N.${top} (absent)`); continue; }
		for (const sub of Object.keys(pack.SECTION_I18N[top])) {
			if (!(sub in obj[top])) { console.warn(`skip ${top}.${sub} (absent)`); continue; }
			const want = pack.SECTION_I18N[top][sub];
			const have = obj[top][sub][lang];
			const haveIsFn = typeof have === 'function';
			if (want && typeof want === 'object' && Array.isArray(want.__fn)) {
				const cur = haveIsFn ? [have(true), have(false)] : (have && have.__fn ? [String(have.__fn[0]), String(have.__fn[1])] : null);
				if (cur && cur[0] === want.__fn[0] && cur[1] === want.__fn[1]) { same++; continue; }
				obj[top][sub][lang] = { __fn: want.__fn };
			} else {
				if (!haveIsFn && have === want) { same++; continue; }
				obj[top][sub][lang] = want;
			}
			added.sec++;
		}
	}
	splice2('SECTION_I18N', ser(obj));
}

/* ── SECS ── */
{
	const arr = evalText(blockRange(html, 'SECS')[2]);
	for (const p of pack.SECS) {
		const rec = arr.find((x) => x && x.id === p.id);
		if (!rec) { console.warn(`skip SECS.${p.id} (absent)`); continue; }
		let touch = false;
		if (p.t !== undefined && rec.title[lang] !== p.t) { rec.title[lang] = p.t; touch = true; }
		if (p.ct !== undefined && rec.ct && typeof rec.ct === 'object' && !Array.isArray(rec.ct) && rec.ct[lang] !== p.ct) { rec.ct[lang] = p.ct; touch = true; }
		if (touch) added.secs++; else same++;
	}
	splice2('SECS', `[\n${arr.map((rec) => ser(rec)).join(',\n')}\n]`);
}

/* ── WELCOME_CARDS_DATA ── */
{
	const obj = evalText(blockRange(html, 'WELCOME_CARDS_DATA')[2]);
	for (const c of Object.keys(pack.WELCOME_CARDS_DATA)) {
		const rec = obj[c];
		if (!rec) { console.warn(`skip WELCOME.${c} (absent)`); continue; }
		const p = pack.WELCOME_CARDS_DATA[c];
		let touch = false;
		if (p.t !== undefined && rec.title[lang] !== p.t) { rec.title[lang] = p.t; touch = true; }
		if (p.s !== undefined && rec.sub[lang] !== p.s) { rec.sub[lang] = p.s; touch = true; }
		if (touch) added.wel++; else same++;
	}
	splice2('WELCOME_CARDS_DATA', ser(obj));
}

const changed = html !== orig0;
if (changed) fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`lang=${lang} | added ${added.i18n}/${Object.keys(pack.I18N).length} I18N, ${added.sec} SECTION, ${added.secs} SECS, ${added.wel} WELCOME | unchanged ${same} | ${changed ? 'index.html WRITTEN' : 'no changes (idempotent)'}`);
