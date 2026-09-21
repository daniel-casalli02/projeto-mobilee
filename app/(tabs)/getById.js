import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Em produção, uma chave de API não deveria morar direto no código do
// app (dá pra extrair de qualquer APK/IPA instalado). Aqui, como é uma
// API pública de estudo, deixamos direto no código pra simplificar.
const API_KEY = "cv_AVkY6-oMVCu316WIbp3cYDjtoaHUDmsMOAupF01XYTlWp3fAEf2Hakw9VnR42ytZ";

// Mesma instância do axios usada nas outras telas, com o header já
// configurado — toda chamada feita com "api" já sai autenticada.
const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

// ---------- GET por id: buscar um herói específico ----------
export default function animesBuscarScreen() {
  const [id, setId] = useState("");
  const [anime, setAnime] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  async function buscarPorId() {
    if (!id) {
      setErro("Digite um id pra buscar.");
      return;
    }

    Keyboard.dismiss();
    setBuscando(true);
    setErro(null);
    setNaoEncontrado(false);
    setAnime(null);

    try {
      // Sem params e sem .data.data: a rota de um item só devolve o
      // próprio objeto do herói direto no corpo da resposta.
      const resposta = await api.get(`/api/animes/${id}`);
      setAnime(resposta.data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setNaoEncontrado(true);
      } else {
        setErro("Não foi possível buscar o herói. Tenta de novo em instantes.");
      }
    } finally {
      setBuscando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Buscar anime</Text>
          <Text style={styles.subtitulo}>GET /api/animes/:id</Text>
        </View>

        <Text style={styles.rotulo}>Id do anime</Text>
        <View style={styles.linhaBusca}>
          <TextInput
            style={styles.campo}
            value={id}
            onChangeText={setId}
            placeholder="Ex: 1"
            keyboardType="numeric"
          />
          <Pressable style={styles.botao} onPress={buscarPorId} disabled={buscando}>
            <Text style={styles.botaoTexto}>{buscando ? "..." : "Buscar"}</Text>
          </Pressable>
        </View>

        {buscando && <ActivityIndicator style={{ marginVertical: 16 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {naoEncontrado && (
          <Text style={styles.avisoNaoEncontrado}>
            Nenhum anime encontrado com o id "{id}".
          </Text>
        )}
 
        {anime && (
          <View style={styles.card}>
            <Image source={{ uri: anime.imageUrl }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.titulo}>{anime.title}</Text>
              <Text style={styles.categoria}>
                {anime.universo} · {anime.poder}
              </Text>
              <Text style={styles.fraqueza}>Fraqueza: {anime.fraqueza}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#b4a83d" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#000000", marginBottom: 4 },
  linhaBusca: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#af0c0c",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#920808",
  },
  botao: {
    backgroundColor: "#af0c0c",
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: { color: "black", fontWeight: "700" },

  erro: { color: "#c62828", marginTop: 12 },
  avisoNaoEncontrado: { color: "#9a6700", marginTop: 16, fontStyle: "italic" },

  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    backgroundColor: "#af0c0c",
    borderRadius: 10,
    overflow: "hidden",
  },
  imagem: { width: 88, height: 88 },
  info: { flex: 1, justifyContent: "center", paddingRight: 12, gap: 2 },
  titulo: { fontSize: 17, fontWeight: "700" },
  categoria: { fontSize: 13, color: "#000000" },
  fraqueza: { fontSize: 13, color: "#030303" },
});