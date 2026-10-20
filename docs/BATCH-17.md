# Lote 17 — sete últimos tiers de inimigos

Alpha 0.17.0: Titan T6; EMP T4/T5/T6; Fortress T4/T5/T6.
Sem novas receitas/fábricas nem alterações de tipos/ondas vanilla.

| Unidade | Vida | Velocidade/tick | Recarga | Dano nominal |
| --- | --- | --- | --- | --- |
| Titan T6 | 2580 | 0,50 | 80/200/240 | Balas 12, chamas 18 |
| EMP T4/T5/T6 | 840/1050/1260 | 0,46/0,50/0,54 | 26,25/21/17,5 | 32/40/48 |
| Fortress T4/T5/T6 | 2800/3500/4200 | 0,41/0,45/0,49 | 33,75/27/22,5 | 80/100/120 |

Vida-base × tier; velocidade-base + 0,04 × tier; dano-base × tier.
EMP/Fortress dividem reload-base por max(tier/1,5;1). Titan mantém timers
especiais das três armas: 80/200/240, intervalo de seis na rajada.
Fortress mantém splash-base 13/raio 25, não o dano nominal multiplicado;
ArtilleryBulletType moderno tem colisão própria. EMP mantém raio 40,
slowdown 0,5 por 120 ticks e exigência de rede produzindo energia para o
efeito em blocos. Essas continuam adaptações v7, não buffers/projéteis Classic
idênticos. Todas as variantes usam arte t3 original e cores Classic T4/T5/T6
rosa/roxo/escuro, pois o original limita a seleção de sprite a três.

## Fortress de nível alto

Script declara agora todos os seis Fortress. T4/T5/T6 geram Fast do mesmo
nível, próximos a núcleo inimigo (raio 90), um a cada 190 ticks, no máximo
seis filhos vivos. Repõe filhos mortos; timer/vínculos continuam no chunk
mce-fortress-v1, sem mudar seu formato. Geração é autoritativa no servidor.
Timer por unidade e proximidade do núcleo inimigo mais próximo continuam
adaptações do timer/global core Classic. Multiplayer real aguarda teste.

## Cobertura concluída dos tiers

Standard, Fast, Rapid, Flamer, Tank, Blast, Mortar, Healer, Titan, EMP e
Fortress: T1/T2/T3/T4/T5/T6, total 66. Alvo de treino: T1, sem arma.
Somando seis variantes equipáveis do jogador, o pacote tem 73 tipos de unidade.
O construtor verifica a presença de toda a matriz de 66 + alvo antes do ZIP.
Tier continua sendo tipo explícito escolhido nas ondas, sem upgrade automático.

Isso encerra a lista de tiers, não o trabalho de fidelidade. Cura em campo,
IA/colisão/balística/efeitos modernos, explosões adaptadas, timers do Titan,
respawn pendente do alvo não salvo e outros limites dos lotes anteriores
permanecem. O jogador ainda usa variantes voadoras; sprites não comprovam
paridade de comportamento. Mapas Classic/planeta ainda não foram portados.

## Testar

Importe ZIP, reinicie e abra **MCE - Final Enemy Tiers Demo**.
Sete ondas manuais: Titan T6, EMP T4/T5/T6, Fortress T4/T5/T6.
São três unidades em cada onda de Titan/EMP e um Fortress por onda.
Núcleo à esquerda, spawn à direita; elimine também os Fast gerados.
Depois da sétima onda não há novos grupos. Use gerador ativo para observar EMP.

Servidor v146: tools/verify-batch17.js confere matriz de 66 + alvo, sete
tipos/atributos/armas, EMP em geradores ativos, três Fortress gerando seis Fast
do próprio tier, proximidade, save/load, limite após load e reposição de morto,
persistência de Titan T6 e vanilla intacto. Testa também chunk v1 num save real
do lote 14 (T2/T3) quando o fixture existe. 360 sprites pixel-verificados em 4x,
originais por hash e caminhos de ambiente conferidos.

Primeiro teste de reposição falhou por referência ao núcleo do save antigo
retida no fixture de geração. Corrigido reset de estado entre carregar o
fixture antigo e gerar o cenário novo, com assert do núcleo do mundo atual.
Não foi alterado parâmetro de combate para fazer o teste passar.
Print do usuário confirma ícones do lote 16 no catálogo, sem inferir combate.
Lote 17 visual/partida completa PC, Android e multiplayer real aguardam cliente.

## Próximas etapas

Converter os 12 mapas Classic do menu e o tutorial (PNG codificado para msav),
preparar campanha/planeta Classic e revisar movimento terrestre do jogador,
dirtblock sem sprite próprio e demais adaptações. Os 16 mapas atuais são
demonstrações. Não declarar Classic Planet pronto neste pacote.
