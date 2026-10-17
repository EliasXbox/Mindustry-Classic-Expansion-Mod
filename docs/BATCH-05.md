# Lote 5 — produção e portas

Alpha 0.5.0, 2026-10-11. Dez novas construções:

| Bloco | Vida / tamanho | Construção (Classic) | Produção nominal |
| --- | --- | --- | --- |
| Purificador de carvão | 50 / 1x1 | 10 aços + 10 ferros | 5 pedras + 18,99 águas → 1 carvão / 50 ticks |
| Purificador de titânio | 70 / 1x1 | 30 aços + 30 ferros | 6 ferros + 40 águas → 1 titânio / 60 ticks |
| Refinaria de óleo | 80 / 1x1 | 15 aços + 15 ferros | 45 óleos → 1 carvão / 60 ticks |
| Formador de pedra | 80 / 1x1 | 10 aços + 10 ferros | 16 lavas Classic → 1 pedra / 12 ticks |
| Fundidor de lava | 80 / 1x1 | 30 aços + 15 titânios | 1 ferro + 40 lavas Classic → 1 aço / 30 ticks |
| Perfurador de carvão | 40 / 1x1 | 25 pedras + 40 ferros | drillTime 360, tier 2 |
| Omniperfurador | 40 / 1x1 | 40 titânios + 40 diriums | drillTime 240, tier 100 |
| Bomba de fluxo | 40 / 1x1 | 10 aços + 5 diriums | Extração nominal 180 unidades/s, estoque 10 |
| Porta | 360 / 1x1 | 3 aços + 12 ferros | Toque/clique abre ou fecha |
| Porta grande | 1440 / 2x2 | 12 aços + 48 ferros | Toque/clique abre ou fecha |

Água, óleo e carvão permanecem vanilla; os seis itens Classic anteriores e
suas cadeias de obtenção continuam no pacote. Novo líquido: **lava Classic**,
com a cor original ed5334. Novo terreno de lava extraível pelas bombas e
depósito de carvão com arte Classic, ambos no editor. Nenhum é inserido em
mapas vanilla. Lava usa propriedades modernas de calor/viscosidade, sem
pretender equivalência de física com Classic. Seu ícone usa o sprite do terreno.

## Adaptações

LiquidCrafter foi adaptado para GenericCrafter. O líquido é consumido
continuamente, ao invés de retirado inteiro no instante da fabricação;
quantidades médias por receita, itens e tempos foram preservados. Interromper
a produção pode deixar progresso parcial. Valores float podem apresentar
pequenos arredondamentos. Capacidade de itens 90; capacidades de líquido
21/41/46/21/41, respectivamente. DrawDefault preserva o sprite principal;
o pequeno quadrado indicador de líquido do Classic não é reproduzido.

Perfuradores seguem seleção por tier do v7. Carvão também pode minerar outros
recursos até tier 2, exceto pedra Classic; omni aceita até dureza 100. Essa é
uma adaptação finita do comportamento Classic que extrai qualquer recurso.
Intervalos drillTime não garantem a mesma vazão em todas as condições v7.
Auxiliares transparentes removem a rotação desenhada moderna.

Portas passam a funcionar no PC e Android; Classic limitava suas receitas ao
desktop. A classe Door v7 conecta portas vizinhas e alterna seu grupo junto,
respeitando ocupação por unidades. Saúde, dimensões e dois sprites preservados.
Bomba de fluxo usa líquido do terreno, sem energia, com distribuição v7.

## Demonstração e teste

Abra **MCE - Production and Doors Demo**. Cinco processadores na linha y=15,
com bombas/terrenos abaixo e cofres de saída à direita. Forneça pedra ao
purificador de carvão, ferro ao de titânio e ao fundidor de lava.
Refinaria recebe óleo da fonte de demonstração vanilla. Perfurador de carvão
em (10,30); omni em (25,30); portas pequenas em (40,30)/(41,30) e grande em
(46,30), esta já aberta. Núcleo com 500 de cada item Classic e carvão.

Teste reproduzível: tools/verify-batch5.js, executado manualmente pelo console
de servidor v146 em pasta isolada. Ele salva o mapa antes de simular.
Primeiro isola dez ciclos de cada receita em buffer maior, com tolerância
de 0,02 líquido por arredondamento float; verifica saída/consumo e restaura
as capacidades originais. Depois testa as cinco cadeias por bombas reais.
Valida abertura, fechamento, encadeamento e solidez de portas, vida e tamanho.
Não é script de gameplay; o mod permanece HJSON sem scripts carregados.

Total: **36 de 63 construções Classic**, seis itens próprios, um líquido
próprio, seis terrenos auxiliares e quatro mapas. Restam **27 construções**,
aproximadamente três lotes; energia/armas especiais exigem adaptação individual.
