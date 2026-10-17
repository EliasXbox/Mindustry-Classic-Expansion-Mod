# Lote 11 — dez inimigos de nível 1

Alpha 0.11.0. Tipos próprios, sem substituir unidades vanilla nem alterar
ondas da campanha. Não possuem fábrica/receita: aparecem em ondas do mapa
de demonstração e podem ser utilizados pelo editor de ondas de outros mapas.

| Inimigo | Vida | Velocidade/tick | Recarga | Arma/habilidade |
| --- | ---: | ---: | ---: | --- |
| Standard | 60 | 0,44 | 32 | Projétil dano 2 |
| Fast | 50 | 0,77 | 20 | Projétil dano 2 |
| Rapid | 260 | 0,37 | 8 | Projétil roxo dano 2 |
| Flamer | 150 | 0,39 | 6 | Chama dano 3 e queimadura moderna |
| Tank | 350 | 0,28 | 90 | Quatro projéteis: um central e três do shotgun Classic |
| Blast | 30 | 0,84 | 1 | Suicida, explosão/fragmentos adaptados |
| Mortar | 200 | 0,29 | 100 | Artilharia dano 60 + área 40/raio 25 |
| Healer | 200 | 0,29 | 10 | Cura 1 de vida em aliados num raio 40 |
| Titan | 430 | 0,30 | 80/200/240 | Shotgun, círculo e rajada de chamas |
| EMP | 210 | 0,34 | 70 | Projétil dano 8 e debuff de energia |

Velocidade Classic de nível 1 soma 0,04 ao valor da classe. Alcances somam
cinco ao alcance-base (Blast usa aproximação 10). Saúde e dano-base de nível
1 foram preservados; não há ainda multiplicação de saúde/dano nem sprites
t2/t3 dos níveis superiores. Massas, aceleração, giro e colisão usam v7.
Classes HJSON usam entidade UnitEntity com flying=false; o controlador
confirmado é GroundAI. Isso não acrescenta voo nem pernas modernas à arte.

## Adaptações explícitas

Sprites completos enemy-t1 originais, ampliados 4x sem suavização; contorno
amarelo moderno em vez do shader Classic. Armas embutidas no corpo, sem
inventar sprites de canhões. Sons, balística, mira e seleção de alvos são v7.
Units são controláveis por jogador/lógica, mas não são a unidade do núcleo.

Flamer usa projétil moderno penetrante (até três contatos) com queimadura,
algo diferente da chama Classic e de seu desenho procedural.
Mortar é ArtilleryBulletType moderno; alcance/colisão aérea e área são adaptados.
Blast usa explosão de área 90/raio 20 e 30 fragmentos de dano 10, além do
suicídio, em vez dos 30 blastshots invisíveis Classic com geometria própria.
A explosão ocorre por tiro próximo ou morte; efeitos/dano de morte do motor
moderno também podem influenciar o resultado. Não representa paridade exata.

Healer usa RepairFieldAbility: cura todos os aliados no raio (inclusive ele
mesmo), em vez de selecionar só um inimigo ferido. Não reproduz suicídio
após três segundos parado nem o feixe original. IA move-o em direção ao núcleo
inimigo; ele não acompanha automaticamente o aliado mais ferido.

Titan usa três armas independentes. Shotgun de cinco projéteis/80 ticks,
círculo de oito/200 e dez chamas espaçadas seis ticks/240. As três recargas
e a rotação não reproduzem exatamente as fases de timers Classic.

EMP usa EmpBulletType moderno: raio 40, lentidão de blocos energizados para
0,5 durante 120 ticks, dano 8 e sem boost aliado (timeIncrease=1). Afeta
blocos de redes que estejam produzindo energia; não drena o buffer local
Classic. Pode atingir unidades também. Condições de impacto são modernas.

## Testar

Importe ZIP, reinicie e abra **MCE - Classic Enemies Demo**. Núcleo à esquerda,
spawn à direita. Ondas têm timer desabilitado: use a ação do jogo para chamar
a próxima onda. Ordem da tabela, três unidades por onda (curador: duas).
A onda 8 contém apenas curadores: são suporte; elimine-os para avançar.
Use um mapa próprio com curadores acompanhando outros inimigos para ver a cura.
Após onda 10 não existem outros grupos. Não é uma campanha completa.

Teste reproduzível tools/verify-batch11.js no servidor oficial v146 verifica
dez tipos/atributos/entidades, tiro real das armas contra paredes, explosão,
cura em aliado ferido, EMP em gerador funcionando e save/load de duas unidades.
Efeitos de área são conferidos após fila do motor; foi corrigida a sequência
do teste, sem mudar parâmetros de combate para fazê-lo passar.
GroundAI/estado terrestre confirmados; unidades vanilla preservadas.
303 sprites verificados pixel por pixel em 4x. Teste visual/controle e uma
partida completa das ondas aguardam cliente PC/Android; multiplayer real
não foi testado. Nenhuma textura aparece validada só pelo servidor.

Restam fortress e target, níveis superiores, movimentação terrestre exata
do jogador, dirtblock e conversão dos mapas Classic.
