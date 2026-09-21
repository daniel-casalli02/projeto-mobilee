import { View, Text, StyleSheet, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textoo}>Sobre mim!</Text>

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.textoo}>Daniel Casalli</Text>
          <Text style={styles.texto}>daniel.casalli@aluno.senai.br</Text>
          <Image
            source={require(`../../assets/daniel.png`)}
            style={styles.perfil}
            resizeMode="contain"
          />
          <Text style={styles.texto}>Profissional</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.textoo}>Daniel Casalli</Text>
          <Text style={styles.texto}>Casallidan7@gmail.com</Text>

          <Image
            source={require(`../../assets/daniel2.png`)}
            style={styles.perfil}
            resizeMode="contain"
          />
          <Text style={styles.texto}>Pessoal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b4a83d",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 16,
  },
  cards: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    justifyContent: "center",
  },
  perfil: {
    width: 110,
    height: 110,
    margin: 5,
  },
  card: {
    backgroundColor: "#af0c0c",
    flex: 1,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    minHeight: 285,
    maxWidth: 260,
  },
  textoo: {
    fontSize: 20,
    alignItems: "center",
    fontWeight: "bold",
    color: "#000000",
  },
  texto: {
    fontSize: 16,
    alignItems: "center",
    color: "#000000",
  },
});
