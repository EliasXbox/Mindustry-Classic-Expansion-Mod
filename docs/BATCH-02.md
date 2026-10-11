# Lote 2 — extração, transporte e aço

2026-10-11. Versão 0.2.0-alpha: cinco novos blocos construíveis, três itens e dois terrenos de suporte no mesmo ZIP.

## Cadeia

Pedra → perfurador de pedra → esteira/roteador → parede e construções.
Ferro → perfurador de ferro → fundidor + carvão vanilla → aço clássico.

Fonte: snapshot Classic 92e28d8a81ed8ddc8d80fc170de33d34b4cd202e.
ProductionBlocks.java, DistributionBlocks.java, Recipes.java, Item.java, Blocks.java,
e classes Drill, Smelter, Conveyor e Router.

Saúde: perfuradores/esteira/roteador 40; fundidor 70; parede 160. Todos 1x1.
Estoque dos perfuradores: 5; fundidor: 20 por item.
Somente o primeiro perfurador muda stone/12 para copper/12, para iniciar a cadeia sem dependência circular.
As demais receitas de construção usam itens Classic originais.

## Adaptações explícitas

- Pedra e ferro são Floor com itemDrop, como no Classic. Ore Classic herda Floor e a arte inclui o chão;
  OreBlock moderno colocaria chão opaco sobre outro piso.
- Os pisos vanilla não mudam. Terrenos Classic precisam ser colocados em mapas; há uma demonstração pronta.
- Drill moderno não possui filtro de saída único em HJSON. Pedra: tier 0, bloqueia areia;
  ferro: tier 1, bloqueia pedra clássica. Ambos podem extrair outros recursos do seu nível.
  Tempos 240/300 ticks, sem penalidade adicional de dureza.
- Itens Classic são visíveis desde o começo. Blocos mantêm pesquisa.
  Requisitos de pesquisa explícitos evitam multiplicadores modernos enormes.
  Pedra fica sob mechanical-drill; ferro/esteira/parede sob pedra; fundidor sob ferro; roteador sob esteira.
- Smelter Classic usa um ferro/20 ticks e um carvão/50 ticks de queima.
  GenericCrafter usa 5 ferros + 2 carvões → 5 aços/100 ticks: mesmas taxas médias com entrada contínua,
  mas consumo e saída em lotes, sem queima independente quando falta ferro.
- Router moderno aceita um item por vez. Alterar itemCapacity não restaura o buffer Classic de vinte;
  a capacidade declarada é 1 para não anunciar comportamento inexistente.
- Conveyor mantém speed 0.02; espaçamento moderno muda a vazão. Os 28 slots modernos usam cópias dos
  dois PNGs originais. Curvas usam a arte básica; não se promete vazão Classic exata.
- Perfuradores têm camadas auxiliares transparentes, mantendo a arte estática original.
- Fundidor preserva o sprite base; brilho da queima Classic fica para outra etapa.
- Aço é produzido para próximos lotes; não há consumidor artificial.

Todas as cópias e camadas auxiliares estão em ported-assets.json.
Hashes das cópias são conferidos contra sprites.json. Na 0.2.0, escala texturescale=4. Na 0.2.1, fontes originais ficam em art-source, sprites renderizados são ampliados 4x e texturescale=1.

## Atualização e demonstração

O identificador da parede continua igual. A receita muda para stone/12, e a pesquisa
passa ao perfurador de pedra. Construções existentes mantêm o conteúdo;
a mudança de pesquisa pode exigir novo desbloqueio. Faça cópia dos saves ao atualizar uma alpha.

maps/classic-chain-demo.msav: mapa v146, 48x48, sem ondas, com núcleo, depósitos,
os cinco blocos, a parede e cofres vanilla. O fundidor começa sem combustível; forneça carvão.
As regras limitadas oferecem cobre e carvão no núcleo.

tools/verify-chain.js recria o mapa e executa 6000 atualizações reais das construções.
É ferramenta de console do servidor, não script de gameplay carregado pelo mod.
Em um servidor v146 de teste, com mod carregado e repositório como diretório atual, execute:

`js Vars.mods.getScripts().runConsole(new Fi('tools/verify-chain.js').readString());`

O mapa é salvo antes da simulação, em maps/classic-chain-demo.msav.
A simulação alimenta apenas o fundidor com carvão; os perfuradores recebem recursos do terreno,
e as construções extraem, transportam e processam pelos métodos reais do v7.
O teste altera o mundo temporário do servidor.
