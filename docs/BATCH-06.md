# Lote 6 — dez torres de munição

Alpha 0.6.0, 2026-10-11. Todos os materiais de construção Classic continuam
incluídos no ZIP, junto com perfuradores e máquinas que os produzem.

| Torre | Vida / tamanho | Alcance | Reload (ticks) | Munição | Unidades/item | Projéteis/salva |
| --- | --- | ---: | ---: | --- | ---: | ---: |
| Básica | 45 / 1 | 52 | 15 | Pedra Classic | 20 | 1 |
| Dupla | 45 / 1 | 44 | 13 | Pedra Classic | 20 | 2 |
| Metralhadora | 65 / 1 | 65 | 7 | Ferro Classic | 20 | 1 |
| Escopeta | 70 / 1 | 50 | 30 | Ferro Classic | 20 | 5 |
| Lança-chamas | 90 / 1 | 45 | 5 | Carvão vanilla | 20 | 1 |
| Sniper | 70 / 1 | 120 | 50 | Aço Classic | 20 | 1 |
| Morteiro | 110 / 1 | 120 | 55 | Carvão vanilla | 5 | 3 |
| Plasma | 180 / 1 | 60 | 3 | Carvão vanilla | 40 | 1 |
| Corrente | 430 / 2 | 80 | 5 | Urânio Classic | 8 | 2 |
| Canhão Titan | 800 / 3 | 120 | 23 | Urânio Classic | 4 | 1 |

Construção: básica 4 pedras; dupla 7 pedras; metralhadora 8 ferros + 10 pedras;
escopeta 10 ferros + 10 pedras; lança-chamas 12 ferros + 9 aços; sniper
15 ferros + 10 aços; morteiro 25 aços + 15 titânios; plasma 10 aços + 20
titânios + 15 diriums; corrente 50 aços + 25 titânios + 40 diriums; Titan
70 aços + 50 titânios + 55 diriums. Todos Classic, salvo carvão da munição.

## Adaptações

Turret Classic foi adaptado para ItemTurret v7. O original chama consumeAmmo
e depois decrementa ammo novamente: **duas unidades por salva**, reproduzidas
com ammoPerShot=2, consumeAmmoOnce=true; estoque máximo 400 preservado.
Uma pedra rende dez salvas da torre básica ou dupla, por exemplo.

Alcance, reload, saúde, tamanho, imprecisão e receitas vêm de WeaponBlocks.java.
Rotação Classic usa interpolação; v7 usa graus/tick, portanto recebeu valores
adaptados (12 comuns, 4 Titan). Mirar, prever movimento, controlar a torre,
alvos aéreos/terrestres e estruturas usam regras v7. O Classic mirava inimigos.

Projéteis usam BasicBulletType: velocidade e dano direto Classic mantidos
(pedra/ferro 2; chama 5; sniper 25; plasma 17; corrente 8; Titan 38).
Vida e dimensões dos tipos sem valores explícitos foram adaptadas para cobrir
o alcance; desenhos procedurais de pedras, chama/plasma e sniper usam visuais
modernos. Ferro, corrente e Titan reutilizam os sprites originais.
Não há áudio Classic: sons/efeitos vêm do v7.

Dupla/corrente usam ShootBarrel com dois canos. Escopeta: cinco tiros com
intervalo 0,7 tick e imprecisão 15. Morteiro: três tiros, imprecisão 9,
variação de velocidade moderna e três fragmentos de dano 2 por projétil.
Titan usa dano em área 25 e raio 50; colisão/área/fragmentação são adaptações
modernas, não equivalência exata da implementação DamageArea Classic.
Não confundir plasma com líquido: esta torre Classic usa carvão.

## Demonstração

Abra **MCE - Ammo Turrets Demo**. Dez torres da esquerda para a direita na
ordem da tabela. Configure a fonte de itens abaixo com a munição correta.
Paredes inimigas acima servem de alvo. Recursos limitados: núcleo com 500
de cada item Classic e carvão. Não existem inimigos/unidades Classic neste lote.

Teste: tools/verify-batch6.js, executado manualmente pelo console do servidor
v146. Gera o mapa antes de alimentar as torres; fornece dois itens a cada
uma, simula disparos e projéteis, verifica munição esgotada, contagem de tiros,
dano a alvos, rejeição de cobre, alcance/reload/vida/tamanho e duo vanilla.
O teste fornece alvos fixos; IA em batalha, aparência e toque ainda exigem cliente.

Total: **46 de 63 construções**, seis itens próprios, um líquido próprio,
seis terrenos auxiliares e cinco mapas. Restam **17 construções**; as duas
torres de energia e outros blocos especiais ficam para adaptação posterior.
