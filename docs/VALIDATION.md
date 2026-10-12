# Validação

Alvo fixado: Mindustry v7 build 146. minGameVersion é somente limite inferior, não garantia para versões futuras.

## Alpha 0.1

Servidor v146 aprovou carregamento, vida 160, tamanho 1x1, copper/12, pesquisa e parede de cobre vanilla intacta.
O usuário confirmou no cliente a aparência, vida, construção e pesquisa da parede.
A plataforma desse teste não foi informada.

## Alpha 0.2 — 2026-10-11

- Cinco blocos, três itens e dois terrenos carregados no servidor oficial v146, sem erros de conteúdo.
- Identificador da parede preservado, receita classic-stone/12.
- Parede vanilla continua com 320 de vida e copper/6.
- Mapa nativo 48x48 gerado pelo próprio v146.
- ZIP final 0.2 carregado em um servidor v146 novo, com apenas esse ZIP instalado.
  MCE_ZIP_MAP_PASS e MCE_MAP_LOAD_PASS confirmaram mapa, depósitos, fundidor e recursos iniciais.
- 6000 atualizações reais: extração de pedra/ferro, transporte por esteira/roteador,
  fundição de aço e consumo de carvão.
- Resultado: MCE_BATCH_CHAIN_PASS, 63 pedras e 45 aços nos cofres, 2 carvões restantes de 20.
- python tools/build.py valida referências customizadas, dependências de pesquisa,
  originalidade dos sprites por SHA-256, regiões da esteira, mapa e integridade do ZIP.

Reprodução do teste funcional: tools/verify-chain.js, explicado em BATCH-02.md.
O headless não valida desenho, texturas empacotadas no cliente, interação por toque ou tela de pesquisa.

## Checklist no cliente

1. Atualizar para 0.2 e reiniciar sem erros.
2. Abrir MCE - Classic Chain Demo e verificar arte dos cinco blocos, três itens e terrenos.
3. Acompanhar pedra até o cofre; fornecer carvão ao fundidor e acompanhar aço até o outro cofre.
4. Conferir custos com recursos limitados e parede custando 12 pedras.
5. Conferir pesquisa, salvar/reabrir mapa e testar multiplayer com versões iguais.
6. Repetir no PC e Android; os novos blocos ainda aguardam confirmação visual.

## Alpha 0.2.1

O usuário confirmou funcionamento de todo o lote 0.2 no cliente e relatou blur. Para reduzir suavização, 47 sprites foram ampliados 4x sem interpolação. A ferramenta verificou cada pixel contra a fonte original, incluindo transparência. O tamanho no jogo foi compensado por texturescale=1. Aparência da correção ainda aguarda teste no cliente.

O usuário confirmou posteriormente a melhora visual da 0.2.1, com screenshot.

## Alpha 0.3.0 — lote de dez blocos

Servidor oficial v146 carregou os novos conteúdos. Sete variantes de parede tiveram
vida/tamanho verificados. 6000 atualizações reais produziram 36 titânios, 36 urânios
e 20 diriums. O cadinho consumiu os 20 titânios, 20 aços Classic e 10 carvões fornecidos;
os perfuradores receberam recursos somente dos novos terrenos.
Resultado: MCE_BATCH3_PASS. Paredes vanilla verificadas permaneceram intactas.
Mapa avançado salvo pelo v146 antes da simulação; sprites verificados pixel por pixel.
Teste reproduzível: tools/verify-batch3.js. Aparência/interação do lote 3 aguardam cliente.

O usuário confirmou funcionamento e aparência do lote 3, com screenshot.

## Alpha 0.4.0 — transporte e líquidos

Servidor oficial v146 carregou os dez novos blocos sem erros. MCE_BATCH4_PASS
após 6000 atualizações: esteiras 50/50; junção 50 ferros e 50 aços sem mistura;
separador 25/25; túnel 50 ferros; tanques receberam 1798,2 águas e 1799,98 óleos
sem mistura. Bomba/túnel sem consumo de energia. Esteira e bomba vanilla intactas.

168 sprites comparados pixel por pixel com a ampliação 4x. Fontes originais
conferidas por SHA-256. Teste reproduzível em tools/verify-batch4.js.
A primeira tentativa do teste usava a própria esteira como origem e não
alimentava corretamente a esteira vertical; corrigido para fontes vizinhas reais.
O headless não valida aparência nem interação por toque. Lote 4 aguarda cliente.

O usuário confirmou funcionamento do lote 4 no cliente, com screenshot.

## Alpha 0.5.0 — produção e portas

Servidor oficial v146 carregou todos os conteúdos sem erros. MCE_BATCH5_PASS:
dez saídas de cada uma das cinco receitas, consumos de itens conferidos,
líquido dentro da tolerância float. Foram 6000 atualizações, mais 1200 para
verificar cinco cadeias alimentadas por bombas. Extração: 42 carvões e 63
urânios pelo omni no teste; vazão é afetada pela lógica moderna dos drills.
Portas pequenas encadeadas abriram/fecharam; grande aberta ficou não sólida;
vida/tamanho conferidos, portas vanilla intactas (400/1600).
189 sprites verificados pixel por pixel em 4x; originais por SHA-256.
A primeira simulação usou orçamento de líquido quase exato e alguns ciclos
terminaram abaixo de progress=1 por arredondamento float; o teste passou com
0,02 líquido extra e tolerância final 0,05, sem alterar as receitas.
Aparência/interação deste lote ainda precisam de confirmação no PC/Android.

O usuário confirmou funcionamento do lote 5 no cliente, com screenshot.

## Alpha 0.6.0 — torres de munição

Servidor oficial v146 carregou dez ItemTurret. Teste com dois itens por torre:
20/40/20/100/20/20/15/40/16/4 projéteis nas dez torres, munição esgotada em
todas e dano positivo nos dez alvos. Rejeição de cobre, aceitação/conversão
da munição correta, alcance/reload/vida/tamanho e duo vanilla conferidos.
MCE_BATCH6_PASS após 2400 atualizações com tarefas de tiros atrasados.
O teste fornece alvos fixos; não valida combate com IA móvel.
212 sprites ampliados 4x, fontes originais preservadas e verificadas por hash.
Uma propriedade de variação de velocidade estava no projétil e foi corrigida
para o campo velocityRnd da torre do morteiro, eliminando aviso de parser.
Aparência, controle e interação deste lote aguardam cliente PC/Android.

O usuário confirmou funcionamento e aprovou o lote 6 no cliente, com screenshot.

## Alpha 0.7.0 — energia e reparo

Servidor oficial v146 carregou dez novos conteúdos. MCE_BATCH7_PASS após 600
atualizações: baterias armazenaram 24 / 2,4 / 3,6 / 18 energia, respectivamente,
com saída/combustível Classic; itens consumidos, lava e óleo esgotados.
Quatro tipos de nós transmitiram energia para duas torres de reparo; paredes
de vida inicial 100 recuperaram para 168,74 / 216,15. Rede e parâmetros dos nós
conferidos; PowerNode e CombustionGenerator vanilla intactos.
Primeiro teste mostrou disparos sem cura com LaserBulletType de damage=0;
Damage.collideLine v146 só processa damage>0, corrigido com epsilon e dano
a construções zerado pelo multiplicador. Ver BATCH-07.md para implicações.
224 sprites conferidos pixel por pixel em 4x; originais por hash.
Aparência/interação do lote 7 aguardam cliente PC/Android.
