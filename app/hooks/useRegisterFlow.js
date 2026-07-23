import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { AUTH_URLS } from "../api/authApi";

const EMAIL_REGEX = /^\S+@\S+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const POSTAL_CODE_REGEX = /^\d{1,5}$/;
const TAX_CODE_REGEX = /^[A-Z]{6}\d{2}[ABCDEHLMPRST]\d{2}[A-Z]\d{3}[A-Z]$/i;

export function useRegisterFlow({ router }) {
  const minBirthDate = useMemo(() => new Date(1950, 0, 1), []);
  const maxBirthDate = useMemo(() => new Date(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [county, setCounty] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [tempBirthDate, setTempBirthDate] = useState(new Date());

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateConfirm = useCallback((date) => {
    setSelectedBirthDate(date);
    setDateOfBirth(formatDate(date));
    setDatePickerOpen(false);
  }, []);

  const openDatePicker = useCallback(() => {
    if (dateOfBirth.trim()) {
      setTempBirthDate(selectedBirthDate);
    } else {
      const defaultDate = new Date();
      defaultDate.setFullYear(defaultDate.getFullYear() - 16);
      setTempBirthDate(defaultDate);
    }
    setDatePickerOpen(true);
  }, [dateOfBirth, selectedBirthDate]);

  const changeTempBirthYear = useCallback(
    (offset) => {
      const nextDate = new Date(tempBirthDate);
      nextDate.setFullYear(nextDate.getFullYear() + offset);

      if (nextDate < minBirthDate) {
        setTempBirthDate(minBirthDate);
        return;
      }

      if (nextDate > maxBirthDate) {
        setTempBirthDate(maxBirthDate);
        return;
      }

      setTempBirthDate(nextDate);
    },
    [maxBirthDate, minBirthDate, tempBirthDate],
  );

  const changeTempBirthMonth = useCallback(
    (offset) => {
      const nextDate = new Date(tempBirthDate);
      nextDate.setMonth(nextDate.getMonth() + offset);

      if (nextDate < minBirthDate) {
        setTempBirthDate(minBirthDate);
        return;
      }

      if (nextDate > maxBirthDate) {
        setTempBirthDate(maxBirthDate);
        return;
      }

      setTempBirthDate(nextDate);
    },
    [maxBirthDate, minBirthDate, tempBirthDate],
  );

  const validateRegister = useCallback(() => {
    if (!name.trim()) return "Inserisci il tuo nome";
    if (!surname.trim()) return "Inserisci il tuo cognome";
    if (!email.trim()) return "Inserisci la tua email";
    if (!EMAIL_REGEX.test(email.trim())) return "Email non valida";
    if (!password.trim()) return "Inserisci la tua password";
    if (!PASSWORD_REGEX.test(password)) {
      return "Password non valida: almeno 8 caratteri, 1 maiuscola, 1 numero e 1 carattere speciale";
    }
    if (password !== confirmPassword) return "Le password non coincidono";
    if (!phone.trim()) return "Inserisci il tuo numero di telefono";
    if (!dateOfBirth.trim()) return "Inserisci la tua data di nascita";
    if (!address.trim()) return "Inserisci il tuo indirizzo";
    if (!city.trim()) return "Inserisci il tuo comune";
    if (!postalCode.trim()) return "Inserisci il tuo codice postale";
    if (!POSTAL_CODE_REGEX.test(postalCode.trim())) {
      return "CAP non valido: inserisci massimo 5 numeri";
    }
    if (!county.trim()) return "Inserisci la tua provincia";
    if (!taxCode.trim()) return "Inserisci il tuo codice fiscale";
    // if (!TAX_CODE_REGEX.test(taxCode.trim())) {
    //   return "Codice fiscale non valido";
    // }

    return "";
  }, [
    address,
    city,
    confirmPassword,
    county,
    dateOfBirth,
    email,
    name,
    password,
    phone,
    postalCode,
    surname,
    taxCode,
  ]);

  const handleRegister = useCallback(async () => {
    const validationError = validateRegister();
    if (validationError) {
      Alert.alert("Errore", validationError);
      return;
    }

    try {
      const response = await fetch(AUTH_URLS.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: name.trim(),
          last_name: surname.trim(),
          email: email.trim(),
          password,
          phone_number: phone.trim(),
          date_of_birth: selectedBirthDate.toISOString().split("T")[0],
          address: address.trim(),
          city: city.trim(),
          postal_code: postalCode.trim(),
          province: county.trim(),
          tax_code: taxCode.trim().toUpperCase(),
        }),
      });

      console.log(response.status);

      if (response.status === 201) {
        setOtpOpen(true);
        return;
      }

      if (response.status === 409) {
        Alert.alert(
          "Account gia esistente",
          "Se hai gia un account, accedi con le tue credenziali",
        );
      }
    } catch (_error) {
      Alert.alert(
        "Errore",
        "Impossibile connettersi al server, controlla la tua connessione e riprova",
      );
    }
  }, [
    address,
    city,
    county,
    email,
    name,
    password,
    phone,
    postalCode,
    selectedBirthDate,
    surname,
    taxCode,
    validateRegister,
  ]);

  const handleOTP = useCallback(async () => {
    const trimmedOtp = otp.trim();

    if (!trimmedOtp) {
      Alert.alert("Errore", "Inserisci il tuo OTP");
      return;
    }

    try {
      const response = await fetch(
        `${AUTH_URLS.otp}?email=${email}&code=${trimmedOtp}`,
        {
          method: "POST",
        },
      );

      if (response.status === 200) {
        Alert.alert(
          "Registrazione completata!",
          "Il tuo account e stato verificato con successo",
          [
            {
              text: "Vai al login",
              onPress: () => {
                setOtpOpen(false);
                router.push("./");
              },
            },
          ],
        );
        return;
      }

      if (response.status === 409) {
        Alert.alert(
          "Account gia esistente",
          "Se hai gia un account, accedi con le tue credenziali",
        );
      }
    } catch (_error) {
      Alert.alert(
        "Errore",
        "Impossibile connettersi al server, controlla la tua connessione e riprova",
      );
    }
  }, [email, otp, router]);

  const handleResendOTP = useCallback(async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      Alert.alert(
        "Errore",
        "Registrati prima o inserisci una email valida per ricevere un nuovo codice.",
      );
      return;
    }

    try {
      const response = await fetch(
        `${AUTH_URLS.resendOtp}?email=${trimmedEmail}`,
        {
          method: "POST",
        },
      );

      if (response.ok) {
        Alert.alert(
          "OTP inviato",
          "Controlla la tua email per il nuovo codice.",
        );
        return;
      }

      Alert.alert("Errore", "Impossibile inviare un nuovo OTP. Riprova.");
    } catch (_error) {
      Alert.alert("Errore", "Impossibile connettersi al server");
    }
  }, [email]);

  const minBirthYear = minBirthDate.getFullYear();
  const maxBirthYear = maxBirthDate.getFullYear();
  const tempBirthYear = tempBirthDate.getFullYear();
  const tempBirthMonth = tempBirthDate.getMonth();
  const canDecreaseYear = tempBirthYear > minBirthYear;
  const canIncreaseYear = tempBirthYear < maxBirthYear;
  const canDecreaseMonth = tempBirthDate > minBirthDate;
  const canIncreaseMonth = tempBirthDate < maxBirthDate;
  const monthNames = [
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic",
  ];

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    surname,
    setSurname,
    phone,
    setPhone,
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    county,
    setCounty,
    confirmPassword,
    setConfirmPassword,
    taxCode,
    setTaxCode,
    dateOfBirth,
    otp,
    setOtp,
    datePickerOpen,
    setDatePickerOpen,
    otpOpen,
    setOtpOpen,
    tempBirthDate,
    setTempBirthDate,
    minBirthDate,
    maxBirthDate,
    tempBirthYear,
    canDecreaseYear,
    canIncreaseYear,
    canDecreaseMonth,
    canIncreaseMonth,
    displayMonth: monthNames[tempBirthMonth],
    openDatePicker,
    changeTempBirthYear,
    changeTempBirthMonth,
    handleDateConfirm,
    handleRegister,
    handleOTP,
    handleResendOTP,
  };
}
