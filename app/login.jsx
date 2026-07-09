import { useRouter } from "expo-router";
import { useContext } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthBranding from "./components/auth/AuthBranding";
import { ThemeContext } from "./components/ThemeContext";
import { useAuth } from "./contexts/AuthContext";
import { useLoginFlow } from "./hooks/useLoginFlow";
import { styles as createStyles } from "./styles/IndexStyles";

export default function Login() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.content}>
        <AuthBranding styles={styles} theme={theme} />

        <Text style={styles.subtitle}>Accedi al tuo account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={theme.textMuted}
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
      {/*modal recupra password invio email */}
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
              placeholderTextColor={theme.textMuted}
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
              onPress={() => setForgotPasswordModalVisible(false),setForgotPasswordOtpModalVisible(false)  }
            >
              <Text style={styles.closeModalText}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/*Modal recupero password OTP */}
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
              placeholderTextColor={theme.textMuted}
              value={forgotPasswordEmail}
              onChangeText={setForgotPasswordEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Inserisci il codice OTP"
              placeholderTextColor={theme.textMuted}
              value={forgotPasswordOtp}
              onChangeText={setForgotPasswordOtp}
              keyboardType="number-pad"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Nuova password"
              placeholderTextColor={theme.textMuted}
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
  );
}
