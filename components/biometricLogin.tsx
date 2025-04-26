import { Text, StyleSheet, View, Alert, Image, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";

export default function BiometricLogin() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAuthentication = async () => {
    setLoading(true);
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Login with Face ID/Passcode`,
      });
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        Alert.alert("Face Not Recognized");
      }
    } else {
      Alert.alert("Biometric authentication is not available on this device");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={() => setIsAuthenticated(false)}>
              <MaterialIcons name="logout" size={20} color="#ffffff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.centeredContent}>
            <Text style={styles.logoS}>Ryt Bank</Text>
            <Text style={styles.subtitle}>Your trusted digital bank</Text>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/100/fingerprint.png",
              }}
              style={styles.icon}
            />
          </View>
          <ScrollView contentContainerStyle={styles.quickActions}>
            <QuickAction title="Transfer" />
            <QuickAction title="Pay Bills" />
            <QuickAction title="Currency Exchange" />
            <QuickAction title="Reload" />
            <QuickAction title="Split Bills" />
            <QuickAction title="Freeze Account" />
          </ScrollView>
        </>
      ) : (
        <>
          <Text style={styles.logo}>Ryt Bank</Text>
          <Text style={styles.subtitle}>Your trusted digital bank</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAuthentication}
          >
            <Text>Login with Passcode/FaceID</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

function QuickAction({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.actionButton}>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
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
  logoutContainer: {
    width: "100%",
    padding: 16,
    paddingHorizontal: 24,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoS: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 80,
    marginBottom: 40,
  },
  subtitle: {
    gap: 8,
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 80,
    marginTop: 40,
    tintColor: "#0070f3",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 40,
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
  actionButton: {
    width: 140,
    height: 80,
    backgroundColor: "transparent",
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    elevation: 5,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
