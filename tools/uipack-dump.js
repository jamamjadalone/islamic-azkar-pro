/* uipack-dump.js — dump all UI i18n keys (I18N + SECTION_I18N + SECS + WELCOME_CARDS_DATA)
   to data/source-packs/uipack-skeleton.json (for authoring new language packs).
   Function-valued entries (script-conditional) are stored as {"__fn": [asm, uth]} pairs.
   Usage: node tools/uipack-dump.js
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function extract(name) {
	const re = new RegExp(`const\\s+${name}\\s*=\\s*([\\[{])`);
	const m = re.exec(html);
	if (!m) return null;
	const openCh = m[1];
	const closeCh = openCh === '[' ? ']' : '}';
	let depth = 0, inS = null;
	for (let i = m.index + m[0].length - 1; i < html.length; i++) {
		const c = html[i];
		if (inS) {
			if (c === '\\') { i++; continue; }
			if (inS === c) inS = null;
			continue;
		}
		if (c === '`' || c === "'" || c === '"') { inS = c; continue; }
		if (c === openCh) depth++;
		else if (c === closeCh) {
			depth--;
			if (depth === 0) return html.slice(m.index + m[0].length - 1, i + 1);
		}
	}
	return null;
}

/* serialize a value for the authoring skeleton: loc objects get en+ur+id+slots,
   script-conditional functions become {__fn:[v(true), v(false)]}, other values (icon,
   string ct, id, group) pass through */
function toLoc(v) {
	const o = { en: '', ur: '', id: '' };
	for (const l of ['en', 'ur', 'id']) {
		const x = v[l];
		o[l] = (typeof x === 'function') ? { __fn: [String(x(true)), String(x(false))] } : String(x ?? '');
	}
	return o;
}
function transform(v) {
	if (typeof v === 'function') return { __fn: [String(v(true)), String(v(false))] };
	if (Array.isArray(v)) return v.map((x) => transform(x));
	if (v && typeof v === 'object') {
		if ('ur' in v || 'en' in v) return toLoc(v);
		const out = {};
		for (const k of Object.keys(v)) out[k] = transform(v[k]);
		return out;
	}
	return v;
}

const I18N = vm.runInNewContext(`(${extract('I18N')})`, Object.create(null), { timeout: 2000 });
const SECI = vm.runInNewContext(`(${extract('SECTION_I18N')})`, Object.create(null), { timeout: 2000 });
const SECS = vm.runInNewContext(`(${extract('SECS')})`, Object.create(null), { timeout: 2000 });
const WCD = vm.runInNewContext(`(${extract('WELCOME_CARDS_DATA')})`, Object.create(null), { timeout: 2000 });

const out = {
	_note: 'UI i18n keys; ref en+ur+id; "bn"/"ru"/"fa" slots to be authored. {"__fn":[asm,uth]} = script-conditional entry.',
	I18N: transform(I18N),
	SECTION_I18N: transform(SECI),
	SECS: transform(SECS),
	WELCOME_CARDS_DATA: transform(WCD)
};
for (const top of Object.keys(out.SECTION_I18N)) {
	for (const sub of Object.keys(out.SECTION_I18N[top])) {
		out.SECTION_I18N[top][sub].bn = out.SECTION_I18N[top][sub].__fn ? { __fn: ['', ''] } : '';
	}
}
for (const k of Object.keys(out.I18N)) out.I18N[k].bn = '';
for (const s of out.SECS) {
	s.title.bn = ''; s.title.ru = ''; s.title.fa = '';
	if (s.ct && typeof s.ct === 'object') { s.ct.bn = ''; s.ct.ru = ''; s.ct.fa = ''; }
}
for (const c of Object.keys(out.WELCOME_CARDS_DATA)) {
	out.WELCOME_CARDS_DATA[c].title.bn = '';
	out.WELCOME_CARDS_DATA[c].sub.bn = '';
}
fs.writeFileSync(path.join(__dirname, '..', 'data', 'source-packs', 'uipack-skeleton.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
const secsCount = out.SECS.reduce((n, s) => n + 1 + (s.ct && typeof s.ct === 'object' ? 1 : 0), 0);
const wcCount = Object.keys(out.WELCOME_CARDS_DATA).length * 2;
console.log('I18N:', Object.keys(out.I18N).length,
	'| SECTION_I18N:', Object.entries(out.SECTION_I18N).reduce((n, [, s]) => n + Object.keys(s).length, 0),
	'| SECS loc:', secsCount,
	'| WELCOME:', wcCount);
