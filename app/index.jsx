import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { ThemeContext } from "./components/ThemeContext";
import { useAuth } from "./contexts/AuthContext";
import { styles as createStyles } from "./styles/IndexStyles";

export default function StartupScreen() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      router.replace("./eventscreen");
      return;
    }

    router.replace("./eventscreen");
  }, [isLoading, isAuthenticated, router]);

  return (
    <View style={styles.loadingScreen}>
      <View style={styles.loadingCard}>
        <Image
          source={require("../assets/image/LogoApp.png")}
          resizeMode="contain"
          style={styles.loadingLogo}
        />
        <ActivityIndicator size="large" color={theme.textInverse} />
        <Text style={styles.loadingText}>Avvio in corso...</Text>
      </View>
    </View>
  );
}
