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
