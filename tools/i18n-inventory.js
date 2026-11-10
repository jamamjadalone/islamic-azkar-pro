/* inventory.js — unique Urdu-only string inventory for p19-d */
const fs = require("node:fs");
const vm = require("node:vm");
const html = fs.readFileSync("index.html", "utf8");
function extract(name) {
	const re = new RegExp(`const\\s+${name}\\s*=\\s*([\\[{])`);
	const m = re.exec(html);
	if (!m) return null;
	const o = m[1],
		c = o === "[" ? "]" : "}";
	let d = 0,
		q = null;
	for (let i = m.index + m[0].length - 1; i < html.length; i++) {
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
		if (ch === o) d++;
		else if (ch === c) {
			d--;
			if (!d) return html.slice(m.index + m[0].length - 1, i + 1);
		}
	}
	return null;
}
const zones = [
	"FAJR",
	"JUMMA",
	"DUROOD_PAK",
	"TAUHEED",
	"BEDTIME",
	"TAWBAH",
	"POST_SALAH",
	"MORNING_WAKE",
	"RELIEF_DEBT",
	"ISTIKHARA",
	"RABBANA",
];
const all = {};
let tot = 0;
for (const z of zones) {
	const src = extract(z);
	if (!src) {
		console.log("MISS:", z);
		continue;
	}
	const a = vm.runInNewContext(`(${src})`, Object.create(null), {
		timeout: 2000,
	});
	all[z] = a;
	tot += a.length;
}
const uniq = {
	grp: new Map(),
	name: new Map(),
	faz: new Map(),
	ref: new Map(),
};
for (const z of zones)
	for (const it of all[z]) {
		for (const f of ["grp", "name", "faz", "ref"]) {
			const v = it[f];
			if (typeof v === "string" && v) {
				if (!uniq[f].has(v)) uniq[f].set(v, { zones: new Set(), count: 0 });
				const e = uniq[f].get(v);
				e.count++;
				e.zones.add(z);
			}
		}
	}
console.log("items total:", tot);
for (const f of ["grp", "name", "faz", "ref"])
	console.log(`${f}: unique = ${uniq[f].size}`);
console.log("--- GRP values ---");
for (const [v, e] of uniq.grp)
	console.log(`  [${[...e.zones].join(",")}] x${e.count} :: ${v}`);
console.log("--- REF values ---");
for (const [v, e] of uniq.ref)
	console.log(`  [${[...e.zones].join(",")}] x${e.count} :: ${v}`);
console.log("--- FAZ unique sample (first 8) ---");
let n = 0;
for (const [v, e] of uniq.faz) {
	console.log(`  [${[...e.zones].join(",")}] x${e.count} :: ${v.slice(0, 90)}`);
	if (++n >= 8) break;
}
console.log("--- NAME unique sample (first 8) ---");
n = 0;
for (const [v, e] of uniq.name) {
	console.log(`  [${[...e.zones].join(",")}] x${e.count} :: ${v.slice(0, 90)}`);
	if (++n >= 8) break;
}
