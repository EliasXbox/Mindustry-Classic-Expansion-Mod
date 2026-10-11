# Inventário do Mindustry Classic

Inspeção: 2026-10-11. Origem: [Anuken/Mindustry-Classic](https://github.com/Anuken/Mindustry-Classic),
commit [92e28d8a81ed8ddc8d80fc170de33d34b4cd202e](https://github.com/Anuken/Mindustry-Classic/commit/92e28d8a81ed8ddc8d80fc170de33d34b4cd202e), de 2021-03-24.
Repositório arquivado, sem releases publicadas. O build.gradle identifica a versão como `classic` e recebe o número de build externamente; não é possível atribuir um último número de release a esse snapshot apenas pelo código.

## Conteúdo declarado

| Grupo | Quantidade | Fonte |
| --- | ---: | --- |
| Terreno, minérios, obstáculos e internos | 28 | Blocks.java, incluindo blockpart |
| Defesa | 15 | DefenseBlocks.java |
| Transporte e distribuição | 16 | DistributionBlocks.java |
| Produção, extração, núcleo e energia | 23 | ProductionBlocks.java |
| Torres | 12 | WeaponBlocks.java |
| Marcadores de spawn | 2 | SpecialBlocks.java |
| Total de declarações de blocos | 96 | Não significa 96 blocos construíveis |
| Itens | 8 | Item.java |
| Líquidos | 5 | Liquid.java |
| Tipos de inimigos | 12 | EnemyTypes.java |
| Mech do jogador | 1 | Mech.java: standard |
| Armas do jogador | 6 | Weapon.java |

Itens: stone, iron, coal, steel, titanium, dirium, uranium, sand.
Glass e silicon estão comentados e foram excluídos.
Líquidos: water, plasma, lava, oil, cryofluid.
Minérios definidos como Ore: iron, coal, titanium, uranium. Stone e blackstone são pisos que fornecem pedra.
Inimigos: standard, fast, rapid, flamer, tank, blast, mortar, healer, titan, emp, fortress, target.
Armas: blaster, triblaster, clustergun, beam, vulcan, shockgun.

O JSON adjacente lista cada bloco, classe original, receita quando declarada e candidatos de sprite.
A correspondência por nome não captura todos os desenhos personalizados e regiões compartilhadas.
`target` e marcadores internos não devem ser tratados automaticamente como conteúdo jogável.

## Sprites

373 PNGs em `core/assets-raw/sprites`: 178 de blocos, 34 de inimigos, 3 de mechs,
12 de armas, 124 de UI, 1 fundo e 21 na raiz (ícones de itens, projéteis, lasers e auxiliares).
`sprites.json` registra caminho, dimensões, tamanho e SHA-256 de cada arquivo.
Inclui variantes antigas `_old`; a presença de um arquivo não confirma uso em runtime.
Somente stonewall.png é incluído na alpha, sem alterações nos bytes.

## Plano de adaptação

| Conteúdo | Caminho provável no v7 | Observações |
| --- | --- | --- |
| Paredes simples | Wall em HJSON | Saúde e tamanho transferíveis; receitas dependem dos itens Classic |
| Itens | Item em HJSON | Criar nomes próprios e fontes de obtenção antes de usá-los nas receitas |
| Minérios e pisos | OreBlock / Floor | Mapas próprios; não alterar pisos vanilla para inserir minérios |
| Perfuradores | Drill / outros extratores | Classic usa resource/result/time; não copiar diretamente para drillTime/tier |
| Fundição e purificação | GenericCrafter | Rever receita, combustível, consumo por tick e duração |
| Esteiras e conduítes | Conveyor / Conduit | Modernizar nomes das regiões, frames, capacidades e taxas |
| Torres | ItemTurret / PowerTurret | Adaptar BulletType, ShootPattern, alcance, tempos e camadas |
| Inimigos e mech | UnitType | Refazer IA, armas, entidades, habilidades e movimentação |
| Energia por laser, teleporte e escudos | Revisão individual | Comportamentos personalizados podem exigir scripts ou Java; fora da alpha HJSON |
| Armas equipáveis e weaponfactory | Sistema a redesenhar | v7 não oferece o mesmo sistema de upgrades do jogador |

Diferenças observadas: símbolo `diriumwall` aponta ao nome `duriumwall`; `pulseconveyor`
usa `poweredconveyor`, `teslaturret` usa `waveturret`, `titanturret` usa `titancannon`.
Não deduzir o nome do sprite pelo símbolo Java. `siliconextractor` declara saída sand,
e `compositewall` não tem receita em Recipes.java; não corrigir esses casos silenciosamente.
Portas e weaponfactory têm receitas marcadas desktopOnly no Classic; a implementação moderna
precisa decidir explicitamente como oferecer o comportamento também no Android.

## Primeira alpha

`stonewall` → `classic-stone-wall`, classe Wall, saúde 40×4=160 e tamanho 1x1.
Receita Classic: stone/12; receita alpha: copper/12. Pesquisa adicionada sob copper-wall.
O sprite original 8x8 usa texturescale=4, compensando a escala de desenho de sprites do v7.
Não se presume compatibilidade de save, protocolo ou balanceamento entre Classic e v7.

Fontes modernas conferidas no tag v146:
[ContentParser.java](https://github.com/Anuken/Mindustry/blob/v146/core/src/mindustry/mod/ContentParser.java),
[Wall.java](https://github.com/Anuken/Mindustry/blob/v146/core/src/mindustry/world/blocks/defense/Wall.java),
[Mods.java](https://github.com/Anuken/Mindustry/blob/v146/core/src/mindustry/mod/Mods.java).
