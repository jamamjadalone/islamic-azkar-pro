/* fazeelat-embed.js — p19-d1: embed per-lang intros INTO index.html inline SURAHS_26_DATA
   - locates `const SURAHS_26_DATA = [...];`
   - vm-evaluates rows, converts string intro -> {ur: str, en:...}
   - merges data/source-packs/intros-translations.json (en, ar) without overwriting (unless --force)
   - rewrites the block as valid JSON literal
   Idempotent + safe fallback: missing langs fall back en->ur via getLoc.
   Usage: node tools/fazeelat-embed.js [--force]
*/
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const htmlP = path.join(__dirname, "..", "index.html");
const transP = path.join(__dirname, "..", "data", "source-packs", "intros-translations.json");
const force = process.argv.includes("--force");

const html = fs.readFileSync(htmlP, "utf8");
const trans = JSON.parse(fs.readFileSync(transP, "utf8"));
const tmap = new Map(trans.rows.map((r) => [Number(r.sno), r]));

const SIG = "const SURAHS_26_DATA = [";
const at = html.indexOf(SIG);
if (at < 0) throw new Error("SURAHS_26_DATA block not found");
const open = at + SIG.length - 1; // '[' position
/* bracket-balance to end of array */
let depth = 0,
	q = null,
	end = -1;
for (let i = open; i < html.length; i++) {
	const ch = html[i];
	if (q) {
		if (ch === "\\") {
			i++;
			continue;
		}
		if (q === ch) q = null;
		continue;
	}
	if (ch === "`" || ch === "'" || ch === '"') {
		q = ch;
		continue;
	}
	if (ch === "[") depth++;
	else if (ch === "]") {
		depth--;
		if (depth === 0) {
			end = i;
			break;
		}
	}
}
if (end < 0) throw new Error("array end not found");
const src = html.slice(open, end + 1);
const rows = vm.runInNewContext(`(${src})`, Object.create(null), {
	timeout: 5000,
});

let converted = 0,
	counts = {};
for (const row of rows) {
	if (!row || typeof row.intro === "undefined") continue;
	const t = tmap.get(Number(row.sno));
	if (typeof row.intro === "string") {
		row.intro = { ur: row.intro };
		converted++;
	}
	if (typeof row.intro !== "object" || !row.intro) continue;
	if (t) {
		for (const l of Object.keys(t)) {
			if (l === "sno" || !t[l]) continue;
			if (force || !row.intro[l]) {
				row.intro[l] = t[l];
				counts[l] = (counts[l] || 0) + 1;
			}
		}
	}
}
const out = JSON.stringify(rows);
fs.writeFileSync(
	htmlP,
	html.slice(0, open) + out + html.slice(end + 1),
	"utf8",
);
console.log(
	"rows: " +
		rows.length +
		" | converted string->obj: " +
		converted +
		" | langs added: " +
		JSON.stringify(counts),
);
