# Lote 8 — construções especiais

Alpha 0.8.0. Últimas sete receitas construíveis do inventário de 63.

| Bloco | Construção Classic | Comportamento no v7 |
| --- | --- | --- |
| Parede de titânio escudada | 16 titânios | 600 vida, escudo 500, regeneração com energia |
| Gerador de escudo | 30 titânios + 30 diriums | Campo de raio 40, escudo 1333,33 |
| Reator nuclear | 40 titânios + 40 diriums + 50 aços | 0,45 energia/tick, urânio/130 ticks, resfriamento com água |
| Torre laser | 12 aços + 12 titânios | Feixe de dano 10, alcance 60, recarga 4 ticks |
| Torre Tesla | 20 aços + 25 titânios + 15 diriums | Feixe com descargas, dano 9, alcance 70, recarga 15 ticks |
| Teletransportador | 30 aços + 40 diriums | Oito canais; energia armazenada 30, custo 0,8 por item |
| Fábrica de armas | 60 aços + 60 ferros | Compra e seleção de seis armas para o jogador |

Todos os materiais da tabela são Classic, incluídos desde lotes anteriores.
Nenhum novo item é necessário. Água é vanilla. Reator 3x3 e fábrica 2x2;
demais blocos 1x1. Sprites originais preservados e ampliados 4x sem suavização.

## Usar os blocos com script

Teletransportador: conecte energia, toque/clique no bloco e escolha 1–8.
A marca central mostra a cor. Entrada por esteira ou roteador; saída adjacente.
Um item vai a um receptor vazio da mesma equipe e canal, escolhido ao acaso.
Sem receptor ou energia, a entrada recusa o item. A cor é salva por bloco.

Fábrica: toque/clique e escolha blaster, triblaster, clustergun, beam, vulcan
ou shockgun. Materiais são retirados do núcleo da equipe; saldo insuficiente
impede a compra. Blaster é grátis. Outras receitas: triblaster 60 ferro/80 aço;
clustergun 300 ferro/80 aço; beam 260 aço/160 titânio/120 dirium;
vulcan 100 ferro/150 aço/80 titânio; shockgun 240 aço/160 titânio/160 dirium.
A compra é lembrada por jogador nessa fábrica e salva no mundo; selecionar
de novo não cobra. Outra fábrica tem seu próprio registro. Destruir a fábrica
apaga o registro dela. Após morrer, reequipe a arma na fábrica.

## Adaptações explícitas

O v7 fixa armas no tipo de unidade. A fábrica equipa uma unidade própria com
arte do jogador Classic, preservando posição, rotação, fração de vida e itens
carregados. As seis variantes voam, têm 200 de vida e podem construir/minerar.
Isso muda mobilidade/atributos em relação à unidade anterior e ao jogador Classic.
Não altera armas ou tipos vanilla. Projéteis e efeitos usam classes modernas;
as compras não são um perfil global persistente como no Classic.

Parede escudada e gerador usam reservas de escudo modernas, em vez da absorção
direta por energia Classic. Tesla usa feixe com descargas: não reproduz o
projétil procedural que escolhia até sete alvos. Laser usa colisão moderna.
Energia dos três consumidores é contínua/média na rede v7, não por disparo.
Reator usa rede compartilhada e aquecimento moderno; não tem buffer Classic
local de 80. Sem água pode explodir. Não conectar só urânio e esquecer a água.

Scripts estão em scripts/special.js, editáveis, sem DLL/JAR adicional.
Foram autorizados para os dois blocos sem equivalente HJSON direto.
Configurações são processadas pelo servidor; clientes não transferem itens
nem debitam materiais por conta própria. Multiplayer real ainda precisa de teste.

## Demonstração e verificação

Abra **MCE - Special Blocks Demo**. Fábrica (14,10); teleportes (20,10)/(70,10)
no canal 3 e (50,10) no canal 4; saída em cofre. Parede (40,30), escudo (40,45),
reatores (20,40)/(70,40), laser/Tesla (20,25)/(70,25). Conecte energia e forneça
combustível/água para uso interativo. Núcleo inicia com materiais Classic.

tools/verify-batch8.js executa o cenário no servidor oficial v146: dez itens
transportados, isolamento de cor, seis armas e compra sem cobrança repetida,
absorção 100 na parede, reator refrigerado produzindo e seco explodindo,
duas torres causando dano e campo absorvendo projétil. Verificação adicional
de save/load preservou canais e desbloqueio de arma. PC visual, Android e
multiplayer real aguardam confirmação; servidor não valida renderização/UI.
