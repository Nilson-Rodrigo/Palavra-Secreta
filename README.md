# 🎯 Jogo da Palavra Secreta

Um jogo interativo que usa um algoritmo matemático de transformação de matrizes para adivinhar palavras!

## 📋 Como Funciona

1. **Pense em uma palavra** (2 a 5 letras)
2. **A cada rodada**, indique em qual **coluna** cada letra está na matriz
3. As colunas selecionadas **viram linhas** da próxima matriz
4. Após **N rodadas** (N = número de letras), a **diagonal principal** revela a palavra! 🎉

## 🧮 Algoritmo

O truque funciona através de transformação de matrizes:

- **Matriz inicial**: 5×5 com todas as letras A-Y
- **Transformação**: Cada coluna selecionada vira uma linha da próxima matriz
- **Diagonal principal**: Após N transformações, a diagonal contém a palavra pensada

## 🎮 Estrutura do Projeto

```
Aatividade_07/
├── index.html      # Estrutura HTML
├── style.css       # Estilos e design
├── script.js       # Lógica do jogo
└── README.md       # Este arquivo
```

## 🚀 Como Usar

1. Abra `index.html` em um navegador
2. Selecione quantas letras tem a sua palavra (2-5)
3. Clique em "Iniciar"
4. Para cada letra, clique na coluna onde ela está
5. Confirme e passe para a próxima matriz
6. A palavra será revelada ao final! 

## 💻 Tecnologias

- **HTML5** - Estrutura
- **CSS3** - Estilos responsivos com design retrô
- **JavaScript (ES6+)** - Lógica matemática e interatividade
- **Disciplina**: Programação para web

## 👤 Autor: Nilson

Atividade 07 - Programação para Internet I

---

**Divirta-se descobrindo o truque matemático!** ✨
