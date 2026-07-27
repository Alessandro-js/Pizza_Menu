import { ArtisanColors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function StartupScreen() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <View style={styles.loadingCard}>
      <Image
        source={require("../../assets/image/LogoApp.png")}
        resizeMode="contain"
        style={styles.loadingLogo}
      />
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={styles.loadingText}>Avvio in corso...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: ArtisanColors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: ArtisanColors.primary,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  loadingLogo: {
    width: 240,
    height: 120,
    marginBottom: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
});
