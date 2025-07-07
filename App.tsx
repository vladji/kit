import { BadgeDollarSign } from "lucide-react-native";
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View>
        <BadgeDollarSign />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
