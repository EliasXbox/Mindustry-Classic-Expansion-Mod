# Lote 14 — níveis de elite e reforços do mesmo tier

Alpha 0.14.0: dez entradas de unidade, sem receitas/fábricas novas.

| Unidade | Vida | Velocidade/tick | Recarga | Dano nominal |
| --- | ---: | ---: | ---: | ---: |
| EMP T2/T3 | 420/630 | 0,38/0,42 | 52,5/35 | 16/24 |
| Fortress T2/T3 | 1400/2100 | 0,33/0,37 | 67,5/45 | 40/60 |
| Standard T4/T5/T6 | 240/300/360 | 0,56/0,60/0,64 | 12/9,6/8 | 8/10/12 |
| Fast T4/T5/T6 | 200/250/300 | 0,89/0,93/0,97 | 7,5/6/5 | 8/10/12 |

Fórmulas: saúde-base × tier, velocidade-base + 0,04 × tier, recarga-base /
max(tier/1,5;1), alcance-base + 5 × tier, dano nominal-base × tier.
Mantidos outros parâmetros dos equivalentes T1 adaptados no v7.
EMP mantém raio 40, slowdown 0,5 por 120 ticks, sem boost aliado e exige
rede produzindo energia para o efeito em blocos. Continua adaptação moderna,
sem drenagem dos buffers de energia Classic. Projéteis podem atingir unidades.
Fortress mantém splash-base 13/raio 25; não o multiplica pelo tier, pois a
explosão Classic usa o campo damage do BulletType em vez de b.getDamage().
Artilharia moderna não garante dano nominal somado ao splash em cada impacto.

## Sprites e níveis superiores

EMP/Fortress T2/T3 usam sprites originais próprios. T4–T6 Standard/Fast
reutilizam o sprite t3: o original limita a escolha de arte ao intervalo 1–3.
Contornos modernos seguem as cores Classic: T4 rosa ff2d86, T5 roxo cb2dff,
T6 escuro 362020. Não são recolorações novas do corpo nem escudos v7.
Cada tier é um tipo separado selecionável nas ondas; não há progressão
automática Classic dentro de uma instância de unidade.

## Fortress e save

Refatorado o script para reconhecer Fortress T1/T2/T3 e gerar Fast do mesmo
tier. A regra continua: proximidade de 90 ao núcleo inimigo, 190 ticks por
geração, no máximo seis filhos vivos, reposição após morte. Timers por unidade
são uma adaptação ao timer compartilhado do código Classic.

O chunk mce-fortress-v1 preserva o formato anterior. Seu leitor reconhece
agora os diferentes Fortress/Fast e restaura os vínculos pelo tipo esperado
do pai. Confirmado por teste com save produzido no lote 12 e novo save com
Fortress T2/T3 simultâneos. Clientes não geram reforços; servidor decide.
Multiplayer real ainda não foi testado. Demais adaptações de IA/mira/colisão,
efeitos modernos, alvo/curador/Titan dos lotes anteriores permanecem.

## Testar

Importe ZIP e reinicie. Abra **MCE - Elite Enemy Tiers Demo**, com dez ondas
manuais: EMP T2/T3, Fortress T2/T3, Standard T4/T5/T6, Fast T4/T5/T6.
Núcleo à esquerda e spawn à direita. Elimine os Fast gerados também para
encerrar a onda dos Fortress. Depois da onda 10 não existem novos grupos.
Para ver o efeito EMP em energia, construa/alimentе um gerador ligado à rede.

Servidor v146: tools/verify-batch14.js verifica dez variantes/atributos,
dano das dez armas, EMP em geradores ativos (incluindo slowdown), Fortress
T2/T3 com seis filhos do mesmo nível, ausência de geração longe do núcleo,
save/load, reposição de filho morto e vanilla intacto. Se o fixture do lote
12 existir, valida também seus vínculos originais após carregar.
333 sprites pixel-verificados em 4x, fonte por hash; pasta de ambiente
continua validada. Usuário confirmou lote 13 no cliente.
Lote 14 visual/ondas completas, Android e multiplayer real aguardam cliente.

## Restante

Todos os onze inimigos de combate têm T1/T2/T3; alvo tem somente T1.
Standard e Fast já têm T4–T6; faltam esses níveis dos outros nove tipos:
27 variantes. Total atual: 40 entradas de inimigos, seis de jogador e
13 mapas de demonstração. Mapas originais/planeta Classic ainda não foram
convertidos. Movimentação terrestre do jogador, dirtblock e limitações
anteriores de fidelidade continuam documentadas, sem declarar port concluído.
