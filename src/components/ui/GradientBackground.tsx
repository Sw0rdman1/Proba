import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/Colors";

interface GradientBackgroundProps {
  children: React.ReactNode;
}

const GradientBackground = ({ children }: GradientBackgroundProps) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
