import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text, Button } from 'react-native-paper';

const teclas = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

function calcular(a, b, operador) {
  let resultado;
  if (operador === '+') resultado = a + b;
  if (operador === '-') resultado = a - b;
  if (operador === '*') resultado = a * b;
  if (operador === '/') resultado = b === 0 ? NaN : a / b;
  if (isNaN(resultado)) return 'Erro';
  return String(Number(resultado.toFixed(10))); // evita 0.1 + 0.2 = 0.30000000000000004
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [anterior, setAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [novoNumero, setNovoNumero] = useState(false);

  function limpar() {
    setDisplay('0');
    setAnterior(null);
    setOperador(null);
    setNovoNumero(false);
  }

  function pressionar(tecla) {
    // Operações: + - * /
    if ('+-*/'.includes(tecla)) {
      if (display === 'Erro') return;
      // Se já havia uma conta pendente, resolve antes (ex.: 2 + 3 + ...)
      const valor = operador && !novoNumero ? calcular(anterior, Number(display), operador) : display;
      setDisplay(valor);
      setAnterior(Number(valor));
      setOperador(tecla);
      setNovoNumero(true);
      return;
    }

    // Igual
    if (tecla === '=') {
      if (!operador || novoNumero) return;
      setDisplay(calcular(anterior, Number(display), operador));
      setOperador(null);
      setNovoNumero(true);
      return;
    }

    // Ponto decimal
    if (tecla === '.') {
      if (novoNumero || display === 'Erro') setDisplay('0.');
      else if (!display.includes('.')) setDisplay(display + '.');
      setNovoNumero(false);
      return;
    }

    // Números
    if (novoNumero || display === '0' || display === 'Erro') setDisplay(tecla);
    else setDisplay(display + tecla);
    setNovoNumero(false);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.display} numberOfLines={1}>
          {display}
        </Text>

        <Button mode="outlined" onPress={limpar} style={styles.botao}>
          C
        </Button>

        {teclas.map((linha) => (
          <View key={linha.join()} style={styles.linha}>
            {linha.map((tecla) => (
              <Button
                key={tecla}
                mode={'+-*/='.includes(tecla) ? 'contained' : 'contained-tonal'}
                onPress={() => pressionar(tecla)}
                style={[styles.botao, styles.tecla]}
                labelStyle={styles.textoBotao}
              >
                {tecla}
              </Button>
            ))}
          </View>
        ))}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    paddingBottom: 40,
  },
  display: {
    textAlign: 'right',
    marginBottom: 24,
  },
  linha: {
    flexDirection: 'row',
  },
  botao: {
    margin: 4,
  },
  tecla: {
    flex: 1,
  },
  textoBotao: {
    fontSize: 22,
    paddingVertical: 8,
  },
});
