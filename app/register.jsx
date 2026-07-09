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
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import AuthBranding from "./components/auth/AuthBranding";
import { ThemeContext } from "./components/ThemeContext";
import { useRegisterFlow } from "./hooks/useRegisterFlow";
import { styles as createStyles } from "./styles/RegisterStyles";

export default function Register() {
  const { theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.content}>
        <AuthBranding styles={styles} theme={theme} />
        <Text style={styles.subtitle}>Registrati</Text>
        {/* I campi sono disposti su due colonne per ridurre l'altezza del form. */}
        <View style={styles.inputsContainer}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Nome"
            placeholderTextColor={theme.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Cognome"
            placeholderTextColor={theme.textMuted}
            value={surname}
            onChangeText={setSurname}
            autoCapitalize="words"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Email"
            placeholderTextColor={theme.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Telefono"
            placeholderTextColor={theme.textMuted}
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
                placeholderTextColor={theme.textMuted}
                value={dateOfBirth}
                editable={false}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Indirizzo"
            placeholderTextColor={theme.textMuted}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Provincia"
            placeholderTextColor={theme.textMuted}
            value={county}
            onChangeText={setCounty}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Comune"
            placeholderTextColor={theme.textMuted}
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Codice postale"
            placeholderTextColor={theme.textMuted}
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
            placeholderTextColor={theme.textMuted}
            value={taxCode}
            onChangeText={setTaxCode}
            autoCapitalize="characters"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Password"
            placeholderTextColor={theme.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Conferma Password"
            placeholderTextColor={theme.textMuted}
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
                  backgroundColor: "#5E2367",
                  borderColor: "#5E2367",
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
  );
}
