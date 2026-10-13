# Lote 10 — obstáculos naturais

Alpha 0.10.0, dez obstáculos sem receitas de construção: colocação no editor
e mapas. Não confundir parede natural de pedra com a parede defensiva existente.

| Ambiente | Classe v7 | Variantes | Colisão / remoção |
| --- | --- | ---: | --- |
| Parede de areia | StaticWall | 3 | Sólida, não desmontável |
| Parede de neve | StaticWall | 3 | Sólida, não desmontável |
| Parede de pedra natural | StaticWall | 3 | Sólida, não desmontável |
| Parede de pedra preta | StaticWall | 3 | Sólida, não desmontável |
| Parede de grama | StaticWall | 2 | Sólida, não desmontável |
| Musgo | StaticWall | 0 | Sem colisão, não desmontável |
| Arbusto | Prop | 0 | Sem colisão, removível/substituível |
| Rocha | Prop | 2 | Sem colisão, removível/substituível |
| Rocha de gelo | Prop | 2 | Sem colisão, removível/substituível |
| Rocha preta | Prop | 1 | Sem colisão, removível/substituível |

Zero variantes significa um sprite não numerado. Há 21 sprites principais
originais, guardados em art-source/blocks/environment e ampliados 4x em
sprites/blocks/environment. O verificador exige essa pasta para cada ambiente.
O snapshot Classic não define solid=true no musgo e nas rochas/arbusto;
esse detalhe foi preservado mesmo com aparência semelhante a paredes.

## Adaptações e limitações

Prop v7 usa remoção instantânea, em vez dos dez ticks da classe Rock Classic.
As três pedras Classic ofereciam três pedras de recurso na remoção; esta
adaptação ainda não reproduz essa recompensa. Sem receita inventada para
simular reembolso. A pedra do chão e os perfuradores continuam disponíveis.
Som/efeito de quebra, sombras e seleção de variante usam o motor moderno;
sombras Classic separadas/varyShadow não são reproduzidas. Paredes mantêm
cache/oclusão modernos. O mod não introduz decoração automática na campanha.

Dirtblock consta em Blocks.java como StaticBlock, sem solid=true, mas não
há dirtblock.png no inventário de 373 sprites. Fica pendente uma decisão
de representação para não inventar silenciosamente um sprite Classic.
Air/blockpart e marcadores de spawn são internos e não entram neste lote.

## Demonstração e validação

Abra **MCE - Natural Obstacles Demo**, com dez grupos sobre seus pisos.
Linha inferior y=27: areia, neve, pedra, pedra preta, grama.
Linha superior y=47: musgo, arbusto, rocha, rocha de gelo, rocha preta.
Colunas x=8,25,42,59,76; núcleo Classic em (8,8). Inspecione as variantes
e tente atravessar/desmontar/substituir rochas e paredes para conferir as flags.

Servidor oficial v146: tools/verify-batch10.js confere dez registros,
variantes, colisão, flags de remoção/substituição, ausência de receitas,
save/load de todas as posições e parede vanilla intacta. Remoção de uma
rocha por API também conferida; interação real por comando de construção
e aparência dependem do cliente. 293 sprites conferidos pixel por pixel.
O usuário confirmou os pisos 0.9.1 no cliente, incluindo mapa próprio.
Lote 10 ainda aguarda PC/Android; não houve teste de renderização no servidor.
