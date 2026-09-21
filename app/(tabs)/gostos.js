import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lessons = [
  "CyberPunk",
  "Vampiros",
  "X-man",
  "Roblox",
  "Oceano",
  "Sol",
  "Laranja",
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Meus Gostos!</Text>
        <Text style={styles.description}>
          Essa aba serve apenas para mostrar os meus gostos!
        </Text>

        <View style={styles.list}>
          {lessons.map((lesson, index) => (
            <View key={lesson} style={styles.listItem}>
              <Text style={styles.badge}>{index + 1}</Text>
              <Text style={styles.listText}>{lesson}</Text>
            </View>
          ))}
        </View>
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
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000000",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    textAlign: "center",
  },
  list: {
    gap: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#af0c0c",
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: "center",
    lineHeight: 32,
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    backgroundColor: "#d8ca48",
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
});
