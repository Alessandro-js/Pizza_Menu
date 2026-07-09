import { createContext, useRef, useState } from "react";
import { Animated, useColorScheme } from "react-native";

// Creazione context
export const ThemeContext = createContext();

// Definizione temi
const themes = {
  light: {
    // General colors
    background: "#ffffff",
    text: "#000000",

    // Brand
    brandPrimary: "#5E2367",
    brandPrimarySoft: "#c8bfd9",

    // Main text scale
    textPrimary: "#1c1632",
    textSecondary: "#5b5870",
    textMuted: "#666666",
    textBody: "#333333",
    textInverse: "#ffffff",

    // Surfaces
    surfaceApp: "#f7f7fb",
    surfacePage: "#f5f5f5",
    surfaceAlt: "#f4f5f9",
    surfaceCard: "#ffffff",
    surfaceInput: "#fafafa",
    surfaceAccent: "#f8f6fc",
    surfaceZoneCanvas: "#f2eef9",

    // Borders and dividers
    borderDefault: "#e5e1ef",
    borderSoft: "#ddd3ee",
    borderInput: "#ddd",
    borderSection: "#e0dced",
    borderAccent: "#e6ddf0",

    // Status
    success: "#2e7d32",
    successStrong: "#1f6b31",
    successBg: "#e8f5e9",
    warning: "#e65100",
    warningBg: "#fff8e1",
    warningBorder: "#ffe082",
    danger: "#a12424",
    dangerStrong: "#c62828",
    dangerBg: "#ffebee",
    dangerBorder: "#ef9a9a",
    dangerSoftBg: "#fff4f4",
    dangerSoftBorder: "#f0b9b9",

    // Seat and zone states
    seatAvailable: "#dff5e8",
    seatReserved: "#fff1c2",
    seatSold: "#ffd8d8",
    seatUnavailable: "#ece7f7",
    zoneHeaderBg: "#24193a",

    // Profile area accents
    avatarRing: "#d64b7f",
    avatarFrameBorder: "#f7d9e6",
    avatarFrameBg: "#f8f1f5",
    avatarPlaceholderText: "#7c234a",

    // Overlays
    overlaySoft: "rgba(0, 0, 0, 0.35)",
    overlayMedium: "rgba(0, 0, 0, 0.5)",
    overlayStrong: "rgba(17, 14, 28, 0.72)",
    overlayAvatar: "rgba(38, 20, 45, 0.45)",
    overlayCard: "rgba(34, 21, 45, 0.42)",
    overlayCardSoft: "rgba(34, 21, 45, 0.2)",
    overlayTextSoft: "rgba(255, 255, 255, 0.84)",

    // Sidebar specific colors
    sidebaritemtext: "#5E2367",
    titletext: "#5E2367",
    sidebarLogoutText: "#a12424",
    buttonBackground: "#5E2367",
  },
  dark: {
    // General colors
    background: "#181225",
    text: "#f8f4ff",

    // Brand (lighter counterparts)
    brandPrimary: "#c8afd9",
    brandPrimarySoft: "#e4d7ee",

    // Main text scale
    textPrimary: "#f3ecff",
    textSecondary: "#ddd2ef",
    textMuted: "#c8bddb",
    textBody: "#e9e0f5",
    textInverse: "#120f1c",

    // Surfaces
    surfaceApp: "#221b31",
    surfacePage: "#1e182c",
    surfaceAlt: "#262036",
    surfaceCard: "#2a233a",
    surfaceInput: "#332b45",
    surfaceAccent: "#372f4a",
    surfaceZoneCanvas: "#302742",

    // Borders and dividers
    borderDefault: "#5d4f76",
    borderSoft: "#70608a",
    borderInput: "#7b6b95",
    borderSection: "#64557f",
    borderAccent: "#7f6b9a",

    // Status (lighter counterparts)
    success: "#7fd48b",
    successStrong: "#9be5a5",
    successBg: "#294334",
    warning: "#ffb866",
    warningBg: "#4a3820",
    warningBorder: "#c7934c",
    danger: "#ff9a9a",
    dangerStrong: "#ffb3b3",
    dangerBg: "#4a2626",
    dangerBorder: "#b97272",
    dangerSoftBg: "#5a3030",
    dangerSoftBorder: "#d29595",

    // Seat and zone states
    seatAvailable: "#335645",
    seatReserved: "#5a4d2f",
    seatSold: "#5c3535",
    seatUnavailable: "#4a3f63",
    zoneHeaderBg: "#3a2f52",

    // Profile area accents
    avatarRing: "#f08ab0",
    avatarFrameBorder: "#ffd8e9",
    avatarFrameBg: "#4c3947",
    avatarPlaceholderText: "#ffbfd7",

    // Overlays
    overlaySoft: "rgba(0, 0, 0, 0.45)",
    overlayMedium: "rgba(0, 0, 0, 0.6)",
    overlayStrong: "rgba(8, 7, 15, 0.78)",
    overlayAvatar: "rgba(10, 8, 16, 0.6)",
    overlayCard: "rgba(10, 8, 16, 0.55)",
    overlayCardSoft: "rgba(10, 8, 16, 0.35)",
    overlayTextSoft: "rgba(248, 244, 255, 0.88)",

    // Sidebar specific colors
    sidebaritemtext: "#e9dff4",
    titletext: "#f2e8fa",
    sidebarLogoutText: "#ff9a9a",
    buttonBackground: "#c8afd9",
  },
};

export const ThemeProvider = ({ children }) => {
  // Tema di sistema come default
  const systemTheme = useColorScheme();

  const [mode, setMode] = useState(systemTheme || "light");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Funzione toggle con fade
  const toggleTheme = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setMode((prev) => (prev === "light" ? "dark" : "light"));
    console.log("Tema cambiato:", mode === "light" ? "dark" : "light");
  };

  // Tema attivo
  const theme = themes[mode];

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, fadeAnim }}>
      {children}
    </ThemeContext.Provider>
  );
};
