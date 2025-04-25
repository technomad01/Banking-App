import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { useAuth } from "@/context/auth-context";

export default function TransactionDetail() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  const params = useLocalSearchParams();
  const transaction = params.transaction
    ? JSON.parse(params.transaction as string)
    : null;

  useEffect(() => {
    if (!isAuthenticated) {
      handleRevealDetails();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleRevealDetails = async () => {
    setLoading(true);
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view transaction details",
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        Alert.alert("Authentication failed");
      }
    } else {
      Alert.alert("Biometric authentication not available");
    }
    setLoading(false);
  };

  if (!isAuthenticated || loading) {
    return <Text>Loading transaction...</Text>;
  }

  if (!transaction) {
    return <Text>Loading transactions...</Text>;
  }

  const { id, amount, date, description, type } = transaction;

  const formattedAmount = new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(Number(amount));

  return (
    <>
      <Stack.Screen options={{ title: "Details", headerBackTitle: "Return" }} />
      <View style={styles.container}>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Transaction ID: {id}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{description}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Amount:</Text>
          <Text
            style={[
              styles.value,
              type === "Credit" ? styles.credit : styles.debit,
            ]}
          >
            {type === "Credit" ? "+" : "-"}
            {formattedAmount}
          </Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{type}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#030453",
    flex: 1,
  },
  detailBox: {
    backgroundColor: "#FFFAFA",
    padding: 10,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    marginTop: 4,
  },
  credit: {
    color: "green",
  },
  debit: {
    color: "red",
  },
});
