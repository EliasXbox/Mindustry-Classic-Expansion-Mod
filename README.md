# Mindustry: Classic Expansion

Mod de conteúdo HJSON para **Mindustry v7 build 146**, destinado a PC e Android.
Alpha inicial: uma parede de pedra clássica, adicionada ao lado do conteúdo vanilla.

## O que está disponível

- Parede de pedra clássica: **160 de vida**, **1x1**, sprite original de 8x8 pixels.
- Construção: **12 de cobre**. A receita original usa 12 de pedra; cobre é uma adaptação provisória para mapas vanilla, pois a cadeia de pedra clássica ainda não foi portada.
- Pesquisa: filha da parede de cobre. Em sandbox, use a categoria defesa.
- Texto em inglês e português brasileiro.

Os arquivos `.hjson` usam sintaxe JSON válida, um subconjunto de HJSON.
Não há Java, JavaScript, dependências ou substituições de sprites vanilla.
O nome do mod cria o prefixo `mindustry-classic-expansion-` para o conteúdo novo.
Adicionar um nó à pesquisa vanilla não altera as propriedades dos blocos existentes.

## Instalar no PC ou Android

1. Baixe o ZIP gerado, sem descompactar.
2. No Mindustry v7, abra **Mods → Importar mod** e selecione o ZIP.
3. Reinicie o jogo e confira se o mod não apresenta erros.
4. Abra um mapa sandbox e procure a parede na categoria defesa.

No Android, selecione o ZIP pelo seletor de arquivos do próprio jogo; não é necessário acessar manualmente a pasta Android/data.
Em multiplayer, servidor e jogadores precisam da mesma versão do mod.

## Gerar o ZIP

Com Python 3, execute na raiz do repositório:

```text
python tools/build.py
```

Saída: `dist/mindustry-classic-expansion-0.1.0-alpha.zip`, com `mod.hjson` na raiz.
O ZIP inclui fonte editável, licença, créditos e documentação.

## Referência e próximos portes

Veja [inventário](docs/INVENTORY.md), [conteúdo estruturado](docs/content-inventory.json),
[sprites e hashes](docs/sprites.json) e [validação](docs/VALIDATION.md).
O snapshot Classic foi fixado no último commit do repositório arquivado; não há releases publicadas nesse repositório.

Próximas etapas: implementar pedra/ferro e sua obtenção, portar perfuradores e transporte,
depois torres e produção. Equivalentes modernos exigem revisão de unidades, consumo e desenho.
Esta alpha não converte mapas/saves nem reproduz toda a economia do Classic.

## Licença

GPLv3. Arte e conteúdo Classic por Anuken e contribuidores; adaptação por EliasXbox.
Veja [LICENSE](LICENSE) e [NOTICE.md](NOTICE.md). Sem garantia.
