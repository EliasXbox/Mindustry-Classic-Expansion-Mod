# Alpha 0.18 — mapas originais

Porta os 13 mapas declarados em maps.json do último Classic arquivado,
commit 92e28d8a81ed8ddc8d80fc170de33d34b4cd202e: maze, fortress,
sinkhole, caves, volcano, caldera, scorch, desert, island, grassland,
tundra, spiral e tutorial. Outros PNGs de testes não listados no menu
não fazem parte deste conjunto. Os 16 mapas de demonstração permanecem.

## Conversão e adaptações

Paleta RGBA original, orientação vertical, dimensões, posição do núcleo,
marcadores de spawn e alvo preservados. Nenhuma cor desconhecida. Minérios
gerados com a classe Noise original e sementes fixas 90210–90222, pois
Classic gerava minérios por ruído. As decorações usam Java Random com a
mesma probabilidade original de 2,5%; a sequência difere do RNG Classic.
Não são capturas idênticas de uma partida antiga com outra semente.

Base inicial reproduz World.setDefaultBlocks, incluindo orientação invertida
em volcano e conversão especial de rotações negativas das esteiras Classic.
O núcleo usa o conteúdo já portado. Tutorial recebe as alterações de terreno
do tutorial original e seu alvo, mas não os diálogos/objetivos guiados.
É um mapa de prática com waves=false. Mantém grupos Classic em regras para
evitar que o leitor v7 substitua uma lista vazia por ondas vanilla.

240 cobres vanilla iniciais permitem fabricar o perfurador de pedra pela
receita existente no mod. É uma adaptação de progressão: estes terrenos
originais não fornecem minério de cobre. Nenhuma receita global foi alterada.

As 16 definições de onda normal (enemyScaling=2) foram decompostas em 152
grupos nativos, preservando contagens, espaçamento em número de ondas e tiers
1–6, inclusive a progressão longa. As ondas são infinitas; não há vitória
artificial numa onda final. Intervalo base de 60s no v7; atraso inicial,
acréscimos de tempo, distribuição espacial de spawn, colisão, IA e combate
seguem adaptações modernas, não equivalência integral de partidas Classic.

## Validação e reprodução

13 arquivos msav gerados e recarregados no servidor oficial v146. Comparação
de todos os pisos/blocos/overlays, núcleo, dimensões e marcadores de spawn;
caminhos estáticos de todas as entradas até o núcleo, e minério alcançável.
O teste trata construções destrutíveis como atravessáveis para ataque;
não substitui uma partida completa com pathfinding/combate real.
Contagens nativas verificadas nas ondas 1,3,4,6,17,35,86,120,500,1000,10000.
O conversor de grupos também compara cada definição nas ondas 1–500,
1000,2000,10000. Vida de core-shard e dagger vanilla conferida intacta.
Relatórios: classic-map-inventory.json e classic-map-validation.json.
PC/Android, aparência e sobrevivência prolongada aguardam teste no cliente.

Para reconstruir os dados de terreno, Python 3 e JDK:
`python tools/rebuild-classic-map-data.py`.
Inicie servidor v146 com o mod instalado; a partir de uma pasta irmã do repo:
`js MCE_ROOT='../mce';Vars.mods.getScripts().runConsole(new Fi('../mce/tools/convert-classic-maps.js').readString());`
O gerador salva mapas e relatório. `python tools/build.py` valida hashes e
empacota o ZIP. map-source contém PNGs e dados editáveis; Noise.java é a
implementação GPL original. Não é necessário Java no cliente do mod.

Classic Planet, seleção de setores, pesquisa e lançamento entre mapas ainda
não estão implementados. Este lote prepara os mapas para essa integração.
