# Lote 3 — dez blocos e materiais avançados

0.3.0-alpha, 2026-10-11. Sete paredes: ferro (320 HP), aço (440), titânio (600),
dirium (760), aço grande (1760), titânio grande (2400), dirium grande (3040).
Pequenas: 1x1, 12 unidades do material; grandes: 2x2, 48 unidades.

Completam o lote o cadinho (90 HP) e os perfuradores de titânio e urânio (40 HP,
1x1, 5 de estoque, extração nominal de 7s). Receitas originais:
cadinho = 50 titânios + 50 aços; perfurador de titânio = 50 ferros + 50 aços;
perfurador de urânio = 40 ferros + 40 aços, todos Classic.

Novos itens juntos: titânio, dirium e urânio clássicos. Titânio Classic é separado
do vanilla para preservar as receitas. Carvão continua vanilla.
Dois depósitos novos no editor e no mapa MCE - Advanced Materials Demo permitem extração.
Eles não são inseridos automaticamente em mapas vanilla.

Cadinho: 2 titânios + 2 aços Classic + 1 carvão vanilla → 2 diriums por 40 ticks.
Adaptação por lotes mantém as taxas médias do Classic (craftTime=20, burnDuration=40).
Perfuradores usam Drill moderno por tier, sem filtro exclusivo de recurso:
tier 3/4, respectivamente, bloqueando pedra Classic. Podem extrair outros recursos elegíveis.

Pesquisa: perfuradores avançados sob fundidor; cadinho sob perfurador de titânio;
paredes sob a produção do material, e grandes sob as pequenas correspondentes.
Sprites originais são preservados em art-source e ampliados 4x sem interpolação,
incluindo as paredes grandes (16x16 → 64x64), com texturescale=1.

Teste reproduzível: tools/verify-batch3.js, pelo console de um servidor v146 de teste.
O mapa é salvo antes da simulação. No mapa, alimente o cadinho em (10,20) com titânio,
aço Classic e carvão vanilla. O núcleo oferece cobre, carvão e aço para demonstração.
Titânio/urânio são extraídos em (20,20)/(20,30); paredes ficam na fileira y=40.

Total atual: 16 blocos construíveis, 6 itens próprios e 4 terrenos de recurso.
Restam 47 dos 63 blocos com receita Classic. Aparência e interação do lote 3 aguardam teste no cliente.
