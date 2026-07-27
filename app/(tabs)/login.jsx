import { useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArtisanColors } from "@/constants/theme";
import { useAuth } from "../contexts/AuthContext";
import { useLoginFlow } from "../hooks/useLoginFlow";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const {
    email,
    setEmail,
    password,
    setPassword,
    forgotPasswordModalVisible,
    setForgotPasswordModalVisible,
    forgotPasswordEmail,
    setForgotPasswordEmail,
    forgotPasswordOtpModalVisible,
    setForgotPasswordOtpModalVisible,
    forgotPasswordOtp,
    setForgotPasswordOtp,
    forgotPasswordNewPassword,
    setForgotPasswordNewPassword,
    handleLogin,
    handleForgotPassword,
    handleForgotPasswordOtp,
  } = useLoginFlow({ isAuthenticated, login, router });

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <LoginBranding />

        <Text style={styles.subtitle}>Accedi al tuo account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={ArtisanColors.onSurfaceVariant}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={ArtisanColors.onSurfaceVariant}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Accedi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.createAccountButton]}
          onPress={() => router.push("./register")}
        >
          <Text style={[styles.buttonText, styles.createAccountButtonText]}>
            Crea un nuovo account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => setForgotPasswordModalVisible(true)}
        >
          <Text style={styles.footerText}>Password dimenticata?</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={forgotPasswordModalVisible}
        onRequestClose={() => setForgotPasswordModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recupero password</Text>
            <TextInput
              style={styles.input}
              placeholder="Inserisci la tua email"
              placeholderTextColor={ArtisanColors.onSurfaceVariant}
              value={forgotPasswordEmail}
              onChangeText={setForgotPasswordEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Invia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => {
                setForgotPasswordModalVisible(false);
                setForgotPasswordOtpModalVisible(false);
              }}
            >
              <Text style={styles.closeModalText}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={forgotPasswordOtpModalVisible}
        onRequestClose={() => setForgotPasswordOtpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recupero password</Text>
            <TextInput
              style={styles.input}
              placeholder="Inserisci la tua email"
              placeholderTextColor={ArtisanColors.onSurfaceVariant}
              value={forgotPasswordEmail}
              onChangeText={setForgotPasswordEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Inserisci il codice OTP"
              placeholderTextColor={ArtisanColors.onSurfaceVariant}
              value={forgotPasswordOtp}
              onChangeText={setForgotPasswordOtp}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Nuova password"
              placeholderTextColor={ArtisanColors.onSurfaceVariant}
              value={forgotPasswordNewPassword}
              onChangeText={setForgotPasswordNewPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleForgotPasswordOtp}
            >
              <Text style={styles.buttonText}>Invia</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setForgotPasswordOtpModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function LoginBranding() {
  return (
    <View style={styles.brandingBox}>
      <Image
        source={require("../../assets/image/LogoApp.png")}
        resizeMode="contain"
        style={styles.brandingLogo}
      />
      <Image
        source={require("../../assets/image/Powered.png")}
        resizeMode="contain"
        style={styles.poweredBy}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: ArtisanColors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: ArtisanColors.surfaceContainerLowest,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  brandingBox: {
    backgroundColor: ArtisanColors.primary,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  brandingLogo: {
    width: 300,
    height: 150,
    alignSelf: "center",
  },
  poweredBy: {
    width: 120,
    height: 56,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginTop: 4,
    marginBottom: 16,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: ArtisanColors.outlineVariant,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    marginHorizontal: 30,
    fontSize: 14,
    color: ArtisanColors.onSurface,
    backgroundColor: ArtisanColors.surfaceContainerLow,
  },
  button: {
    backgroundColor: ArtisanColors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 8,
    marginHorizontal: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  changePasswordButton: {
    backgroundColor: "transparent",
    alignSelf: "center",
    paddingVertical: 8,
  },
  createAccountButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: ArtisanColors.primary,
  },
  createAccountButtonText: {
    color: ArtisanColors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: ArtisanColors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: ArtisanColors.onSurface,
    textAlign: "center",
    marginBottom: 16,
  },
  closeModalButton: {
    marginTop: 12,
    alignSelf: "center",
  },
  closeModalText: {
    color: ArtisanColors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  footerText: {
    marginTop: 16,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 12,
    color: ArtisanColors.onSurfaceVariant,
  },
};
