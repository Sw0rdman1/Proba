import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/Colors";

interface PasswordInputProps {
  password: {
    value: string;
    error: string;
  };
  setPassword: (password: Partial<{ value: string; error: string }>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setPassword({ error: "" });
  }, [password.value]);

  return (
    <View>
      <View>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            marginBottom: 8,
            marginLeft: 10,
            color: password.error ? COLORS.error : COLORS.black,
          }}
        >
          Password
        </Text>

        <View
          style={{
            width: "100%",
            height: 48,
            backgroundColor: COLORS.whitesmoke,
            borderColor: password.error ? COLORS.error : COLORS.grey,
            borderWidth: 1,
            borderRadius: 20,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            paddingLeft: 15,
            paddingRight: 12,
          }}
        >
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor={COLORS.black}
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => setPassword({ value: text })}
            style={{
              width: "100%",
            }}
          />

          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{
              position: "absolute",
              right: 12,
            }}
          >
            {isPasswordVisible ? (
              <Ionicons name="eye-off" size={24} color={COLORS.black} />
            ) : (
              <Ionicons name="eye" size={24} color={COLORS.black} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.errorText}>{password.error}</Text>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  errorText: {
    color: COLORS.error,
    marginLeft: 15,
    paddingTop: 5,
    height: 22,
  },
});
