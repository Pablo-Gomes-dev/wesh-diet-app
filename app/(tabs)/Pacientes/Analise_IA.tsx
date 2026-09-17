import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type Paciente = {
  nome: string;
  idade: string;
  peso: string;
  altura: string;
  objetivo: string;
  restricoes: string;
  observacoes: string;
};

export default function AnaliseIAScreen() {
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    const carregarPaciente = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem("paciente");

        if (dadosSalvos) {
          setPaciente(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.log("Erro ao carregar paciente:", error);
      }
    };

    carregarPaciente();
  }, []);

  if (!paciente) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Análise com IA</Text>
        <Text>Nenhum paciente cadastrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Análise com IA</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Dados do paciente</Text>

        <Text style={styles.dado}>Nome: {paciente.nome}</Text>

        <Text style={styles.dado}>Idade: {paciente.idade} anos</Text>

        <Text style={styles.dado}>Peso: {paciente.peso} kg</Text>

        <Text style={styles.dado}>Altura: {paciente.altura} cm</Text>

        <Text style={styles.dado}>Objetivo: {paciente.objetivo}</Text>

        <Text style={styles.dado}>Restrições: {paciente.restricoes}</Text>

        <Text style={styles.dado}>Observações: {paciente.observacoes}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Preparação para análise</Text>

        <Text style={styles.info}>
          Os dados cadastrados do paciente estão disponíveis para a próxima
          etapa da análise.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#eeeeee",
    marginBottom: 16,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  dado: {
    fontSize: 16,
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    lineHeight: 22,
  },
});
