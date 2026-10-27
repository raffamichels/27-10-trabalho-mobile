# Calculadora — React Native + Expo + React Native Paper

Exercício da disciplina de Soluções Mobile (UNISATC): calculadora simples com as operações básicas (+, −, ×, ÷), construída com componentes do [React Native Paper](https://reactnativepaper.com/) e Hooks (`useState`).

## Funcionalidades

- Operações de soma, subtração, multiplicação e divisão (com encadeamento: `2 + 3 + 4 =`)
- Números decimais e botão C para limpar
- Divisão por zero exibe "Erro"

## Componentes e Hooks

- React Native Paper: `PaperProvider`, `Text` (visor) e `Button` (teclado)
- Hook `useState` para guardar o visor, o número anterior e a operação

## Como rodar

```bash
npm install
npx expo start
```

Depois é só ler o QR Code com o app **Expo Go** ou apertar `w` para abrir no navegador.
