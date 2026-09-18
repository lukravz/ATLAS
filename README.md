# ATLAS

Automação Tecnológica de Lavouras com Aproveitamento Solar.

Protótipo web responsivo para pequenos e médios produtores do Ceará. Todos os dados, previsões, índices e operações são demonstrativos. Nenhum equipamento real é controlado.

## Executar

Requer Node.js 22.13 ou superior e npm.

```sh
npm run install:ci
npm run dev
```

Abra http://localhost:5173 e escolha **Acessar demonstração**. Para a apresentação, escolha **Demo → Executar demonstração ATLAS**.

O ciclo parte de 500 L e 37% de umidade, bombeia 1.300 L na janela solar, armazena a água e simula a chegada das 17h para irrigar. Usa 1.100 L, termina com 700 L e 56% de umidade e registra ambas as operações no histórico.

Em **Controle**, é possível iniciar e parar manualmente bomba e irrigação. O modo automático encerra a irrigação em 56% e a bomba ao atingir a capacidade. A velocidade é acelerada e indicada na tela.

## Funcionalidades

- Login ilustrativo, sem transmissão ou armazenamento de senha.
- Painel com recomendações calculadas, reservatório e índice demonstrativo.
- Cadastro e edição de lavouras, seletor ativo e armazenamento local.
- Telas de água, energia solar, clima e planta interativa da propriedade.
- Simulação de consumo, alertas lidos, histórico com filtros e indicadores de impacto.
- Conteúdo educativo e sobre o projeto.
- Layout adaptável, gráficos com tooltips, navegação por teclado e diálogos nativos.

## Dados e arquitetura

`app/model.ts` contém os tipos e a lógica pura de recomendação e balanço hídrico. `app/atlas.tsx` reúne a interface React e o estado compartilhado. `app/globals.css` define a identidade visual e os layouts responsivos. A aplicação usa TypeScript, Tailwind, Lucide e Recharts, com o ambiente Vinext/Vite.

O LocalStorage `atlas-v1` mantém lavouras, volume, umidade, modo, alertas e histórico. O SessionStorage mantém apenas o acesso ilustrativo. Os dados ficam neste navegador: não há sincronização entre dispositivos. As lavouras compartilham um reservatório, explicitamente identificado na interface; alterar sua capacidade atualiza todas as associações. A demonstração reinicia o Talhão 01 e a capacidade compartilhada para o cenário de apresentação.

A recomendação considera umidade, chance de chuva, área, cultura, água armazenada, vazão e janela solar. A necessidade hídrica por cultura e a resposta do solo são coeficientes ilustrativos, sem validação agronômica. Demandas que excedam um ciclo são sinalizadas para redimensionamento. Solo e fase estão cadastrados para a futura integração, mas não constituem modelo agronômico validado. Previsões e energia vêm de cenários fixos simulados. Para integrar APIs/sensores, substitua a origem dos dados no estado e mantenha as funções puras de cálculo separadas da interface.

A data de referência do cenário é 17/09/2026. Os registros de exemplo são identificados como demonstrativos. A referência inicial solicita 1.100 L de irrigação. O complemento correto de 1.360 L para a capacidade de 2.000 L é **640 L**, com **96 minutos** a 400 L/h; por isso o plano mostra 10h40–12h16, preservando o balanço físico em vez de transbordar a reserva.

Navegadores compatíveis podem consultar `atlas_read_farm_state` via WebMCP. A funcionalidade é opcional, somente leitura e independente da navegação normal.

## Verificar

```sh
node scripts/test-atlas.mjs
npx tsc --noEmit
npm run build
```

Não há autenticação real, integração meteorológica, sensores, acionamento físico ou resultados comprovados de economia. A validação de campo é uma etapa futura.
