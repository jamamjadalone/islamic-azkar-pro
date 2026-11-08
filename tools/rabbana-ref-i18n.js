/*
 * p19-d5: localize RABBANA ref fields (currently Urdu-only strings)
 *
 * "ارشادِ باری تعالیٰ ہے — [سُورَةُ الْبَقَرَة: ۱۲۷]"
 *  -> { ur, en, ar, id, tr, fr } loc object (same key order as name/faz)
 *
 * Mechanical + patterned: the surah reference bracket stays universal
 * (transliterated name for latin langs, original Arabic for ar; western
 * digits for latin langs, original Arabic-Indic digits preserved for ar/ur).
 *
 * Usage: node tools/rabbana-ref-i18n.js        (idempotent)
 *        node tools/rabbana-ref-i18n.js --force (overwrite already-localized refs)
 */

const fs = require("node:fs");
const path = require("node:path");

const FILE = path.join(__dirname, "..", "index.html");

/* ── Pattern pieces ── */
const _UR_LEAD =
	"ارشادِ باری تعالیٰ ہے"; /* original Urdu lead-in, kept byte-identical */

/* surah Arabic name (as written in refs) -> transliteration for latin langs */
const SURAH_LATIN = {
	الْبَقَرَة: "al-Baqarah",
	"آلِ عِمْرَان": "Aal 'Imran",
	الْمَائِدَة: "al-Ma'idah",
	الأَعْرَاف: "al-A'raf",
	يُونُس: "Yunus",
	إِبْرَاهِيم: "Ibrahim",
	الْكَهْف: "al-Kahf",
	الْفُرْقَان: "al-Furqan",
	الْمُؤْمِنُون: "al-Mu'minun",
	الدُّخَان: "ad-Dukhan",
	غَافِر: "Ghafir",
	الْحَشْر: "al-Hashr",
	الْمُمْتَحَنَة: "al-Mumtahanah",
	التَّحْرِيم: "at-Tahrim",
};

/* per-lang lead-in for a Quranic citation (Rule 12 reverent phrasing) */
const LEAD = {
	en: "The Revelation says",
	ar: "يقول الله تعالى",
	id: "Allah berfirman",
	tr: "Y\u00fcce Allah'\u0131n bildirdi\u011fi mana",
	fr: "La R\u00e9v\u00e9lation dit",
};

const AR_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const west = (s) =>
	String(s).replace(/[۰-۹]/g, (d) => String(AR_DIGITS.indexOf(d)));

/* parse "… ہے — [سُورَةُ X: N]" -> null | { surahAr, num, bracket } */
function parseRef(ref) {
	const m = /^(.*?—\s*\[)\s*سُورَةُ\s*([^:\]]+):\s*([^\]]+)\]$/.exec(ref);
	if (!m) return null;
	return {
		prefix: m[1].replace(/\s+$/, ""),
		surahAr: m[2].trim(),
		num: m[3].trim(),
	};
}

function buildLocs(parsed, origUr) {
	const latin = SURAH_LATIN[parsed.surahAr];
	if (!latin)
		throw new Error(
			`no transliteration for: ${JSON.stringify(parsed.surahAr)}`,
		);
	const numWest = west(parsed.num);
	const bracketAr = `[${"\u0633\u064f\u0648\u0631\u064e\u0629\u064f"} ${parsed.surahAr}:${parsed.num}]`;
	return {
		ur: origUr,
		en: `${LEAD.en} — [Surah ${latin}: ${numWest}]`,
		ar: `${LEAD.ar} ${"\u2014"} ${bracketAr}`,
		id: `${LEAD.id} — [Surah ${latin}: ${numWest}]`,
		tr: `${LEAD.tr} — [S\u00fbre ${latin}: ${numWest}]`,
		fr: `${LEAD.fr} — [Sourate ${latin}\u00a0: ${numWest}]`,
	};
}

/* ── run ── */
let html = fs.readFileSync(FILE, "utf8");
const start = html.indexOf("const RABBANA = ");
if (start < 0) throw new Error("RABBANA not found");
const endDef = html.indexOf("];", start);
if (endDef < 0) throw new Error("RABBANA end not found");

const vm = require("node:vm");
const items = vm.runInNewContext(`${html.slice(start, endDef + 2)}RABBANA`, {});
if (!Array.isArray(items) || items.length === 0)
	throw new Error("RABBANA empty?");

let converted = 0,
	skipped = 0,
	noParse = 0;
for (const it of items) {
	if (typeof it.ref === "object" && it.ref) {
		skipped++;
		if (!process.argv.includes("--force")) continue;
	}
	if (typeof it.ref !== "string") throw new Error("bad ref type");
	const parsed = parseRef(it.ref);
	if (!parsed) {
		noParse++;
		continue;
	}
	it.ref = buildLocs(parsed, it.ref);
	converted++;
}

/* re-serialize the whole RABBANA definition with the localized refs */
const out = `const RABBANA = ${JSON.stringify(items)};`;
html = html.slice(0, start) + out + html.slice(endDef + 2);
fs.writeFileSync(FILE, html, "utf8");

const bi = require("node:vm").runInNewContext(`${out}RABBANA`, {});
console.log(
	"items:",
	items.length,
	"| refs -> loc object:",
	bi.filter((x) => typeof x.ref === "object").length,
	"| converted this run:",
	converted,
	"| already object (skipped):",
	skipped,
	"| unparsed:",
	noParse,
);
const s0 = bi[0].ref;
console.log("sample[0].en =", s0.en);
console.log("sample[0].fr =", s0.fr);
console.log("sample[0].tr =", s0.tr);
console.log("sample[0].ur (unchanged) =", s0.ur);
