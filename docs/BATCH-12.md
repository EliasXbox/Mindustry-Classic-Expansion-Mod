# Lote 12 — reforços, alvo e tiers

Alpha 0.12.0. Dez novas entradas de unidade; nenhuma receita/fábrica nova.
12/12 tipos Classic agora têm uma representação de nível 1. Níveis superiores
continuam em andamento e os comportamentos adaptados do lote 11 permanecem.

| Entrada | Vida | Velocidade/tick | Recarga | Dano direto |
| --- | ---: | ---: | ---: | ---: |
| Fortress | 700 | 0,29 | 90 | 20, área 13/raio 25 |
| Alvo | 40 | 0 | — | Sem arma |
| Standard T2/T3 | 120/180 | 0,48/0,52 | 24/16 | 4/6 |
| Fast T2/T3 | 100/150 | 0,81/0,85 | 15/10 | 4/6 |
| Rapid T2/T3 | 520/780 | 0,41/0,45 | 6/4 | 4/6 |
| Flamer T2/T3 | 300/450 | 0,43/0,47 | 4,5/3 | 6/9 |

As fórmulas Classic são vida-base × tier, dano-base × tier, velocidade-base
+ 0,04 × tier, alcance-base + 5 × tier e recarga-base / max(tier/1,5;1).
Sprites t2/t3 originais e cores de contorno laranja/vermelha. Efeitos como
queimadura moderna não recebem multiplicação adicional inventada.
Tier é um tipo explícito no v7: selecione-o nas ondas. Não é escudo v7 nem
upgrade automático da unidade T1. Sprites não significam tiers adicionais.

## Fortress

ArtilleryBulletType adapta o projétil yellowshell Classic. Arma original
tem dano 20, vida 700 e corpo de tamanho 10. Próximo a um núcleo inimigo
(raio 90 unidades de mundo = 11,25 espaços), gera Fast do nível 1 a cada
190 ticks, deslocado 20 na direção atual. Limite de seis filhos vivos;
após morte de um filho pode repor. Cada Fortress tem sua própria contagem.
Timer só avança perto de núcleo inimigo, e para ao atingir o limite.

Timer/vínculos são salvos pelo chunk próprio mce-fortress-v1. Teste mostrou
que usar apenas Ability.data não preservava esse estado no save v146;
o chunk restaura a habilidade e os filhos depois de ler as entidades.
Sem reset do limite ao reabrir a partida. Não requer JAR adicional.

Classic usa um timer compartilhado pela instância FortressType; a adaptação
usa timers por unidade. A proximidade escolhe núcleo inimigo moderno mais
próximo, em vez do núcleo global único. IA/colisão/efeitos de artilharia são
modernos. Ainda não existem Fortress de tiers maiores neste pacote.

## Alvo de treino

Sem movimento ou armas, 40 de vida, equipe configurada pelo mapa. Após
morrer reaparece na mesma posição/equipe em 100 ticks. Não reproduz os
marcadores/controle do tutorial Classic. O timer pendente é cancelado na
troca de mundo para não gerar alvo na partida seguinte; esse timer pendente
não é salvo. Um alvo vivo no mapa/save é preservado normalmente.
Não entra nas ondas do demo; isEnemy=false para não ser uma unidade de onda.

## Demonstração e testes

Abra **MCE - Reinforcements and Tiers Demo**. Alvo precolocado em (40,20),
núcleo (12,48), spawn à direita. Nove ondas manuais: Fortress (uma unidade),
Standard T2/T3, Fast T2/T3, Rapid T2/T3, Flamer T2/T3 (três cada).
Chame a próxima onda pelo controle do jogo; elimine os reforços do Fortress
também. Depois da nona onda não há outros grupos. Arte/partida PC/Android
e multiplayer real aguardam teste do cliente.

tools/verify-batch12.js: atributos/dano dos oito tiers; tiro de artilharia
do Fortress; limite de seis, ausência de geração longe do núcleo; estado
independente por unidade; restauração dos vínculos/contador; reposição de
filho morto após load; alvo guardado no mapa, respawn e cancelamento na troca
de mundo; vanilla intacto. Servidor oficial v146, sem erro de carregamento.
313 sprites conferidos por pixels em 4x, com originais por hash.
Usuário confirmou inimigos do lote 11 no cliente antes deste lote.

## Restante

T2/T3 dos outros sete inimigos (14 entradas), T4–T6 dos onze inimigos de
combate (33 entradas), terreno dirtblock sem sprite próprio, movimentação
terrestre do jogador e conversão dos mapas. Classic limita a arte a t3
para tiers 4–6, mas muda atributos/contorno. Alvo é conteúdo de treino.
Os 12 mapas do menu + tutorial ainda não foram convertidos; os onze mapas
atuais são demonstrações. Planeta/campanha Classic ainda não está pronto.
