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
    assert meta['minGameVersion'] == '146' and meta['texturescale'] == 1
    assert wall['type'] == 'Wall' and wall['health'] == 160 and wall['size'] == 1
    assert wall['requirements'] == ['classic-stone/12']
    assert not (ROOT / 'sprites-override').exists(), 'Vanilla sprite overrides are forbidden'
    assert (ROOT / 'scripts/main.js').is_file(), 'Custom Classic behaviors are required'
    content = {}
    for path in (ROOT / 'content').rglob('*.hjson'):
        assert path.stem.startswith('classic-'), 'Content must have a distinct name'
        content[path.stem] = json.loads(path.read_text(encoding='utf-8'))
    assert len([c for c in content.values() if 'requirements' in c]) == 63
    assert len(list((ROOT / 'content/items').glob('*.hjson'))) == 6
    assert len(list((ROOT / 'content/liquids').glob('*.hjson'))) == 1
    # Every custom construction/production reference must resolve in the package.
    for data in content.values():
        refs = list(data.get('requirements', []))
        refs += data.get('consumes', {}).get('items', [])
        refs += list(data.get('ammoTypes', {}))
        refs += [data[k] for k in ['itemDrop', 'outputItem', 'blockedItem', 'liquidDrop', 'fuelItem'] if k in data]
        liquid = data.get('consumes', {}).get('liquid')
        if liquid:
            refs.append(liquid['liquid'] if isinstance(liquid, dict) else liquid)
        for ref in refs:
            if ref.startswith('classic-'):
                assert ref.split('/')[0] in content, f'Unresolved resource: {ref}'
        parent = data.get('research', {}).get('parent') if isinstance(data.get('research'), dict) else data.get('research')
        if parent and parent.startswith('classic-'):
            assert parent in content, f'Unresolved research: {parent}'
    image = (ROOT / 'sprites/blocks/classic-stone-wall.png').read_bytes()
    assert image[:8] == b'\x89PNG\r\n\x1a\n'
    assert struct.unpack('>II', image[16:24]) == (32, 32)
    manifest = json.loads((ROOT / 'docs/sprites.json').read_text(encoding='utf-8'))
    original = next(s for s in manifest['sprites'] if s['path'].endswith('/stonewall.png'))
    raw_wall = (ROOT / 'art-source/blocks/classic-stone-wall.png').read_bytes()
    assert hashlib.sha256(raw_wall).hexdigest() == original['sha256'], 'Original source sprite bytes changed'
    originals = {s['path']: s['sha256'] for s in manifest['sprites']}
    assets = json.loads((ROOT / 'docs/ported-assets.json').read_text(encoding='utf-8'))
    for asset in assets['assets']:
        if asset['source']:
            raw = ROOT / asset['target'].replace('sprites/', 'art-source/', 1)
            assert hashlib.sha256(raw.read_bytes()).hexdigest() == originals[asset['source']], asset['target']
        assert hashlib.sha256((ROOT / asset['target']).read_bytes()).hexdigest() == asset['renderedSha256'], asset['target']
        source_image = (ROOT / asset['target'].replace('sprites/', 'art-source/', 1)).read_bytes()
        rendered_image = (ROOT / asset['target']).read_bytes()
        sw, sh = struct.unpack('>II', source_image[16:24])
        assert struct.unpack('>II', rendered_image[16:24]) == (sw * 4, sh * 4)
    for shape in range(7):
        for frame in range(4):
            for conveyor in ['conveyor', 'steel-conveyor', 'pulse-conveyor']:
                assert (ROOT / f'sprites/blocks/classic-{conveyor}-{shape}-{frame}.png').exists()
    assert (ROOT / 'maps/classic-chain-demo.msav').is_file(), 'Demo map is required'
    assert (ROOT / 'maps/classic-advanced-demo.msav').is_file(), 'Advanced materials map is required'
    assert (ROOT / 'maps/classic-transport-demo.msav').is_file(), 'Transport map is required'
    assert (ROOT / 'maps/classic-production-demo.msav').is_file(), 'Production map is required'
    assert (ROOT / 'maps/classic-turrets-demo.msav').is_file(), 'Turrets map is required'
    assert (ROOT / 'maps/classic-power-demo.msav').is_file(), 'Power map is required'
    assert (ROOT / 'maps/classic-special-demo.msav').is_file()
    assert len(list((ROOT / 'content/units').glob('*.hjson'))) == 6
    assert (ROOT / 'maps/classic-environments-demo.msav').is_file()
    core = content['classic-core']
    assert core['type'] == 'CoreBlock' and core['size'] == 3 and core['health'] == 800
    assert core['unitType'] in content
    assert len(list((ROOT / 'content/blocks/environment').glob('*.hjson'))) == 25
    # Floors must share the environment atlas page with vanilla terrain.
    for path in (ROOT / 'content/blocks/environment').glob('*.hjson'):
        data = json.loads(path.read_text())
        suffixes = range(1, data['variants'] + 1) if data.get('variants', 0) else ['']
        for suffix in suffixes:
            filename = path.stem + str(suffix) + '.png'
            assert (ROOT / 'sprites/blocks/environment' / filename).is_file(), filename
            assert not (ROOT / 'sprites/blocks' / filename).exists(), filename
    assert (ROOT / 'maps/classic-obstacles-demo.msav').is_file()
    files = [ROOT / p for p in ['mod.hjson', 'LICENSE', 'NOTICE.md', 'README.md']]
    for folder in ['content', 'sprites', 'art-source', 'bundles', 'docs', 'tools', 'maps', 'scripts']:
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
