/* fazeelat-merge.js — p19-d1: merge per-lang intros into quran/surahs_26.json
   Converts `intro` plain string -> {ur: "<original>", en: "<translation>"}
   Safe idempotent: never overwrites an existing per-lang key unless --force.
   Usage: node tools/fazeelat-merge.js [--force]
*/
const fs = require("node:fs");
const path = require("node:path");
const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "quran", "surahs_26.json");
const TRANS = path.join(__dirname, "intros-translations.json");
const force = process.argv.includes("--force");

const db = JSON.parse(fs.readFileSync(DATA, "utf8"));
const trans = JSON.parse(fs.readFileSync(TRANS, "utf8"));
const rows = Array.isArray(db) ? db : db.surahs;

let converted = 0,
	updated = 0,
	skipped = [];
const langs = ["en", "ar", "id", "tr", "fr"];
const tmap = new Map(trans.rows.map((r) => [r.sno, r]));

for (const row of rows) {
	if (!row?.intro) continue;
	if (typeof row.intro === "string") {
		row.intro = { ur: row.intro };
		converted++;
	}
	if (typeof row.intro !== "object") continue;
	const t = tmap.get(Number(row.sno));
	if (!t) {
		skipped.push(row.sno);
		continue;
	}
	for (const l of langs) {
		if (t[l] && (force || !row.intro[l])) {
			row.intro[l] = t[l];
			updated++;
		} else if (t[l] && row.intro[l] && !force) {
			// already present, keep
		}
	}
}

fs.writeFileSync(DATA, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
console.log(`converted string->object: ${converted}`);
console.log(`per-lang keys added: ${updated}${force ? " (force)" : ""}`);
console.log(
	`rows without translation entry: ${skipped.length ? skipped.join(", ") : "none"}`,
);
/* summary */
const sum = { ur: 0, en: 0, ar: 0, id: 0, tr: 0, fr: 0 };
for (const r of rows) {
	for (const l of Object.keys(sum))
		if (r.intro && typeof r.intro[l] === "string" && r.intro[l]) sum[l]++;
}
console.log(`lang coverage: ${JSON.stringify(sum)} / ${rows.length}`);
