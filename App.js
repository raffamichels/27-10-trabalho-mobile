import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text, Button } from 'react-native-paper';

const teclas = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.display} numberOfLines={1}>
          0
        </Text>

        <Button mode="outlined" style={styles.botao}>
          C
        </Button>

        {teclas.map((linha) => (
          <View key={linha.join()} style={styles.linha}>
            {linha.map((tecla) => (
              <Button
                key={tecla}
                mode={'+-*/='.includes(tecla) ? 'contained' : 'contained-tonal'}
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
