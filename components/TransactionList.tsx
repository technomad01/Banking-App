import { sampleTransactions } from "@/data/sampleTransactions";
import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";
import {
  View,
  Alert,
  FlatList,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

type Transaction = {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
};

type TransactionItemProps = {
  transaction: Transaction;
};

export default function TransactionList() {
  const [refresh, setRefresh] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRevealAll = async () => {
    setLoading(true);
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view transactions",
      });

      if (result.success) {
        setRevealed(true);
      } else {
        Alert.alert("Authentication failed");
      }
    } else {
      Alert.alert("Biometric authentication not available");
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      {!revealed && (
        <View style={styles.overlay}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <TouchableOpacity
              style={styles.revealButton}
              onPress={handleRevealAll}
            >
              <Text style={styles.revealText}>Reveal Expenses</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={sampleTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem transaction={item} revealed={revealed} />
        )}
        contentContainerStyle={styles.container}
        onRefresh={onRefresh}
        refreshing={refresh}
      />
    </View>
  );
}

const TransactionItem = ({
  transaction,
  revealed,
}: TransactionItemProps & { revealed: boolean }) => {
  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text
          style={[
            styles.amount,
            transaction.type === "credit" ? styles.credit : styles.debit,
          ]}
        >
          {revealed
            ? `${
                transaction.type === "credit" ? "+" : "-"
              }${transaction.amount.toFixed(2)}`
            : "****"}
        </Text>
      </View>
      <Text style={styles.date}>{transaction.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  revealButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 5,
  },
  revealText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  credit: {
    color: "green",
  },
  debit: {
    color: "red",
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },
});
