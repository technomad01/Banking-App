import { Text, StyleSheet, View, Alert, Image } from "react-native";
import { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BiometricLogin() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const handleAuthentication = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Face ID`,
      });
      if (result.success) {
        setAuthenticated(true);
      } else {
        Alert.alert("Face Not Recognized");
      }
    } else {
      Alert.alert("Biometric authentication is not available on this device");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Ryt Bank</Text>
      <Text style={styles.subtitle}>Your trusted digital bank</Text>
      {isAuthenticated ? (
        <View style={styles.authenticatedContainer}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/100/fingerprint.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.welcome}>Welcome</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.welcome}>Login with Passcode/FaceID</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#030453",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 40,
  },
  subtitle: {
    gap: 8,
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
  authenticatedContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FF3500",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 40,
    tintColor: "#0070f3",
  },
});
