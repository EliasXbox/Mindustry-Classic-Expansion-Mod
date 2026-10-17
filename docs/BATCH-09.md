# Lote 9 — ambientes e núcleo

Alpha 0.9.0: núcleo e nove ambientes. Os 15 pisos originais estão cobertos.
As 63 receitas Classic continuam incluídas. O núcleo não possui receita no
original: é colocado pelo editor/mapa e não aumenta a contagem de receitas.

| Conteúdo | Uso |
| --- | --- |
| Pedra preta | Fornece pedra Classic; funciona com perfurador de pedra |
| Terra, areia, gelo, neve, grama | Pisos com três sprites originais cada |
| Água, água profunda | Pisos líquidos; bombas obtêm água vanilla |
| Óleo | Piso líquido; bombas obtêm óleo vanilla |
| Núcleo | 3x3, 800 de vida, jogador Classic com blaster |

Terra/areia/gelo/neve/grama não fornecem itens: esse é o comportamento
declarado em Blocks.java Classic. Areia item é vanilla e não foi acrescentada
como drop novo ao piso. Pedra preta fornece pedra, como no original.

## Adaptações ao v7

Núcleo usa CoreBlock moderno: inventário compartilhado pela equipe, limite
de 10000 por item (Classic aceitava itens sem esse limite), capacidade extra
de oito unidades e mecânica moderna de respawn. Não requer zona de núcleo.
Respawna a variante Classic blaster existente, com voo/construção/mineração
modernos; não representa ainda a movimentação terrestre exata do mech Classic.
Não altera o núcleo vanilla, e mapas antigos mantêm os núcleos que já tinham.

Pisos líquidos usam movimento/afogamento modernos. Água/óleo: velocidade 0,5
e afogamento após 200 ticks; profunda: 0,2 e 120 ticks. Gelo usa velocidade
1,15 e arrasto 0,35: adaptação física moderna explícita, não presente na classe
Floor Classic. Mistura de bordas e renderização usam o sistema v7, sem copiar
o algoritmo Classic de recortar sprites de bordas. Variantes são escolhidas
pelas regras modernas. Sprites básicos são originais, ampliados 4x sem filtro.

## Testar

Importe ZIP 0.9, reinicie e abra **MCE - Environments and Core Demo**.
Faixas da esquerda para direita: pedra, pedra preta, terra, areia, gelo, neve,
grama, água, profunda, óleo, lava, ferro, carvão, titânio, urânio.
Núcleo (5,8); perfurador/cofre (15,35)/(15,37); bombas (72,35)/(92,35),
conduítes e tanques. A maioria dos recursos do núcleo vem do loadout do mapa.
Ambientes e núcleo estão no editor, não gerados automaticamente na campanha.

tools/verify-batch9.js confirma núcleo/vida/tamanho/tipo de jogador/arma,
armazenamento de pedra e areia, mineração da pedra preta, bombeamento de água
e óleo, persistência do núcleo e itens via save/load, conteúdo vanilla intacto.
Testado no servidor oficial v146; aparência/UI PC, Android e multiplayer
precisam de confirmação no cliente. Total de sprites conferidos: 272.

## Inventário restante

Onze obstáculos: sandblock, snowblock, stoneblock, blackstoneblock,
grassblock, mossblock, shrub, rock, icerock, blackrock, dirtblock.
Doze inimigos: standard, fast, rapid, flamer, tank, blast, mortar, healer,
titan, emp, fortress e target (alvo de teste). Mech/armas já têm variantes
próprias, mas falta rever a movimentação terrestre do jogador.
Mapas definidos em maps.json: maze, fortress, sinkhole, caves, volcano,
caldera, scorch, desert, island, grassland, tundra, spiral e tutorial oculto.
Outros PNGs no diretório não são todos mapas oferecidos no menu original.

Mapa Classic é uma imagem codificada pela ColorMapper; não pode ser importado
diretamente como mapa v7. A conversão deverá manter dimensões/posição dos
terrenos, obstáculos, núcleo e spawns, e explicitar geração procedural de
minérios/decoração e adaptações das ondas. Não existe ainda planeta/campanha
Classic no pacote 0.9; os oito mapas atuais são demonstrações do mod.
