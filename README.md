# Mindustry: Classic Expansion

Mod HJSON com scripts JavaScript para **Mindustry v7 build 146**, destinado a PC e Android. Alpha **0.18.0**.
Conteúdo separado dos blocos e itens vanilla, sob o prefixo mindustry-classic-expansion-.

## Lote 2: cinco blocos e seus itens

| Bloco novo | Função | Construção |
| --- | --- | --- |
| Perfurador de pedra | Pedra clássica a cada 4s | 12 cobre, para iniciar a cadeia |
| Perfurador de ferro | Ferro clássico a cada 5s | 25 pedras clássicas |
| Fundidor | 5 ferros + 2 carvões vanilla → 5 aços em 100 ticks | 40 pedras + 40 ferros clássicos |
| Esteira | Transporte de itens | 1 pedra clássica |
| Roteador | Distribuição de itens | 2 pedras clássicas |

Itens incluídos juntos: **pedra, ferro e aço clássicos**, com ícones originais.
A parede 0.1 continua com 160 de vida e 1x1, agora com a receita original de **12 pedras clássicas**.
Na 0.9 há 63 receitas construíveis, núcleo próprio e 15 tipos de piso.

## Instalar e testar

1. Importe o ZIP 0.18 em **Mods → Importar mod**, sem descompactar.
2. Atualize o mod existente; não mantenha as duas alphas instaladas juntas. Reinicie.
3. Abra **Jogo personalizado → MCE - Classic Chain Demo**. Use sandbox para inspeção rápida.
4. Na região (20,20), pedra passa pelo perfurador, esteira e roteador até o cofre.
5. Na região (20,30), ferro segue até o fundidor em (25,30); aço sai para outro cofre.
6. Alimente o fundidor com carvão vanilla. Em recursos limitados, o núcleo começa com 300 carvões e 1000 cobres.

Os terrenos Classic estão no editor. **Não aparecem automaticamente na campanha vanilla.**
Para usar a cadeia em outro mapa, coloque os novos terrenos no editor.
Também é possível minerá-los manualmente com uma unidade compatível.
No Android, selecione o ZIP pelo seletor de arquivos do jogo.
Em multiplayer, servidor e jogadores precisam da mesma versão do mod.

## Adaptações

Drill v7 também aceita recursos modernos dentro do seu nível; o de pedra bloqueia areia,
e o de ferro bloqueia pedra clássica. Os tempos nominais Classic foram preservados.
O roteador usa lógica moderna e guarda um item, em lugar de vinte.
O fundidor produz por lotes, mantendo taxas médias Classic de 3 aços/s e 1,2 carvão/s;
não reproduz a queima independente sem ferro. Carvão é vanilla, sem duplicação.
A esteira reutiliza os dois frames originais nas regiões v7; curvas usam a mesma arte básica.
O aço participa das construções dos lotes seguintes.
Veja [BATCH-02.md](docs/BATCH-02.md).

## Gerar o ZIP

Com Python 3 na raiz: `python tools/build.py`.
Saída: dist/mindustry-classic-expansion-0.18.0-alpha.zip, com manifesto na raiz.
Os .hjson usam JSON válido, subconjunto de HJSON. A partir da 0.8, scripts JavaScript preservam canais de teleporte e compras de armas; não há biblioteca Java adicional.
O ZIP inclui fonte editável, mapa, licença, créditos e ferramentas de reprodução.

## Referência, validação e licença

O Classic foi fixado no último commit do repositório arquivado, sem releases publicadas.
Veja [inventário](docs/INVENTORY.md), [validação](docs/VALIDATION.md) e [arte](docs/ported-assets.json).
O usuário confirmou a parede 0.1 no cliente. O lote 0.2 passou no servidor v146;
aparência e interação dos novos blocos ainda precisam de confirmação no PC/Android.

GPLv3. Arte e conteúdo Classic por Anuken e contribuidores; adaptação por EliasXbox.
Veja [LICENSE](LICENSE) e [NOTICE.md](NOTICE.md). Sem garantia.

## Texturas 0.3.0

Sprites ampliados 4x por vizinho mais próximo, sem suavização, e texturescale=1 para manter tamanho no jogo. Originais preservados em art-source. Para reproduzir: java tools/ScaleSprites.java; para verificar todos os pixels: java tools/ScaleSprites.java --verify. A ampliação reduz a suavização das bordas; o filtro linear e o zoom do cliente ainda podem influenciar o resultado.

## Lote 3: dez blocos

