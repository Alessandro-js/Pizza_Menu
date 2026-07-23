import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { AUTH_URLS } from "../api/authApi";

export function useLoginFlow({ isAuthenticated, login, router }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);
  const [forgotPasswordOtpModalVisible, setForgotPasswordOtpModalVisible] =
    useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState("");
  const [forgotPasswordNewPassword, setForgotPasswordNewPassword] =
    useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, router]);

  const handleLogin = useCallback(async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Alert.alert("Errore", "Inserisci la tua email");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Errore", "Inserisci la tua password");
      return;
    }

    try {
      const status = await login(trimmedEmail, password);
      switch (status) {
        case 200:
          router.replace("/home");
          break;
        case 403:
          Alert.alert(
            "Email non verificata",
            "L'email che hai inserito non e stata verificata. Controlla la tua email per il link di verifica.",
          );
          break;
        case 404:
          Alert.alert(
            "Account non trovato",
            "Assicurati che la mail sia corretta",
          );
          break;
        case 429:
          Alert.alert(
            "Troppi tentativi",
            "Hai effettuato troppi tentativi di accesso. Riprova piu tardi.",
          );
          break;
        default:
          Alert.alert("Errore", "Si e verificato un errore imprevisto");
          break;
      }
    } catch (_error) {
      Alert.alert("Errore", "Impossibile connettersi al server");
    }
  }, [email, login, password, router]);

  const handleForgotPassword = useCallback(async () => {
    const trimmedForgotPasswordEmail = forgotPasswordEmail.trim();

    if (!trimmedForgotPasswordEmail) {
      Alert.alert("Errore", "Inserisci l'email per cambiare password");
      return;
    }

    try {
      const response = await fetch(
        AUTH_URLS.changePassword(trimmedForgotPasswordEmail),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        Alert.alert("OTP inviato", "Controlla la tua email per il codice OTP.");
        setForgotPasswordModalVisible(false);
        setForgotPasswordOtpModalVisible(true);
        return;
      }

      if (response.status === 404) {
        Alert.alert(
          "Email non trovata",
          "L'email inserita non e associata a nessun account.",
        );
      }
    } catch (_error) {
      Alert.alert("Errore", "Impossibile connettersi al server");
    }
  }, [forgotPasswordEmail]);

  const handleForgotPasswordOtp = useCallback(async () => {
    const trimmedEmail = forgotPasswordEmail.trim();
    const trimmedOtp = forgotPasswordOtp.trim();
    const trimmedNewPassword = forgotPasswordNewPassword.trim();

    if (!trimmedEmail) {
      Alert.alert("Errore", "Inserisci l'email");
      return;
    }

    if (!trimmedOtp) {
      Alert.alert("Errore", "Inserisci il codice OTP");
      return;
    }

    if (!trimmedNewPassword) {
      Alert.alert("Errore", "Inserisci la nuova password");
      return;
    }

    try {
      const body = new URLSearchParams();
      body.append("email", trimmedEmail);
      body.append("code", trimmedOtp);
      body.append("password", trimmedNewPassword);
      console.log(body);
      const response = await fetch(AUTH_URLS.changePasswordOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (response.status === 200) {
        Alert.alert(
          "Password cambiata",
          "La tua password e stata aggiornata con successo.",
        );
        setForgotPasswordEmail("");
        setForgotPasswordOtp("");
        setForgotPasswordNewPassword("");
        setForgotPasswordOtpModalVisible(false);
        return;
      }

      if (response.status === 400) {
        Alert.alert(
          "OTP non valido",
          "Il codice OTP inserito non e valido o e scaduto.",
        );
        return;
      }

      if (response.status === 404) {
        console.log(trimmedEmail, trimmedOtp, trimmedNewPassword);
        Alert.alert("Errore del server", "Riprova più tardi.");
        return;
      }

      Alert.alert("Errore", "Si e verificato un errore. Riprova.");
    } catch (_error) {
      Alert.alert("Errore", "Impossibile connettersi al server");
    }
  }, [forgotPasswordEmail, forgotPasswordOtp, forgotPasswordNewPassword]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    forgotPasswordModalVisible,
    setForgotPasswordModalVisible,
    forgotPasswordEmail,
    setForgotPasswordEmail,
    forgotPasswordOtpModalVisible,
    forgotPasswordOtp,
    setForgotPasswordOtp,
    forgotPasswordNewPassword,
    setForgotPasswordNewPassword,
    handleLogin,
    handleForgotPassword,
    handleForgotPasswordOtp,
    setForgotPasswordOtpModalVisible,
  };
}
