import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import EmailInput from "../../components/authentication/EmailInput";
import { validateEmail } from "../../utils/validation";
import COLORS from "../../constants/Colors";
import GradientBackground from "../ui/GradientBackground";
import Button from "../ui/Button";
import PasswordInput from "./PasswordInput";
import { useAppContext } from "../../context/app/useApp";

interface LogInFormProps {
  navigateRegistration: () => void;
}

const LogInForm = ({ navigateRegistration }: LogInFormProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { app } = useAppContext();

  const [email, setEmail] = useState({
    value: "",
    error: "",
  });

  const [password, setPassword] = useState({
    value: "",
    error: "",
  });

  const customSetEmail = (
    newEmail: Partial<{ value: string; error: string }>
  ) => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      ...newEmail,
    }));
  };

  const customSetPassword = (
    newPassword: Partial<{ value: string; error: string }>
  ) => {
    setPassword((prevPassword) => ({
      ...prevPassword,
      ...newPassword,
    }));
  };

  const handleLogIn = () => {
    if (password.value === "") {
      customSetPassword({ error: "Password cannot be empty!" });
      setButtonDisabled(true);
      return;
    }
    app
      .auth()
      .authenticateUser(email.value, password.value)
      .then((response) => {
        if (response.error) {
          const code = response.error;

          if (code === "auth/user-not-found") {
            customSetEmail({ error: "User with this email does not exist!" });
            setButtonDisabled(true);
          } else if (code === "auth/wrong-password") {
            customSetPassword({ error: "Wrong password!" });
          } else {
            console.log("Unkown error");
          }
        }
      });
  };

  useEffect(() => {
    if (password.value === "" || email.value === "") {
      setButtonDisabled(true);
      return;
    }
    if (validateEmail(email.value) && password.error === "") {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email.value, password.value]);

  return (
    <View style={styles.formContainer}>
      <Animated.View
        entering={FadeInDown.delay(700).duration(1500).springify()}
      >
        <EmailInput email={email} setEmail={customSetEmail} />
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(900).duration(1500).springify()}
      >
        <PasswordInput setPassword={customSetPassword} password={password} />
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(1100).duration(1500).springify()}
      >
        <Button
          title="Log In"
          onPress={handleLogIn}
          filled
          style={{
            marginTop: 40,
            width: "80%",
            marginLeft: "10%",
          }}
          disabled={buttonDisabled}
        />
      </Animated.View>
      <Animated.View
        style={styles.register}
        entering={FadeInDown.delay(1300).duration(1500).springify()}
      >
        <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateRegistration}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.middleColor,
              fontWeight: "500",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LogInForm;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    flex: 8,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
  },

  register: {
    marginTop: 20,
    fontSize: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
