# Lote 13 — Tank/Blast/Mortar/Healer/Titan T2 e T3

Alpha 0.13.0: dez variantes explícitas de unidade, sem novas receitas ou
fábricas. Não substituem tipos vanilla nem mudam ondas de outros mapas.
Sprites t2/t3 originais e contorno moderno laranja/vermelho, ampliados 4x.

| Unidade | Vida T2/T3 | Velocidade T2/T3 | Armas/habilidade |
| --- | ---: | ---: | --- |
| Tank | 700/1050 | 0,32/0,36 | Dano 4/6; recarga 67,5/45; quatro projéteis |
| Blast | 60/90 | 0,88/0,92 | Explosão adaptada 130/170; fragmentos 14/18 |
| Mortar | 400/600 | 0,33/0,37 | Dano nominal 120/180; recarga 75/50; área 40 |
| Healer | 400/600 | 0,33/0,37 | Cura 1 a cada 10 ticks, raio 40 em ambos |
| Titan | 860/1290 | 0,34/0,38 | Balas 4/6 e chamas 6/9; timers 80/200/240 |

Vida multiplica o valor da classe por tier; velocidade-base + 0,04 × tier.
Tank/Mortar usam reload-base / max(tier/1,5;1). Alcance nominal soma cinco
por tier; Blast mantém aproximação de detonação de dez unidades de mundo.
Projéteis/colisão/IA e efeitos modernos continuam adaptados como no lote 11.

## Regras especiais conferidas no original

BlastType.explode calcula 90 + (tier-1) × 40. O dano do fragmento é divisão
inteira por nove (BulletEntity.damage é int), portanto 14/18. Mantemos
explosão de área moderna e trinta fragmentos; isso ainda difere da geometria
Classic de fragmentos invisíveis. Vida/velocidade também crescem por tier.

Mortar preserva dano nominal do projétil multiplicado por tier. A explosão
de shell lê o damage-base do BulletType (60), em vez de b.getDamage(), e
usa dois terços: área permanece 40. ArtilleryBulletType moderno tem suas
próprias colisões; campo de dano nominal não garante que cada alvo receba
dano direto somado ao splash. Aparência/impacto continuam modernos.

HealerType substitui updateShooting e usa diretamente reload=10, cura +1
e range=40; não passa pela divisão genérica de reload por tier. RepairField
continua curando todos os aliados no raio, em vez de um alvo, e não inclui
o suicídio de inatividade Classic. Os timers especiais do Titan também não
passam pelo reload genérico: shotgun/80, círculo/200, chamas/240 com intervalo
6 mantidos em T2/T3. Dano de cada tiro multiplica por tier. As três armas
independentes do v7 não reproduzem exatamente as fases Classic.

## Testar

Importe ZIP, reinicie e abra **MCE - Heavy Enemy Tiers Demo**. Dez ondas
manuais: Tank T2/T3, Blast T2/T3, Mortar T2/T3, Healer T2/T3, Titan T2/T3.
Núcleo à esquerda e spawn à direita. Ondas 7/8 incluem três Standard do
mesmo tier para acompanhar os dois curadores. Após onda 10 não há grupos.
Escolha variantes Classic explícitas no editor de ondas para outros mapas.

tools/verify-batch13.js no servidor oficial v146 confere atributos/escala,
dano real das oito variantes armadas, cura de aliado ferido por ambos os
curadores, save/load das variantes e unidades vanilla preservadas. Valida
também divisão inteira dos fragmentos, cura/timers fixos e splash-base do
morteiro. 323 sprites conferidos pixel por pixel em 4x; originais por hash.
O usuário confirmou lote 12 no cliente. Lote 13 visual/partida completa,
Android e multiplayer real aguardam cliente; servidor não valida aparência.

## Restante

EMP/Fortress T2/T3 (quatro variantes) e T4–T6 dos onze tipos de combate
(33 variantes). Alvo de treino permanece T1. Original reutiliza arte t3
nos níveis 4–6, alterando contorno/atributos. Total atual: 30 entradas de
inimigos e seis de jogador. Ainda faltam mapas originais/planeta Classic,
movimentação terrestre do jogador e dirtblock sem sprite próprio.
