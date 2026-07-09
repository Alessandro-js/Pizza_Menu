import { Image, View } from "react-native";

export default function AuthBranding({ styles, theme }) {
  return (
    <View style={styles.purpleBox}>
      <Image
        source={require("../../../assets/LogoApp.png")}
        resizeMode="contain"
        style={{
          width: 300,
          height: 150,
          alignSelf: "center",
          marginBottom: 0,
          backgroundColor: theme.brandPrimary,
        }}
      />

      <Image
        source={require("../../../assets/Powered.png")}
        resizeMode="contain"
        style={{
          width: 120,
          height: 56,
          alignSelf: "flex-start",
          marginBottom: 0,
        }}
      />
    </View>
  );
}
