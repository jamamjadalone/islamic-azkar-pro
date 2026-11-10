/* intros-extend-latin.js - p19-d1c: merge data/source-packs/intros-{id,tr,fr}.json rows
 * into data/source-packs/intros-translations.json (adds id/tr/fr keys per sno; keeps ur/en/ar).
 * Idempotent: existing id/tr/fr keys are kept unless --force.
 * Usage: node tools/intros-extend-latin.js [--force]
 */

const fs = require("node:fs");
const path = require("node:path");
const force = process.argv.includes("--force");

const mainPath = path.join(__dirname, "..", "data", "source-packs", "intros-translations.json");
const main = JSON.parse(fs.readFileSync(mainPath, "utf8"));
const bySno = new Map(main.rows.map((r) => [Number(r.sno), r]));

const langs = ["id", "tr", "fr"];
let added = 0,
	kept = 0,
	mismatch = 0;

for (const lang of langs) {
	const src = JSON.parse(
		fs.readFileSync(path.join(__dirname, "..", "data", "source-packs", `intros-${lang}.json`), "utf8"),
	);
	for (const row of src.rows) {
		const tgt = bySno.get(Number(row.sno));
		if (!tgt) {
			mismatch++;
			continue;
		}
		if (row[lang] && (force || !tgt[lang])) {
			tgt[lang] = row[lang];
			added++;
		} else if (row[lang] && tgt[lang]) kept++;
	}
}

fs.writeFileSync(mainPath, `${JSON.stringify(main, null, 2)}\n`, "utf8");
const cov = {};
for (const r of main.rows) {
	for (const l of langs) {
		if (typeof r[l] === "string" && r[l]) cov[l] = (cov[l] || 0) + 1;
	}
}
console.log("added:", added, "| kept:", kept, "| sno mismatch:", mismatch);
console.log("coverage:", JSON.stringify(cov), "/", main.rows.length);
