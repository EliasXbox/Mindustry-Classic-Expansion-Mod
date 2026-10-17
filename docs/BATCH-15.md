# Lote 15 — variantes de assalto

Alpha 0.15.0. Dez variantes próprias de unidade, sem novas receitas ou
fábricas. Não alteram os tipos vanilla nem as ondas dos outros mapas.

| Unidade | Vida T4/T5/T6 | Velocidade T4/T5/T6 | Recarga T4/T5/T6 | Dano nominal |
| --- | --- | --- | --- | --- |
| Rapid | 1040/1300/1560 | 0,49/0,53/0,57 | 3/2,4/2 | 8/10/12 |
| Flamer | 600/750/900 | 0,51/0,55/0,59 | 2,25/1,8/1,5 | 12/15/18 |
| Tank | 1400/1750/2100 | 0,40/0,44/0,48 | 33,75/27/22,5 | 8/10/12 por projétil |
| Blast T4 | 120 | 0,96 | Proximidade | Explosão 210; fragmentos 23 |

Rapid/Flamer/Tank seguem vida-base × tier, velocidade-base + 0,04 × tier,
recarga-base / max(tier/1,5;1), alcance-base + 5 × tier e dano-base × tier.
Blast usa 90 + (tier-1) × 40: T4 = 210; divisão inteira por nove resulta
em 23 para cada um dos trinta fragmentos. Aproximação de detonação permanece
em dez unidades de mundo. Dano de morte/colisão/efeitos são modernos.

Os três grupos T4–T6 reutilizam a arte t3 original, pois Classic limita a
escolha do sprite a três. Contornos rosa/roxo/escuro reproduzem as cores
ff2d86/cb2dff/362020. Não foram inventados novos corpos para esses níveis.
Cada nível é um tipo explícito no editor de ondas; não há upgrade automático.

## Adaptações mantidas

GroundAI, aceleração, mira e colisões do v7. Rapid usa projétil roxo moderno;
Flamer usa projétil penetrante com queimadura moderna, sem multiplicação
adicional de duração/intensidade de status por tier. Tank mantém o padrão
moderno de quatro tiros adaptado no lote 11. Blast usa explosão de área
e fragmentos modernos, não a geometria exata de blastshots Classic.
Nenhum desses comportamentos passa a ter paridade exata só por ganhar tiers.
Demais limitações de curador/Titan/EMP/teleporte/fábrica continuam registradas.

## Testar

Importe ZIP e reinicie. Abra **MCE - Assault Enemy Tiers Demo**.
Ondas manuais 1–10: Rapid T4/T5/T6, Flamer T4/T5/T6, Tank T4/T5/T6, Blast T4.
Núcleo à esquerda, spawn à direita; três unidades por onda. Depois da décima
não há novos grupos. Para outros mapas, use os tipos Classic no editor de ondas.

Servidor oficial v146: tools/verify-batch15.js confere os dez registros,
vida/velocidade/recarga/alcance/dano, salvo do Tank, escala especial do Blast,
dano real das dez armas, suicídio do Blast, save/load das dez variantes e
unidades vanilla intactas. 343 sprites conferidos pixel por pixel em 4x;
originais por hash e pasta de ambientes validada. Print enviado pelo usuário
mostra ícones do lote 14 carregados no catálogo; não confirma combate por si.
Lote 15 visual/partida completa PC, Android e multiplayer real aguardam teste.

## Restante

Standard/Fast/Rapid/Flamer/Tank têm T1–T6; Blast tem T1–T4. Faltam Blast
T5/T6 (duas variantes) e Mortar/Healer/Titan/EMP/Fortress T4–T6 (quinze).
Total atual: 50 entradas de inimigos e seis de jogador. Restam 17 variantes.
Os 14 mapas atuais são demonstrações; os 12 mapas originais + tutorial,
planeta/campanha Classic, movimento terrestre do jogador e dirtblock ainda
estão pendentes. Não declarar conteúdo completo antes dessas etapas.
