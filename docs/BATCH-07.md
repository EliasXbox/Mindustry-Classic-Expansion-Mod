# Lote 7 — energia e reparo

Alpha 0.7.0. Dez novas construções; materiais e cadeias anteriores incluídos.

| Bloco | Vida | Construção Classic | Parâmetros |
| --- | ---: | --- | --- |
| Gerador de carvão | 40 | 30 ferros + 20 pedras | 0,04 energia/tick; 1 carvão/70 ticks |
| Gerador térmico | 40 | 30 aços + 30 ferros | 0,5 lava/tick → 0,04 energia/tick |
| Gerador de combustão | 40 | 30 ferros + 20 pedras | 0,4 óleo/tick → 0,048 energia/tick |
| Gerador RT | 40 | 20 titânios + 20 aços | 0,03 energia/tick; 1 urânio/240 ticks |
| Distribuidor de energia | 40 | 8 aços + 8 ferros | Alcance 4 espaços; até 10 conexões |
| Laser de energia | 50 | 3 aços + 3 ferros | Alcance 6; até 2 conexões |
| Curva de energia | 50 | 4 aços + 4 ferros | Alcance 6; até 2 conexões |
| Roteador de energia | 50 | 5 aços + 5 ferros | Alcance 6; até 4 conexões |
| Torre de reparo | 60 | 30 ferros | Alcance 30; pulso/20 ticks; energia média 0,004/tick |
| Torre de reparo avançada | 90 | 20 ferros + 30 aços | Alcance 44; pulso/12 ticks; energia média 0,010833/tick |

Todos 1x1. Carvão e óleo são vanilla; urânio e lava são Classic. Não confundir
gerador térmico com ThermalGenerator moderno: aqui ele **consome lava bombeada**.
ItemCapacity=20; geradores líquidos guardam 30 de líquido. Valores de saída
preservam as unidades pequenas Classic, sem aumentar para balanceamento v7.

## Adaptações ao sistema moderno

Geradores usam ConsumeGenerator e rede compartilhada v7. Não possuem o buffer
local Classic de 40 energia nem lasers integrados de distribuição direcional.
Conecte um dos distribuidores ao gerador e ao consumidor; conexões são manuais
fora da adjacência. Excesso pode ser guardado em baterias vanilla. Combustível
queima pelas regras v7, sem a pausa Classic ao encher o buffer local.
Sprites principais preservados; DrawDefault não reproduz o brilho térmico original.

Quatro distribuidores usam PowerNode. Curva e roteador mantêm artes/receitas,
mas não restringem direção; ligações simétricas compartilham energia sem
limite Classic de vazão e sem buffer próprio. Alcance em espaços usa geometria
moderna, incluindo dimensões dos blocos; não é a varredura exata Classic.
Cada ligação ocupa uma conexão nas duas pontas que são nós.

Torres de reparo usam PowerTurret com feixe de cura: cada pulso recupera
1/135 da vida máxima (0,74074%). Mira/feixe modernos podem atingir outros
blocos aliados ao longo da linha; Classic reparava diretamente um alvo.
Energia é consumida continuamente enquanto habilitadas, em lugar de retirada
por pulso de um buffer local. Rotação também foi adaptada para graus/tick.

Detalhe de implementação: Damage.collideLine v146 só processa feixes com
damage>0. Usa-se epsilon 0,000001 para liberar a cura, com multiplicador de
dano a construções zero. A torre visa blocos aliados; eventual dano a unidade
inimiga na linha é desprezível. Nenhum script de gameplay é necessário.

## Demonstração e testes

Abra **MCE - Power and Repair Demo**. Quatro geradores na linha y=30, já
conectados a baterias vanilla; alimente com carvão/lava/óleo/urânio na ordem.
Rede inferior liga o gerador de carvão às duas torres através dos quatro
distribuidores. Forneça carvão e danifique as paredes aliadas próximas para
acompanhar o reparo. Núcleo com 500 de cada item Classic e carvão.

Teste reproduzível: tools/verify-batch7.js. Após 600 atualizações verifica
energia nas baterias: 24 / 2,4 / 3,6 / 18, tolerância 0,01; consome os dois
combustíveis líquidos e itens; rede ligada; paredes de vida inicial 100
recuperam para aproximadamente 168,74 / 216,15. Conexões são salvas no mapa
antes de alimentar/danificar os blocos. Nós e gerador vanilla conferidos intactos.

Total **56 de 63 construções**, seis itens próprios, um líquido, seis terrenos
e seis mapas. Restam sete: parede escudada, gerador de escudo, reator nuclear,
laser, Tesla, teletransportador e fábrica de armas. Seus comportamentos
especiais precisam de decisões individuais antes de considerar o port completo.
