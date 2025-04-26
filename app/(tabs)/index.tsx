import BiometricLogin from "@/components/BiometricLogin";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1}}>
      <BiometricLogin />
    </View>
  );
}