Sete paredes de ferro/aço/titânio/dirium, cadinho, perfuradores de titânio/urânio. Itens novos: titânio, dirium e urânio Classic, separados do vanilla. Veja docs/BATCH-03.md. Abra MCE - Advanced Materials Demo em jogo personalizado. Total: 16 construções e 6 itens próprios.

## Lote 4: dez blocos de transporte e líquidos

Esteiras de aço/pulso, junção, separador, túnel, conduítes normal/pulso, roteador e junção de líquidos, bomba. Materiais Classic já incluídos. Veja [BATCH-04.md](docs/BATCH-04.md). Abra **MCE - Transport and Liquids Demo**. Total: 26 construções; restam 37 das 63 receitas Classic. Túnel exige conectar entrada à saída.

## Lote 5: dez blocos de produção e portas

Purificadores de carvão/titânio, refinaria de óleo, formador de pedra, fundidor
de lava, perfuradores de carvão/omni, bomba de fluxo e portas pequena/grande.
Seis itens Classic continuam incluídos; lava Classic e terrenos de lava/carvão
permitem a nova cadeia. Veja [BATCH-05.md](docs/BATCH-05.md).
Abra **MCE - Production and Doors Demo**. Total: 36 construções, 27 restantes.
Portas disponíveis no PC/Android; portas vizinhas alternam juntas.

## Lote 6: dez torres de munição

Básica, dupla, metralhadora, escopeta, lança-chamas, sniper, morteiro, plasma,
corrente e canhão Titan. Materiais Classic e suas cadeias de produção continuam
no pacote. Veja [BATCH-06.md](docs/BATCH-06.md) e abra **MCE - Ammo Turrets Demo**.
46 construções portadas, 17 restantes. Torres usam duas unidades de munição
por salva, preservando o duplo decremento observado no código Classic.

## Lote 7: energia e reparo

Quatro geradores (carvão, lava, óleo, urânio), quatro distribuidores de energia
e duas torres de reparo. Veja [BATCH-07.md](docs/BATCH-07.md). Abra
**MCE - Power and Repair Demo**. Conexões usam rede v7 configurável; curva
e roteador não reproduzem restrições direcionais Classic. Total: 56 construções,
sete restantes com comportamentos especiais.

## Lote 8: sete construções especiais

Parede escudada, gerador de escudo, reator nuclear, torres laser/Tesla,
teletransportador e fábrica de armas. Abra **MCE - Special Blocks Demo**.
Total: **63/63 receitas construíveis**, seis itens, um líquido, seis terrenos,
sete mapas e seis variantes de jogador. Esse total cobre as receitas do
inventário, sem significar que todos os comportamentos Classic são idênticos.
Veja [BATCH-08.md](docs/BATCH-08.md) para controles, testes e adaptações.

## Lote 9: núcleo e nove ambientes

Núcleo Classic; pedra preta, terra, areia, gelo, neve, grama, água, água profunda
e óleo. Abra **MCE - Environments and Core Demo**. O núcleo aparece no editor,
sem receita inventada, e inicia o jogador Classic com blaster. Todos os 15 pisos
originais agora estão representados. Veja [BATCH-09.md](docs/BATCH-09.md).
Próximos lotes: 11 obstáculos naturais, 12 tipos de inimigos (incluindo alvo
de teste) e conversão dos 12 mapas visíveis + tutorial. As seis opções de arma
do jogador já existem; o mech ainda usa mobilidade adaptada de voo.

Correção 0.9.1: sprites dos 15 pisos movidos para sprites/blocks/environment,
eliminando o aviso de pasta errada. Núcleo permanece em sprites/blocks.

## Lote 10: dez obstáculos naturais

Paredes naturais de areia/neve/pedra/pedra preta/grama, musgo, arbusto e
rochas comum/gelo/preta. Disponíveis no editor. Abra **MCE - Natural Obstacles
Demo**. Arte Classic ampliada 4x na pasta correta de ambientes.
Veja [BATCH-10.md](docs/BATCH-10.md) para colisão e diferenças na remoção.
São 15 pisos + 10 obstáculos, núcleo e 63 receitas construíveis.
Ainda falta dirtblock (sem sprite próprio no snapshot), inimigos e mapas Classic.

## Lote 11: dez inimigos Classic

Standard, fast, rapid, flamer, tank, blast, mortar, healer, titan e emp.
Unidades terrestres de nível 1, com arte original e combate adaptado ao v7.
Abra **MCE - Classic Enemies Demo**, com dez ondas manuais na mesma ordem.
Curador é suporte sem arma ofensiva. Veja [BATCH-11.md](docs/BATCH-11.md).
Ainda faltam fortress/target, níveis Classic superiores e mapas originais.

