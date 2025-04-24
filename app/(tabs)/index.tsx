import BiometricLogin from "@/components/biometricLogin";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <BiometricLogin />
    </View>
  );
}
