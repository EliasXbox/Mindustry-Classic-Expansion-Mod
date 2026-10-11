"""Validate the alpha source and build an importable ZIP using Python 3 only."""
from pathlib import Path
import hashlib
import json
import struct
import zipfile

ROOT = Path(__file__).resolve().parents[1]
def main():
    meta = json.loads((ROOT / 'mod.hjson').read_text(encoding='utf-8'))
    wall = json.loads((ROOT / 'content/blocks/classic-stone-wall.hjson').read_text(encoding='utf-8'))
    assert meta['name'] == 'mindustry-classic-expansion'
    assert meta['minGameVersion'] == '146' and meta['texturescale'] == 4
    assert wall['type'] == 'Wall' and wall['health'] == 160 and wall['size'] == 1
    assert wall['requirements'] == ['copper/12'] and wall['research'] == 'copper-wall'
    assert not (ROOT / 'sprites-override').exists(), 'Vanilla sprite overrides are forbidden'
    assert not (ROOT / 'scripts').exists(), 'Alpha must remain a data-only mod'
    assert [p.name for p in (ROOT / 'content/blocks').glob('*.hjson')] == ['classic-stone-wall.hjson']
    image = (ROOT / 'sprites/blocks/classic-stone-wall.png').read_bytes()
    assert image[:8] == b'\x89PNG\r\n\x1a\n'
    assert struct.unpack('>II', image[16:24]) == (8, 8)
    manifest = json.loads((ROOT / 'docs/sprites.json').read_text(encoding='utf-8'))
    original = next(s for s in manifest['sprites'] if s['path'].endswith('/stonewall.png'))
    assert hashlib.sha256(image).hexdigest() == original['sha256'], 'Original sprite bytes changed'
    files = [ROOT / p for p in ['mod.hjson', 'LICENSE', 'NOTICE.md', 'README.md']]
    for folder in ['content', 'sprites', 'bundles', 'docs', 'tools']:
        files.extend(p for p in (ROOT / folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
    output = ROOT / 'dist' / ('mindustry-classic-expansion-' + meta['version'] + '.zip')
    output.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(files):
            entry = zipfile.ZipInfo(path.relative_to(ROOT).as_posix(), (2026, 10, 11, 0, 0, 0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            entry.external_attr = 0o100644 << 16
            archive.writestr(entry, path.read_bytes())
    with zipfile.ZipFile(output) as archive:
        assert archive.testzip() is None
        assert 'mod.hjson' in archive.namelist()
        assert not any(p.startswith(('sources/', '.git/', 'dist/')) for p in archive.namelist())
    print(f'Validated alpha and built {output} ({output.stat().st_size} bytes)')

if __name__ == '__main__':
    main()
