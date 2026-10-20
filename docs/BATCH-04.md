# Lote 4 — transporte e líquidos

0.4.0-alpha, 2026-10-11. Dez novos blocos, todos 1x1:

| Bloco | Vida | Construção (itens Classic) | Parâmetros |
| --- | ---: | --- | --- |
| Esteira de aço | 55 | 1 aço | speed 0.04 |
| Esteira de pulso | 75 | 1 dirium | speed 0.09 |
| Junção | 40 | 2 ferros | 26 ticks, 32 itens por direção |
| Separador | 40 | 2 aços | Item selecionado em frente; outros pelos lados |
| Túnel | 70 | 2 ferros | Alcance 3, intervalo 53 ticks, estoque 32 |
| Conduíte | 45 | 1 aço | Capacidade 10 |
| Conduíte de pulso | 65 | 1 titânio + 1 aço | Capacidade 16 |
| Roteador de líquidos | 40 | 2 aços | Capacidade 10 |
| Junção de líquidos | 40 | 2 aços | Cruzamento independente |
| Bomba | 40 | 10 aços | Capacidade 10, extração nominal 120/s |

Os seis itens Classic dos lotes anteriores permanecem no mesmo ZIP, junto com
perfuradores e fabricação de aço/dirium. Não há material novo neste lote.
Água e óleo são líquidos vanilla, sem modificar suas definições.

## Adaptações ao v7

Túnel usa ItemBridge sem energia. Selecione a entrada e conecte a saída alinhada
a até três espaços; substitui a busca automática de túneis opostos do Classic.
A arte da ligação é transparente para manter a aparência de transporte subterrâneo;
as guias de configuração v7 continuam disponíveis. A saída distribui aos vizinhos.

Junção usa quatro buffers direcionais do v7, em lugar dos dois do Classic.
Velocidades nominais das esteiras são preservadas; colisão, curvas e rendimento
usam lógica v7. Os dois frames Classic são repetidos nas 28 regiões modernas.
Conduítes repetem as camadas originais nas cinco formas de conexão v7: curvas
funcionam, mas não recebem arte de curva desenhada especialmente.

Fluxo e pressão de líquidos usam as regras v7; flowfactor Classic não corresponde
diretamente a liquidPressure e não foi copiado. Bomba sem energia preserva a taxa
nominal; a vazão entregue depende da tubulação. Usa DrawDefault, sem o pequeno
quadrado indicador de líquido do Classic. O roteador usa indicador líquido v7.
Colocação automática de pontes de líquidos pode recorrer à ponte vanilla v7.
Conteúdo vanilla permanece intacto.

## Demonstração e reprodução

Abra **MCE - Transport and Liquids Demo**, de preferência em sandbox.
Esteiras nas linhas y=10/20; cruzamento (25,10); separador de ferro (10,30);
túnel (20,25) já conectado a (23,25); bomba de água (5,40) e cruzamento (8,40).
Fontes de itens de demonstração começam sem configuração: selecione o item nelas.
O ramo sul do cruzamento líquido permite adicionar óleo para verificar a separação.
O núcleo recebe 500 de cada item Classic em recursos limitados.

Teste pelo console do servidor v146 em pasta isolada:
`js Vars.mods.getScripts().runConsole(new Fi('../mce/tools/verify-batch4.js').readString());`
O caminho é relativo à pasta do servidor; ajuste se necessário. O script gera
o mapa antes da simulação e executa 6000 atualizações reais.
Resultado: MCE_BATCH4_PASS, 50 itens por esteira, 50/50 no cruzamento,
25/25 no separador, 50 pelo túnel; água e óleo em tanques distintos.

Total: **26 dos 63 blocos com receita Classic**, seis itens próprios,
quatro terrenos e três mapas. Restam **37 blocos**, aproximadamente quatro
lotes de até dez; comportamentos especiais podem exigir mais trabalho.
Sprites e interação ainda precisam de teste deste lote no cliente PC/Android.
