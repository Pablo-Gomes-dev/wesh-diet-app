//IMPORTAÇÕES NECESSÁRIAS PARA O FUNCIONAMENTO DA TELA DE DETALHES DO PACIENTE, ONDE O USUÁRIO PODE VER E EDITAR OS DADOS DO PACIENTE.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
// TUDO DENTRO DESSA IDENTAÇÃO É O QUE VAI APARECER NA TELA DE DETALHES DO PACIENTE, ONDE O USUÁRIO PODE VER E EDITAR OS DADOS DO PACIENTE.
export default function Detalhes_do_paciente() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [restricoes, setRestricoes] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const calcularIMC = () => {
    const pesoNumero = parseFloat(peso.replace(",", "."));
    const alturaNumero = parseFloat(altura.replace(",", ".")) / 100;

    if (!pesoNumero || !alturaNumero) {
      return null;
    }

    return pesoNumero / (alturaNumero * alturaNumero);
  };
  // PARAMETRO UTILIZADO PARA PEGAR OS DADOS DO PACIENTE SALVOS NO ASYNC STORAGE, PARA QUE O USUÁRIO POSSA VER E EDITAR OS DADOS DO PACIENTE.
  useEffect(() => {
    const carregarPaciente = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem("paciente");
        if (dadosSalvos) {
          const paciente = JSON.parse(dadosSalvos);
          setNome(paciente.nome);
          setIdade(paciente.idade);
          setPeso(paciente.peso);
          setAltura(paciente.altura);
          setObjetivo(paciente.objetivo);
          setRestricoes(paciente.restricoes);
          setObservacoes(paciente.observacoes);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do paciente:", error);
      }
    };

    carregarPaciente();
  }, []);
  //PARAMETRO UTILIZADO PARA SALVAR OS DADOS DO PACIENTE NO ASYNC STORAGE, PARA QUE O USUÁRIO POSSA VER E EDITAR OS DADOS DO PACIENTE.
  const salvarPaciente = async () => {
    if (!nome || !idade || !peso || !altura) {
      Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
      return;
    }

    const paciente = {
      nome,
      idade,
      peso,
      altura,
      objetivo,
      restricoes,
      observacoes,
    };

    try {
      await AsyncStorage.setItem("paciente", JSON.stringify(paciente));
      Alert.alert("Sucesso", "Dados do paciente salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar os dados do paciente:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados do paciente.");
    }
  };

  return (
    //PARAMETRO UTILIZADO PARA CRIAR A TELA DE DETALHES DO PACIENTE, ONDE O USUÁRIO PODE VER E EDITAR OS DADOS DO PACIENTE.
    <ScrollView contentContainerStyle={styles.container}>
      {/*PARAMETRO UTILIZADO PARA CRIAR O TÍTULO DA TELA DE DETALHES DO PACIENTE,
      ONDE O USUÁRIO PODE VER E EDITAR OS DADOS DO PACIENTE.*/}
      <Text style={styles.title}>Detalhes do Paciente</Text>
      {/*PARAMETRO UTILIZADO PARA CRIAR OS CAMPOS DE TEXTO PARA O USUÁRIO DIGITAR
      OS DADOS DO PACIENTE, ONDE O USUÁRIO PODE VER E EDITAR OS DADOS DO
      PACIENTE.*/}
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do paciente"
        value={nome}
        onChangeText={setNome}
      />
      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a idade do paciente"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Peso:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o peso do paciente"
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Altura:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a altura do paciente"
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
      />

      {calcularIMC() !== null && (
        <View style={styles.imcContainer}>
          <Text style={styles.imcTitulo}>IMC</Text>

          <Text style={styles.imcValor}>{calcularIMC()?.toFixed(2)}</Text>
        </View>
      )}

      <Text style={styles.label}>objetivo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu objetivo"
        value={objetivo}
        onChangeText={setObjetivo}
      />
      <Text style={styles.label}>Restrições alimentares</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Lactose, Glutén, Nenhuma..."
        value={restricoes}
        onChangeText={setRestricoes}
      />
      <Text style={styles.label}>Obsevarções</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Digite outras informações importantes."
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />
      {/*PARAMETRO UTILIZADO PARA CRIAR O BOTÃO DE SALVAR, ONDE O USUÁRIO PODE
      SALVAR OS DADOS DO PACIENTE NO ASYNC STORAGE.*/}
      <Pressable style={styles.button} onPress={salvarPaciente}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>
    </ScrollView>
  );
}

//PARAMETRO UTILIZADO PARA CRIAR OS ESTILOS DA TELA DE DETALHES DO PACIENTE, ONDE O USUÁRIO PODE VER E EDITAR OS DADOS DO PACIENTE.
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  imcContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#eeeeee",
    alignItems: "center",
  },

  imcTitulo: {
    fontSize: 28,
    fontWeight: "600",
  },

  imcValor: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
});
