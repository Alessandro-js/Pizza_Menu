import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_KEY } from "../../utils/authSession";

export async function persistAccessToken(token) {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
}

export async function clearAccessToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
}
