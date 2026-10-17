# Lote 16 — cerco e suporte de níveis superiores

Alpha 0.16.0. Dez variantes de unidade, sem receitas ou fábricas novas.
Não alteram os tipos vanilla nem as ondas de outros mapas.

| Unidade | Vida | Velocidade/tick | Armas/habilidade |
| --- | --- | --- | --- |
| Blast T5/T6 | 150/180 | 1,00/1,04 | Explosão 250/290; fragmentos 27/32 |
| Mortar T4/T5/T6 | 800/1000/1200 | 0,41/0,45/0,49 | Dano nominal 240/300/360; recarga 37,5/30/25 |
| Healer T4/T5/T6 | 800/1000/1200 | 0,41/0,45/0,49 | Cura 1/10 ticks, raio 40, em todos os tiers |
| Titan T4/T5 | 1720/2150 | 0,42/0,46 | Balas 8/10; chamas 12/15; timers 80/200/240 |

Vida-base × tier e velocidade-base + 0,04 × tier. Mortar divide a recarga
por max(tier/1,5;1), multiplica dano nominal por tier, mas mantém splash-base
40/raio 25. ArtilleryBulletType moderno não garante soma de dano nominal
e splash por impacto; mira/colisão/efeitos continuam adaptados.

Blast usa 90 + (tier-1) × 40 e divisão inteira por nove nos trinta fragmentos.
Detonação de proximidade permanece em dez unidades de mundo. Mantemos a
explosão de área moderna, diferente da geometria de fragmentos Classic.
Dano/efeitos adicionais de morte do motor v7 podem influenciar o resultado.

Healer mantém o override original de cura +1, reload 10 e range 40, em vez
de acelerar pela fórmula genérica. RepairField cura vários aliados, inclusive
ele mesmo, sem suicídio por inatividade nem feixe Classic: diferenças do
lote 11 que permanecem. Titan mantém três armas independentes com timers
80/200/240 e intervalo de seis na rajada; não reproduz exatamente as fases
dos timers Classic. Só dano dos projéteis escala; efeitos modernos são mantidos.

Sprites são t3 originais, pois Classic limita a arte ao intervalo 1–3.
T4/T5/T6 usam contornos rosa/roxo/escuro ff2d86/cb2dff/362020. Cada variante
é um tipo explícito no editor de ondas, não upgrade automático ou escudo v7.

## Testar

Importe ZIP e reinicie. Abra **MCE - Siege Enemy Tiers Demo**.
Ondas manuais 1–10: Blast T5/T6; Mortar T4/T5/T6; Healer T4/T5/T6;
Titan T4/T5. São três unidades por onda ofensiva; ondas 6–8 têm dois
curadores e três Standard do mesmo tier, para testar suporte em combate.
Núcleo à esquerda, spawn à direita. Depois da décima onda não há novos grupos.

Servidor oficial v146: tools/verify-batch16.js confere os dez tipos e
atributos/regras especiais; dano dos sete atacantes, explosões/suicídio dos
dois Blast, cura em aliado por cada um dos três Healers, save/load das dez
variantes e unidades vanilla intactas. 353 sprites pixel-verificados em 4x,
originais por hash e pasta de ambientes conferida. Print do usuário mostra
ícones do lote 15 no catálogo; não é tratado como prova de combate.
Lote 16 visual/partida completa no PC, Android e multiplayer real aguardam cliente.

## Restante

Oito tipos de combate têm T1–T6: Standard, Fast, Rapid, Flamer, Tank, Blast,
Mortar e Healer. Titan tem T1–T5; EMP/Fortress T1–T3. Restam Titan T6 e
EMP/Fortress T4–T6: sete variantes. Alvo de treino permanece T1.
Total atual: 60 entradas de inimigos e seis de jogador; 15 mapas de demo.
Mapas Classic originais (12 do menu + tutorial), planeta/campanha,
movimento terrestre do jogador e dirtblock sem arte própria ainda pendentes.
As limitações de fidelidade dos outros blocos continuam documentadas.
