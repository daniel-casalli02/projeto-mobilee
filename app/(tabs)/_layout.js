import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000000'
        },
        headerTintColor: '#fffbfb',
        headerShadowVisible: false,
        tabBarActiveTintColor: "#fffcfc",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          backgroundColor: '#000000'
        },
        tabBarStyle: {
          backgroundColor: '#000000'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Inicio 🧑‍💻",
        }}
      />
      <Tabs.Screen
        name="gostos"
        options={{
          title: "Gostos",
          headerTitle: "Coisas minhas 🧾",
        }}
      />
      <Tabs.Screen
        name="interface"
        options={{
          title: "Interface",
          headerTitle: "interface 📱",
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "sobre 🙋",
        }}
      />
      <Tabs.Screen
        name="api"
        options={{
          title: "Api",
          headerTitle: "Api dos animes 📔",
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          headerTitle: "Adicionar um anime!",
        }}
      />
      <Tabs.Screen
        name="delete"
        options={{
          title: "Delete",
          headerTitle: "Excluir um anime!",
        }}
      />
      <Tabs.Screen
        name="put"
        options={{
          title: "Atualiza",
          headerTitle: "Atualizar um anime!",
        }}
      />
      <Tabs.Screen
        name="getById"
        options={{
          title: "Busca por id",
          headerTitle: "Busca um anime pelo id!",
        }}
      />
    </Tabs>

  );
}
