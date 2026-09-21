import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios"
import { SafeAreaView } from "react-native-safe-area-context"

const API_KEY = "cv_AVkY6-oMVCu316WIbp3cYDjtoaHUDmsMOAupF01XYTlWp3fAEf2Hakw9VnR42ytZ"

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY // passo pelo header a key da API
    }
})



export default function AnimesListarScreen() {
    const [animes, setAnimes] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    async function buscarAnimes() {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await api.get("/api/animes", {
                params: { limit: 50 }
            })
            setAnimes(resposta.data.data)
        } catch (error) {
            setErro("Não foi possivel carregar Animes")
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarAnimes()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Animes</Text>
                    <Text style={styles.subtitulo}>GET /api/animes</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    animes.map((anime) => (
                        <View key={anime.id} style={styles.card}>
                            <Image source={{ uri: anime.imageUrl }} height={64} width={64}
                                style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{anime.title}</Text>
                                <Text style={styles.categoria}>
                                    {anime.genero} · {anime.ano_publicacao}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#b4a83d",
    },
    conteudo: {
        padding: 24,
        paddingBottom: 48
    },
    header: {
        marginBottom: 16
    },
    tituloPagina: {
        fontSize: 24,
        fontWeight: "800",
        color: "#000000"
    },
    subtitulo: {
        fontSize: 14,
        color: "#fdfcfc",
        marginTop: 2
    },

    erro: {
        color: "#c62828",
        marginTop: 12
    },
    card: {
        flexDirection: "row",
        gap: 30,
        marginTop: 15,
        backgroundColor: "#af0c0c",
        borderRadius: 20,
        overflow: "hidden",
    },
    imagem: {
        width: 64,
        height: 64
    },
    info: {
        flex: 1,
        justifyContent: "center",
        paddingRight: 12
    },
    titulo: {
        fontSize: 16,
        fontWeight: "700"
    },
    categoria: {
        fontSize: 13,
        color: "#000000"
    },
});