## Lote 12: Fortress, alvo e primeiros níveis superiores

Fortress e alvo de treino completam os 12 tipos originais em nível 1.
Standard/Fast/Rapid/Flamer também ganham variantes T2/T3: dez entradas novas.
Fortress gera até seis Fast vivos perto de núcleo inimigo, repõe os mortos
e salva contador/vínculos. Alvo reaparece após 100 ticks dentro do mesmo mundo.
Abra **MCE - Reinforcements and Tiers Demo**. Veja [BATCH-12.md](docs/BATCH-12.md).
Ainda faltam outros níveis e mapas originais; não há progressão automática
de tiers Classic no v7. Total: 20 entradas de inimigos + 6 variantes de jogador.

## Lote 13: dez variantes de inimigos pesados

Tank, Blast, Mortar, Healer e Titan ganham T2/T3. Abra **MCE - Heavy Enemy
Tiers Demo**, com dez ondas manuais; curadores têm escolta Standard do mesmo
tier. Veja [BATCH-13.md](docs/BATCH-13.md) para escalas especiais.
Total: 30 entradas de inimigos + seis variantes de jogador. Todos os 12 tipos
de nível 1, nove dos onze tipos de combate com T2/T3. Restam EMP/Fortress
T2/T3, tiers 4–6 e mapas Classic, além das pendências de adaptação já registradas.

## Lote 14: EMP/Fortress T2/T3 e Standard/Fast T4–T6

Dez novas variantes. Os onze inimigos de combate agora têm T1/T2/T3;
Standard/Fast também têm T4/T5/T6. Fortress gera Fast do mesmo tier e mantém
os vínculos após save/load, incluindo saves do lote 12.
Abra **MCE - Elite Enemy Tiers Demo**. Veja [BATCH-14.md](docs/BATCH-14.md).
Total: 40 entradas de inimigos + seis de jogador. Restam 27 variantes T4–T6
dos outros nove inimigos, além dos mapas Classic e pendências já registradas.

## Lote 15: Rapid/Flamer/Tank T4–T6 e Blast T4

Dez variantes, com arte t3 e cores/atributos Classic de níveis superiores.
Abra **MCE - Assault Enemy Tiers Demo**, com dez ondas manuais.
Veja [BATCH-15.md](docs/BATCH-15.md). Total: 50 entradas de inimigos e seis
de jogador. Restam 17 variantes para completar os níveis de combate,
além dos mapas originais/planeta Classic e pendências de adaptação.

## Lote 16: cerco e suporte de níveis superiores

Blast T5/T6, Mortar/Healer T4–T6 e Titan T4/T5: dez novas variantes.
Abra **MCE - Siege Enemy Tiers Demo**, com dez ondas manuais e escoltas
Standard nas ondas dos curadores. Veja [BATCH-16.md](docs/BATCH-16.md).
Total: 60 entradas de inimigos e seis de jogador. Restam sete variantes:
Titan T6 e EMP/Fortress T4–T6. Mapas originais/planeta Classic ainda pendentes.

## Lote 17: últimos sete tiers de inimigos

Titan T6 e EMP/Fortress T4–T6 completam os onze tipos de combate de T1 a T6:
66 variantes, mais o alvo de treino. São 73 entradas de unidade contando
as seis variantes de jogador. Abra **MCE - Final Enemy Tiers Demo**.
Veja [BATCH-17.md](docs/BATCH-17.md). Essa cobertura não elimina as adaptações
de comportamento já documentadas. Próximas etapas: mapas originais, planeta
Classic e revisão das pendências de fidelidade/movimento do jogador.

## Pacote de mapas originais 0.18

Inclui os 12 mapas do menu Classic e o tutorial como mapa de prática.
Em **Jogo personalizado**, procure **MCE Classic -**: maze, fortress,
sinkhole, caves, volcano, caldera, scorch, desert, island, grassland,
tundra, spiral e tutorial. Importe apenas o ZIP completo do mod; os mapas
já estão dentro dele e dependem do conteúdo Classic.

Terreno, núcleo, entradas de inimigos e base inicial foram convertidos dos
PNGs originais. Ondas usam contagens e tiers da dificuldade normal Classic,
com IA e combate v7. O tutorial não inclui as instruções guiadas originais.
Os mapas começam com 240 cobres modernos para a receita existente do
perfurador de pedra. Classic Planet ainda será uma etapa de campanha.
Veja [detalhes e reprodução](docs/BATCH-18.md).
