# Alpha 0.19 — Classic Planet

## Campanha e pesquisa

Planeta Classic independente, com esfera HexMesh e 13 setores nomeados.
Grassland é o início livre; tutorial é prática opcional sem ondas/diálogos.
Ordem de sobrevivência: Grassland, Maze, Desert, Caves, Island, Sinkhole,
Tundra, Fortress, Volcano, Caldera, Scorch, Spiral. Captura na onda 20,
incrementando 5 por setor até 75. Pesquisa gratuita do próximo setor exige
conquista do anterior. Esta progressão é uma adaptação v7 nova, não original.
Setores numerados sem mapa não podem receber lançamento. Não há invasões
nem simulação de ondas fora do setor. Cada partida nova recebe 120 pedras;
recursos entre setores e custos de lançamento são simplificados, sem seleção
de carga/esquema. A base original de cada mapa é preservada.

Os 63 nós de construção foram ligados à raiz Classic, removidos da árvore
Serpulo sem renomear os conteúdos. Custos clássicos de construção mantidos;
perfurador de pedra retorna à receita original de 12 pedras, removendo cobre.
Uma inicialização temporária HJSON usa mechanical-drill como pai, depois a
árvore é reparentada em ContentInitEvent. Nenhum ramo Classic permanece no
Serpulo final. Os desbloqueios existentes por nome continuam válidos.

## Exclusividade e modo misto

No Classic, whitelist de itens clássicos e proibições de blocos/unidades de
outras origens. Em Serpulo/Erekir, itens Classic ficam ocultos para construção.
Filtros de geração dos mapas são explicitamente `[]`: ausência de genfilters
no v7 cria ScatterFilter/OreFilter padrão, que introduziam minérios modernos.
Todos os 13 mapas foram regravados e recarregados com os filtros desligados.
Ar e marcadores de spawn do motor continuam necessários; não são minério.
Água/petróleo usam os líquidos vanilla compartilhados por equivalência de recurso.

Ao selecionar Qualquer (Planets.sun), o WorldLoad restaura as proibições
anteriores guardadas em uma tag e libera a mistura; não apaga proibições do
jogador. A interface de regras pode exibir a lista Classic até iniciar o mapa,
pois a limpeza ocorre no carregamento. Trocar planeta não reescreve o terreno
de mapas personalizados. Os setores Classic usam apenas seus mapas fixos.

## Carvão e núcleo

Item.coal e icon-coal.png existem no Classic original. Agora há classic-coal
separado, arte original ampliada 4x, dureza 2 e propriedades combustíveis v7.
Depósito, fundidor, cadinho, gerador, purificadores/refinaria e munições foram
ajustados. Estoques vanilla coal dentro de edifícios Classic são convertidos
no carregamento; estoques de edifícios vanilla não são alterados. Itens sobre
esteiras vanilla ou em unidades de saves antigos não são convertidos.
Maps de demonstração antigos podem manter carga inicial moderna; use os
setores ou os mapas originais atualizados para progressão sem cobre.

CoreBlock.drawLanding desenha teamRegions mesmo quando a região não existe.
classic-core-team.png transparente fornece essa camada, sem pintar sobre a
arte original. Thrusters usam o fallback clear-effect do v7. Não se sobrepõe
nenhuma textura vanilla. Confirmação visual depende do cliente.

## Verificação

Servidor oficial v146: todos os 13 setores via World.loadSector, 63 tecnologias
na raiz Classic, núcleo/carga correta, nenhuma camada de minério moderno,
nenhum piso/itemDrop de outra origem, regras de captura, tutorial, modo
Qualquer preservando proibição pessoal, Serpulo preservado, migração seletiva
de carvão e save/reload de campanha. Relatório classic-planet-validation.json.
Também reexecutada a comparação integral dos 720896 tiles dos mapas.
Cabeçalho de mapa sem genfilters causou a falha inicial de ore-copper no
teste de campanha; corrigida a origem, sem mascarar a checagem de minérios.

Reprodução: instalar ZIP no servidor v146 e executar
`js Vars.mods.getScripts().runConsole(new Fi('../mce/tools/verify-classic-planet.js').readString());`
numa pasta irmã de mce. `java tools/ScaleSprites.java --verify` verifica 362
sprites em 4x; `python tools/build.py` valida referências/hashes e monta o ZIP.
Cliente PC/Android, render da esfera/animação, pesquisa/lançamento pela UI e
campanha prolongada ainda precisam de teste real. Combate/movimento mantêm
as adaptações documentadas nos lotes anteriores.
