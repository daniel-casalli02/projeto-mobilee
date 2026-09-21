import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logoDaniel = require("../../assets/logoDaniel.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={logoDaniel}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.eyebrow}>React Native + Expo Router</Text>
          <Text style={styles.title}>Daniel Casalli</Text>
          <Text style={styles.description}>
            Projeto feito para ser a minha cara!
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Materias que gosto</Text>
          <Text style={styles.cardItem}>• Front-End</Text>
          <Text style={styles.cardItem}>• Mobile</Text>
          <Text style={styles.cardItem}>• Projetos</Text>
          <Text style={styles.cardItem}>• Internet das coisas</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Curiosidade</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#b4a83d",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#af0c0c",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 4,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#000000",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#070707",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#070707",
    textAlign: "center",
  },
  card: {
    gap: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#af0c0c",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#050505",
  },
  cardItem: {
    fontSize: 15,
    color: "#000000",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#af0c0c",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
});
