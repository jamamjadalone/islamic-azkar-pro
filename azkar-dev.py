"""
azkar-dev.py — Islamic Azkar Pro project quality guard CLI
Usage:
  python azkar-dev.py check    # Rule-21 line cap check (skips index.html monolith)
  python azkar-dev.py i18n     # Run i18n audit via tools/i18n-audit.js
  python azkar-dev.py sw       # Verify sw.js cache version string is present
  python azkar-dev.py guard    # Run all checks (pre-commit gate)
  python azkar-dev.py stats    # File count & line stats summary
"""
import sys
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent

SKIP_DIRS = {
    "android", ".git", "node_modules", "quran",
    ".github", "docs", "fonts", "assets",
}
SKIP_FILES = {
    "index.html",          # Intentional monolith — UI locked, 9400+ lines allowed
    "uipack-skeleton.json", # Data file, not source code
}
SKIP_EXTENSIONS = {
    ".json", ".md", ".txt", ".xml", ".svg",
    ".png", ".jpg", ".webp", ".ico", ".gif",
    ".woff", ".woff2", ".ttf", ".otf", ".cname",
}
LINE_CAP = 300

PASS = "\033[92mPASS\033[0m"
FAIL = "\033[91mFAIL\033[0m"
WARN = "\033[93mWARN\033[0m"
INFO = "\033[94mINFO\033[0m"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _collect_source_files():
    """Return list of source files subject to line-cap rule."""
    files = []
    for f in ROOT.rglob("*"):
        if not f.is_file():
            continue
        rel = f.relative_to(ROOT)
        parts = rel.parts
        # Skip excluded directories
        if any(p in SKIP_DIRS for p in parts[:-1]):
            continue
        # Skip excluded filenames
        if f.name in SKIP_FILES:
            continue
        # Skip excluded extensions
        if f.suffix.lower() in SKIP_EXTENSIONS:
            continue
        files.append(f)
    return sorted(files)


def _line_count(path: Path) -> int:
    try:
        return sum(1 for _ in path.open(encoding="utf-8", errors="replace"))
    except Exception:
        return 0


# ---------------------------------------------------------------------------
# Commands
# ---------------------------------------------------------------------------

def cmd_check():
    """Rule-21: no source file over LINE_CAP lines (monolith exceptions skipped)."""
    print(f"\n[{INFO}] Rule-21 Line Cap Check (cap={LINE_CAP}) — monolith index.html SKIPPED\n")
    files = _collect_source_files()
    violations = []
    for f in files:
        count = _line_count(f)
        if count > LINE_CAP:
            violations.append((f.relative_to(ROOT), count))

    if violations:
        for rel, lc in violations:
            print(f"  [{FAIL}] {rel}  ({lc} lines > {LINE_CAP})")
        print(f"\n  {len(violations)} violation(s) found.\n")
        return False
    else:
        print(f"  [{PASS}] All {len(files)} checked files are within {LINE_CAP} lines.\n")
        return True


def cmd_i18n():
    """Run the i18n audit tool."""
    audit_script = ROOT / "tools" / "i18n-audit.js"
    if not audit_script.exists():
        print(f"[{FAIL}] tools/i18n-audit.js not found!")
        return False

    print(f"\n[{INFO}] Running i18n audit...\n")
    result = subprocess.run(
        ["node", str(audit_script)],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)

    if result.returncode == 0:
        print(f"  [{PASS}] i18n audit passed.\n")
        return True
    else:
        print(f"  [{FAIL}] i18n audit reported issues (exit {result.returncode}).\n")
        return False


def cmd_sw():
    """Verify sw.js contains a cache version string in expected format."""
    sw_path = ROOT / "sw.js"
    if not sw_path.exists():
        print(f"[{FAIL}] sw.js not found!")
        return False

    print(f"\n[{INFO}] Checking sw.js cache version...\n")
    content = sw_path.read_text(encoding="utf-8", errors="replace")

    import re
    match = re.search(r'const CACHE\s*=\s*["\']([^"\']+)["\']', content)
    if match:
        version = match.group(1)
        if version.startswith("azk-pro-v"):
            print(f"  [{PASS}] Cache version found: {version}\n")
            return True
        else:
            print(f"  [{WARN}] Cache version exists but doesn't match 'azk-pro-v*': {version}\n")
            return False
    else:
        print(f"  [{FAIL}] No CACHE version constant found in sw.js!\n")
        return False


def cmd_guard():
    """Run all checks — this is the pre-commit gate."""
    print("=" * 60)
    print("  AZKAR-DEV GUARD — Pre-Commit Quality Gate")
    print("=" * 60)

    results = {
        "check": cmd_check(),
        "sw": cmd_sw(),
        "i18n": cmd_i18n(),
    }

    print("=" * 60)
    print("  SUMMARY")
    print("=" * 60)
    all_pass = True
    for name, ok in results.items():
        status = PASS if ok else FAIL
        print(f"  {status}  {name}")
        if not ok:
            all_pass = False

    print("=" * 60)
    if all_pass:
        print(f"  [{PASS}] All checks passed. Safe to commit.\n")
    else:
        print(f"  [{FAIL}] Some checks FAILED. Fix before committing.\n")
    return all_pass


def cmd_stats():
    """Print file count and line stat summary."""
    print(f"\n[{INFO}] Project Stats\n")
    all_files = [f for f in ROOT.rglob("*") if f.is_file()
                 and ".git" not in f.parts
                 and "node_modules" not in f.parts]

    # index.html special
    idx = ROOT / "index.html"
    if idx.exists():
        idx_lines = _line_count(idx)
        print(f"  index.html (monolith): {idx_lines} lines [EXEMPT from cap]")

    source_files = _collect_source_files()
    total_lines = sum(_line_count(f) for f in source_files)
    max_file = max(source_files, key=_line_count, default=None)

    print(f"  Total project files : {len(all_files)}")
    print(f"  Source files checked: {len(source_files)}")
    print(f"  Total lines (source): {total_lines}")
    if max_file:
        print(f"  Largest source file : {max_file.relative_to(ROOT)} ({_line_count(max_file)} lines)")
    print()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

COMMANDS = {
    "check": cmd_check,
    "i18n": cmd_i18n,
    "sw": cmd_sw,
    "guard": cmd_guard,
    "stats": cmd_stats,
}


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in COMMANDS:
        print(__doc__)
        print("Available commands:", ", ".join(COMMANDS))
        sys.exit(1)

    ok = COMMANDS[sys.argv[1]]()
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
