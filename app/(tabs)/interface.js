import { View, Text, StyleSheet, Image } from "react-native";

const logoDaniel = require("../../assets/logoDaniel.png")

export default function App() {
    return (
        <View style={styles.container}>
            
            
            <Text style={styles.title}>Bem-vindo ao app!</Text>
            <Text style={styles.subtitle}>
                Sua primeira interface em React Native
            </Text>
        </View>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#b4a83d",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000000",
    },
    subtitle: {
        fontSize: 14,
        color: "#000000",
        marginTop: 8,
    },
    logo:{
        width: 120,
        heigth: 120,
        marginBottom: 4,
    }
});