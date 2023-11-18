import LogInForm from "../../components/authentication/LogInForm";
import { StackScreenProps } from "@react-navigation/stack";
import GradientBackground from "../../components/ui/GradientBackground";
import LogInTitle from "../../components/authentication/LogInTitle";
import { View } from "react-native";

const LogInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const navigateRegistration = () => {
    navigation.navigate("Registration");
  };

  return (
    <GradientBackground>
      <LogInTitle />
      <LogInForm navigateRegistration={navigateRegistration} />
    </GradientBackground>
  );
};

export default LogInScreen;
