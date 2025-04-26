import { sampleTransactions } from "@/data/sampleTransactions";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  View,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

type Transaction = {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: "Debit" | "Credit";
};

type TransactionItemProps = {
  transaction: Transaction;
  router: any;
};

export default function TransactionList() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [overlayDismissed, setOverlayDismissed] = useState(false);

  const router = useRouter();

  const handleRevealAll = async () => {
    setLoading(true);
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view transactions",
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

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => setRefresh(false), 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      {!isAuthenticated && !overlayDismissed && (
        <View style={styles.overlay}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <TouchableOpacity
                style={styles.revealButton}
                onPress={handleRevealAll}
              >
                <Text style={styles.revealText}>Reveal Expenses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dismissButton}
                onPress={() => setOverlayDismissed(true)}
              >
                <Text style={styles.dismissText}>Dismiss</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      <FlatList
        data={sampleTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem transaction={item} router={router} />
        )}
        contentContainerStyle={styles.container}
        onRefresh={onRefresh}
        refreshing={refresh}
      />
    </View>
  );
}

const TransactionItem = ({ transaction, router }: TransactionItemProps) => {
  const { isAuthenticated } = useAuth();

  const handlePress = () => {
    router.push({
      pathname: `/transactionId`,
      params: { transaction: JSON.stringify(transaction) },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.description}>{transaction.description}</Text>
        <Text
          style={[
            styles.amount,
            transaction.type === "Credit" ? styles.credit : styles.debit,
          ]}
        >
          {isAuthenticated
            ? `${
                transaction.type === "Credit" ? "+" : "-"
              }${transaction.amount.toFixed(2)}`
            : "****"}
        </Text>
      </View>
      <Text style={styles.date}>{transaction.date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#030453",
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
  dismissButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dismissText: {
    color: "#000",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
