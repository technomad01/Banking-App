import BiometricLogin from "@/components/BiometricLogin";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <BiometricLogin />
    </View>
  );
}
