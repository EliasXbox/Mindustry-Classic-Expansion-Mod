"""Rebuild encoded terrain using original PNGs and archived Classic Noise."""
from pathlib import Path
import json
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
inventory = json.loads((ROOT / 'docs/classic-map-inventory.json').read_text())
with tempfile.TemporaryDirectory(prefix='mce-map-classes-') as classes:
    subprocess.run(['javac', '-d', classes,
        str(ROOT / 'tools/classic/io/anuke/ucore/noise/Noise.java'),
        str(ROOT / 'tools/ConvertClassicMaps.java')], check=True)
    for entry in inventory['maps']:
        subprocess.run(['java', '-cp', classes, 'ConvertClassicMaps',
            str(ROOT / ('map-source/' + entry['name'] + '.png')),
            str(ROOT / ('map-source/' + entry['name'] + '.json')),
            str(entry['seed'])], check=True)
