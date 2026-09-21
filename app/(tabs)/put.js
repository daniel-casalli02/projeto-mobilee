import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
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

// ---------- PUT: editar um herói existente ----------
// Pra editar, primeiro precisamos saber QUAL herói — por isso a tela
// começa mostrando a lista e só depois de tocar em um item é que
// aparece o formulário, já preenchido com os dados atuais.
export default function AnimesEditarScreen() {
  const [Animes, setAnimes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [selecionado, setSelecionado] = useState(null);
  const [title, setTitle] = useState("");
  const [genero, setGenero] = useState("");
  const [ano_lancamento, setAnoLancamento] = useState("");
  const [numero_episodios, setNumeroEpisodios] = useState("");
  const [estudio, setEstudio] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function buscarAnimes() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/animes", {
        params: { limit: 50 },
      });
      setAnimes(Array.isArray(resposta.data?.data) ? resposta.data.data : []);
    } catch (e) {
      setErro("Não foi possível carregar os animes. Tenta de novo em instantes.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarAnimes();
  }, []);

  function selecionaranime(anime) {
    setSelecionado(anime);
    setTitle(anime.title ?? "");
    setGenero(anime.genero ?? "");
    setAnoLancamento(anime.ano_lancamento ?? "");
    setNumeroEpisodios(anime.numero_episodios ?? "");
    setEstudio(anime.estudio ?? "");
  }

  async function salvarEdicao() {
    if (!selecionado) return;
    if (!title.trim()) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setSalvando(true);
    try {
      // PUT substitui o registro inteiro — mandamos todos os campos de
      // novo. O id vai na URL, não no corpo.
      const resposta = await api.put(`/api/animes/${selecionado.id}`, {
        title: title.trim(),
        genero: genero.trim(),
        ano_lancamento: String(ano_lancamento).trim(),
        numero_episodios: String(numero_episodios).trim(),
        estudio: estudio.trim(),
      });

      // Esta API devolve o registro atualizado dentro de "data".
      Alert.alert("Anime atualizado!", resposta.data?.data?.title ?? title.trim());

      setSelecionado(null);
      buscarAnimes(); // recarrega a lista com o dado novo
    } catch (e) {
      Alert.alert(
        "Não deu pra atualizar o anime",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.titlePagina}>Editar anime</Text>
          <Text style={styles.subtitle}>PUT /api/Animes/:id</Text>
        </View>

        {!selecionado && (
          <>
            <Text style={styles.instrucao}>Toque em um anime pra editar:</Text>

            {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
            {erro && <Text style={styles.erro}>{erro}</Text>}

            {!carregando &&
              Animes.map((item) => (
                <Pressable key={item.id} style={styles.linha} onPress={() => selecionaranime(item)}>
                  <Text style={styles.linhatitle}>{item.title}</Text>
                  <Text style={styles.linhaSeta}>editar ›</Text>
                </Pressable>
              ))}
          </>
        )}

        {selecionado && (
          <>
            <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
              <Text style={styles.voltarTexto}>‹ voltar pra lista</Text>
            </Pressable>

            <Text style={styles.rotulo}>Título</Text>
            <TextInput
              style={styles.campo}
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Pokemon"
            />

            <Text style={styles.rotulo}>genero do anime</Text>
            <TextInput
              style={styles.campo}
              value={genero}
              onChangeText={setGenero}
              placeholder="Ex: ação"
            />

            <Text style={styles.rotulo}>numero_episodios</Text>
            <TextInput
              style={styles.campo}
              value={numero_episodios}
              onChangeText={setNumeroEpisodios}
              placeholder="Ex: 24"
            />

            <Text style={styles.rotulo}>ano_lancamento</Text>
            <TextInput
              style={styles.campo}
              value={ano_lancamento}
              onChangeText={setAnoLancamento}
              placeholder="Ex: 2000"
            />

            <Text style={styles.rotulo}>estudio</Text>
            <TextInput
              style={styles.campo}
              value={estudio}
              onChangeText={setEstudio}
              placeholder="Ex: Estudio Ghibli"
            />

            <Pressable style={styles.botao} onPress={salvarEdicao} disabled={salvando}>
              <Text style={styles.botaoTexto}>{salvando ? "Salvando..." : "Salvar alterações"}</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#b4a83d" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  titlePagina: { fontSize: 24, fontWeight: "800", color: "#102542" },
  subtitle: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },

  instrucao: { fontSize: 14, color: "#334155", marginBottom: 8 },
  erro: { color: "#c62828", marginTop: 12 },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#af0c0c",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 8,
  },
  linhatitle: { fontSize: 15, fontWeight: "700", color: "#000000" },
  linhaSeta: { fontSize: 13, color: "#000000", fontWeight: "600" },

  voltar: { marginBottom: 16 },
  voltarTexto: { color: "#000000", fontWeight: "700" },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#af0c0c",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#920808",
  },
  botao: {
    backgroundColor: "#af0c0c",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  botaoTexto: { color: "#030303", fontWeight: "700" },
});