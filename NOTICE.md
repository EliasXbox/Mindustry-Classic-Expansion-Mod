# Credits and license

Mindustry: Classic Expansion is an unofficial adaptation by EliasXbox.
Classic code, content definitions and original artwork: Anuken and contributors,
https://github.com/Anuken/Mindustry-Classic.

Reference snapshot: 92e28d8a81ed8ddc8d80fc170de33d34b4cd202e (2021-03-24).
The upstream repository supplies GNU GPL version 3 in its root LICENSE.
This adaptation is distributed under GPL-3.0-only; see LICENSE for the complete terms.
It is provided without warranty.

Changes dated 2026-10-11:
- Adapted stonewall to the v7 Wall class as classic-stone-wall.
- Preserved the original stonewall.png byte for byte under the new filename.
- Preserved 160 health and a 1x1 footprint.
- Changed the construction recipe from 12 Classic stone to 12 vanilla copper.
- Added research under copper-wall, English/Portuguese descriptions, packaging tools and inventory.
- Set texturescale to 4: the original 8px sprite renders at the normal v7 tile size without editing the bitmap.

Original files used:
- core/assets-raw/sprites/blocks/stonewall.png
- core/src/io/anuke/mindustry/world/blocks/DefenseBlocks.java
- core/src/io/anuke/mindustry/world/blocks/types/Wall.java
- core/src/io/anuke/mindustry/resource/Recipes.java
- LICENSE (copied verbatim)

No separate artwork license file was found in the upstream tree. Original sprites
are treated under the repository's GPLv3 license. No third-party UI assets,
fonts or audio are included. The ZIP contains editable mod source and the
inventory/build tooling; the public repository also provides that source.

Additional changes dated 2026-10-11 (0.2.0-alpha):
- Added Classic stone/iron drills, smelter, conveyor and router, plus stone/iron/steel items.
- Added separate stone and iron deposit floors and a native v146 demonstration map.
- Restored the stone wall recipe to 12 Classic stone; changed its research parent.
- Adapted drill targeting, smelting batches, router capacity and conveyor regions for v7.
- Reused unmodified original item icons, floor variants and block art.
- Generated transparent auxiliary drill layers; no original artwork was repainted.
- Added map-generation and functional verification tooling.
See docs/ported-assets.json for every sprite source/target and docs/BATCH-02.md for behavior differences.
Related definitions: ProductionBlocks.java, DistributionBlocks.java, Blocks.java, Item.java,
types/production/Drill.java, types/production/Smelter.java,
types/distribution/Conveyor.java and types/distribution/Router.java.
