# Validação da alpha

Alvo fixado: Mindustry v7 build 146. `minGameVersion` define somente um limite inferior;
não garante compatibilidade com versões posteriores.

`python tools/build.py` valida os campos essenciais da alpha, integridade do sprite
contra o SHA-256 do inventário, ausência de scripts e sprites-override, e estrutura/integridade do ZIP.

Teste de carregamento no servidor oficial v146: **aprovado em 2026-10-11**.
O servidor carregou um mod sem erro de conteúdo. Pelo console, verificaram-se
classe/conteúdo registrado, saúde 160, tamanho 1, requisito copper/12 e nó de pesquisa
sob copper-wall. A parede de cobre vanilla continuou com saúde 320 e requisito copper/6.
Resultado: `MCE_ALPHA_ASSERTIONS_PASS`.

Comando reproduzível no console do servidor v146 com o ZIP em config/mods:

```javascript
js var w=Vars.content.block('mindustry-classic-expansion-classic-stone-wall'); if(w==null||w.health!=160||w.size!=1||w.requirements.length!=1||w.requirements[0].item!=Items.copper||w.requirements[0].amount!=12) throw new Error('Wall mismatch'); var n=TechTree.all.find(function(n){return n.content==w;}); if(n==null||n.parent.content!=Blocks.copperWall) throw new Error('Research mismatch'); if(Blocks.copperWall.health!=320||Blocks.copperWall.requirements[0].amount!=6) throw new Error('Vanilla changed'); print('MCE_ALPHA_ASSERTIONS_PASS');
```

Esse comando é somente uma verificação no console; o mod distribuído não inclui scripts.
Teste visual no cliente PC e teste em dispositivo Android: pendentes.
Servidor headless não valida empacotamento de texturas, aparência ou interação por toque.

Checklist manual no PC e Android:
1. Importar ZIP, reiniciar e confirmar ausência de erros.
2. Em sandbox, construir a parede: conferir tamanho 1x1, arte cobrindo um tile e saúde 160.
3. Com recursos limitados, confirmar consumo de 12 cobre.
4. Em campanha Serpulo, conferir pesquisa sob parede de cobre e desbloqueio.
5. Conferir que parede de cobre, pisos, unidades e sprites vanilla mantêm suas propriedades.
6. Salvar/reabrir o mapa e conferir persistência; testar multiplayer com a mesma alpha nos participantes.

Não anunciar suporte PC/Android como validado até executar o checklist nos dois clientes.
