import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";


const API_KEY = "cv_lwism4C1nf2n1REyVB4NfRjncK_i9ZUroAEP6CJcHuVRS-mLfvQKEW10TIKv85Cf";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});


export default function AnimesCriarScreen() {
  const [title, setTitle] = useState("");
  const [genero, setGenero] = useState("");
  const [ano_lancamento, setAnoLancamento] = useState("");
  const [numero_episodios, setNumeroEpisodios] = useState("");
  const [estudio, setEstudio] = useState("");


  const [enviando, setEnviando] = useState(false);

  async function criarAnime() {
    if (!title.trim()) {
      Alert.alert("Preencha ao menos o titulo");
      return
    }
    setEnviando(true);
    try {
      const payload = {
        title: title.trim(),
        ano_lancamento: ano_lancamento.trim(),
        numero_episodios: numero_episodios.trim(),
        estudio: estudio.trim(),
        genero: genero.trim(),
      };


      const resposta = await api.post("/api/animes", payload);
      Alert.alert("Sucesso", `Anime ${resposta.data.title} criado com sucesso!`, [{ text: "OK" }]);
      setTitle("");
      setAnoLancamento("");
      setNumeroEpisodios("");
      setEstudio("");
      setGenero("");
    } catch (e) {
      Alert.alert("Detalhes do erro na API", e.response?.data);

      Alert.alert("Erro", msgApi);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Criar um anime</Text>
          <Text style={styles.subtitulo}>POST /api/animes</Text>
        </View>

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Naruto"
        />

        <Text style={styles.secao}>Campos específicos do tema animes</Text>

        <Text style={styles.rotulo}>Genero</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Ação"
        />
        <Text style={styles.rotulo}>Ano de lançamento</Text>
        <TextInput
          style={styles.campo}
          value={ano_lancamento}
          onChangeText={setAnoLancamento}
          placeholder="Ex: 2023"
        />

        <Text style={styles.rotulo}>Número de episódios</Text>
        <TextInput
          style={styles.campo}
          value={numero_episodios}
          onChangeText={setNumeroEpisodios}
          placeholder="Ex: 24"
        />

        <Text style={styles.rotulo}>Estúdio</Text>
        <TextInput
          style={styles.campo}
          value={estudio}
          onChangeText={setEstudio}
          placeholder="Ex: Studio Ghibli"
        />


        <Pressable style={styles.botao} onPress={criarAnime} disabled={enviando}>
          <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar anime"}</Text>
        </Pressable>
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
  subtitulo: { fontSize: 14, color: "#000000", marginTop: 2 },
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#102542",
    marginTop: 8,
    marginBottom: 8,
  },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#020202",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#af0c0c",
  },
  botao: {
    backgroundColor: "#af0c0c",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "black", fontWeight: "700" },
});