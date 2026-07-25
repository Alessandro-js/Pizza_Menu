import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { MenuProvider } from "./contexts/MenuContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="pizza/[id]"
                options={{ headerShown: false, animation: "slide_from_right" }}
              />
            </Stack>
            <StatusBar style="dark" />
          </ThemeProvider>
        </CartProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
