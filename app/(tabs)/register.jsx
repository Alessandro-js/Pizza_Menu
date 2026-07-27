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
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { ArtisanColors } from "@/constants/theme";
import { useRegisterFlow } from "../hooks/useRegisterFlow";

export default function Register() {
  const datePickerStyles = useDefaultStyles();
  const router = useRouter();
  const {
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
    displayMonth,
    openDatePicker,
    changeTempBirthYear,
    changeTempBirthMonth,
    handleDateConfirm,
    handleRegister,
    handleOTP,
    handleResendOTP,
  } = useRegisterFlow({ router });

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <RegisterBranding />
        <Text style={styles.subtitle}>Registrati</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Nome"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Cognome"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={surname}
            onChangeText={setSurname}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Email"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Telefono"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.halfInput}
            activeOpacity={0.8}
            onPress={openDatePicker}
          >
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                placeholder="Data di nascita"
                placeholderTextColor={ArtisanColors.onSurfaceVariant}
                value={dateOfBirth}
                editable={false}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Indirizzo"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Provincia"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={county}
            onChangeText={setCounty}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Comune"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Codice postale"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={postalCode}
            onChangeText={(value) =>
              setPostalCode(value.replace(/\D/g, "").slice(0, 5))
            }
            keyboardType="numeric"
            maxLength={5}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Codice fiscale"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={taxCode}
            onChangeText={setTaxCode}
            autoCapitalize="characters"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Password"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Conferma Password"
            placeholderTextColor={ArtisanColors.onSurfaceVariant}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrati</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Hai gia un account?{" "}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.push("./")}
          >
            <Text style={styles.registrationText}>Accedi</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={datePickerOpen}
        onRequestClose={() => setDatePickerOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleziona data di nascita</Text>

            <View style={styles.yearControls}>
              <TouchableOpacity
                style={[
                  styles.yearArrowButton,
                  !canDecreaseYear && styles.yearArrowButtonDisabled,
                ]}
                disabled={!canDecreaseYear}
                onPress={() => changeTempBirthYear(-1)}
              >
                <Text style={styles.yearArrowText}>{"<"}</Text>
              </TouchableOpacity>

              <Text style={styles.yearValueText}>{tempBirthYear}</Text>

              <TouchableOpacity
                style={[
                  styles.yearArrowButton,
                  !canIncreaseYear && styles.yearArrowButtonDisabled,
                ]}
                disabled={!canIncreaseYear}
                onPress={() => changeTempBirthYear(1)}
              >
                <Text style={styles.yearArrowText}>{">"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.monthControls}>
              <TouchableOpacity
                style={[
                  styles.monthArrowButton,
                  !canDecreaseMonth && styles.monthArrowButtonDisabled,
                ]}
                disabled={!canDecreaseMonth}
                onPress={() => changeTempBirthMonth(-1)}
              >
                <Text style={styles.monthArrowText}>{"<"}</Text>
              </TouchableOpacity>

              <Text style={styles.monthValueText}>{displayMonth}</Text>

              <TouchableOpacity
                style={[
                  styles.monthArrowButton,
                  !canIncreaseMonth && styles.monthArrowButtonDisabled,
                ]}
                disabled={!canIncreaseMonth}
                onPress={() => changeTempBirthMonth(1)}
              >
                <Text style={styles.monthArrowText}>{">"}</Text>
              </TouchableOpacity>
            </View>

            <DateTimePicker
              mode="single"
              date={tempBirthDate}
              locale="it"
              minDate={minBirthDate}
              maxDate={maxBirthDate}
              startYear={1950}
              hideHeader={true}
              styles={{
                ...datePickerStyles,
                day_label: {
                  color: "#000000",
                },
                month_label: {
                  color: "#000000",
                },
                month_selector_label: {
                  color: "#000000",
                },
                year_selector_label: {
                  color: "#000000",
                },
                year_label: {
                  color: "#000000",
                },
                selected: {
                  backgroundColor: ArtisanColors.primary,
                  borderColor: ArtisanColors.primary,
                },
                selected_label: {
                  color: "#ffffff",
                  fontWeight: "700",
                },
              }}
              onChange={({ date }) => {
                if (date) {
                  setTempBirthDate(new Date(date));
                }
              }}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, styles.modalActionButton]}
                onPress={() => setDatePickerOpen(false)}
              >
                <Text style={styles.buttonText}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.modalActionButton]}
                onPress={() => handleDateConfirm(tempBirthDate)}
              >
                <Text style={styles.buttonText}>Conferma</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={otpOpen}
        onRequestClose={() => setOtpOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verifica la tua mail</Text>

            <TextInput
              style={[styles.input]}
              placeholder="Codice OTP"
              placeholderTextColor="#999"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />

            <TouchableOpacity style={styles.button} onPress={handleOTP}>
              <Text style={styles.buttonText}>Invia OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOtpOpen(false)}
            >
              <Text style={styles.buttonText}>Chiudi</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Non hai ricevuto l&apos;OTP?{" "}
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleResendOTP}
              >
                <Text style={styles.registrationText}>Invia di nuovo</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function RegisterBranding() {
  return (
    <View style={styles.brandingBox}>
      <Image
        source={require("../../assets/image/LogoApp.png")}
        resizeMode="contain"
        style={styles.brandingLogo}
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
  subtitle: {
    fontSize: 14,
    color: ArtisanColors.onSurfaceVariant,
    marginBottom: 24,
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
    fontSize: 14,
    color: ArtisanColors.onSurface,
    backgroundColor: ArtisanColors.surfaceContainerLow,
  },
  inputsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  halfInput: {
    width: "48%",
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
  registerButton: {
    backgroundColor: "transparent",
  },
  footerText: {
    marginTop: 16,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 12,
    color: ArtisanColors.onSurfaceVariant,
  },
  registrationText: {
    top: 2.5,
    fontSize: 12,
    color: ArtisanColors.onSurfaceVariant,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 350,
    backgroundColor: ArtisanColors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: ArtisanColors.onSurface,
    marginBottom: 8,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 14,
  },
  modalActionButton: {
    flex: 1,
    marginHorizontal: 0,
  },
  monthControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  monthArrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ArtisanColors.primaryFixedDim,
    alignItems: "center",
    justifyContent: "center",
  },
  monthArrowButtonDisabled: {
    opacity: 0.35,
  },
  monthArrowText: {
    color: ArtisanColors.primary,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  monthValueText: {
    fontSize: 16,
    fontWeight: "700",
    color: ArtisanColors.onSurface,
    minWidth: 50,
    textAlign: "center",
  },
  yearControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  yearArrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ArtisanColors.primaryFixedDim,
    alignItems: "center",
    justifyContent: "center",
  },
  yearArrowButtonDisabled: {
    opacity: 0.35,
  },
  yearArrowText: {
    color: ArtisanColors.primary,
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  yearValueText: {
    fontSize: 18,
    fontWeight: "700",
    color: ArtisanColors.onSurface,
  },
};
