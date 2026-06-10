# Diretrizes de Design e Análise CRO — S.O.S Trader

Este documento apresenta a análise de funil visual da landing page atual do projeto S.O.S Trader e justifica as escolhas técnicas, tipográficas e de usabilidade aplicadas no redesenho.

---

## 1. Análise de Funil Visual (CRO)

A landing page original (disponível em `lp.somosnomos.com.br/sos-trader/`) apresenta diversos pontos de fricção e quebras de fluxo que geram perda de cliques e conversões:

*   **Falta de Clareza Imediata (Dobra Principal):** O título original *"Mais de 70% dos traders perdem dinheiro. Você não precisa fazer parte desta estatística."* é bom, mas o visual peca por falta de contraste e hierarquia. A proposta de valor do projeto fica perdida em meio a blocos de textos longos.
*   **Formulário Intimidador (Fricção Inicial):** Solicitar Nome, E-mail, Celular e CPF em um único bloco de campos logo de cara cria uma barreira mental alta (fricção). O usuário cético hesita em fornecer dados sensíveis (como CPF) sem uma jornada de compromisso progressivo.
*   ** mockups e Telas Sem Destaque:** O Copilot XP é o grande atrativo de valor (controle de risco), mas as capturas de tela da ferramenta estão mal posicionadas, sem zoom adequado e parecem genéricas ou difíceis de ler.
*   **Ausência de Elementos de Autoridade Conectados:** A parceria institucional com a XP Investimentos e a regulação pela CVM aparecem de forma muito tímida e desorganizada no rodapé, não transferindo a credibilidade necessária acima da dobra.
*   **Depoimentos Desorganizados:** As capturas de tela de resultados reais (WhatsApp/Gráficos) estão dispostas de forma desestruturada, prejudicando a escaneabilidade e a sensação de autenticidade.

---

## 2. Redesenho Focado em Conversão (Implementação)

Para reverter esses pontos, estruturamos o redesenho da seguinte forma:

*   **Dobra Principal Asimétrica com Identidade Visual Rápida:** Alinhamos a copy de alto impacto à esquerda (focada na dor e na solução rápida) e o formulário à direita em um card flutuante. O logotipo **S.O.S Trader** foi movido do menu de navegação (que agora conta com o logotipo institucional Nomos + XP na esquerda e os ícones de redes sociais na direita, combinando exatamente com o menu original) diretamente para o topo do bloco de texto do Hero, criando identidade visual instantânea assim que a página é carregada.
*   **Compromisso Progressivo (Multi-Step Form):** Dividimos o formulário em dois passos para mitigar o susto inicial de ceticismo do usuário, solicitando primeiro a faixa de capital (baixa fricção) e posteriormente os dados pessoais.
*   **Bento Grid de Benefícios Balanceada (CRO Integrado):** Organizamos os benefícios em um Bento Grid moderno. Para eliminar o espaço em branco no final da terceira linha do grid (causado por termos 5 benefícios ímpares), adicionamos um **6º card focado em CTA e conversão rápida**, oferecendo um segundo ponto de entrada na seção de benefícios. Além disso, ajustamos os contêineres para estiramento flexível (`align-items: stretch`), eliminando qualquer distorção visual e espaços em branco vazios.
*   **Prova Social em Galeria Estática e Legível:** Substituímos o carrossel infinito (marquee), que deixava as capturas de tela pequenas e ilegíveis, por uma **galeria estática de alta fidelidade disposta em grid de 4 colunas**. Os prints reais dos feedbacks no WhatsApp e relatórios do Copilot XP agora são exibidos em tamanho maior, legíveis e envoltos em cards modernos, gerando credibilidade real imediata.

---

## 3. Diretrizes Técnicas de Performance (Carregamento Rápido)

Para garantir que a página carregue em menos de 1 segundo (evitando a perda de leads imediatistas em conexões móveis lentas), estabelecemos as seguintes regras de infraestrutura:

1.  **Imagens Otimizadas:** Conversão de todos os assets gráficos pesados para o formato **WebP** com compressão controlada de 80%, reduzindo o peso médio dos arquivos em mais de 70% sem perda perceptível de qualidade.
2.  **Lazy Loading Nativo:** Aplicação do atributo `loading="lazy"` em todas as imagens off-screen (depoimentos e mockups inferiores) para adiar seu carregamento até que o usuário role a tela.
3.  **Preconexão de Fontes:** Tag `<link rel="preconnect">` para o Google Fonts, reduzindo o tempo de DNS lookup, conexão TCP e handshake TLS para os arquivos de fonte `Sora`.
4.  **Código Vanilla e Inline Styles:** Evitamos o uso de frameworks pesados (como Bootstrap, Tailwind no runtime ou frameworks de animação exagerados) e plugins inflados. A LP utiliza apenas HTML5 semântico estruturado e CSS vanilla otimizado, gerando um payload inicial de transferência extremamente leve (~30KB de código).

---

## 4. Gatilhos Mentais e Escaneabilidade

*   **Dor vs. Prazer (Headline):** A headline joga luz sobre a estatística fria e dolorosa (70% perdem dinheiro) e oferece o alívio imediato na sub-headline ("Vire o jogo agora").
*   **Prova Social:** Disposta logo abaixo da dobra principal e reforçada na seção de depoimentos reais, mostrando que outras pessoas já utilizam a estrutura da assessoria com sucesso.
*   **Escassez e Urgência:** Um badge ativo no topo do formulário com indicador pulsante de "Vagas Limitadas" e a faixa vermelha de urgência no rodapé da dobra principal lembram o usuário que o mercado pune a inércia.
*   **Escaneabilidade (Padrão Z-Pattern):** O olhar do usuário inicia no logotipo (credibilidade), passa pelo título impactante (dor), lê rapidamente as propostas de valor com ícones ilustrativos e termina naturalmente no botão contrastante de conversão do formulário à direita.

---

## 5. Escolhas de Usabilidade (Tipografia, Contraste e Espaços)

*   **Tipografia (Sora):** Escolha de uma fonte sem serifa geométrica com excelente espaçamento e legibilidade em telas de alta densidade de pixels. O peso extra-bold (`800`) é usado nos títulos para demonstrar força e autoridade, enquanto o peso normal (`400`/`500`) é aplicado no texto corrido para facilitar a leitura.
*   **Contraste (Acessibilidade AAA):** O texto creme claro (`#F4ECE6`) sobre o fundo verde obsidiana profundo (`#010f0c`) cria um contraste de luminância extremamente alto e confortável para leitura noturna (comum entre traders). A cor verde-lima de acento (`#C8E05B`) é utilizada estritamente nos pontos de conversão (botões e badges), criando um "ímã visual" inconfundível.
*   **Espaço em Branco (Whitespace):** Espaçamentos generosos entre seções (paddings de `72px` a `96px`) evitam a sobrecarga cognitiva e agrupam visualmente as informações de forma lógica, permitindo que cada argumento de conversão respire e seja absorvido individualmente pelo leitor.
