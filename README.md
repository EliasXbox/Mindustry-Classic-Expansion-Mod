# Mindustry: Classic Expansion

Mod HJSON para **Mindustry v7 build 146**, destinado a PC e Android. Alpha **0.3.0**.
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
Na 0.3 há 16 blocos construíveis no total e quatro terrenos auxiliares de extração.

## Instalar e testar

1. Importe o ZIP 0.2 em **Mods → Importar mod**, sem descompactar.
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
O aço está disponível para os próximos lotes; ainda não há construções que o consumam.
Veja [BATCH-02.md](docs/BATCH-02.md).

## Gerar o ZIP

Com Python 3 na raiz: `python tools/build.py`.
Saída: dist/mindustry-classic-expansion-0.3.0-alpha.zip, com manifesto na raiz.
Os .hjson usam JSON válido, subconjunto de HJSON. Não há scripts de gameplay nem Java.
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
